import { ApiProperty } from '@nestjs/swagger';

export class GetUserInfoDto {
  @ApiProperty({ example: 'meu_usuario' })
  username: string;

  @ApiProperty({ example: 'target_usuario' })
  targetUsername: string;
}
