import { ApiProperty } from '@nestjs/swagger';
import { ActionWithUsernameDto } from './action-with-username.dto';

export class FollowDto extends ActionWithUsernameDto {
  @ApiProperty({ example: 'alvo_para_seguir' })
  targetUsername: string;
}
