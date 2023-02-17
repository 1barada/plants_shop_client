import { noAvatarUrl } from '../../../config';
import styles from './ProfileAvatar.module.css';

const ProfileAvatar = ({size}: {size: number}) => {
    return (
        <div 
            className={styles.profile__avatar}
            style={{
                width: size,
                height: size
            }}>
            <img alt='avatar' src={noAvatarUrl}/>  
        </div>
    );
}
 
export default ProfileAvatar;