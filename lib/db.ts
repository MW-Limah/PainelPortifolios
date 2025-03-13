import { createClient } from '@supabase/supabase-js';

// Pega as variáveis do .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Cria o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    console.log('🔍 Testando conexão com o Supabase...');
    const { data, error } = await supabase.from('items').select('*').limit(1);

    if (error) {
        console.error('❌ Erro ao conectar:', error.message);
    } else {
        console.log('✅ Conexão OK:', data);
    }
}

export default supabase;
