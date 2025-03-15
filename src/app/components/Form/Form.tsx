import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Form.module.css';
import { MdFileUpload } from 'react-icons/md';
import { supabase } from 'supabaseClient';

type ItemType = {
    id?: string; // ✅ Alterado de number para string
    title: string;
    description: string;
    image: string; // URL da imagem
};

export default function Form({
    onAddItem,
    editItem,
}: {
    onAddItem: (item: ItemType) => Promise<void>;
    editItem?: ItemType | null;
}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // Preenche os campos quando editItem for passado
    useEffect(() => {
        if (editItem) {
            setTitle(editItem.title);
            setDescription(editItem.description);
            setPreview(editItem.image);
        }
    }, [editItem]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title || !description) return;

        let imageUrl = editItem?.image || '';

        if (image) {
            const uniqueName = `${Date.now()}_${image.name}`;
            const { data, error } = await supabase.storage
                .from('images')
                .upload(`public/${uniqueName}`, image);

            if (error) {
                console.error('Erro ao enviar imagem:', error.message);
                return;
            }

            imageUrl = supabase.storage
                .from('images')
                .getPublicUrl(`public/${uniqueName}`).data.publicUrl;
        }

        await onAddItem({
            id: editItem?.id, // Certifica-se de que o ID é passado corretamente
            title,
            description,
            image: imageUrl,
        });

        setTitle('');
        setDescription('');
        setImage(null);
        setPreview(null);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                className={styles.inputFormTitle}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                required
            />
            <label htmlFor="fileInput" className={styles.customFileUpload}>
                <MdFileUpload />
            </label>
            <input
                id="fileInput"
                className={styles.inputFormURL}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            <textarea
                className={styles.textareaForm}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição"
                required
            />

            {preview && (
                <Image
                    src={preview}
                    alt="Preview"
                    width={200}
                    height={0}
                    layout="intrinsic"
                    unoptimized
                />
            )}
            <button type="submit" className={styles.formButton}>
                {editItem ? 'Salvar Alterações' : 'Adicionar Item'}
            </button>
        </form>
    );
}
