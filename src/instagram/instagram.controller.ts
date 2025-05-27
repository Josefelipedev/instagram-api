import { Body, Controller, Post } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { PostPhotoDto } from './dto/post-photo.dto';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { DmDto } from './dto/dm.dto';
import { LikeDto } from './dto/like.dto';
import { FollowDto } from './dto/follow.dto';
import { HashtagDto } from './dto/hashtag.dto';
import { GetFollowersDto } from './dto/get-followers.dto';
import { GetFollowingDto } from './dto/get-following.dto';
import { GetUserPostsDto } from './dto/get-user-posts.dto';
import { UnfollowDto } from './dto/unfollow.dto';

@ApiTags('Instagram')
@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    return this.instagramService.login(body.username, body.password);
  }

  @Post('photo')
  @ApiOperation({ summary: 'Publica uma imagem no feed do Instagram' })
  @ApiBody({ type: PostPhotoDto })
  async postPhoto(@Body() dto: PostPhotoDto) {
    return this.instagramService.uploadPhoto(
      dto.username,
      dto.imagePath,
      dto.caption,
    );
  }

  @Post('user-info')
  @ApiOperation({ summary: 'Busca informações de um perfil do Instagram' })
  @ApiBody({ type: GetUserInfoDto })
  async getUserInfo(@Body() dto: GetUserInfoDto) {
    return this.instagramService.getUserInfo(dto.username, dto.targetUsername);
  }
  @Post('follow')
  async follow(@Body() dto: FollowDto) {
    return this.instagramService.followUser(dto.username, dto.targetUsername);
  }

  @Post('like')
  async like(@Body() dto: LikeDto) {
    return this.instagramService.likePost(
      dto.username,
      dto.mediaId,
      dto.postOwnerUsername,
    );
  }

  @Post('dm')
  async sendDm(@Body() dto: DmDto) {
    return this.instagramService.sendDirectMessage(
      dto.username,
      dto.recipientUsername,
      dto.message,
    );
  }

  @Post('hashtag')
  async searchHashtag(@Body() dto: HashtagDto) {
    return this.instagramService.searchByHashtag(dto.username, dto.hashtag);
  }

  @Post('followers')
  @ApiOperation({ summary: 'Lista os seguidores de um perfil' })
  @ApiBody({ type: GetFollowersDto })
  async getFollowers(@Body() dto: GetFollowersDto) {
    return this.instagramService.getFollowers(
      dto.username,
      dto.targetUsername,
      dto.limit,
    );
  }

  @Post('following')
  @ApiOperation({ summary: 'Lista quem o usuário segue' })
  @ApiBody({ type: GetFollowingDto })
  async getFollowing(@Body() dto: GetFollowingDto) {
    return this.instagramService.getFollowing(
      dto.username,
      dto.targetUsername,
      dto.limit,
    );
  }

  @Post('user-posts')
  @ApiOperation({ summary: 'Lista as publicações de um usuário' })
  @ApiBody({ type: GetUserPostsDto })
  async getUserPosts(@Body() dto: GetUserPostsDto) {
    return this.instagramService.getUserPosts(
      dto.username,
      dto.targetUsername,
      dto.limit,
    );
  }

  @Post('unfollow')
  @ApiOperation({ summary: 'Deixa de seguir um usuário' })
  @ApiBody({ type: UnfollowDto })
  async unfollow(@Body() dto: UnfollowDto) {
    return this.instagramService.unfollowUser(dto.username, dto.targetUsername);
  }

  @Post('clear-sessions')
  @ApiOperation({ summary: 'Remove sessões inválidas do banco de dados' })
  async clearInvalidSessions() {
    return this.instagramService.clearInvalidSessions();
  }
}
