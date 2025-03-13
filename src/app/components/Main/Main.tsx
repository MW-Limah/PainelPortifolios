'use client';

import { useState } from 'react';
import styles from './Main.module.css';
import Form from '../Form/Form';
import BoxItem from '../Items/boxItem/BoxItem';

// Definição do tipo para os itens
type ItemType = {
    title: string;
    description: string;
    image: string; // Agora aceita somente string (URL da imagem)
};

export default function Main() {
    // Inicializando o estado com um array do tipo ItemType
    const [items, setItems] = useState<ItemType[]>([]);
    const [showForm, setShowForm] = useState(false);

    const addItem = (item: ItemType) => {
        setItems([...items, item]);
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
