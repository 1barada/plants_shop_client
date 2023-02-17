import { Link, useLocation } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
    const {pathname} = useLocation();

    return (
        <div className={styles.notfound}>
            <h1 className='error'>Error 404</h1>
            <h1>"{pathname}" path not found</h1>
            <Link to='/' className={styles.link}>go to Home page</Link>
        </div>
    );
}
 
export default NotFound;