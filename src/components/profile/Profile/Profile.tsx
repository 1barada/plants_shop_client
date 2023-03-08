import { MouseEvent, useCallback, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import profileInfo from '../../../store/slices/userSlice/thunk/profileInfo';
import { AppDispatch, RootState } from '../../../store/store';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import ProfileMenuOption from '../ProfileMenuOption/ProfileMenuOption';
import styles from './Profile.module.css';

const Profile = () => {
    const balance = useSelector<RootState>(state => state.user.info.balance) as number;
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(profileInfo())
    }, []);

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
                <ProfileAvatar size={150}/>
                <div className={styles.profile__balance}>balance: <span className={styles.balance}>{balance}$</span></div> 
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