import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUserGuard } from '@/libs/auth/auth.user.guard';
import { AuthUser, AuthUserType } from '@/libs/auth/user.decorator';
import { ChallengeMemberAddDto } from '@/modules/challenge/presentation/challenge-member.dto';
import { AddChallengeMemberUsecase } from '@/modules/challenge/usecase/add-challenge-member.usecase';
import { CreateChallengeInviteCodeUsecase } from '../usecase/create-challenge-invite-code.usecase';
import { GetChallengeInviteCodeUsecase } from '@/modules/challenge/usecase/get-challenge-invite-code.usecase';

@UseGuards(AuthUserGuard)
@Controller('/challenge_members')
export class ChallengeMemberController {
  constructor(
    private readonly addChallengeMemberUsecase: AddChallengeMemberUsecase,
    private readonly createChallengeInviteCodeUsecase: CreateChallengeInviteCodeUsecase,
    private readonly getChallengeInviteCodeUsecase: GetChallengeInviteCodeUsecase,
  ) {}

  @Post()
  async add(
    @AuthUser() user: AuthUserType,
    @Body() dto: ChallengeMemberAddDto,
  ): Promise<{ success: boolean }> {
    await this.addChallengeMemberUsecase.execute({
      userId: user.id,
      inviteCode: dto.inviteCode,
    });

    return { success: true };
  }

  @Post('/invite_code')
  async createInviteCode(
    @AuthUser() user: AuthUserType,
    @Body() dto: { challengeId: string },
  ): Promise<{ code: string }> {
    const inviteCode = await this.createChallengeInviteCodeUsecase.execute({
      userId: user.id,
      challengeId: dto.challengeId,
    });

    return { code: inviteCode.code };
  }

  @Get('/invite_code')
  getInviteCode(
    @AuthUser() user: AuthUserType,
    @Body() dto: { challengeId: string },
  ): Promise<{ code: string; isValid: boolean }> {
    return this.getChallengeInviteCodeUsecase.execute({
      userId: user.id,
      challengeId: dto.challengeId,
    });
  }
}
