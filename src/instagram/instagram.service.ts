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

  async uploadPhoto(imagePath: string, caption?: string) {
    const publishResult = await this.ig.publish.photo({
      file: fs.readFileSync(imagePath),
      caption: caption || '',
    });
    return publishResult;
  }
}
