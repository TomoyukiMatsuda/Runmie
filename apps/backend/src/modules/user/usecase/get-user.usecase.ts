import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<{
    id: string;
    name: string;
  }> {
    return await this.userRepository.findById(id);
  }
}
