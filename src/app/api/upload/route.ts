import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Verifica se as variáveis de ambiente estão definidas
if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
    throw new Error('Supabase environment variables are not set');
}

// Conectando com o Supabase
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const image = formData.get('image') as File | null;

        // ⚠️ Se não houver imagem, retorne apenas uma mensagem
        if (!image) {
            return NextResponse.json(
                { message: 'Nenhuma imagem enviada. Utilizando link externo.' },
                { status: 200 }
            );
        }

        // Verificação de tipo de arquivo
        const allowedTypes = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp',
        ];
        if (!allowedTypes.includes(image.type)) {
            return NextResponse.json(
                { error: 'Tipo de arquivo não suportado' },
                { status: 400 }
            );
        }

        // Converte para ArrayBuffer e cria o buffer
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const fileName = `${Date.now()}-${image.name}`;

        // Upload para o Supabase
        const { data, error } = await supabase.storage
            .from('images')
            .upload(fileName, buffer, {
                contentType: image.type,
            });

        if (error) {
            console.error('Supabase Upload Error:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${fileName}`;

        return NextResponse.json({ imageUrl }, { status: 200 });
    } catch (error) {
        console.error('Unexpected Error:', error);
        return NextResponse.json(
            { error: 'Erro interno no servidor' },
            { status: 500 }
        );
    }
}
