import { useSelector } from 'react-redux';
import { noAvatarUrl } from '../../../config';
import IUser from '../../../models/IUser';
import { RootState } from '../../../store/store';
import styles from './Profile.module.css';

const Profile = () => {
    const userInfo = useSelector<RootState>(state => state.user.info) as IUser;

    return (
        <div className={styles.profile}>
            <div className={styles.profile__info}>
                <div className={styles['profile-info__avatar']}>
                    <img className={styles.profile__avatar} alt='avatar' src={noAvatarUrl}/>  
                </div>
                <h3 className={styles.profile__username}>{userInfo.username}</h3>
                <h3 className={styles.profile__balance}>{userInfo.balance}</h3>
            </div>
            <div className={styles.profile__menu}>

            </div>
            <div className={styles.profile__body}>

            </div>
        </div>
    );
}
 
export default Profile;