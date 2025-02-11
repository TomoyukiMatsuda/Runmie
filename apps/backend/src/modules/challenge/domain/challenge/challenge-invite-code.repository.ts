import { Injectable } from '@nestjs/common';
import { ChallengeInviteCode } from '@/modules/challenge/domain/challenge/value-object/challenge-invite-code';
import { PrismaService } from '@/libs/prisma/prisma.service';

@Injectable()
export class ChallengeInviteCodeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(challengeId: string): Promise<ChallengeInviteCode> {
    const model = await this.prisma.challengeInviteCode.create({
      data: {
        code: ChallengeInviteCode.generateCode(),
        challengeId,
      },
    });

    return ChallengeInviteCode.reconstruct(model);
  }

  async findByCode(code: string): Promise<ChallengeInviteCode | undefined> {
    const model = await this.prisma.challengeInviteCode.findUnique({
      where: {
        code,
      },
    });
    return model ? ChallengeInviteCode.reconstruct(model) : undefined;
  }

  async findByChallengeId(
    challengeId: string,
  ): Promise<ChallengeInviteCode | undefined> {
    const model = await this.prisma.challengeInviteCode.findFirst({
      where: {
        challengeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return model ? ChallengeInviteCode.reconstruct(model) : undefined;
  }
}
