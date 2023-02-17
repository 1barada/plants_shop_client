import IProduct from "../../../models/IProduct";
import ProductGridItem from "../ProductGridItem/ProductGridItem";
import styles from './ProductGrid.module.css';

const ProductsGrid = ({products}: {products: IProduct[]}) => {
    return (
        <ul className={styles.grid}>
            {products.length === 0
                ?   <h2>List is empty</h2>
                :   products.map((product: IProduct) => 
                        <ProductGridItem key={product.id} product={product}/>
                    ) 
            }
        </ul>
    );
}
 
export default ProductsGrid;