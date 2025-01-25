import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateChallengeUseCase } from '@/modules/challenge/usecase/create-challenge.usecase';
import { ChallengeStatus } from '@/modules/challenge/domain/challenge/entity/challenge.entity';
import { CreateChallengeDto } from '@/modules/challenge/presentation/challenge.dto';
import { AuthUserGuard } from '@/libs/auth/auth.user.guard';
import { AuthUser, AuthUserType } from '@/libs/auth/user.decorator';
import { GetChallengesByUserIdUsecase } from '@/modules/challenge/usecase/get-challenges-by-user-id.usecase';

@UseGuards(AuthUserGuard)
@Controller('/challenges')
export class ChallengeController {
  constructor(
    private readonly createChallengeUsecase: CreateChallengeUseCase,
    private readonly getChallengesByUserIdUsecase: GetChallengesByUserIdUsecase,
  ) {}

  @Get()
  async get(@AuthUser() user: AuthUserType): Promise<
    {
      id: string;
      title: string;
      description: string | null;
      targetDate: Date;
      status: ChallengeStatus;
    }[]
  > {
    return this.getChallengesByUserIdUsecase.execute({ userId: user.id });
  }

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
    return this.createChallengeUsecase.execute({
      creatorId: user.id,
      ...dto,
    });
  }
}
