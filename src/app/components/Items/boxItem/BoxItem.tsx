import Image from 'next/image';
import style from './BoxItem.module.css';

type ItemType = {
    title: string;
    description: string;
    image: string; // Garantindo que seja uma string
};

export default function BoxItem({ item }: { item: ItemType }) {
    return (
        <div className={style.itemContent}>
            <div className={style.itemTexts}>
                <h3 className={style.itemTitle}>{item.title}</h3>
                <div className={style.itemDescription}>
                    <p className={style.itemP}>{item.description}</p>
                </div>
            </div>
            {item.image && (
                <Image
                    src={item.image}
                    alt={item.title}
                    width={672} // Ajuste conforme necessário
                    height={200} // Ajuste conforme necessário
                    layout="intrinsic"
                />
            )}
        </div>
    );
}
