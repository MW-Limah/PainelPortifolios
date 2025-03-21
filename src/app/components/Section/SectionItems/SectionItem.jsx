import styles from './SectionItem.module.css';
import Image from 'next/image';
export default function SectionItem() {
    return (
        <section className={styles.sectionItem}>
            <div className={styles.sectionHeader}>
                <h1>Serviços</h1>
            </div>
            <div className={styles.sectionContent}>
                <article className={styles.article}>
                    <Image className={styles.img} src={'/item1.png'} alt="item 1" width={300} height={300} />
                    <h2>Landing Page / Portifólios</h2>
                    <p>
                        Desenvolvimento de sites responsivos para sua empresa ou sites pessoais para você expor seus
                        projetos.
                    </p>
                </article>
                <article className={styles.article}>
                    <Image className={styles.img} src={'/item2.png'} alt="item 1" width={300} height={300} />
                    <h2>Backend</h2>
                    <p>
                        Integração do seu frontend com Banco de Dados, criação de APIs, integração com serviços
                        externos, documentação, etc
                    </p>
                </article>
                <article className={styles.article}>
                    <Image className={styles.img} src={'/item3.png'} alt="item 1" width={300} height={300} />
                    <h2>Automações com Python</h2>
                    <p>
                        Criação de bots para gerenciamento ou procesamento de dados. Se livre das tarefas repetitivas e
                        chatas!
                    </p>
                </article>
            </div>
        </section>
    );
}
