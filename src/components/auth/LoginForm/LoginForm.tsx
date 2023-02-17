import { useState, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import ILoginRequestData from "../../../models/ILoginRequestData";
import login from "../../../store/slices/userSlice/thunk/login";
import { UserSliceType } from "../../../store/slices/userSlice/userSlice";
import { RootState } from "../../../store/store";
import Errors from "../../commonComponents/Errors/Errors";
import Loading from "../../commonComponents/Loading/Loading";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
    const [username, setUsername] = useState('user');
    const [password, setPassword] = useState('user1234');

    const dispatch = useDispatch<any>();
    const user = useSelector<RootState>(state => state.user) as UserSliceType;

    const submitHendler = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
        const submitterName = (e.nativeEvent.submitter as HTMLFormElement).name;

        switch(submitterName) {
            case 'login': 
                loginHandler({
                    username,
                    password
                });
                break;
            case 'adminLogin': 
                loginHandler({
                    username: 'admin',
                    password: 'pZcGExSfMSJHUn5wHVWVmJfp'
                });
                break;
        }
    };

    const loginHandler = (loginData: ILoginRequestData): void => {
        dispatch(login(loginData));
    };
    
    return (
        <div className={styles.login__container + " container"}>
            <h2 className={styles.login__title}>Login</h2>
            <form onSubmit={submitHendler} className={styles.login__form} autoComplete="off">
                <label htmlFor='username'>Username</label>
                <input className={styles.login__input} onChange={e => setUsername(e.target.value)} id='username' name='username' placeholder='your username' value={username}/>
                <label htmlFor='password'>Password</label>
                <input className={styles.login__input + ' ' + styles.pass} id='password' onChange={e => setPassword(e.target.value)} type='password' name='password' placeholder='your password' value={password}/> 
                <div className={styles.login__errors}>
                    {user.loading
                        ?   <Loading/>
                        :   user.errors.length === 0
                                ?   <></>
                                :   <Errors errors={user.errors}/>
                    }
                </div>
                <button disabled={!username || !password} className={styles.login__btn} type='submit' name='login'>login</button>
                <div className={styles.login__or}>
                    <span>or</span>
                </div>
                <button className={styles.login__btn} type='submit' name='adminLogin'>login as admin</button>
            </form>
        </div>
    );
}
 
export default LoginForm;