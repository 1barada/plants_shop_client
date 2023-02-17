import { Navigate, useLocation } from 'react-router';
import styles from './AuthForm.module.css';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { authPageImgUrl } from '../../../config';

const AuthForm = () => {
    const {pathname} = useLocation();
    const authorized = useSelector<RootState>(state => state.user.authorized);

    return (
        <div className={styles.auth}>
            {authorized
                ?   <Navigate to='/'/> 
                :   <>
                        <img className={styles.auth__image} src={authPageImgUrl} alt=""/>
                        {pathname === '/login' 
                            ?   <LoginForm/> 
                            :   pathname === '/register' 
                                    ?   <RegisterForm/> 
                                    :   <></>
                        }
                    </>
            }
        </div>
    )
}
 
export default AuthForm;