import { useState, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserSliceType, register } from '../../../store/slices/userSlice';
import { RootState } from '../../../store/store';
import Errors from '../../commonComponents/Errors/Errors';
import Loading from '../../commonComponents/Loading/Loading';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch<any>();
    const user = useSelector<RootState>((state) => state.user) as UserSliceType;

    const submitHendler = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
        dispatch(register({
            username,
            password
        }));
    };
    
    return (
        <div className={styles.register__container + " container"}>
            <h2 className={styles.register__title}>Registration</h2>
            <form onSubmit={submitHendler} className={styles.register__form} autoComplete="off">
                <label htmlFor='username'>Username</label>
                <input className={styles.register__input} onChange={e => setUsername(e.target.value)} id='username' name='username' placeholder='your username' value={username}/>
                <label htmlFor='password'>Password</label>
                <input className={styles.register__input + ' ' + styles.pass} id='password' onChange={e => setPassword(e.target.value)} type='password' name='password' placeholder='your password' value={password}/> 
                <div className={styles.register__errors}>
                    {user.loading
                        ?   <Loading/>
                        :   user.errors.length === 0
                                ?   <></>
                                :   <Errors errors={user.errors}/>
                    }
                </div>
                <button disabled={username ? password ? false : true : true} className={styles.register__btn} type='submit' name='register'>register</button>
            </form>
        </div>
    );
}
 
export default RegisterForm;