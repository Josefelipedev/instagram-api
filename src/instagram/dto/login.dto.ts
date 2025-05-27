import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'meu_usuario', description: 'Nome de usuário do Instagram' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'minha_senha123', description: 'Senha do Instagram' })
  @IsString()
  @MinLength(4)
  password: string;
}
