import Image from 'next/image';
import style from './BoxItem.module.css';
import { marked } from 'marked';

type ItemType = {
    title: string;
    description: string;
    image: string; // Garantindo que seja uma string
};

const markdownToHtml = (text: string) => {
    const html = marked.parse(text) as string;
    return html.replace(/\n/g, '<br />');
};

export default function BoxItem({ item }: { item: ItemType }) {
    return (
        <div className={style.itemContent}>
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
