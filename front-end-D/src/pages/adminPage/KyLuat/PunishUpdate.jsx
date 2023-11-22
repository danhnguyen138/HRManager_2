import React, { useState, useEffect } from 'react';
import InputText from 'components/input/InputText';
import SelectInput from 'components/input/SelectInput';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { useParams } from 'react-router-dom';
import { useStateContext } from 'context/ContextProvider';
import * as yup from "yup";
const createPunishSchema = yup.object().shape({
    idNhanVien: yup.string().required('Xin chọn nhân viên'),
    SuViec: yup.string().required('Xin nhập sự việc kỷ luật'),
    MoTa: yup.string().required('Xin mô tả chi tiết về sự việc'),
    DiaDiem: yup.string().required('Xin nhập địa điểm xảy ra sự việc'),
    HinhThucKyLuat: yup.string().required('Xin nhập hình thức kỷ luật'),
    SoQD: yup.string().required('Xin nhập số quyết định kỷ luật'),
    NguoiBanHanh: yup.string().required('Xin nhập người ban hành'),
    NgayQD: yup.date().required('Xin chọn ngày ban hành quyết định'),
    ThoiGian: yup.date().required('Xin chọn thời gian xảy ra sự việc'),
    TrangThai: yup.string().required('Xin chọn trạng thái')
})
const PunishUpdate = () => {
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const {id}= useParams();
    const token = useSelector((state) => state.token);
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
    const [getDataPunish, setGetDataPunish] = useState(null);
    const getPunish = async () => {
        await fetch(`/api/admin/kyluat/${id}`, {
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
                    setGetDataPunish(resData)
                }
            })
    }
    useEffect(() => {
        getEmployee();
        getPunish();
    }, [])
    if (!getDataEmployee) return null;
    if (!getDataPunish) return null;
    
    let dataEmployee = []
    for (let i = 0; i < getDataEmployee.userlist.length; i++) {
        dataEmployee.push({
            value: getDataEmployee.userlist[i].id,
            label: getDataEmployee.userlist[i].HoTen
        })
    }
    console.log(getDataPunish)
    const initialValuePunish = {
        idNhanVien: getDataPunish.getKyLuat.NhanVien?getDataPunish.getKyLuat.NhanVien.id:'',
        SuViec: getDataPunish.getKyLuat.SuViec,
        MoTa: getDataPunish.getKyLuat.MoTa,
        DiaDiem: getDataPunish.getKyLuat.DiaDiem,
        ChungKien: getDataPunish.getKyLuat.ChungKien,
        TuongThuat: getDataPunish.getKyLuat.TuongThuat,
        HinhThucKyLuat: getDataPunish.getKyLuat.HinhThucKyLuat,
        SoQD: getDataPunish.getKyLuat.SoQD,
        NguoiBanHanh: getDataPunish.getKyLuat.NguoiBanHanh,
        NgayQD: getDataPunish.getKyLuat.NgayQD,
        ThoiGian: getDataPunish.getKyLuat.ThoiGian,
        TrangThai: getDataPunish.getKyLuat.TrangThai,
    }
    const handleSubmit = async (values) => {
        await fetch(`/api/admin/kyluat/${id}/update`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.error) {
                    showNotification('error', resData.error)
                } else {
                    showNotification('success', resData.msg)
                    navigate(`/admin/punish`)
                }
            }
        )
    }
    const handleReturn = async () => {
        navigate(`/admin/punish`)
    }

    return (
        <div className='mt-20 md:mt-8 mx-auto w-full md:w-[90%]'>
        <div className='flex flex-wrap lg:flex-nowrap justify-between '>
            <div className='p-4 text-xl md:text-3xl font-bold'>
                <h1>Cập nhật kỷ luật</h1>
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
                        {/* <img src={avatar} alt="avatar" className='inline-block relative object-cover object-center 
                w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
                <div>
                    <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">Nguyen Danh</h5>
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">Developer</p>
                </div> */}
                        <h2 className='pl-4 pt-3 text-2xl font-semibold'>Hãy điền thông tin kỷ luật</h2>
                    </div>
                    <button className='border rounded-lg border-slate-400 text-white text-base px-5 py-3 bg-green-500 hover:bg-green-700' onClick={handleReturn}>
                        Trở lại
                    </button>
                    {/* <div className="flex justify-center text-center">
                <button
                    type="button"
                    style={{ backgroundColor: currentColor }}
                    className="flex self-center text-base text-white opacity-0.9 mr-3 p-2 pr-3
        md:mr-0 md:py-3 md:px-4 md:pr-5
        hover:drop-shadow-xl rounded-xl  "
                >
                    <FaDownload className='self-center mr-1 md:mr-2' /> Download report
                </button>
            </div> */}
                </div>
                <div className='grid grid-cols-1 gap-12 mb-12'>
                    <div className='w-full'>
                        <Formik
                            onSubmit={handleSubmit}
                            initialValues={initialValuePunish}
                            validationSchema={createPunishSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                setFieldValue
                            }) => {

                                return (
                                    <form className='bg-white w-full shadow-md p-3 rounded' onSubmit={handleSubmit}>
                                        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                            <SelectInput
                                                title="Chọn nhân viên kỷ luật"
                                                id='idNhanVien'
                                                labelDefault={'---Lựa chọn nhân viên---'}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.idNhanVien}
                                                errors={errors.idNhanVien}
                                                touched={touched.idNhanVien}
                                                name='idNhanVien'
                                                options={dataEmployee}
                                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                            />
                                            <InputText
                                                title="Số quyết định"
                                                id='SoQD'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.SoQD}
                                                errors={errors.SoQD}
                                                touched={touched.SoQD}
                                                name='SoQD'
                                                type='text'
                                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                            />
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
                                            <InputText
                                                title="Ngày quyết định "
                                                id='NgayQD'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.NgayQD}
                                                errors={errors.NgayQD}
                                                touched={touched.NgayQD}
                                                name='NgayQD'
                                                type='date'
                                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                            />
                                            <div className='col-span-2'>
                                                <InputText
                                                    title="Bị xử lý kỷ luật về việc"
                                                    id='SuViec'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.SuViec}
                                                    errors={errors.SuViec}
                                                    touched={touched.SuViec}
                                                    name='SuViec'
                                                    type='text'
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                            <InputText
                                                title="Địa điểm xảy ra sự việc"
                                                id='DiaDiem'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.DiaDiem}
                                                errors={errors.DiaDiem}
                                                touched={touched.DiaDiem}
                                                name='DiaDiem'
                                                type='text'
                                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                            />
                                            <InputText
                                                title="Những người chứng kiến"
                                                id='ChungKien'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.ChungKien}
                                                errors={errors.ChungKien}
                                                touched={touched.ChungKien}
                                                name='ChungKien'
                                                type='text'
                                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                            />
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                            <InputText
                                                title="Ngày xảy ra sự việc"
                                                id='ThoiGian'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.ThoiGian}
                                                errors={errors.ThoiGian}
                                                touched={touched.ThoiGian}
                                                name='ThoiGian'
                                                type='date'
                                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                            />
                                        </div>
                                        <div className='grid grid-cols-1 mb-3'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor='CanCu'>
                                                Mô tả lại sự việc đã xảy ra
                                            </label>
                                            {errors.MoTa && touched.MoTa ? (<div className='text-sm text-red-700 mb-1'>{errors.MoTa}</div>) :
                                                (<div className='mb-3'></div>)
                                            }
                                            <Field
                                                id='MoTa'
                                                name='MoTa'
                                                as="textarea"
                                                value={values.MoTa}
                                                onChange={handleChange}
                                                rows={3}
                                                className='shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                            />
                                        </div>
                                        <div className='grid grid-cols-1 mb-3'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor='CanCu'>
                                                Hình thức kỷ luật nào được áp dụng cho người lao động?
                                            </label>
                                            {errors.HinhThucKyLuat && touched.HinhThucKyLuat ? (<div className='text-sm text-red-700 mb-1'>{errors.HinhThucKyLuat}</div>) :
                                                (<div className='mb-3'></div>)
                                            }
                                            <Field
                                                id='HinhThucKyLuat'
                                                name='HinhThucKyLuat'
                                                as="textarea"
                                                value={values.HinhThucKyLuat}
                                                onChange={handleChange}
                                                rows={3}
                                                className='shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                            />
                                        </div>
                                        <div className='grid grid-cols-1 mb-3'>
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor='CanCu'>
                                               Người lao động giải thích, tường thuật gì về sự việc đã xảy ra?
                                            </label>
                                            {errors.TuongThuat && touched.TuongThuat ? (<div className='text-sm text-red-700 mb-1'>{errors.TuongThuat}</div>) :
                                                (<div className='mb-3'></div>)
                                            }
                                            <Field
                                                id='TuongThuat'
                                                name='TuongThuat'
                                                as="textarea"
                                                value={values.TuongThuat}
                                                onChange={handleChange}
                                                rows={3}
                                                className='shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                            />
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                            <InputText
                                                title="Người ban hành"
                                                id='NguoiBanHanh'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.NguoiBanHanh}
                                                errors={errors.NguoiBanHanh}
                                                touched={touched.NguoiBanHanh}
                                                name='NguoiBanHanh'
                                                type='text'
                                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                            />
                                            <SelectInput
                                                title="Trạng thái kỷ luật"
                                                id='TrangThai'
                                                labelDefault={'---Lựa chọn trạng thái---'}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.TrangThai}
                                                errors={errors.TrangThai}
                                                touched={touched.TrangThai}
                                                name='TrangThai'
                                                options={[{
                                                    value:'Lên kế hoạch',
                                                    label:'Lên kế hoạch'
                                                },{
                                                    value:'Đang thực hiện',
                                                    label:'Đang thực hiện'
                                                },{
                                                    value:'Đã thực hiện',
                                                    label:'Đã thực hiện'
                                                }]}

                                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="flex items-center justify-center mb-4">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                Cập nhật kỷ luật
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

export default PunishUpdate
