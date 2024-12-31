import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { UserEntity } from '../domain/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(name: string): Promise<{
    id: string;
    name: string;
  }> {
    const newUser = UserEntity.create({ name });
    const result = await this.userRepository.create(newUser);
    if (!result.id) {
      throw new Error('Failed to create user');
    }

    return {
      id: result.id,
      name: result.name,
    };
  }
}
