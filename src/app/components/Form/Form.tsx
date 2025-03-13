import { useState } from 'react';
import Image from 'next/image';
import styles from './Form.module.css';
import { MdFileUpload } from 'react-icons/md';

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
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Cria preview da imagem
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title || !description || !image) return;

        const imageUrl = URL.createObjectURL(image); // Converte File para URL
        const newItem = { title, description, image: imageUrl };

        onAddItem(newItem); // Passa image como string

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
                required
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
                ></Image>
            )}
            <button type="submit" className={styles.formButton}>
                Adicionar Item
            </button>
        </form>
    );
}
