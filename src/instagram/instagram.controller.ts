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
}
