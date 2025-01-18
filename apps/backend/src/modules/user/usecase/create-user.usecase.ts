import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { UserEntity } from '../domain/user.entity';
import { SupabaseService } from '@/libs/supabase/supabase.service';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly supabase: SupabaseService,
  ) {}

  async execute(authToken: string): Promise<{
    id: string;
    name: string;
  }> {
    const {
      data: { user: supabaseUser },
      error,
    } = await this.supabase.supabaseClient.auth.getUser(authToken);

    console.log('supabaseUser', supabaseUser, error);

    if (error || !supabaseUser) {
      throw new UnauthorizedException();
    }

    const newUser = UserEntity.create({
      name: supabaseUser.user_metadata.full_name,
      supabaseId: supabaseUser.id,
    });
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
