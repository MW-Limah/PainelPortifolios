'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    // Fecha o menu ao clicar fora dele
    useEffect(() => {
        const closeMenu = (e) => {
            if (isActive && !e.target.closest(`.${styles.navbarContent}`)) {
                setIsActive(false);
            }
        };

        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [isActive]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContent}>
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

                {/* Menu */}
                <div className={styles.menuContainer}>
                    <ul className={`${styles.menu} ${isActive ? styles.active : ''}`} id="menuSite">
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

                {/* Botão FaBars */}
                <div className={styles.menuBtn} onClick={toggleMenu}>
                    {isActive ? 'X' : <FaBars style={{ color: 'white' }} />}
                </div>
            </div>
        </nav>
    );
}
