import styles from './ConfirmDelete.module.css';

interface ConfirmDeleteProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDelete({
    onConfirm,
    onCancel,
}: ConfirmDeleteProps) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>Tem certeza que deseja deletar?</h3>
                <div className={styles.buttons}>
                    <button className={styles.cancel} onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className={styles.confirm} onClick={onConfirm}>
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    );
}
