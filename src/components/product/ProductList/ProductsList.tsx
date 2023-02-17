import IProduct from "../../../models/IProduct";
import ProductItem from "./../ProductItem/ProductItem";
import styles from './ProductList.module.css';

const ProductsList = ({products}: {products: IProduct[]}) => {
    return (
        <ul className={styles.list}>
            {products.length === 0
                ?   <h2>List is empty</h2>
                :   products.map((product: IProduct) => 
                        <ProductItem key={product.id} product={product}/>
                    ) 
            }
        </ul>
    );
}
 
export default ProductsList;