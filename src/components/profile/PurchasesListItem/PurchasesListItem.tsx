import { Link } from 'react-router-dom';
import { noImageUrl } from '../../../config';
import IProductQuantity from '../../../models/IProductQuantity';
import styles from './PurchasesListItem.module.css';

interface PurchasesListItemProps {
    productQuantity: IProductQuantity
}

const PurchasesListItem = ({productQuantity}: PurchasesListItemProps) => {
    return (
        <Link to='' className={styles.item}>
            <div className={styles.icon}>
                <img
                    src={productQuantity.product.imageUrl || ''}
                    alt={'Product'}
                    onError={({currentTarget}) => {
                        currentTarget.src = noImageUrl;
                        currentTarget.onerror = null;
                    }}
                />
            </div>
            <div className={styles.item__info}>
                <div className={styles.body}>
                    <h5 className={styles.title}>{productQuantity.product.title}</h5>
                    <div className={styles.description}>
                        {productQuantity.product.description}
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.price}><span>{productQuantity.product.price}$</span></div>
                </div>
            </div>
        </Link>
    );
}
 
export default PurchasesListItem;