import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '../domain/user';

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
    return await this.userRepository.update(User.update({ name }));
  }
}
