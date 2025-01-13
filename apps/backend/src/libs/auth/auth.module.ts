import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SupabaseStrategy } from './supabase.strategy';
import { SupabaseModule } from '@/libs/supabase/supabase.module';

@Module({
  imports: [PassportModule, SupabaseModule],
  providers: [SupabaseStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
