import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<{
    id: string;
    name: string;
  }> {
    const user = await this.userRepository.findById(id);
    if (!user?.id) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      name: user.name,
    };
  }
}
