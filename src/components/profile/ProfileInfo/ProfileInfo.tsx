import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../store/slices/userSlice/userSlice';
import { AppDispatch } from '../../../store/store';
import styles from './ProfileInfo.module.css';

const ProfileInfo = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        dispatch(logout());
    }


    return (
        <div className={styles.profile__info}>
            <Link to="" onClick={handleLogout} className={styles.link}>Logout</Link>
        </div>
    );
}
 
export default ProfileInfo;