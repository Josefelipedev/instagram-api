import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { InstagramController } from './instagram.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [InstagramService],
  controllers: [InstagramController],
  exports: [InstagramService],
})
export class InstagramModule {}
