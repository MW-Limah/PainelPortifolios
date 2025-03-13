import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
    throw new Error('Supabase environment variables are not set');
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
// 📌 Buscar itens
export async function GET() {
    try {
        console.log('🔍 Buscando itens...');

        const { data, error } = await supabase
            .from('items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('❌ Erro ao buscar itens:', error.message);
            return NextResponse.json(
                { error: 'Erro ao buscar itens no banco' },
                { status: 500 }
            );
        }

        console.log('📌 Itens recuperados:', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('❌ Database GET Error:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar itens no banco' },
            { status: 500 }
        );
    }
}

// 📌 Criar item
export async function POST(req: NextRequest) {
    try {
        const { title, description, imageUrl } = await req.json();

        if (!title || !description || !imageUrl) {
            return NextResponse.json(
                { error: 'Todos os campos são obrigatórios' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('items')
            .insert([{ title, description, image: imageUrl }])
            .select();

        if (error) {
            console.error('❌ Erro ao criar item:', error.message);
            return NextResponse.json(
                { error: 'Erro ao criar item' },
                { status: 500 }
            );
        }

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error('❌ Database POST Error:', error);
        return NextResponse.json(
            { error: 'Erro ao criar item' },
            { status: 500 }
        );
    }
}

// 📌 Atualizar item
export async function PUT(req: NextRequest) {
    try {
        const { id, title, description, imageUrl } = await req.json();

        if (!id || !title || !description || !imageUrl) {
            return NextResponse.json(
                { error: 'Todos os campos são obrigatórios' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('items')
            .update({ title, description, image: imageUrl })
            .eq('id', id)
            .select();

        if (error) {
            console.error('❌ Erro ao atualizar item:', error.message);
            return NextResponse.json(
                { error: 'Erro ao atualizar item' },
                { status: 500 }
            );
        }

        if (!data || data.length === 0) {
            return NextResponse.json(
                { error: 'Item não encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error('❌ Database PUT Error:', error);
        return NextResponse.json(
            { error: 'Erro ao atualizar item' },
            { status: 500 }
        );
    }
}
