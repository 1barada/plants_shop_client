import { MouseEvent, useCallback, memo } from 'react';
import { Outlet, Route, useNavigate } from 'react-router';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import ProfileMenuOption from '../ProfileMenuOption/ProfileMenuOption';
import PurchasesList from '../PurchasesList/PurchasesList';
import ShoppingCartList from '../ShoppingCartList/ShoppingCartList';
import styles from './Profile.module.css';

const Profile = () => {
    const navigate = useNavigate();

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