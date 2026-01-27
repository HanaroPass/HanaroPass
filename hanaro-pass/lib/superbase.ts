import { createClient } from '@supabase/supabase-js';

function required(name: string, v?: string) {
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export const supabaseServer = createClient(
  required('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
  required(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  ),
);
