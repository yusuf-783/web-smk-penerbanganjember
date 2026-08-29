import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.PUBLIC_SUPABASE_URL || '').trim();
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '').trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(
  supabaseUrl,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);