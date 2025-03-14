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

    // Função para buscar itens do Supabase (para reutilizar após add/edit/delete)
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

    // Busca itens ao iniciar
    useEffect(() => {
        fetchItems();
    }, []);

    const addItem = async (item: ItemType) => {
        if (item.id) {
            // Atualiza item no Supabase
            const { data, error } = await supabase
                .from('items')
                .update({
                    title: item.title,
                    description: item.description,
                    image_url: item.image,
                })
                .eq('id', item.id);

            if (error) {
                console.error('Erro no Supabase:', error.message);
            } else {
                console.log('Item atualizado no banco:', data);
            }
        } else {
            // Adiciona item novo no Supabase
            const { error } = await supabase.from('items').insert([
                {
                    title: item.title,
                    description: item.description,
                    image_url: item.image,
                },
            ]);

            if (error) {
                console.error('Erro ao adicionar item:', error.message);
                return;
            }
        }

        // Recarrega a lista após adicionar ou editar
        await fetchItems();
        setEditItem(null);
        setShowForm(false);
        console.log('Enviando para o banco:', item);
    };

    // Remove item do Supabase e recarrega a lista local
    const deleteItem = async (id: number) => {
        const { error } = await supabase.from('items').delete().eq('id', id);
        if (error) {
            console.error('Erro ao remover item:', error.message);
            return;
        }

        // Recarrega a lista após a remoção
        await fetchItems();
        console.log('Deletando item:', id);
    };

    return (
        <div className={styles.content}>
            {/* Botões principais */}
            <div className={styles.buttonContainer}>
                {/* Botão Adicionar */}
                <button
                    className={styles.buttonAddItem}
                    onClick={() => {
                        setShowForm(true);
                        setEditItem(null);
                    }}
                >
                    +
                </button>

                {/* Botão Modo de Seleção */}
                <button
                    className={styles.buttonSelectMode}
                    onClick={() => setIsSelecting(!isSelecting)}
                >
                    <div
                        style={{
                            position: 'relative',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {isSelecting ? (
                            <AiOutlineClose
                                style={{
                                    transition:
                                        'transform 0.2s ease, opacity 0.2s ease',
                                }}
                            />
                        ) : (
                            <TbSelect
                                style={{
                                    transition:
                                        'transform 0.2s ease, opacity 0.2s ease',
                                }}
                            />
                        )}
                    </div>
                </button>
            </div>

            {/* Formulário de Adição/Edição */}
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

            {/* Lista de Itens */}
            <div className={styles.itemsContainer}>
                {items.map((item) => (
                    <div key={item.id} className={styles.itemWrapper}>
                        {/* Exibe o BoxItem */}
                        <BoxItem item={item} />

                        {/* Botões de Editar/Remover no modo de seleção */}
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
