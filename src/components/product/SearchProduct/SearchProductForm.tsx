import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import ISearchInfo from '../../../models/ISearchInfo';
import searchProducts from '../../../store/slices/productSlice/thunk/functions/searchProducts';
import { AppDispatch } from '../../../store/store';
import styles from './SearchProductForm.module.css';

const SearchProductForm = () => {
    const [searchInfo, setSearchInfo] = useState<ISearchInfo>({});
    const dispatch = useDispatch<AppDispatch>();

    const titleHandler = (e: ChangeEvent<HTMLInputElement>) => 
        setSearchInfo({...searchInfo, title: e.target.value});
    const minPriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            e.target.value = '0';
            return;
        }
        setSearchInfo({...searchInfo, minPrice: parseFloat(e.target.value)});
    };
    const maxPriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            e.target.value = '0';
            return;
        }
        setSearchInfo({...searchInfo, maxPrice: parseFloat(e.target.value)});
    }
    const minWeightHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            e.target.value = '0';
            return;
        }
        setSearchInfo({...searchInfo, minWeight: parseFloat(e.target.value)});
    }
    const maxWightHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            e.target.value = '0';
            return;
        }
        setSearchInfo({...searchInfo, maxWeight: parseFloat(e.target.value)});
    }
    const minHeightHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            e.target.value = '0';
            return;
        }
        setSearchInfo({...searchInfo, minHeight: parseFloat(e.target.value)});
    }
    const maxHeightHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            e.target.value = '0';
            return;
        }
        setSearchInfo({...searchInfo, maxHeight: parseFloat(e.target.value)});
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(searchProducts(searchInfo));
    };

    return (
        <form onSubmit={handleSubmit} className={styles.search}>
            <h2>Search</h2>
            <div className={styles.search__title}>
                <label htmlFor="search__title">Name:</label>
                <input onChange={titleHandler} type="text" id='search__title'/>
            </div>
            <div className={styles.search__input_range}>
                <label htmlFor="search__price">Price:</label> 
                <div id='search__price'>
                    <label htmlFor="search__price-min">min:</label> 
                    <input 
                        type="number" 
                        id='search__price-min'
                        min='0'
                        max='200'
                        defaultValue='0'
                        onChange={minPriceHandler}
                    />
                    <label htmlFor="search__price-max">max:</label> 
                    <input 
                        type="number" 
                        id='search__price-max'
                        min='0'
                        max='200'
                        defaultValue='200'
                        onChange={maxPriceHandler}
                    />
                </div>
            </div>
            <div className={styles.search__input_range}>
                <label htmlFor="search__weight">Weight:</label> 
                <div id='search__weight'>
                    <label htmlFor="search__weight-min">min:</label> 
                    <input 
                        type="number" 
                        id='search__weight-min'
                        min='0'
                        max='200'
                        defaultValue='0'
                        onChange={minWeightHandler}
                    />
                    <label htmlFor="search__weight-max">max:</label> 
                    <input 
                        type="number" 
                        id='search__weight-max'
                        min='0'
                        max='200'
                        defaultValue='200'
                        onChange={maxWightHandler}
                    />
                </div>
            </div>
            <div className={styles.search__input_range}>
                <label htmlFor="search__height">Height:</label> 
                <div id='search__height'>
                    <label htmlFor="search__height-min">min:</label> 
                    <input 
                        type="number" 
                        id='search__height-min'
                        min='0'
                        max='200'
                        defaultValue='0'
                        onChange={minHeightHandler}
                    />
                    <label htmlFor="search__height-max">max:</label> 
                    <input 
                        type="number" 
                        id='search__height-max'
                        min='0'
                        max='200'
                        defaultValue='200'
                        onChange={maxHeightHandler}
                    />
                </div>
            </div>
            <input 
                type='submit'
                value='search'
                className={styles.search__submit}
            />
        </form>
    );
}
 
export default SearchProductForm;