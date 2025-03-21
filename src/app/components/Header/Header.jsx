import BtnAbout from '@/app/components/buttons/ButtonAbout/BtnAbout';
import BtnContact from '@/app/components/buttons/ButtonContactme/BtnContact';
import Image from 'next/image';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <section className={styles.headerContentRight}>
                <div className={styles.txtHeader}>
                    <h1>Desenvolvimento de Software</h1>
                    <p>Por @Williams D'Lima</p>
                </div>
                <div className={styles.btnHeader}>
                    <BtnAbout />
                </div>
            </section>
        </header>
    );
};

export default Header;
