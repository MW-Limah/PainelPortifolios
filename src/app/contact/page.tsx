import Navbar from '@/app/components/Navbar/Navbar';
import styles from './page.module.css';
import ButtonSend from '@/app/components/buttons/ButtonSend/ButtonSend';
import { RiWhatsappFill } from 'react-icons/ri';
import { AiFillInstagram } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.leftContent}>
                    <div className={styles.textLeft}>
                        <h1>Vamos trabalhar juntos?</h1>
                        <div className={styles.pLeft}>
                            {/*  <p>
                                <RiWhatsappFill /> +44 7386-797717
                            </p> */}
                            <p>
                                <MdEmail /> mwlima.dev@gmail.com
                            </p>
                            <p>
                                <AiFillInstagram /> mwlima.dev
                            </p>
                        </div>
                    </div>
                    <div className={styles.textLeftB}>
                        <strong>Desenvolvimento WEB | Programação em Python | Automações | Web Design </strong>
                    </div>
                </div>
                <div className={styles.rightContent}>
                    <form className={styles.formulario} action="">
                        <h1>Entre em contato</h1>
                        <input type="text" name="name" placeholder="Seu nome" />
                        <input type="text" name="email" placeholder="Em qual e-mail posso responder?" />
                        <input type="text" name="subject" placeholder="Assunto" />
                        <h6>Me fale sobre sua ideia</h6>
                        <input type="text" name="message" placeholder="Mensagem" />
                        <ButtonSend />
                    </form>
                </div>
            </div>
        </>
    );
}
