import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Navigation from '../Navigation/Navigation';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__container + " container"}>
                <Link to='/1' className={styles.logo}>Plants Shop</Link>
                <Navigation/>
            </div>
        </header>
    );
}
 
export default Header;