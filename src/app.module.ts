import { Module } from '@nestjs/common';

import { InstagramModule } from './instagram/instagram.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [InstagramModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
