import { ApiProperty } from '@nestjs/swagger';
import { ActionWithUsernameDto } from './action-with-username.dto';

export class DmDto extends ActionWithUsernameDto {
  @ApiProperty({ example: 'destinatario123' })
  recipientUsername: string;

  @ApiProperty({ example: 'Olá, tudo bem?' })
  message: string;
}
