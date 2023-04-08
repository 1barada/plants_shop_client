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
import { useNavigate, useParams } from 'react-router-dom';

const ProductsCatalog: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector<RootState>(state => state.products) as ProductsSliceType;
    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        const page = parseInt(params.page || '0');
        if (page < 1) {
            navigate('/1', {replace: true});
        } else {
            dispatch(fetchProducts({page: page, searchParams: products.searchParams}));
        }
    }, [dispatch, products.searchParams]);

    const paginationHandler = (e: ChangeEvent<unknown>, newPage: number) => {
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