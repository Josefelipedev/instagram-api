import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InstagramService } from '../instagram/instagram.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionKeeperService implements OnModuleInit {
  constructor(
    private readonly instagramService: InstagramService,
    private readonly prisma: PrismaService,
  ) {}

  onModuleInit() {
    this.keepSessionsAlive();
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async keepSessionsAlive() {
    return;
    console.log('[CRON] Verificando sessões ativas...');
    const sessions = await this.prisma.instagramSession.findMany();

    for (const session of sessions) {
      try {
        await this.instagramService.loadSession(session.username);
        await this.instagramService.getUserInfo(
          session.username,
          session.username,
        );
        console.log(`[CRON] Sessão válida para: ${session.username}`);
      } catch (error) {
        console.warn(`[CRON] Erro em ${session.username}:`, error.message);
      }
    }
  }
}
