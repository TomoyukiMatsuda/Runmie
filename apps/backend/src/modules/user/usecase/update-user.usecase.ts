import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    id: string,
    name: string,
  ): Promise<{
    id: string;
    name: string;
  }> {
    const user = await this.userRepository.findById(id);
    if (!user?.id) {
      throw new Error('User not found');
    }

    const result = await this.userRepository.update(user.update({ name }));
    return {
      id: user.id,
      name: result.name,
    };
  }
}
