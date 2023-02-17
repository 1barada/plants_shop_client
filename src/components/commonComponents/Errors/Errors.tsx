import IError from '../../../models/IError';

const Errors = ({errors}: {errors: IError[]}) => {
    return (
        <>
            {errors.map((error: IError) => 
                <h2 key={error.message} className='error'>{error.message}</h2>
            )}
        </>
    );
}
 
export default Errors;