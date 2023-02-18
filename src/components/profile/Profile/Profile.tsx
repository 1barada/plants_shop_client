import { useEffect, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import getPurchases from '../../../store/slices/userSlice/thunk/getPurchases';
import getShoppingCart from '../../../store/slices/userSlice/thunk/getShoppingCart';
import { UserSliceType } from '../../../store/slices/userSlice/userSlice';
import { AppDispatch, RootState } from '../../../store/store';
import Loading from '../../commonComponents/Loading/Loading';
import ProductsList from '../../product/ProductList/ProductsList';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import ProfileMenuOption from '../ProfileMenuOption/ProfileMenuOption';
import styles from './Profile.module.css';

const Profile = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const user = useSelector<RootState>(state => state.user) as UserSliceType;
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getShoppingCart());
    }, [dispatch]); 

    const profileInfoMenuHandler = (e: MouseEvent<HTMLDivElement>) => {
        navigate('/profile/info')
    };

    const shoopingCartMenuHandler = (e: MouseEvent<HTMLDivElement>) => {
        navigate('/profile/shoppingCart')
        dispatch(getShoppingCart());
    };

    const purchasesMenuHandler = (e: MouseEvent<HTMLDivElement>) => {
        navigate('/profile/purchases')
        dispatch(getPurchases());
    };

    return (
        <div className={styles.profile}>
            <div className={styles.profile__avatar}>
                <ProfileAvatar size={200}/> 
            </div>
            <div className={styles.profile__menu}>
                <ProfileMenuOption title='Profile info' to='/profile/info' onClick={profileInfoMenuHandler}/>
                <ProfileMenuOption title='Shopping cart' to='/profile/shoppingCart' onClick={shoopingCartMenuHandler}/>
                <ProfileMenuOption title='Purchases' to='/profile/purchases' onClick={purchasesMenuHandler}/>
            </div>
            <div className={styles.profile__body}>
                {user.loading
                    ?   <Loading/>   
                    :   pathname === 'profile/info'
                            ?   <ProfileInfo/>
                        :pathname === '/profile/shoppingCart'
                            ?   <ProductsList products={user.info.shoppingCart}/>
                        :pathname === '/profile/purchases'
                            ?   <ProductsList products={user.info.purchases}/>
                            :   <></>
                }
            </div>
        </div>
    );
}
 
export default Profile;