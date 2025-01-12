import { PrismaService } from '@/libs/prisma/prisma.service';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: UserEntity): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        ...entity,
      },
    });

    return UserEntity.toEntity({
      id: user.id,
      name: user.name,
      supabaseId: user.supabaseId,
    });
  }

  async update(entity: UserEntity): Promise<UserEntity> {
    if (!entity.id) {
      throw new Error('ID is required');
    }

    const user = await this.prisma.user.update({
      where: {
        id: entity.id,
      },
      data: {
        ...entity,
      },
    });

    return UserEntity.toEntity({
      ...user,
    });
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return;
    }

    return UserEntity.toEntity({
      ...user,
    });
  }

  async findBySupabaseId(supabaseId: string): Promise<UserEntity | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        supabaseId,
      },
    });

    if (!user) {
      return;
    }

    return UserEntity.toEntity({
      ...user,
    });
  }
}
