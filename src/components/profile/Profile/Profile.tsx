import { MouseEvent, useCallback, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import IProduct from '../../../models/IProduct';
import IQuantity from '../../../models/IQuantity';
import getPurchases from '../../../store/slices/userSlice/thunk/getPurchases';
import { getShoppingCart } from '../../../store/slices/userSlice/userSlice';
import { AppDispatch, RootState } from '../../../store/store';
import Loading from '../../commonComponents/Loading/Loading';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import ProfileMenuOption from '../ProfileMenuOption/ProfileMenuOption';
import styles from './Profile.module.css';

const Profile = () => {
    const navigate = useNavigate();
    const loading = useSelector<RootState>(state => state.user.loading) as (IProduct & IQuantity)[];
    const dispatch = useDispatch<AppDispatch>();

    const profileInfoMenuHandler = useCallback((e: MouseEvent<HTMLDivElement>) => {
        navigate('/profile/info');
    }, []);

    const shoppingCartMenuHandler = useCallback((e: MouseEvent<HTMLDivElement>) => {
        navigate('/profile/shoppingCart');
    }, []);

    const purchasesMenuHandler = useCallback((e: MouseEvent<HTMLDivElement>) => {
        navigate('/profile/purchases');
    }, []);

    return (
        <div className={styles.profile}>
            <div className={styles.profile__avatar}>
                <ProfileAvatar size={200}/> 
            </div>
            <div className={styles.profile__menu}>
                <ProfileMenuOption title='Profile info' to='/profile/info' onClick={profileInfoMenuHandler}/>
                <ProfileMenuOption title='Shopping cart' to='/profile/shoppingCart' onClick={shoppingCartMenuHandler}/>
                <ProfileMenuOption title='Purchases' to='/profile/purchases' onClick={purchasesMenuHandler}/>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    );
}
 
export default memo(Profile);