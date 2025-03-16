import styles from './Footer.module.css';
import Link from 'next/link';
import { FaWhatsappSquare } from 'react-icons/fa';
import { FaGithubSquare } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <ul className={styles.fstBox}>
                    <h3>MWLima Dev</h3>
                    <p>
                        Sou um desenvolvedor independente com a aspiração ao crescimento contínuo e a busca pela
                        excelência em cada projeto.
                    </p>
                </ul>
                <ul>
                    <h3>Link</h3>
                    <li>
                        <Link href={'#'} target="_blank">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href={'#'} target="_blank">
                            Sobre
                        </Link>
                    </li>
                    <li>
                        <Link href={'#'} target="_blank">
                            Serviços
                        </Link>
                    </li>
                    <li>
                        <Link href={'#'} target="_blank">
                            Preços
                        </Link>
                    </li>
                </ul>
                <ul>
                    <h3>Suporte</h3>
                    <li>
                        <Link href={'#'} target="_blank">
                            FAQ
                        </Link>
                    </li>
                    <li>
                        <Link href={'#'} target="_blank">
                            Como funciona?
                        </Link>
                    </li>
                    <li>
                        <Link href={'#'} target="_blank">
                            Características
                        </Link>
                    </li>
                    <li>
                        <Link href={'#'} target="_blank">
                            Contato
                        </Link>
                    </li>
                </ul>
                <ul>
                    <h3>Entre em contato</h3>
                    <li>+44 1234567890</li>
                    <li>mwlima.dev@gmail.com</li>
                    <li>Endereço</li>
                    <div className={styles.redesSociais}>
                        <Link href={'#'} target="_blank">
                            <FaWhatsappSquare className={styles.img} />
                        </Link>
                        <Link href={'https://github.com/MW-Limah'} target="_blank">
                            <FaGithubSquare className={styles.img} />
                        </Link>
                        <Link
                            href={'https://www.linkedin.com/in/mauricio-de-lima-b20251347/?locale=en_US'}
                            target="_blank"
                        >
                            <FaLinkedin className={styles.img} />
                        </Link>
                        <Link href={'https://www.instagram.com/mwlima.dev/'} target="_blank">
                            <FaInstagramSquare className={styles.img} />
                        </Link>
                    </div>
                </ul>
            </div>
        </footer>
    );
}
