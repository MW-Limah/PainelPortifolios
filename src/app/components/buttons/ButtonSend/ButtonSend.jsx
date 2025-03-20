'use client';

import { useState } from 'react';
import styles from './ButtonSend.module.css';

export default function ButtonSend() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target.closest('form');
        const formData = new FormData(form);
        const data = {
            name: formData.get('Nome'),
            email: formData.get('E-mail'),
            subject: formData.get('Assunto'),
            message: formData.get('Mensagem'),
        };

        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('E-mail enviado com sucesso!');
                form.reset();
            } else {
                alert('Erro ao enviar o e-mail.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao enviar o e-mail. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button className={styles.btnSend} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
        </button>
    );
}
