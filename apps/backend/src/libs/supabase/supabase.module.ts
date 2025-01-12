import { Module } from '@nestjs/common';
import { SupabaseService } from '@/libs/supabase/supabaseService';

@Module({
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
