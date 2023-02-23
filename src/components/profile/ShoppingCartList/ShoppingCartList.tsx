import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShoppingCart, UserSliceType } from "../../../store/slices/userSlice/userSlice";
import { AppDispatch, RootState } from "../../../store/store";
import Loading from "../../commonComponents/Loading/Loading";
import ShoppingCartListItem from "../ShoppingCartListItem/ShoppingCartListItem";
import styles from './ShoppingCartList.module.css';

const ShoppingCartList = () => {
    const user = useSelector<RootState>(state => state.user) as UserSliceType;
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getShoppingCart());
    }, [dispatch]);

    return (
        <>
            {user.loading
                ?   <Loading/>
                :   <ul className={styles.list}>
                        {!user.info.shoppingCart || user.info.shoppingCart.length === 0
                            ?   <h2>List is Empty</h2>
                            :   user.info.shoppingCart.map((product) => 
                                    <ShoppingCartListItem key={product.id} product={product}/>  
                                )
                        }
                    </ul>
            }
        </>
    );
}
 
export default ShoppingCartList;