'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.maxWidth}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <Image
                        src={'/logoW.png'}
                        width={50}
                        height={50}
                        alt="minha logo versão branca"
                        className={styles.img}
                    />
                </Link>

                {/* Menu */}
                <ul
                    className={`${styles.menu} ${
                        isActive ? styles.active : ''
                    }`}
                    id="menuSite"
                >
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

                {/* Botão Mobile */}
                <div className={styles.menuBtn} onClick={toggleMenu}>
                    {isActive ? <FaTimes /> : <FaBars />}
                </div>
            </div>
        </nav>
    );
}
