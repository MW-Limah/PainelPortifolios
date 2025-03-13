import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                MyWebsite
            </Link>
            <ul className={styles.navLinks}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/projects">Projetos</Link>
                </li>
                <li>
                    <Link href="/contact">Contato</Link>
                </li>
            </ul>
        </nav>
    );
}
