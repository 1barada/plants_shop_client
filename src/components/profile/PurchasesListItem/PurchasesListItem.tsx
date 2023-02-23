import { Link } from 'react-router-dom';
import { noImageUrl } from '../../../config';
import IProduct from '../../../models/IProduct';
import IQuantity from '../../../models/IQuantity';
import styles from './PurchasesListItem.module.css';

interface PurchasesListItemProps {
    product: IProduct & IQuantity
}

const PurchasesListItem = ({product}: PurchasesListItemProps) => {
    return (
        <Link to='' className={styles.item}>
            <div className={styles.icon}>
                <img
                    src={product.imageUrl ? product.imageUrl : ''}
                    alt={'Product'}
                    onError={({currentTarget}) => {
                        currentTarget.src = noImageUrl;
                        currentTarget.onerror = null;
                    }}
                />
            </div>
            <div className={styles.item__info}>
                <div className={styles.body}>
                    <h5 className={styles.title}>{product.title}</h5>
                    <div className={styles.description}>
                        {product.description}
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.price}><span>{product.price}$</span></div>
                </div>
            </div>
        </Link>
    );
}
 
export default PurchasesListItem;