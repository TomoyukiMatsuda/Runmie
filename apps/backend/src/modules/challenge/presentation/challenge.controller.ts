import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateChallengeUseCase } from '@/modules/challenge/usecase/create-challenge.usecase';
import { ChallengeStatus } from '@/modules/challenge/domain/entity/challenge.entity';
import { CreateChallengeDto } from '@/modules/challenge/presentation/challenge.dto';
import { AuthUserGuard } from '@/libs/auth/auth.user.guard';

@UseGuards(AuthUserGuard)
@Controller('/challenges')
export class ChallengeController {
  constructor(
    private readonly createChallengeUseCase: CreateChallengeUseCase,
  ) {}

  @Post()
  async createChallenge(@Body() dto: CreateChallengeDto): Promise<{
    challenge: {
      id: string;
      title: string;
      description: string | null;
      targetDate: Date;
      status: ChallengeStatus;
      members: {
        userId: string;
        role: string;
      }[];
    };
  }> {
    return await this.createChallengeUseCase.execute({
      creatorId: '1234567890123456789012345', // todo: ログインユーザーのIDを取得
      ...dto,
    });
  }
}
