'use client';

import { useState, useEffect } from 'react';
import styles from './Main.module.css';
import Form from '../Form/Form';
import BoxItem from '../Items/boxItem/BoxItem';
import ConfirmDelete from '../PopUps/ConfirmDelete/ConfirmDelete';
import { supabase } from 'supabaseClient';
import { TbSelect } from 'react-icons/tb';
import { AiOutlineClose } from 'react-icons/ai';
import DevTool from '@/app/components/DevTool/DevTool';

type DBItem = {
    id: string;
    title: string;
    description: string;
    image_url: string;
};

type ItemType = {
    id: string;
    title: string;
    description: string;
    image: string;
};

export default function Main() {
    const [items, setItems] = useState<ItemType[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState<ItemType | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const fetchItems = async () => {
        const { data, error } = await supabase.from('items').select('*');
        if (error) {
            console.error('❌ Erro ao buscar itens:', error.message);
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

    useEffect(() => {
        fetchItems();
    }, []);

    const addItem = async (item: ItemType) => {
        if (item.id) {
            const { error } = await supabase
                .from('items')
                .update({
                    title: item.title,
                    description: item.description,
                    image_url: item.image,
                })
                .eq('id', item.id);
            if (error) {
                console.error('❌ Erro ao editar item:', error.message);
                return;
            }
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
                console.error('❌ Erro ao adicionar item:', error.message);
                return;
            }
        }
        await fetchItems();
        setEditItem(null);
        setShowForm(false);
    };

    const deleteItem = async (id: string) => {
        const { error } = await supabase.from('items').delete().eq('id', id);
        if (error) {
            console.error('❌ Erro ao remover item:', error.message);
            return;
        }
        await fetchItems();
    };

    return (
        <div className={styles.content}>
            <DevTool
                isSelecting={isSelecting}
                setIsSelecting={setIsSelecting}
                setShowForm={setShowForm}
                setEditItem={setEditItem}
            />

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
                        <Form onAddItem={addItem} editItem={editItem ?? undefined} />
                    </div>
                </div>
            )}

            {showConfirm && (
                <ConfirmDelete
                    onConfirm={() => {
                        if (itemToDelete) deleteItem(itemToDelete);
                        setShowConfirm(false);
                    }}
                    onCancel={() => setShowConfirm(false)}
                />
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
                                    onClick={() => {
                                        setItemToDelete(item.id);
                                        setShowConfirm(true);
                                    }}
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
