import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateChallengeUseCase } from '@/modules/challenge/usecase/create-challenge.usecase';
import { ChallengeStatus } from '@/modules/challenge/domain/challenge/entity/challenge.entity';
import { CreateChallengeDto } from '@/modules/challenge/presentation/challenge.dto';
import { AuthUserGuard } from '@/libs/auth/auth.user.guard';
import { AuthUser, AuthUserType } from '@/libs/auth/user.decorator';

@UseGuards(AuthUserGuard)
@Controller('/challenges')
export class ChallengeController {
  constructor(
    private readonly createChallengeUseCase: CreateChallengeUseCase,
  ) {}

  @Post()
  async create(
    @AuthUser() user: AuthUserType,
    @Body() dto: CreateChallengeDto,
  ): Promise<{
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
    return this.createChallengeUseCase.execute({
      creatorId: user.id,
      ...dto,
    });
  }
}
