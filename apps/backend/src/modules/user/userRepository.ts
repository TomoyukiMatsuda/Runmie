import { PrismaService } from '../../libs/prisma/prismaService';
import { User } from './domain/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        ...entity,
      },
    });

    return User.toEntity({
      id: user.id,
      name: user.name,
    });
  }

  async update(entity: User): Promise<User> {
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

    return User.toEntity({
      id: user.id,
      name: user.name,
    });
  }

  async findById(id: string): Promise<User | undefined> {
    // TODO: なぜ type が nullable にならないのか？
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return;
    }

    return User.toEntity({
      id: user.id,
      name: user.name,
    });
  }
}
