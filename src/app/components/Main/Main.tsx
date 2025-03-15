'use client';

import { useState, useEffect } from 'react';
import styles from './Main.module.css';
import Form from '../Form/Form';
import BoxItem from '../Items/boxItem/BoxItem';
import { supabase } from 'supabaseClient';
import { TbSelect } from 'react-icons/tb';
import { AiOutlineClose } from 'react-icons/ai';

type DBItem = {
    id: string; // UUID como string
    title: string;
    description: string;
    image_url: string;
};

type ItemType = {
    id: string; // ✅ Garantir que id seja string
    title: string;
    description: string;
    image: string;
};
export default function Main() {
    const [items, setItems] = useState<ItemType[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState<ItemType | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);

    // 🔍 Busca itens do Supabase e atualiza o estado
    const fetchItems = async () => {
        console.log('🔄 Buscando itens do Supabase...');
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

        console.log('✅ Itens carregados:', formattedItems);
        setItems(formattedItems || []);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // 📝 Adiciona ou Atualiza um item no Supabase
    const addItem = async (item: ItemType) => {
        console.log(`🛠️ Operação em item ID: ${item.id || '(novo item)'}`);

        if (item.id) {
            // Editar item existente
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

            console.log(`✅ Item ${item.id} atualizado com sucesso!`);
        } else {
            // Adicionar novo item
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

            console.log(`✅ Novo item adicionado:`, data);
        }

        await fetchItems(); // Atualiza lista após edição/adição
        setEditItem(null);
        setShowForm(false);
    };

    // 🗑️ Remove um item do Supabase
    const deleteItem = async (id: string) => {
        console.log(`🗑️ Tentando remover item ID: ${id}`);

        const { error } = await supabase.from('items').delete().eq('id', id);

        if (error) {
            console.error('❌ Erro ao remover item:', error.message);
            return;
        }

        console.log(`✅ Item ${id} removido com sucesso!`);
        await fetchItems(); // Atualiza lista após remoção
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
                                        console.log(
                                            `✏️ Editando item ID: ${item.id}`
                                        );
                                        setEditItem(item);
                                        setShowForm(true);
                                    }}
                                >
                                    ✏️
                                </button>
                                <button
                                    className={styles.btnDelete}
                                    onClick={() => {
                                        console.log(
                                            `🗑️ Deletando item ID: ${item.id}`
                                        );
                                        deleteItem(item.id);
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
