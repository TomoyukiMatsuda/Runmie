import { Injectable } from '@nestjs/common';
import { UserRepository } from '../userRepository';
import { User } from '../domain/user';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(name: string): Promise<{
    id: string;
    name: string;
  }> {
    const newUser = User.create({ name });
    return await this.userRepository.create(newUser);
  }
}
