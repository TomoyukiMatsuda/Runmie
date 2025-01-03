import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ChallengeModule } from '@/modules/challenge/challenge.module';

@Module({
  imports: [UserModule, ChallengeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
