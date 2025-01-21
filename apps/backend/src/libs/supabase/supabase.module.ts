import { Global, Module } from '@nestjs/common';
import { SupabaseService } from '@/libs/supabase/supabase.service';

@Global()
@Module({
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
