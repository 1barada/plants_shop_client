import { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';
import { useDispatch } from 'react-redux';
import ISearchInfo from '../../../models/ISearchInfo';
import { setSearchParams } from '../../../store/slices/productSlice/productSlice';
import { AppDispatch } from '../../../store/store';
import styles from './SearchProductForm.module.css';

const SearchProductForm = () => {
    const [searchInfo, setSearchInfo] = useState<ISearchInfo>({});
    const dispatch = useDispatch<AppDispatch>();

    const titleHandler = (e: ChangeEvent<HTMLInputElement>) => 
        setSearchInfo({...searchInfo, title: e.target.value});
    const minPriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInfo({...searchInfo, minPrice: parseInt(e.target.value)});
    };
    const maxPriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInfo({...searchInfo, maxPrice: parseInt(e.target.value)});
    };
    const minWeightHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInfo({...searchInfo, minWeight: parseInt(e.target.value)});
    };
    const maxWightHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInfo({...searchInfo, maxWeight: parseInt(e.target.value)});
    };
    const minHeightHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInfo({...searchInfo, minHeight: parseInt(e.target.value)});
    };
    const maxHeightHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInfo({...searchInfo, maxHeight: parseInt(e.target.value)});
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setSearchParams(searchInfo));
    };



    const onBlurMinPriceHandler = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setSearchInfo({...searchInfo, minPrice: parseInt(e.target.defaultValue)});
            e.target.value = e.target.defaultValue;
        }
        else if (searchInfo.maxPrice && parseInt(e.target.value) > searchInfo.maxPrice) {
            setSearchInfo({...searchInfo, minPrice: searchInfo.maxPrice});
            e.target.value = searchInfo.maxPrice.toString();
        }
    };
    const onBlurMaxPriceHandler = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setSearchInfo({...searchInfo, maxPrice: parseInt(e.target.value)});
            e.target.value = e.target.defaultValue;
        }
        else if (searchInfo.minPrice && parseInt(e.target.value) < searchInfo.minPrice) {
            setSearchInfo({...searchInfo, maxPrice: searchInfo.minPrice});
            e.target.value = searchInfo.minPrice.toString();
        }
    };
    const onBlurMinWeightHandler = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setSearchInfo({...searchInfo, minWeight: parseInt(e.target.value)});
            e.target.value = e.target.defaultValue;
        }
        else if (searchInfo.maxWeight && parseInt(e.target.value) > searchInfo.maxWeight) {
            setSearchInfo({...searchInfo, minWeight: searchInfo.maxWeight});
            e.target.value = searchInfo.maxWeight.toString();
        }
    };
    const onBlurMaxWeightHandler = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setSearchInfo({...searchInfo, maxWeight: parseInt(e.target.value)});
            e.target.value = e.target.defaultValue;
        }
        else if (searchInfo.minWeight && parseInt(e.target.value) < searchInfo.minWeight) {
            setSearchInfo({...searchInfo, maxWeight: searchInfo.minWeight});
            e.target.value = searchInfo.minWeight.toString();
        }
    };
    const onBlurMinHeightHandler = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setSearchInfo({...searchInfo, minHeight: parseInt(e.target.value)});
            e.target.value = e.target.defaultValue;
        }
        else if (searchInfo.maxHeight && parseInt(e.target.value) > searchInfo.maxHeight) {
            setSearchInfo({...searchInfo, minHeight: searchInfo.maxHeight});
            e.target.value = searchInfo.maxHeight.toString();
        }
    };
    const onBlurMaxHeightHandler = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setSearchInfo({...searchInfo, maxHeight: parseInt(e.target.value)});
            e.target.value = e.target.defaultValue;
        }
        else if (searchInfo.minHeight && parseInt(e.target.value) < searchInfo.minHeight) {
            setSearchInfo({...searchInfo, maxHeight: searchInfo.minHeight});
            e.target.value = searchInfo.minHeight.toString();
        }
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
                        onBlur={onBlurMinPriceHandler}
                        onChange={minPriceHandler}
                    />
                    <label htmlFor="search__price-max">max:</label> 
                    <input 
                        type="number" 
                        id='search__price-max'
                        min='0'
                        max='200'
                        defaultValue='200'
                        onBlur={onBlurMaxPriceHandler}
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
                        onBlur={onBlurMinWeightHandler}
                        onChange={minWeightHandler}
                    />
                    <label htmlFor="search__weight-max">max:</label> 
                    <input 
                        type="number" 
                        id='search__weight-max'
                        min='0'
                        max='200'
                        defaultValue='200'
                        onBlur={onBlurMaxPriceHandler}
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
                        onBlur={onBlurMinHeightHandler}
                        onChange={minHeightHandler}
                    />
                    <label htmlFor="search__height-max">max:</label> 
                    <input 
                        type="number" 
                        id='search__height-max'
                        min='0'
                        max='200'
                        defaultValue='200'
                        onBlur={onBlurMaxHeightHandler}
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