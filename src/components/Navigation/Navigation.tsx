import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserSliceType } from '../../store/slices/userSlice/userSlice';
import truncateToTwoDecimal from '../../utils/truncateToTwoDecimal';
import ProfileAvatar from '../profile/ProfileAvatar/ProfileAvatar';
import styles from './Navigation.module.css';

const Navigation = () => {
    const user = useSelector((state: any) => state.user) as UserSliceType;

    const totalItems = useMemo<number>(() => {
        return truncateToTwoDecimal(user.info.shoppingCart
            .map(product => product.quantity)
            .reduce((prev, curr) => {return prev + curr}, 0));
    }, [user.info.shoppingCart]);

    return (
        <nav className={styles.nav}>
            {user.authorized 
                ?   <>
                        {user.info.role === 'admin' 
                            ?   <Link to="/admin" className={styles.link}>Admin</Link>
                            :   <></>
                        }
                        <Link to="/profile/shoppingCart" className={styles.link + ' ' + styles['link__shopping-cart']}>
                            Shopping Cart 
                            {totalItems !== 0 && <span className={styles['link__cart-count']}>{totalItems}</span>}
                        </Link>
                        <Link to="/profile" className={styles.avatar}>
                            <ProfileAvatar size={40}/>
                        </Link>
                    </>
                :   <>
                        <Link to="/login" className={styles.link}>Login</Link>
                        <Link to="/register" className={styles.link}>Registration</Link>
                    </>
            }
        </nav>
    );
}
 
export default memo(Navigation);