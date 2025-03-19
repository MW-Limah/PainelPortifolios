import Link from 'next/link';
import styles from './btnContact.module.css';

export default function btnContact() {
    return (
        <button className={styles.btnContact}>
            <Link href="/contact">Entre em contato!</Link>
        </button>
    );
}
