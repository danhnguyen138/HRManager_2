
import { Field } from "formik"
const InputText2 = ({
    title, id, errors, touched, ...props
}) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1" htmlFor={id}>
                {title}
            </label>
            {errors && touched ? (<div className='text-sm text-red-700 mb-1'>{errors}</div>) :
                (<div className='mb-3'></div>)
            }
            <Field
               {...props}
            />
        </div>
    )
}

export default InputText2
