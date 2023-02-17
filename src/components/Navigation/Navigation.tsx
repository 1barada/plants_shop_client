import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, UserSliceType } from '../../store/slices/userSlice/userSlice';
import styles from './Navigation.module.css';

const Navigation = () => {
    const user = useSelector((state: any) => state.user) as UserSliceType;
    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout());
    }

    const handleClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        logoutUser();
    }

    return (
        <nav>
            {user.authorized 
                ?   <>
                        {user.info.role === 'admin' 
                            ?   <Link to="/admin" className={styles.link}>Admin</Link>
                            :   <></>
                        }
                        <Link to="" onClick={handleClick} className={styles.link}>Logout</Link>
                        <Link to="/shoppingcart" className={styles.link}>Shopping Cart</Link>
                        <Link to="/profile" className={styles.link}>Profile</Link>
                    </>
                :   <>
                        <Link to="/login" className={styles.link}>Login</Link>
                        <Link to="/register" className={styles.link}>Registration</Link>
                    </>
            }
        </nav>
    );
}
 
export default Navigation;