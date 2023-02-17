import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { noImageUrl } from "../../../config";
import IProduct from "../../../models/IProduct";
import styles from './ProductGridItem.module.css';

const ProductGridItem = ({product}: {product: IProduct}) => {
    const addToCard = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <Link to='' className={styles.item}>
            <div className={styles.icon}>
                <img
                    src={product.imageUrl ? product.imageUrl : ''}
                    alt={'Product'}
                    onError={({currentTarget}) => {
                        currentTarget.src = noImageUrl;
                        currentTarget.onerror = null;
                    }}
                />
            </div>
            <div className={styles.body}>
                <h5 className={styles.title}>{product.title}</h5>
                <div className={styles.description}>
                    {product.description}
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.price}><span>{product.price}$</span></div>
                <div onClick={addToCard} className={styles.addToCardBtn}>Add to card</div>
            </div>
        </Link>
    );
}
 
export default ProductGridItem;