import React from 'react'
import icon_congty from 'data/icon-enterprise.png';
import { useStateContext } from "../../../context/ContextProvider";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from "yup";
import InputText from "components/input/InputText";
import SelectInput from 'components/input/SelectInput';
import { Formik, Field } from 'formik';
const updateLaw = yup.object().shape({
    SoQD: yup.string().required('Xin nhập số quyết định, nghị định chính phủ'),
    TenQD: yup.string().required('Xin nhập tiêu đề quyết định, nghị định chính phủ'),
    VungIThang: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').required('Xin nhập số tiền tối thiểu vùng I'),
    VungIIThang: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').required('Xin nhập số tiền tối thiểu vùng II'),
    VungIIIThang: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').required('Xin nhập số tiền tối thiểu vùng III'),
    VungIVThang: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').required('Xin nhập số tiền tối thiểu vùng IV'),
    VungIGio: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').required('Xin nhập số tiền tối thiểu vùng I'),
    VungIIGio: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').required('Xin nhập số tiền tối thiểu vùng II'),
    VungIIIGio: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').required('Xin nhập số tiền tối thiểu vùng III'),
    VungIVGio: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').required('Xin nhập số tiền tối thiểu vùng IV'),
    TenFile: yup.mixed().test('fileType', 'Chỉ được chọn file .doc hoặc .pdf', (value) => {
        if (!value) return true;
        return value && ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'application/pdf'].includes(value.type)
    }
    )
})

const LawUpdateId = () => {
    const token = useSelector(state => state.token);
    const { showNotification } = useStateContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const [getLuongToiThieu, setGetLuongToiThieu] = useState(null);
    const getToiThieu = async () => {
        await fetch(`/api/admin/luongtoithieu/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.error) {
                    navigate(`/admin/law`)
                    showNotification('error', resData.error)
                } else {
                    setGetLuongToiThieu(resData.getToiThieu)
                }
            }
        )
    }
    useEffect(() => {
        getToiThieu();
    }, []);
    if (!getLuongToiThieu) return null;
    const initialValues = {
        SoQD: getLuongToiThieu.SoQD,
        TenQD: getLuongToiThieu.TenQD,
        VungIThang: getLuongToiThieu.VungIThang,
        VungIIThang: getLuongToiThieu.VungIIThang,
        VungIIIThang: getLuongToiThieu.VungIIIThang,
        VungIVThang: getLuongToiThieu.VungIVThang,
        VungIGio: getLuongToiThieu.VungIGio,
        VungIIGio: getLuongToiThieu.VungIIGio,
        VungIIIGio: getLuongToiThieu.VungIIIGio,
        VungIVGio: getLuongToiThieu.VungIVGio,
        TenFile: '',
    }
    const handleSubmit = async(values) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        if (values.TenFile!='') {formData.append('TenFilePath', values.TenFile.name);}
        else{
            formData.append('TenFilePath', values.TenFile)
        }
        await fetch(
            `/api/admin/luongtoithieu/${id}/update`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }
        ).then(async (res) => {
            const messageRes = await res.json();
            if (messageRes.error) {
                showNotification('error', messageRes.error)
            } else {
                navigate(`/admin/law`)
                showNotification('success', messageRes.msg)
            }

        });
    }
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Cập nhật lương tối thiểu theo luật nhà nước</h1>
                </div>

            </div>
            <div className="relative mt-5 h-72 w-[92%] md:w-full mx-auto overflow-hidden rounded-xl 
        bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] 
        bg-cover bg-center">
                <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
            </div>
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white w-[85%] md:w-[90%]
        text-gray-700 shadow-md mx-auto -mt-20 mb-6 '>
                <div className="p-4">
                    <div className="mb-10 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <img src={icon_congty} alt="avatar" className='inline-block relative object-cover object-center 
                        w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
                            <div>
                                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">Một số thông tin cần điền</h5>
                            </div>
                        </div>

                        <div className="flex justify-center text-center">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/law')}
                                className="flex self-center bg-green-400 text-base text-white opacity-0.9 mr-3 p-3
                md:mr-0 
                hover:drop-shadow-xl rounded-xl  hover:bg-green-700"
                            >
                                Trở lại
                            </button>
                        </div>


                    </div>
                    <div className="grid grid-cols-1 mb-12 px-4">
                        <div>
                            <div className='relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none'>
                                <Formik
                                    onSubmit={handleSubmit}
                                    initialValues={initialValues}
                                    validationSchema={updateLaw}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleBlur,
                                        handleChange,
                                        handleSubmit,
                                        setFieldValue,

                                    }) => {

                                        return (
                                            <form className='bg-white w-full shadow-md p-3 rounded' onSubmit={handleSubmit}>
                                                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
                                                    <InputText
                                                        title="Số quyết định"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.SoQD}
                                                        name="SoQD"
                                                        type='text'
                                                        touched={touched.SoQD}
                                                        errors={errors.SoQD}
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                    <div className='col-span-2'>
                                                        <InputText
                                                            title='Tên quyết định'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            name='TenQD'
                                                            type='text'
                                                            errors={errors.TenQD}
                                                            touched={touched.TenQD}
                                                            value={values.TenQD}
                                                            className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-7 md:gap-6'>
                                                    <div className='col-span-1'>
                                                        <label className='md:text-base text-base font-bold '>Vùng</label>
                                                    </div>
                                                    <div className='col-span-3'>
                                                        <label className='md:text-base text-base font-bold '>Mức lương tối thiểu tháng (đồng/tháng)</label>
                                                    </div>
                                                    <div className='col-span-3'>
                                                        <label className='md:text-base text-base font-bold '>Mức lương tối thiểu giờ (đồng/giờ)</label>
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-7 gap-3 mb-1'>
                                                    <div className='col-span-1 items-center flex'>
                                                        <p className='md:text-base text-base'>Vùng I</p>
                                                    </div>
                                                    <div className='col-span-3 flex justify-start'>
                                                        <InputText
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            errors={errors.VungIThang}
                                                            touched={touched.VungIThang}
                                                            value={values.VungIThang}
                                                            name="VungIThang"
                                                            type='text'
                                                            className="shadow appearance-none border w-full border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div className='col-span-3 flex justify-start'>
                                                        <InputText
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            errors={errors.VungIGio}
                                                            touched={touched.VungIGio}
                                                            value={values.VungIGio}
                                                            name="VungIGio"
                                                            type='text'
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-7 gap-3 mb-1'>
                                                    <div className='col-span-1 items-center flex'>
                                                        <p className='md:text-base text-base'>Vùng II</p>
                                                    </div>
                                                    <div className='col-span-3 flex justify-start'>
                                                        <InputText
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            errors={errors.VungIIThang}
                                                            touched={touched.VungIIThang}
                                                            value={values.VungIIThang}
                                                            name="VungIIThang"
                                                            type='text'
                                                            className="shadow appearance-none border w-full border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div className='col-span-3 flex justify-start'>
                                                        <InputText
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            errors={errors.VungIIGio}
                                                            touched={touched.VungIIGio}
                                                            value={values.VungIIGio}
                                                            name="VungIIGio"
                                                            type='text'
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-7 gap-3 mb-1'>
                                                    <div className='col-span-1 items-center flex'>
                                                        <p className='md:text-base text-base'>Vùng III</p>
                                                    </div>
                                                    <div className='col-span-3 flex justify-start'>
                                                        <InputText
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            errors={errors.VungIIIThang}
                                                            touched={touched.VungIIIThang}
                                                            value={values.VungIIIThang}
                                                            name="VungIIIThang"
                                                            type='text'
                                                            className="shadow appearance-none border w-full border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div className='col-span-3 flex justify-start'>
                                                        <InputText
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            errors={errors.VungIIIGio}
                                                            touched={touched.VungIIIGio}
                                                            value={values.VungIIIGio}
                                                            name="VungIIIGio"
                                                            type='text'
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-7 gap-3 mb-1'>
                                                    <div className='col-span-1 items-center flex'>
                                                        <p className='md:text-base text-base'>Vùng IV</p>
                                                    </div>
                                                    <div className='col-span-3 flex justify-start'>
                                                        <InputText
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            errors={errors.VungIVThang}
                                                            touched={touched.VungIVThang}
                                                            value={values.VungIVThang}
                                                            name="VungIVThang"
                                                            type='text'
                                                            className="shadow appearance-none border w-full border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div className='col-span-3 flex justify-start'>
                                                        <InputText
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            errors={errors.VungIVGio}
                                                            touched={touched.VungIVGio}
                                                            value={values.VungIVGio}
                                                            name="VungIVGio"
                                                            type='text'
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                    </div>
                                                </div>

                                                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                    <InputText
                                                        title='Chọn file'
                                                        type='file'
                                                        name='TenFile'
                                                        id='TenFile'
                                                        values={values.TenFile}
                                                        onChange={e => setFieldValue('TenFile', e.currentTarget.files[0])}
                                                        onBlur={handleBlur}
                                                        errors={errors.TenFile}
                                                        touched={touched.TenFile}
                                                        className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                    />
                                                </div>
                                                <p className='mb-2 text-red-500'>(*) Lưu ý: Vì văn bản liên quan đến luật pháp nên mọi thông tin cần kiểm tra chính xác trước khi nhập để không vi phạm pháp luật Việt Nam</p>
                                                <div className="flex items-center justify-center mb-4">
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                        Cập nhật thông tin
                                                    </button>

                                                </div>
                                            </form>
                                        )
                                    }
                                    }

                                </Formik>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default LawUpdateId
