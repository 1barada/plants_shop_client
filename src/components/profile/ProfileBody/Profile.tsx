import { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileBackGround } from '../../../config';
import IUser from '../../../models/IUser';
import getPurchases from '../../../store/slices/userSlice/thunk/getPurchases';
import getShoppingCart from '../../../store/slices/userSlice/thunk/getShoppingCart';
import { AppDispatch, RootState } from '../../../store/store';
import ProductsList from '../../product/ProductList/ProductsList';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import styles from './Profile.module.css';

enum MenuOptions {
    ProfileInfo,
    ShoopingCart,
    Purchases
}

const Profile = () => {
    const [currentMenu, setCurrentMenu] = useState<MenuOptions>(MenuOptions.ProfileInfo);

    const userInfo = useSelector<RootState>(state => state.user.info) as IUser;
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getShoppingCart());
    }, [dispatch]); 

    const profileInfoMenuHandler = (e: MouseEvent<HTMLDivElement>) => {
        setCurrentMenu(MenuOptions.ProfileInfo);
    };

    const shoopingCartMenuHandler = (e: MouseEvent<HTMLDivElement>) => {
        dispatch(getShoppingCart());
        setCurrentMenu(MenuOptions.ShoopingCart);
    };

    const purchasesMenuHandler = (e: MouseEvent<HTMLDivElement>) => {
        dispatch(getPurchases());
        setCurrentMenu(MenuOptions.Purchases);
    };

    return (
        <div className={styles.profile}>
            <div className={styles.profile__avatar}>
                <ProfileAvatar size={200}/> 
            </div>
            <div className={styles.profile__menu}>
                <div
                    className={styles.menu__option + ' ' + (currentMenu === MenuOptions.ProfileInfo && styles['menu__option-selected'])} 
                    onClick={profileInfoMenuHandler}>Profile info</div>
                <div 
                    className={styles.menu__option + ' ' + (currentMenu === MenuOptions.ShoopingCart && styles['menu__option-selected'])} 
                    onClick={shoopingCartMenuHandler}>Shopping cart</div>
                <div
                    className={styles.menu__option + ' ' + (currentMenu === MenuOptions.Purchases && styles['menu__option-selected'])} 
                    onClick={purchasesMenuHandler}>Purchases</div>
            </div>
            <div className={styles.profile__body}>
                {currentMenu === MenuOptions.ProfileInfo 
                    ?   <ProfileInfo/>
                :currentMenu === MenuOptions.ShoopingCart
                    ?   <ProductsList products={userInfo.shoppingCart}/>
                :currentMenu === MenuOptions.Purchases
                    ?   <ProductsList products={userInfo.purchases}/>
                    :   <>{setCurrentMenu(MenuOptions.ProfileInfo)}</>
                }
            </div>
        </div>
    );
}
 
export default Profile;