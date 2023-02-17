import IProduct from "../../../models/IProduct";
import ProductListItem from "../ProductListItem/ProductListItem";
import styles from './ProductList.module.css';

const ProductsList = ({products}: {products: IProduct[]}) => {
    return (
        <ul className={styles.list}>
            {!products || products.length === 0
                ?   <h2>List is Empty</h2>
                :   products.map((product) => 
                        <ProductListItem product={product}/>  
                    )
            }
        </ul>
    );
}
 
export default ProductsList;