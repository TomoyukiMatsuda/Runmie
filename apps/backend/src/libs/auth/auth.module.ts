import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SupabaseStrategy } from './supabase.strategy';
import { UserRepository } from '@/modules/user/domain/user.repository';
import { SupabaseModule } from '@/libs/supabase/supabase.module';

@Module({
  imports: [PassportModule, UserRepository, SupabaseModule],
  providers: [SupabaseStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
