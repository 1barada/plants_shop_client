import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IError from "../../../models/IError";
import IProduct from "../../../models/IProduct";
import { ProductsSliceType } from "../../../store/slices/productSlice/productSlice";
import addProduct from "../../../store/slices/productSlice/thunk/functions/addProduct";
import { AppDispatch } from "../../../store/store";
import styles from './CreateProductForm.module.css';

const CreateProductForm = () => {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: 10.00,
        imageUrl: '',
        weight: 10,
        height: 10,
        needs: {
            water: 'low',
            soil: 'low',
            sun: 'low',
        }
    } as IProduct);

    const dispatch = useDispatch<AppDispatch>();
    const {errors} = useSelector((state: any) => state.products) as ProductsSliceType;

    const newProduct = () => {
        dispatch(addProduct(product));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        newProduct();
    };

    const uploadImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) 
            return;
        
        const fileName = file.name.split('.');
        const fileExtantion = fileName[fileName.length - 1];

        if (fileExtantion === 'jpg' || fileExtantion === 'jpeg' || fileExtantion === 'png') {
            setProduct({...product, imageUrl: ''});
        }
        else {
        }
    }

    return (
        <div className={styles.create_product__container}>
            <form onSubmit={handleSubmit} className={styles.create_product__form} encType="multipart/form-data">
                <label htmlFor='title'>title</label>
                <input onChange={e => setProduct({...product, title: e.target.value})} id='title' name='title' placeholder='product title'/>

                <label htmlFor='description'>description</label>
                <input onChange={e => setProduct({...product, description: e.target.value})} id='description' name='description' placeholder='product description'/> 

                <label htmlFor='price'>price</label>
                <input 
                    onChange={e => setProduct({...product, price: parseFloat(e.target.value)})} 
                    id='price' 
                    name='price' 
                    placeholder='product price' 
                    type='number' 
                    value={product.price}
                    min='0.01' 
                    max='10000'
                    step='0.01'
                    
                />

                <label htmlFor='image'>image</label>
                <input 
                    onChange={uploadImageHandler} 
                    id='image' 
                    name='price' 
                    type='file' 
                    accept='image/jpg, image/jpeg, image/png'
                />

                <label htmlFor='weight'>weight</label>
                <input 
                    onChange={e => setProduct({...product, weight: parseFloat(e.target.value)})} 
                    id='weight' 
                    name='weight' 
                    placeholder='product weight' 
                    type='number' 
                    value={product.weight}
                    min='0.01' 
                    max='10000'
                    step='0.01'
                    
                />

                <label htmlFor='height'>height</label>
                <input 
                    onChange={e => setProduct({...product, height: parseFloat(e.target.value)})} 
                    id='height' 
                    name='height' 
                    placeholder='product height' 
                    type='number' 
                    value={product.height}
                    min='0.01' 
                    max='10000'
                    step='0.01'
                />

                <label htmlFor='needs'>needs</label>
                <ul id='needs' className={styles.create_product__list}>
                    <li>
                        <label htmlFor='water'>water</label>
                        <select id='water' onChange={e => setProduct({...product, needs: {...product.needs, water: e.target.value}})}>
                            <option value='low'>low</option>
                            <option value='middle'>middle</option>
                            <option value='high'>high</option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor='soil'>soil</label>
                        <select id='soil' onChange={e => setProduct({...product, needs: {...product.needs, soil: e.target.value}})}>
                            <option value='low'>low</option>
                            <option value='middle'>middle</option>
                            <option value='high'>high</option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor='sun'>sun</label>
                        <select id='sun' onChange={e => setProduct({...product, needs: {...product.needs, sun: e.target.value}})}>
                            <option value='low'>low</option>
                            <option value='middle'>middle</option>
                            <option value='high'>high</option>
                        </select>
                    </li>
                </ul>

                <input type='submit' value='add product'/>
            </form>
            {errors.length === 0
                ?   <></>
                :   errors.map((error: IError) => 
                        <h2 key={error.message} className='error'>{error.message}</h2>
                    )
            }
        </div>
    );
}
 
export default CreateProductForm;