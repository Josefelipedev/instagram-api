import { Injectable } from '@nestjs/common';
import { IgApiClient } from 'instagram-private-api';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class InstagramService {
  private ig: IgApiClient;

  constructor(private prisma: PrismaService) {
    this.ig = new IgApiClient();
    this.ig.state.generateDevice('dummy');
  }

  async login(username: string, password: string) {
    await this.ig.simulate.preLoginFlow();
    const loggedInUser = await this.ig.account.login(username, password);

    const session = await this.ig.state.serialize();

    await this.prisma.instagramSession.upsert({
      where: { username },
      update: { session },
      create: { username, session },
    });

    return loggedInUser;
  }

  async loadSession(username: string): Promise<boolean> {
    const sessionData = await this.prisma.instagramSession.findUnique({
      where: { username },
    });

    if (!sessionData) {
      return false;
    }

    await this.ig.state.deserialize(sessionData.session);
    return true;
  }

  async uploadPhoto(username: string, imagePath: string, caption?: string) {
    const sessionLoaded = await this.loadSession(username);
    if (!sessionLoaded) {
      throw new Error('Sessão não encontrada. Faça login novamente.');
    }

    const publishResult = await this.ig.publish.photo({
      file: fs.readFileSync(imagePath),
      caption: caption || '',
    });

    return publishResult;
  }
  async getUserInfo(username: string, targetUsername: string) {
    const sessionLoaded = await this.loadSession(username);
    if (!sessionLoaded) {
      throw new Error('Sessão não encontrada. Faça login novamente.');
    }

    const userInfo = await this.ig.user.searchExact(targetUsername);
    return userInfo;
  }

  async likePost(username: string, mediaId: string, postOwnerUsername: string) {
    const sessionLoaded = await this.loadSession(username);
    if (!sessionLoaded) {
      throw new Error('Sessão não encontrada. Faça login novamente.');
    }

    const postOwner = await this.ig.user.searchExact(postOwnerUsername);

    return this.ig.media.like({
      mediaId,
      moduleInfo: {
        module_name: 'profile',
        user_id: postOwner.pk.toString(),
        username: postOwner.username,
      },
      d: 0,
    });
  }

  async followUser(username: string, targetUsername: string) {
    const sessionLoaded = await this.loadSession(username);
    if (!sessionLoaded) {
      throw new Error('Sessão não encontrada. Faça login novamente.');
    }

    const targetUser = await this.ig.user.searchExact(targetUsername);
    return this.ig.friendship.create(targetUser.pk);
  }

  async sendDirectMessage(
    username: string,
    recipientUsername: string,
    message: string,
  ) {
    const sessionLoaded = await this.loadSession(username);
    if (!sessionLoaded) {
      throw new Error('Sessão não encontrada. Faça login novamente.');
    }

    const user = await this.ig.user.searchExact(recipientUsername);
    const thread = this.ig.entity.directThread([user.pk.toString()]);
    return thread.broadcastText(message);
  }

  async searchByHashtag(username: string, hashtag: string) {
    const sessionLoaded = await this.loadSession(username);
    if (!sessionLoaded) {
      throw new Error('Sessão não encontrada. Faça login novamente.');
    }

    const tagFeed = this.ig.feed.tags(hashtag, 'recent');
    const items = await tagFeed.items();
    return items.map((post) => ({
      id: post.id,
      caption: post.caption?.text || '',
      username: post.user.username,
      imageUrl: post.image_versions2?.candidates[0]?.url,
    }));
  }
}
