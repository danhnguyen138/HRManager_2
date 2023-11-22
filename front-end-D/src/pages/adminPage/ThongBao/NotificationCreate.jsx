import React, { useState, useEffect } from 'react';
import InputText from 'components/input/InputText';
import SelectInput from 'components/input/SelectInput';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { useStateContext } from 'context/ContextProvider';
import * as yup from "yup";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
const createNotificationSchema = yup.object().shape({
    title: yup.string().required('Xin nhập tiêu đề thông báo'),
    idNhanVien: yup.array().min(1, 'Xin chọn ít nhất 1 nhân viên'),
    content: yup.string().required('Xin nhập nội dung thông báo'),
})
const NotificationCreate = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.token);
    const { showNotification } = useStateContext();

    const [getDataEmployee, setGetDataEmployee] = useState(null);
    const getEmployee = async () => {
        await fetch(`/api/admin/danhsachnhanvien`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.error) {
                    showNotification('error', resData.error)
                } else {
                    setGetDataEmployee(resData)
                }
            }
        )
    }
    useEffect(() => {
        getEmployee();
    }, []);
    if (!getDataEmployee) return null;
    let dataEmployee = [{value :"Chọn tất cả",label :"Chọn tất cả"}]    
    for (let i = 0; i < getDataEmployee.userlist.length; i++)
     {
        if(!getDataEmployee.userlist[i].isAdmin){
            dataEmployee.push({
                value: getDataEmployee.userlist[i].id,
                label: getDataEmployee.userlist[i].HoTen
            }
    
        )
            
        }
        
    }

    const initialValues = {
        title: '',
        content: '',
        idNhanVien: []
    }
    const handleReturn = () => {
        navigate('/admin/notification')
    }
    const handleSubmit =async(values)=>{
        await fetch(`/api/admin/thongbao/create`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        }).then(
            async(res)=>{
                const resData= await res.json();
                if (resData.error){
                    showNotification('error', resData.error)
                }else{
                    showNotification('success', resData.msg)
                    navigate(`/admin/notification`)
                }
            }
        )
    }
    return (
        <div className='mt-20 md:mt-8 mx-auto w-full md:w-[90%]'>
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-3xl font-bold'>
                    <h1>Tạo thông báo</h1>
                </div>
            </div>
            <div className="relative mt-5 h-72 w-[92%] md:w-full mx-auto overflow-hidden rounded-xl 
            bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=htmlFormat&fit=crop&w=1920&q=80)] 
            bg-cover bg-center">
                <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
            </div>
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white w-[85%] md:w-[90%]
            text-gray-700 shadow-md mx-auto -mt-24 mb-6'>
                <div className='p-4'>
                    <div className="mb-8 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6">

                            <h2 className='pl-4 pt-3 text-2xl font-semibold'>Hãy điền thông tin thông báo</h2>
                        </div>
                        <button className='border rounded-lg border-slate-400 text-white text-base px-5 py-3 bg-green-500 hover:bg-green-700' onClick={handleReturn}>
                            Trở lại
                        </button>

                    </div>
                    <div className='grid grid-cols-1 gap-12 mb-12'>
                        <div className='w-full'>
                            <Formik
                                onSubmit={handleSubmit}
                                initialValues={initialValues}
                                validationSchema={createNotificationSchema}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                    setFieldValue
                                })=>{
                                    return (
                                        <form className='bg-white w-full shadow-md p-3 rounded' onSubmit={handleSubmit}>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title='Tiêu đề'
                                                    id='title'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.title}
                                                    errors={errors.title}
                                                    touched={touched.title}
                                                    name='title'
                                                    type='text'
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                 <div className='mb-4'>
                                                    <label className="block text-gray-700 font-bold mb-2" htmlFor='idNhanVien'>
                                                        Danh sách nhân viên
                                                    </label>
                                                    {errors.idNhanVien && touched.idNhanVien ? (<div className='text-sm text-red-700 mb-1'>{errors.idNhanVien}</div>) :
                                                        (<div className='mb-3'></div>)
                                                    }


                                                    <Select
                                                        isMulti
                                                        name='idNhanVien'
                                                        options={dataEmployee}
                                                        value={values.idNhanVien}
                                                        onChange={(selectedOptions) => {
                                                            if (selectedOptions.find(option => option.value == 'Chọn tất cả')) {
                                                              // Thực hiện hành động khi chọn 'Chọn tất cả'
                                                              // Ví dụ: Chọn tất cả các tùy chọn khác
                                                              const selectedWithoutAll = dataEmployee.filter(option => option.value != 'Chọn tất cả');
                                                              console.log(selectedWithoutAll)
                                                              setFieldValue('idNhanVien', selectedWithoutAll);
                                                            } else {
                                                                console.log(selectedOptions)
                                                              setFieldValue('idNhanVien', selectedOptions);
                                                            }
                                                          }}
                                                        onBlur={handleBlur}

                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                </div>


                                            </div>
                                            <div className='grid grid-cols-1 mb-6'>
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor='noteDepartment'>
                                                    Nội dung
                                                </label>
                                                {errors.content && touched.content ? (<div className='text-sm text-red-700 mb-1'>{errors.content}</div>) :
                                                    (<div className='mb-3'></div>)
                                                }
                                                <div className='h-52 md:h-40'>
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={values.content}
                                                        onChange={(e) => {
                                                            setFieldValue('content', e)
                                                        }}
                                                        onBlur={(e) => {
                                                            if (e.index == 0) {
                                                                setFieldValue('content', "")
                                                            }
                                                        }}
                                                        id='content'

                                                        style={{
                                                            height: '130px'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center mb-4">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                    Tạo thông báo
                                                </button>
                                            </div>
                                        </form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NotificationCreate;