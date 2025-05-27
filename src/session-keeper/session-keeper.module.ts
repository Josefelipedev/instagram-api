import { Module } from '@nestjs/common';
import { SessionKeeperService } from './session-keeper.service';
import { InstagramModule } from '../instagram/instagram.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [InstagramModule, PrismaModule],
  providers: [SessionKeeperService],
})
export class SessionKeeperModule {}
