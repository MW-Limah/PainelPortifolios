'use client';

import { useState, useEffect } from 'react';
import styles from './Main.module.css';
import Form from '../Form/Form';
import BoxItem from '../Items/boxItem/BoxItem';
import { supabase } from 'supabaseClient';
import { TbSelect } from 'react-icons/tb';
import { AiOutlineClose } from 'react-icons/ai';

// Tipo para o Supabase (banco)
type DBItem = {
    id: number;
    title: string;
    description: string;
    image_url: string;
};

// Tipo para o Frontend (componentes)
type ItemType = {
    id: number;
    title: string;
    description: string;
    image: string;
};

export default function Main() {
    const [items, setItems] = useState<ItemType[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState<ItemType | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);

    // Carrega os itens do Supabase ao iniciar
    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase.from('items').select('*');
            if (error) {
                console.error('Erro ao buscar itens:', error.message);
                return;
            }

            const formattedItems = data?.map((item: DBItem) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                image: item.image_url,
            }));

            setItems(formattedItems || []);
        };

        fetchItems();
    }, []);

    // Adiciona ou atualiza item no Supabase e atualiza a lista local
    const addItem = async (item: ItemType) => {
        if (editItem) {
            const { error } = await supabase
                .from('items')
                .update({
                    title: item.title,
                    description: item.description,
                    image_url: item.image,
                })
                .eq('id', editItem.id);

            if (error) {
                console.error('Erro ao editar item:', error.message);
                return;
            }

            setItems((prevItems) =>
                prevItems.map((i) => (i.id === editItem.id ? item : i))
            );
            setEditItem(null);
        } else {
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

            const newItem: ItemType = {
                id: data.id,
                title: data.title,
                description: data.description,
                image: data.image_url,
            };

            setItems((prevItems) => [...prevItems, newItem]);
        }

        setShowForm(false);
    };

    // Remove item
    const deleteItem = async (id: number) => {
        const { error } = await supabase.from('items').delete().eq('id', id);
        if (error) {
            console.error('Erro ao remover item:', error.message);
            return;
        }
        setItems((prevItems) => prevItems.filter((i) => i.id !== id));
    };

    return (
        <div className={styles.content}>
            <div className={styles.buttonContainer}>
                <button
                    className={styles.buttonAddItem}
                    onClick={() => setShowForm(true)}
                >
                    +
                </button>
                <button
                    className={styles.buttonSelectMode}
                    onClick={() => setIsSelecting(!isSelecting)}
                >
                    <div className={styles.buttonSelectMode} style={{}}>
                        <TbSelect
                            className={`${styles.iconTransition} ${
                                isSelecting ? styles.iconHidden : ''
                            }`}
                            style={{
                                position: 'absolute',
                                transition:
                                    'transform 0.2s ease, opacity 0.2s ease',
                            }}
                        />
                        <AiOutlineClose
                            className={`${styles.iconTransition} ${
                                !isSelecting ? styles.iconHidden : ''
                            }`}
                            style={{
                                position: 'absolute',
                                transition:
                                    'transform 0.2s ease, opacity 0.2s ease',
                            }}
                        />
                    </div>
                </button>
            </div>

            {showForm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button
                            className={styles.closeButton}
                            onClick={() => {
                                setShowForm(false);
                                setEditItem(null);
                            }}
                        >
                            X
                        </button>
                        <Form
                            onAddItem={addItem}
                            editItem={editItem ?? undefined}
                        />
                    </div>
                </div>
            )}

            <div className={styles.itemsContainer}>
                {items.map((item) => (
                    <div key={item.id} className={styles.itemWrapper}>
                        <BoxItem item={item} />
                        {isSelecting && (
                            <div className={styles.actionButtons}>
                                <button
                                    className={styles.btnEdit}
                                    onClick={() => {
                                        setEditItem(item);
                                        setShowForm(true);
                                    }}
                                >
                                    ✏️
                                </button>
                                <button
                                    className={styles.btnDelete}
                                    onClick={() => deleteItem(item.id)}
                                >
                                    🗑️
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
