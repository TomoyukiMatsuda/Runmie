import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateChallengeUseCase } from '@/modules/challenge/usecase/create-challenge.usecase';
import { CreateChallengeDto } from '@/modules/challenge/presentation/challenge.dto';
import { AuthUserGuard } from '@/libs/auth/auth.user.guard';
import { AuthUser, AuthUserType } from '@/libs/auth/user.decorator';
import { GetChallengesByUserIdUsecase } from '@/modules/challenge/usecase/get-challenges-by-user-id.usecase';
import { ApiResponse } from '../../../../../../shared/types/apiConst';

@UseGuards(AuthUserGuard)
@Controller('/challenges')
export class ChallengeController {
  constructor(
    private readonly createChallengeUsecase: CreateChallengeUseCase,
    private readonly getChallengesByUserIdUsecase: GetChallengesByUserIdUsecase,
  ) {}

  @Get()
  async get(
    @AuthUser() user: AuthUserType,
  ): Promise<ApiResponse<'/challenges', 'get'>> {
    return this.getChallengesByUserIdUsecase
      .execute({ userId: user.id })
      .then((result) => {
        return result.map((challenge) => ({
          ...challenge,
          targetDate: challenge.targetDate.toDateString(),
        }));
      });
  }

  @Post()
  async create(
    @AuthUser() user: AuthUserType,
    @Body() dto: CreateChallengeDto,
  ): Promise<ApiResponse<'/challenges', 'post'>> {
    await this.createChallengeUsecase.execute({
      creatorId: user.id,
      ...dto,
    });

    return { success: true };
  }
}
