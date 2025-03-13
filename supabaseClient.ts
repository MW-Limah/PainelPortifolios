import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jcbgfgsmuymsmwxtcnvd.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjYmdmZ3NtdXltc213eHRjbnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MTYwMDAsImV4cCI6MjA1NzM5MjAwMH0.vE2efao2FFgMPTtkcEmnxw8n9vai3u2Vb_bOLFb1T3M';
export const supabase = createClient(supabaseUrl, supabaseKey);
