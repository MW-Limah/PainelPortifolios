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
                <ul>
                    <h3>MWLima Dev</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Asperiores maxime non perspiciatis cum? Quia esse
                        distinctio, asperiores incidunt inventore corrupti
                    </p>
                    <div className={styles.redesSociais}>
                        <FaWhatsappSquare className={styles.img} />
                        <FaGithubSquare className={styles.img} />
                        <FaLinkedin className={styles.img} />
                        <FaInstagramSquare className={styles.img} />
                    </div>
                </ul>
                <ul>
                    <h3>Link</h3>
                    <li>
                        <Link href={'#'}>Home</Link>
                    </li>
                    <li>
                        <Link href={'#'}>Sobre</Link>
                    </li>
                    <li>
                        <Link href={'#'}>Serviços</Link>
                    </li>
                    <li>
                        <Link href={'#'}>Preços</Link>
                    </li>
                </ul>
                <ul>
                    <h3>Suporte</h3>
                    <li>
                        <Link href={'#'}>FAQ</Link>
                    </li>
                    <li>
                        <Link href={'#'}>Como funciona?</Link>
                    </li>
                    <li>
                        <Link href={'#'}>Características</Link>
                    </li>
                    <li>
                        <Link href={'#'}>Contato</Link>
                    </li>
                </ul>
                <ul>
                    <h3>Entre em contato</h3>
                    <li>
                        <Link href={'#'}>+44 1234567890</Link>
                    </li>
                    <li>
                        <Link href={'#'}>email@gmail.com</Link>
                    </li>
                    <li>
                        <Link href={'#'}>Brasil</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
