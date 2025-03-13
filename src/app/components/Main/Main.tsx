'use client';

import { useEffect, useState } from 'react';
import styles from './Main.module.css';
import Form from '../Form/Form';
import BoxItem from '../Items/boxItem/BoxItem';

type ItemType = {
    id: string;
    title: string;
    description: string;
    image: string;
};

export default function Main() {
    const [items, setItems] = useState<ItemType[]>([]);
    const [showForm, setShowForm] = useState(false);

    // Buscar itens no banco ao carregar a página
    useEffect(() => {
        fetch('/api/items')
            .then((res) => res.json())
            .then((data) => {
                console.log('Itens recebidos:', data);
                if (Array.isArray(data)) {
                    setItems(data);
                } else {
                    console.error('Erro: resposta inesperada da API', data);
                }
            })
            .catch((err) => console.error('Erro ao buscar itens:', err));
    }, []);
    // Adiciona um novo item no banco
    const addItem = async (item: Omit<ItemType, 'id'>) => {
        const response = await fetch('/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
        const newItem = await response.json();
        setItems([newItem, ...items]);
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
                {items.map((item) => (
                    <BoxItem key={item.id || item.title} item={item} />
                ))}
            </div>
        </div>
    );
}
