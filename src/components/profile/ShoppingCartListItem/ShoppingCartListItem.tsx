import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { noImageUrl } from '../../../config';
import IProductQuantity from '../../../models/IProductQuantity';
import { changeInShoppingCart, removeFromShoppingCart } from '../../../store/slices/userSlice/userSlice';
import { AppDispatch } from '../../../store/store';
import styles from './ShoppingCartListItem.module.css';

interface ShoppingCartListItemProps {
    productQuantity: IProductQuantity
}

const ShoppingCartListItem = ({productQuantity}: ShoppingCartListItemProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const removeFromCard = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(removeFromShoppingCart(productQuantity.product.id));
    }

    const incrementProductQuantity = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(changeInShoppingCart({
            product: productQuantity.product,
            quantity: 1
        }));
    }

    const decrementProductQuantity = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(changeInShoppingCart({
            product: productQuantity.product,
            quantity: -1
        }));
    }

    return (
        <Link to='' className={styles.item}>
            <div className={styles.icon}>
                <img
                    src={productQuantity.product.imageUrl || ''}
                    alt={'Product'}
                    onError={({currentTarget}) => {
                        currentTarget.src = noImageUrl;
                        currentTarget.onerror = null;
                    }}
                />
            </div>
            <div className={styles.item__info}>
                <div className={styles.body}>
                    <h5 className={styles.title}>{productQuantity.product.title}</h5>
                    <div className={styles.description}>
                        {productQuantity.product.description}
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.price}><span>{productQuantity.product.price}$</span></div>
                    <div className={styles.item__controller}>
                        <div className={styles.item__quantity}>
                            <div onClick={decrementProductQuantity} className={styles.quantity__btn}>-</div>
                            <div>{productQuantity.quantity}</div>
                            <div onClick={incrementProductQuantity} className={styles.quantity__btn}>+</div>
                        </div>
                        <div onClick={removeFromCard} className={styles.removeFromCardBtn}>
                            Remove from card
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
 
export default ShoppingCartListItem;