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
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        // Verificação de campos vazios
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Por favor, preencha todos os campos antes de enviar.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert(
                    'E-mail enviado com sucesso! Obrigado por entrar em contato. Irei responder em breve, não esqueça de verificar a caixa de spam.'
                );
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
