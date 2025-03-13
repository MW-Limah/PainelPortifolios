'use client';

import { useState, useEffect } from 'react';
import styles from './Main.module.css';
import Form from '../Form/Form';
import BoxItem from '../Items/boxItem/BoxItem';
import { supabase } from 'supabaseClient';

// Tipo para o Supabase (banco)
type DBItem = {
    id: number;
    title: string;
    description: string;
    image_url: string;
};

// Tipo para o Frontend (componentes)
type ItemType = {
    title: string;
    description: string;
    image: string;
};

export default function Main() {
    const [items, setItems] = useState<ItemType[]>([]);
    const [showForm, setShowForm] = useState(false);

    // Carrega os itens do Supabase ao iniciar
    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase.from('items').select('*');
            if (error) {
                console.error('Erro ao buscar itens:', error.message);
                return;
            }

            // Converte os itens para o formato esperado no frontend
            const formattedItems = data?.map((item: DBItem) => ({
                title: item.title,
                description: item.description,
                image: item.image_url,
            }));

            setItems(formattedItems || []);
        };

        fetchItems();
    }, []);

    // Adiciona o item no Supabase e atualiza a lista
    const addItem = async (item: ItemType) => {
        const { data, error } = await supabase
            .from('items')
            .insert([
                {
                    title: item.title,
                    description: item.description,
                    image_url: item.image,
                },
            ])
            .select('*')
            .single();

        if (error) {
            console.error('Erro ao adicionar item:', error.message);
            return;
        }

        // Adiciona o novo item ao estado
        setItems([
            ...items,
            {
                title: data.title,
                description: data.description,
                image: data.image_url,
            },
        ]);
        setShowForm(false);
    };

    return (
        <div className={styles.content}>
            <button
                className={styles.buttonAddItem}
                onClick={() => setShowForm(true)}
            >
                +
            </button>

            {showForm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button
                            className={styles.closeButton}
                            onClick={() => setShowForm(false)}
                        >
                            X
                        </button>
                        <Form onAddItem={addItem} />
                    </div>
                </div>
            )}

            <div className={styles.itemsContainer}>
                {items.map((item, index) => (
                    <BoxItem key={index} item={item} />
                ))}
            </div>
        </div>
    );
}
