import { useEffect, useMemo, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { baseServerURL, noImageUrl } from '../../../config';
import { ProductsSliceType } from '../../../store/slices/productSlice/productSlice';
import getOneProduct from '../../../store/slices/productSlice/thunk/getOneProduct';
import { changeInShoppingCart } from '../../../store/slices/userSlice/userSlice';
import { AppDispatch, RootState } from '../../../store/store';
import truncateToTwoDecimal from '../../../utils/truncateToTwoDecimal';
import Errors from '../../commonComponents/Errors/Errors';
import Loading from '../../commonComponents/Loading/Loading';
import styles from './ProductInfo.module.css';

const ProductInfo = () => {
    const [count, setCount] = useState<number>(1);
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const {item, loading, errors} = useSelector<RootState>(state => state.products) as ProductsSliceType;

    const total = useMemo<number>(() => {
        return truncateToTwoDecimal(count * item.price);
    }, [count, item.price]);

    useEffect(() => {
        dispatch(getOneProduct(id!));
    }, []);

    const incrementProductQuantity = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setCount(count + 1);
    }

    const decrementProductQuantity = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (count - 1 >= 1)
            setCount(count - 1);
    }

    const addToCard = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(changeInShoppingCart({
            product: item,
            quantity: count
        }));
    }

    return (
        <div className={styles.container}>
            {loading 
                ?   <Loading/>
                :   errors.length === 0 
                        ?   Object.keys(item).length === 0
                            ?<></>
                            :<div className={styles.item}>
                                <div className={styles.icon}>
                                    <img
                                        src={item.imgUrl ? item.imgUrl : noImageUrl}
                                        alt={'Product'}
                                        onError={({currentTarget}) => {
                                            currentTarget.src = noImageUrl;
                                            currentTarget.onerror = null;
                                        }}
                                    />
                                </div>
                                <div className={styles.body}>
                                    <h1 className={styles.title}>{item.title}</h1>
                                    <h3>weight: {item.weight}g</h3>
                                    <h3>height: {item.height}mm</h3>
                                    <ul className={styles.needs}>
                                        <h3>needs:</h3>
                                        <li className={styles.needs__item}>
                                            <h3 className={styles['needs__item-title']}>water: </h3>
                                            <div className={styles['needs__item-base'] + 
                                                ' ' + 
                                                styles['needs-' + item.needs.water]}>
                                                {item.needs 
                                                    ?   item.needs.water 
                                                        ?   item.needs.water
                                                        :   'none'
                                                    :   'none'
                                                }
                                            </div>
                                        </li>
                                        <li className={styles.needs__item}>
                                            <h3 className={styles['needs__item-title']}>soil: </h3>
                                            <div className={styles['needs__item-base'] + 
                                                ' ' + 
                                                styles['needs-' + item.needs.soil]}>
                                                {item.needs 
                                                    ?   item.needs.soil 
                                                        ?   item.needs.soil
                                                        :   'none'
                                                    :   'none'
                                                }
                                            </div>
                                        </li>
                                        <li className={styles.needs__item}>
                                            <h3 className={styles['needs__item-title']}>sun: </h3>
                                            <div className={styles['needs__item-base'] + 
                                                ' ' + 
                                                styles['needs-' + item.needs.sun]}>
                                                {item.needs 
                                                    ?   item.needs.sun 
                                                        ?   item.needs.sun
                                                        :   'none'
                                                    :   'none'
                                                }
                                            </div>
                                        </li>
                                    </ul>
                                    <div className={styles.computation}>
                                        <div className={styles['total-cost']}>total: <span>{total}$</span></div>
                                        <div className={styles.computation__quantity}>
                                            <div onClick={decrementProductQuantity} className={styles.quantity__btn}>-</div>
                                            <div>{count}</div>
                                            <div onClick={incrementProductQuantity} className={styles.quantity__btn}>+</div>
                                        </div>
                                        <div onClick={addToCard} className={styles.addToCardBtn}>Add to card</div>
                                    </div>
                                </div>
                                <div className={styles.footer}>
                                    <div className={styles['description-title']}>About this plant</div>
                                    <div className={styles.description}>{item.description}</div>
                                </div>
                            </div>   
                        :   <Errors errors={errors}/>
            }
        </div>
    );
}
 
export default ProductInfo;