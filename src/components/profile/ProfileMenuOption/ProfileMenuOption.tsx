import { MouseEventHandler } from 'react';
import { useLocation } from 'react-router';
import styles from './ProfileMenuOption.module.css';

interface ProfileMenuOptionProps {
    title: string,
    to: string,
    onClick: MouseEventHandler<HTMLDivElement>
}

const ProfileMenuOption = ({title, to, onClick}: ProfileMenuOptionProps) => {
    const {pathname} = useLocation();

    return (
        <div
            className={styles.menu__option + ' ' + (to === pathname && styles['menu__option-selected'])} 
            onClick={onClick}>
            {title}
        </div>
    );
}
 
export default ProfileMenuOption;