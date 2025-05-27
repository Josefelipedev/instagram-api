import { Module } from '@nestjs/common';

import { InstagramModule } from './instagram/instagram.module';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SessionKeeperModule } from './session-keeper/session-keeper.module';

@Module({
  imports: [
    InstagramModule,
    PrismaModule,
    ScheduleModule.forRoot(),
    SessionKeeperModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
