import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class PostPhotoDto {
  @ApiProperty({
    description: 'Nome de usuário do Instagram para usar a sessão',
    example: 'meu_usuario',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Caminho para a imagem local ou base64',
    example: './uploads/foto.jpg',
  })
  @IsString()
  imagePath: string;

  @ApiPropertyOptional({
    description: 'Legenda para a foto (opcional)',
    example: 'Curtindo o domingo!',
  })
  @IsOptional()
  @IsString()
  caption?: string;
}
