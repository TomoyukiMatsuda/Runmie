import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthUserGuard } from '@/libs/auth/auth.user.guard';
import { AuthUser, AuthUserType } from '@/libs/auth/user.decorator';
import { ApiResponse } from '@shared/types/apiConst';
import { AddChallengeMemberUsecase } from '@/modules/challenge/usecase/add-challenge-member.usecase';
import { CreateChallengeInviteCodeUsecase } from '../usecase/create-challenge-invite-code.usecase';
import { GetChallengeInviteCodeUsecase } from '@/modules/challenge/usecase/get-challenge-invite-code.usecase';
import {
  ChallengeMemberAddDto,
  ChallengeInviteCodeCreateDto,
  ChallengeInviteCodeGetDto,
} from './challenge-member.dto';

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
  ): Promise<ApiResponse<'/challenge_members', 'post'>> {
    await this.addChallengeMemberUsecase.execute({
      userId: user.id,
      inviteCode: dto.inviteCode,
    });

    return { success: true };
  }

  @Post('/invite_code')
  async createInviteCode(
    @AuthUser() user: AuthUserType,
    @Body() dto: ChallengeInviteCodeCreateDto,
  ): Promise<ApiResponse<'/challenge_members/invite_code', 'post'>> {
    const inviteCode = await this.createChallengeInviteCodeUsecase.execute({
      userId: user.id,
      challengeId: dto.challengeId,
    });

    return { code: inviteCode.code };
  }

  @Get('/invite_code')
  async getInviteCode(
    @AuthUser() user: AuthUserType,
    @Query() dto: ChallengeInviteCodeGetDto,
  ): Promise<ApiResponse<'/challenge_members/invite_code', 'get'>> {
    return this.getChallengeInviteCodeUsecase.execute({
      userId: user.id,
      challengeId: dto.challengeId,
    });
  }
}
