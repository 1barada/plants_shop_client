import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ProductsSliceType } from '../../../store/slices/productSlice/productSlice'
import fetchProducts from '../../../store/slices/productSlice/thunk/fetchProducts';
import styles from './ProductsCatalod.module.css';
import { AppDispatch, RootState } from '../../../store/store';
import Loading from '../../commonComponents/Loading/Loading';
import SearchProductForm from '../SearchProduct/SearchProductForm';
import ProductsGrid from '../ProductGrid/ProductsGrid';
import { Pagination } from '@mui/material';

const ProductsCatalog: FC = () => {
    const [page, setPage] = useState<number>(1);
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector<RootState>(state => state.products) as ProductsSliceType;

    useEffect(() => {
        dispatch(fetchProducts(1));
    }, [dispatch]);

    const paginationHandler = (e: ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
        dispatch(fetchProducts(newPage))
    };

    return (
        <div className={styles.catalog}>
            <SearchProductForm/>
            <div className={styles.catalog__body}>
                <Pagination className={styles.catalog__pagination} count={products.totalPages} page={page} onChange={paginationHandler}/>
                {products.loading 
                    ?   <Loading/>
                    :   <ProductsGrid products={products.items}/>
                }
                <Pagination className={styles.catalog__pagination} count={products.totalPages} page={page} onChange={paginationHandler}/>
            </div>
        </div>
    );
}
 
export default ProductsCatalog;