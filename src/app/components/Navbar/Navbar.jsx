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
                <div className={styles.logoContainer}>
                    <Link href="/" className={styles.logo}>
                        <Image
                            src={'/logoW.png'}
                            width={80}
                            height={80}
                            alt="minha logo versão branca"
                            className={styles.img}
                        />
                    </Link>
                </div>

                {/* Menu - Centralizado */}
                <div className={styles.menuContainer}>
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
                </div>

                {/* Botão Mobile */}
                <div className={styles.menuBtn} onClick={toggleMenu}>
                    {isActive ? 'X' : <FaBars style={{ color: 'white' }} />}
                </div>
            </div>
        </nav>
    );
}
