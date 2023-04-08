import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { baseServerURL, noImageUrl } from "../../../config";
import IProduct from "../../../models/IProduct";
import { changeInShoppingCart } from "../../../store/slices/userSlice/userSlice";
import { AppDispatch } from "../../../store/store";
import styles from './ProductGridItem.module.css';

const ProductGridItem = ({product}: {product: IProduct}) => {
    const dispatch = useDispatch<AppDispatch>();

    const addToCard = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(changeInShoppingCart({
            product,
            quantity: 1
        }));
    }
    
    return (
        <Link to={`/product/${product.id}`} className={styles.item}>
            <div className={styles.icon}>
                <img
                    src={product.imgUrl ? product.imgUrl : noImageUrl}
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
                {product.isInShoppingCart 
                    ?   <h4 className={styles.isInCard}>already in cart</h4>
                    :   <div onClick={addToCard} className={styles.addToCardBtn}>Add to card</div>
                }
            </div>
        </Link>
    );
}
 
export default ProductGridItem;