import Image from 'next/image';
import style from './BoxItem.module.css';
import { marked } from 'marked';
import BtnVisit from '@/app/components/buttons/ButtonVisit/ButtonVisit';

type ItemType = {
    title: string;
    description: string;
    image: string; // Garantindo que seja uma string
};

const markdownToHtml = (text: string) => {
    const html = marked.parse(text) as string;
    return html.replace(/\n/g, '<br />');
};

// Função para transformar links em <a> clicáveis
const parseLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
};

export default function BoxItem({ item }: { item: ItemType }) {
    return (
        <div id="projects" className={style.itemContent}>
            <div className={style.itemTexts}>
                <h3 className={style.itemTitle}>{item.title}</h3>
                <div className={style.itemDescription}>
                    <div
                        className={style.itemP}
                        dangerouslySetInnerHTML={{
                            __html: markdownToHtml(item.description),
                        }}
                    />
                </div>
            </div>
            <div className={style.imgBox}>
                {item.image && (
                    <Image
                        src={item.image}
                        alt={item.title}
                        width={1000} // Ajuste conforme necessário
                        height={200} // Ajuste conforme necessário
                        layout="intrinsic"
                    />
                )}
            </div>
        </div>
    );
}
