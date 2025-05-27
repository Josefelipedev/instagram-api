import { ApiProperty } from '@nestjs/swagger';

export class ActionWithUsernameDto {
  @ApiProperty({ example: 'meu_usuario' })
  username: string;
}
