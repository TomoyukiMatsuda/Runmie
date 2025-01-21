import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ChallengeModule } from '@/modules/challenge/challenge.module';
import { PrismaModule } from '@/libs/prisma/prisma.module';
import { SupabaseModule } from '@/libs/supabase/supabase.module';

@Module({
  imports: [UserModule, ChallengeModule, PrismaModule, SupabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
