import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { noImageUrl } from "../../../config";
import IProduct from "../../../models/IProduct";
import removeFromShoppingCart from "../../../store/slices/userSlice/thunk/removeFromShoppingCartAndThenGet";
import { AppDispatch } from "../../../store/store";
import styles from './ProductListItem.module.css';


const ProductListItem = ({product}: {product: IProduct}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {pathname} = useLocation();

    const removeFromCard = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(removeFromShoppingCart(product));
    }

    return (
        <Link to='' className={styles.item}>
            <div className={styles.item__info}>
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
            </div>
            <div className={styles.footer}>
                <div className={styles.price}><span>{product.price}$</span></div>
                {pathname === '/profile/shoppingCart' &&
                    <div onClick={removeFromCard} className={styles.removeFromCardBtn}>
                        Remove from card
                    </div>
                }
            </div>
        </Link>
    );
}
 
export default ProductListItem;