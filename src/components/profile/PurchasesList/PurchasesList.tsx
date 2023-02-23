import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPurchases from "../../../store/slices/userSlice/thunk/getPurchases";
import { UserSliceType } from "../../../store/slices/userSlice/userSlice";
import { AppDispatch, RootState } from "../../../store/store";
import Loading from "../../commonComponents/Loading/Loading";
import PurchasesListItem from "../PurchasesListItem/PurchasesListItem";
import styles from './PurchasesList.module.css';

const PurchasesList = () => {
    const user = useSelector<RootState>(state => state.user) as UserSliceType;
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getPurchases());
    }, []);

    return (
        <>
            {user.loading
                ?   <Loading/>
                :   <ul className={styles.list}>
                        {!user.info.purchases || user.info.purchases.length === 0
                            ?   <h2>List is Empty</h2>
                            :   user.info.purchases.map((product) => 
                                    <PurchasesListItem key={product.id} product={product}/>  
                                )
                        }
                    </ul>
            }
        </>
    );
}
 
export default PurchasesList;