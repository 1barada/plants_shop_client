import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {  noImageUrl } from "../../../config";
import IProduct from "../../../models/IProduct";
import { changeInShoppingCart } from "../../../store/slices/userSlice/userSlice";
import { AppDispatch, RootState } from "../../../store/store";
import styles from './ProductGridItem.module.css';

const ProductGridItem = ({product}: {product: IProduct}) => {
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector<RootState, boolean>(state => state.user.authorized);
    const navigate = useNavigate();

    const addToCard = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (auth) {
            dispatch(changeInShoppingCart({
                product,
                quantity: 1
            }));
        } else {
            navigate('/login');
        }
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
                <div onClick={addToCard} className={styles.addToCardBtn}>Add to card</div>
            </div>
        </Link>
    );
}
 
export default ProductGridItem;