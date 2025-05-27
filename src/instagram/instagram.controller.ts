import { Body, Controller, Post } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { PostPhotoDto } from './dto/post-photo.dto';

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
    return this.instagramService.uploadPhoto(dto.imagePath, dto.caption);
  }
}
