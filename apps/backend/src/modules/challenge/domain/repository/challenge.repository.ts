import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/libs/prisma/prisma.service';
import { ChallengeEntity } from '@/modules/challenge/domain/entity/challenge.entity';

@Injectable()
export class ChallengeRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(entity: ChallengeEntity): Promise<ChallengeEntity> {
    if (entity.members.length === 0) {
      throw new Error('Members are required');
    }

    const result = await this.prisma.$transaction(
      async (tx) => {
        const challenge = await tx.challenge.create({
          data: {
            title: entity.title,
            description: entity.description,
            targetDate: entity.targetDate,
            status: entity.status,
          },
        });

        const member = await tx.challengeMember.create({
          data: {
            userId: entity.members[0]!.userId,
            challengeId: challenge.id,
          },
        });

        return {
          challenge,
          member,
        };
      },
      {
        timeout: 10000,
        isolationLevel: 'Serializable',
      },
    );

    return ChallengeEntity.toEntity({
      ...result.challenge,
      members: [
        {
          userId: result.member.userId,
          role: result.member.role,
        },
      ],
    });
  }

  async findById(id: string): Promise<ChallengeEntity | undefined> {
    const model = await this.prisma.challenge.findUnique({
      where: {
        id,
      },
      include: {
        members: true,
      },
    });

    if (!model) {
      return;
    }

    return ChallengeEntity.toEntity(model);
  }
}
