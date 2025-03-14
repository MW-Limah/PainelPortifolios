import styles from './Navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                <Image
                    src={'/logoW.png'}
                    width={50}
                    height={50}
                    alt="minha logo versão branca"
                    className={styles.img}
                />
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
