import { ApiProperty } from '@nestjs/swagger';
import { ActionWithUsernameDto } from './action-with-username.dto';

export class HashtagDto extends ActionWithUsernameDto {
  @ApiProperty({ example: 'natureza' })
  hashtag: string;
}
