import { ChangeEvent, FC, useEffect } from 'react';
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
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector<RootState>(state => state.products) as ProductsSliceType;

    useEffect(() => {
        dispatch(fetchProducts({page: 1, searchParams: products.searchParams}));
    }, [dispatch, products.searchParams]);

    const paginationHandler = (e: ChangeEvent<unknown>, newPage: number) => {
        console.log(newPage)
        dispatch(fetchProducts({page: newPage, searchParams: products.searchParams}))
    };

    return (
        <div className={styles.catalog}>
            <SearchProductForm/>
            <div className={styles.catalog__body}>
                <Pagination 
                    className={styles.catalog__pagination} 
                    count={products.totalPages} 
                    page={products.page} 
                    onChange={paginationHandler}
                />
                {products.loading 
                    ?   <Loading/>
                    :   <ProductsGrid products={products.items}/>
                }
                <Pagination className={styles.catalog__pagination} count={products.totalPages} page={products.page} onChange={paginationHandler}/>
            </div>
        </div>
    );
}
 
export default ProductsCatalog;