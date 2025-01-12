import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { UserEntity } from '../domain/user.entity';
import { SupabaseService } from '@/libs/supabase/supabaseService';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly supabase: SupabaseService,
  ) {}

  async execute(
    authToken: string,
    name: string,
  ): Promise<{
    id: string;
    name: string;
  }> {
    const {
      data: { user: supabaseUser },
      error,
    } = await this.supabase.supabaseClient.auth.getUser(authToken);
    if (error || !supabaseUser) {
      throw new UnauthorizedException();
    }

    const newUser = UserEntity.create({ name, supabaseId: supabaseUser.id });
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
