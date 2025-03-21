import BtnAbout from '@/app/components/buttons/ButtonAbout/BtnAbout';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.txtHeader}>
                <h1>Desenvolvimento de Software</h1>
                <p>Por @Williams D'Lima</p>
            </div>
            <div className={styles.btnHeader}>
                <BtnAbout />
            </div>
        </header>
    );
};

export default Header;
