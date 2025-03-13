import { useState } from 'react';
import Image from 'next/image';
import styles from './Form.module.css';

type ItemType = {
    title: string;
    description: string;
    image: string; // URL da imagem
};

export default function Form({
    onAddItem,
}: {
    onAddItem: (item: ItemType) => void;
}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title || !description || !imageUrl) return;

        // Envia o item diretamente com a URL da imagem
        const response = await fetch('/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, image: imageUrl }),
        });

        if (!response.ok) {
            alert('Erro ao adicionar item!');
            return;
        }

        const newItem = await response.json();
        onAddItem(newItem);

        // Limpa os campos do formulário
        setTitle('');
        setDescription('');
        setImageUrl('');
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

            <input
                className={styles.inputFormURL}
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="URL da imagem"
                required
            />

            <textarea
                className={styles.textareaForm}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição"
                required
            />

            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt="Preview"
                    width={200}
                    height={200}
                    layout="intrinsic"
                    unoptimized
                />
            )}

            <button type="submit" className={styles.formButton}>
                Adicionar Item
            </button>
        </form>
    );
}
