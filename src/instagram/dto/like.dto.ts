import { ApiProperty } from '@nestjs/swagger';
import { ActionWithUsernameDto } from './action-with-username.dto';

export class LikeDto extends ActionWithUsernameDto {
  @ApiProperty({ example: '1234567890123456789_987654321' })
  mediaId: string;

  @ApiProperty({ example: 'dono_da_postagem' })
  postOwnerUsername: string;
}
