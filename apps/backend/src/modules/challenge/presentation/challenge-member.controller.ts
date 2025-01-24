import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthUserGuard } from '@/libs/auth/auth.user.guard';
import { AuthUser, AuthUserType } from '@/libs/auth/user.decorator';
import { ChallengeMemberAddDto } from '@/modules/challenge/presentation/challenge-member.dto';
import { AddChallengeMemberUsecase } from '@/modules/challenge/usecase/add-challenge-member.usecase';

@UseGuards(AuthUserGuard)
@Controller('/challenge_members')
export class ChallengeMemberController {
  constructor(
    private readonly addChallengeMemberUsecase: AddChallengeMemberUsecase,
  ) {}

  @Post()
  async add(
    @AuthUser() user: AuthUserType,
    @Body() dto: ChallengeMemberAddDto,
  ): Promise<{ success: boolean }> {
    await this.addChallengeMemberUsecase.execute({
      userId: user.id,
      challengeId: dto.challengeId,
    });

    return { success: true };
  }
}
