import { useState, ChangeEvent, FormEvent, FocusEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IMaxValues from '../../../models/IMaxValues';
import ISearchInfo from '../../../models/ISearchInfo';
import { setSearchParams } from '../../../store/slices/productSlice/productSlice';
import { AppDispatch, RootState } from '../../../store/store';
import styles from './SearchProductForm.module.css';

const SearchProductForm = () => {
    const [searchInfo, setSearchInfo] = useState<ISearchInfo>({
        maxHeight: 0,
        maxPrice: 0,
        maxWeight: 0,
        minHeight: 0,
        minPrice: 0,
        minWeight: 0,
        title: ''
    });
    const {maxPrice, maxWeight, maxHeight} = useSelector<RootState>(state => state.products.maxValues) as IMaxValues;
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setSearchInfo({...searchInfo, maxPrice, maxHeight, maxWeight});
    }, [maxPrice, maxHeight, maxWeight]);

    const titleHandler = (e: ChangeEvent<HTMLInputElement>) => 
        setSearchInfo({...searchInfo, title: e.target.value});
    const minPriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let minPriceValue = parseInt(e.target.value) || 0;
        if (minPriceValue > searchInfo.maxPrice!) {
            minPriceValue = searchInfo.maxPrice!;
        } else if (minPriceValue < 0) {
            minPriceValue = 0;
        }
        setSearchInfo({...searchInfo, minPrice: minPriceValue});
    };
    const maxPriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let maxPriceValue = parseInt(e.target.value) || 0;
        if (maxPriceValue < searchInfo.minPrice!) {
            maxPriceValue = searchInfo.minPrice!;
        } else if (maxPriceValue > maxPrice) {
            maxPriceValue = maxPrice;
        }
        setSearchInfo({...searchInfo, maxPrice: maxPriceValue});
    };
    const minWeightHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let minWeightValue = parseInt(e.target.value) || 0;
        if (minWeightValue > searchInfo.maxWeight!) {
            minWeightValue = searchInfo.maxWeight!;
        } else if (minWeightValue < 0) {
            minWeightValue = 0;
        }
        setSearchInfo({...searchInfo, minWeight: minWeightValue});
    };
    const maxWeightHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let maxWeightValue = parseInt(e.target.value) || 0;
        if (maxWeightValue < searchInfo.minWeight!) {
            maxWeightValue = searchInfo.minWeight!;
        } else if (maxWeightValue > maxWeight) {
            maxWeightValue = maxWeight;
        }
        setSearchInfo({...searchInfo, maxWeight: maxWeightValue});
    };
    const minHeightHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let minHeightValue = parseInt(e.target.value) || 0;
        if (minHeightValue > searchInfo.maxHeight!) {
            minHeightValue = searchInfo.maxHeight!;
        } else if (minHeightValue < 0) {
            minHeightValue = 0;
        }
        setSearchInfo({...searchInfo, minHeight: minHeightValue});
    };
    const maxHeightHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let maxHeightValue = parseInt(e.target.value) || 0;
        if (maxHeightValue < searchInfo.minHeight!) {
            maxHeightValue = searchInfo.minHeight!;
        } else if (maxHeightValue > maxHeight) {
            maxHeightValue = maxHeight;
        }
        setSearchInfo({...searchInfo, maxHeight: maxHeightValue});
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setSearchParams(searchInfo));
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
                        max={maxPrice}
                        value={searchInfo.minPrice}
                        onChange={minPriceHandler}
                    />
                    <label htmlFor="search__price-max">max:</label> 
                    <input 
                        type="number" 
                        id='search__price-max'
                        min='0'
                        max={maxPrice}
                        value={searchInfo.maxPrice}
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
                        max={maxWeight}
                        value={searchInfo.minWeight}
                        onChange={minWeightHandler}
                    />
                    <label htmlFor="search__weight-max">max:</label> 
                    <input 
                        type="number" 
                        id='search__weight-max'
                        min='0'
                        max={maxWeight}
                        value={searchInfo.maxWeight}
                        onChange={maxWeightHandler}
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
                        max={maxHeight}
                        value={searchInfo.minHeight}
                        onChange={minHeightHandler}
                    />
                    <label htmlFor="search__height-max">max:</label> 
                    <input 
                        type="number" 
                        id='search__height-max'
                        min='0'
                        max={maxHeight}
                        value={searchInfo.maxHeight}
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