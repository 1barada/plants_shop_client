import { useEffect, useMemo, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import purchase from "../../../store/slices/userSlice/thunk/purchase";
import { getShoppingCart, UserSliceType } from "../../../store/slices/userSlice/userSlice";
import { AppDispatch, RootState } from "../../../store/store";
import truncateToTwoDecimal from "../../../utils/truncateToTwoDecimal";
import Loading from "../../commonComponents/Loading/Loading";
import ShoppingCartListItem from "../ShoppingCartListItem/ShoppingCartListItem";
import styles from './ShoppingCartList.module.css';

const ShoppingCartList = () => {
    const user = useSelector<RootState>(state => state.user) as UserSliceType;
    const dispatch = useDispatch<AppDispatch>();

    const totalCost = useMemo<number>(() => {
        return truncateToTwoDecimal(user.info.shoppingCart
            .map(productQuantity => productQuantity.product.price * productQuantity.quantity)
            .reduce((prev, curr) => {return prev + curr}, 0));
    }, [user.info.shoppingCart]);

    const totalItems = useMemo<number>(() => {
        return truncateToTwoDecimal(user.info.shoppingCart
            .map(product => product.quantity)
            .reduce((prev, curr) => {return prev + curr}, 0));
    }, [user.info.shoppingCart]);

    useEffect(() => {
        dispatch(getShoppingCart());
    }, [dispatch]);

    const purchaseHandler = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(purchase());
    }

    return (
        <>
            {user.loading
                ?   <Loading/>
                :   <>
                        <div className={styles.list__computation}>
                            <div className={styles['computation__total-cost']}>total cost: <span>{totalCost}$</span></div>
                            <div className={styles['computation__total-items']}>total items: {totalItems}</div>
                            <div 
                                className={styles.computation__purchase}
                                onClick={purchaseHandler}
                            >
                                Purchase
                            </div>
                        </div>
                        <ul className={styles.list}>
                            {!user.info.shoppingCart || user.info.shoppingCart.length === 0
                                ?   <h2 className={styles['empty-list']}>List is Empty</h2>
                                :   user.info.shoppingCart.map((productQuantity) => 
                                        <ShoppingCartListItem key={productQuantity.product.id} productQuantity={productQuantity}/>  
                                    )
                            }
                        </ul>
                    </>
            }
        </>
    );
}
 
export default ShoppingCartList;