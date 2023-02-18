import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ProductsSliceType } from '../../../store/slices/productSlice/productSlice'
import fetchProducts from '../../../store/slices/productSlice/thunk/fetchProducts';
import styles from './ProductsCatalod.module.css';
import { RootState } from '../../../store/store';
import Loading from '../../commonComponents/Loading/Loading';
import SearchProductForm from '../SearchProduct/SearchProductForm';
import ProductsGrid from '../ProductGrid/ProductsGrid';

const ProductsCatalog: FC = () => {
    const dispatch = useDispatch<any>();
    const products = useSelector<RootState>(state => state.products) as ProductsSliceType;

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className={styles.catalog}>
            <SearchProductForm/>
            {products.loading 
                ?   <Loading/>
                :   <ProductsGrid products={products.items}/>
            }
        </div>
    );
}
 
export default ProductsCatalog;