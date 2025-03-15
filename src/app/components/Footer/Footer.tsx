import styles from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsappSquare } from 'react-icons/fa';
import { FaGithubSquare } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <section className={styles.leftSide}>
                <Image
                    src="/logoW.png"
                    width={180}
                    height={180}
                    alt="minha logo"
                ></Image>
            </section>
            <section className={styles.rightSide}>
                <h1 className={styles.titleFooter}>
                    MEU PAINEL DE PORTIFÓLIOS
                </h1>
                <div className={styles.contentFooter}>
                    <div className={styles.boxFooter}>
                        <h4>Me conheça</h4>
                        <Link href={'#'}>Quem sou eu?</Link>
                        <Link href={'#'}>Context</Link>
                        <Link href={'#'}>Contate-me</Link>
                    </div>
                    <div className={styles.boxFooter}>
                        <h4>Outros projetos</h4>
                        <Link
                            href={' https://mw-limah.github.io/NewTo-doList/'}
                            target="_blank"
                        >
                            Lista de Tarefas - CRUD
                        </Link>
                        <Link href={'#'}>PolyTraduz</Link>
                        <Link href={'#'}>Automatizações com Python</Link>
                    </div>

                    <div className={styles.boxFooter}></div>
                </div>
                <div className={styles.bottomFooter}>
                    <div className={styles.boxFooterCopy}>
                        &copy; Copyright 2025 | Desenvolvido por{' '}
                        <strong>@MW-Limah</strong>
                    </div>
                    <div className={styles.boxFooterCopy}>
                        <div className={styles.Links}>
                            <Link href={'https://webportifolio.onrender.com'}>
                                <FaInstagramSquare />
                            </Link>
                            <FaGithubSquare />
                            <FaLinkedin />
                            <FaWhatsappSquare />
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
}
