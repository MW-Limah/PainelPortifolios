'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { FaBars } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

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

    const scrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            const offset = -100; // Ajuste fino, negativo sobe mais
            const top = projectsSection.getBoundingClientRect().top + window.scrollY + offset;

            window.scrollTo({
                top: top,
                behavior: 'smooth', // Deve funcionar no Chrome, Firefox e Edge
            });
        }
    };

    return (
        <nav className={styles.navbar}>
            {/* Logo */}
            <div className={styles.logoContainer}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src={'/favicon.png'}
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
                    <li className={styles.li}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={styles.li}>
                        <a href="#projects" onClick={scrollToProjects}>
                            Projetos
                        </a>
                    </li>
                    <li className={styles.li}>
                        <Link href="/contact">Contato</Link>
                    </li>
                </ul>
            </div>

            {/* Botão FaBars */}
            <div className={styles.menuBtn} onClick={toggleMenu}>
                {isActive ? <IoCloseSharp /> : <FaBars style={{ color: 'black' }} />}
            </div>
        </nav>
    );
}
