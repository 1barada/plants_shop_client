import { Navigate, useLocation } from 'react-router';
import styles from './AuthForm.module.css';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { authPageImgUrl } from '../../../config';
import { useAuth } from '../../../hooks/useAuth';

const AuthForm = () => {
    const {pathname} = useLocation();
    const isAuthorized = useAuth();

    return (
        <div className={styles.auth}>
            {isAuthorized
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