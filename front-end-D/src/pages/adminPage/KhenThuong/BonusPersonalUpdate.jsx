import React, { useState, useEffect } from 'react';
import InputText from 'components/input/InputText';
import SelectInput from 'components/input/SelectInput';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { useStateContext } from 'context/ContextProvider';
import * as yup from "yup";
const createBonusPersonalSchema = yup.object().shape({
    MaKT: yup.string().required(''),
    CanCu: yup.string().required('Xin nhập căn cứ khen thưởng'),
    LyDo: yup.string().required('Xin nhập lý do khen thưởng'),
    HinhThuc: yup.string().required('Xin nhập hình thức khen thưởng'),
    SoQD: yup.string().required('Xin nhập số quyết định khen thưởng'),
    NgayQD: yup.date().default(new Date()).required('Xin chọn ngày ban hành quyết định'),
    NguoiBanHanh: yup.string().required('Xin nhập người ban hành'),
    Thang: yup.number().min(1, 'Giá trị phải từ 1 đến 12').max(12, 'Giá trị phải từ 1 đến 12').required('Xin nhập tháng khen thưởng'),
    TienThuong: yup.string().matches(/[0-9]+/, 'Xin nhập chữ số').required('Xin nhập số tiền thưởng'),
    idNhanVien: yup.string().required('Xin chọn nhân viên')
})
const BonusPersonalUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = useSelector((state) => state.token);
    const { showNotification } = useStateContext();
    const [getDataBonus, setGetDataBonus] = useState(null);
    const [getDataEmployee, setGetDataEmployee] = useState(null);
    const getBonusPersonal = async () => {
        await fetch(`/api/admin/khenthuongcanhan/${id}`, {
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
                    setGetDataBonus(resData.getKhenThuong)
                }
            })
    }
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
        getBonusPersonal();
    }, [])
    if (!getDataEmployee) return null;
    if (!getDataBonus) return null;
    console.log(getDataEmployee);
    console.log(getDataBonus);

    let dataEmployee = []
    for (let i = 0; i < getDataEmployee.userlist.length; i++) {
        dataEmployee.push({
            value: getDataEmployee.userlist[i].id,
            label: getDataEmployee.userlist[i].HoTen
        })
    }
    const initialValueBonus = {
        MaKT: getDataBonus.MaKT,
        CanCu: getDataBonus.CanCu,
        LyDo: getDataBonus.LyDo,
        HinhThuc: getDataBonus.HinhThuc,
        SoQD: getDataBonus.SoQD,
        NgayQD: getDataBonus.NgayQD,
        NguoiBanHanh: getDataBonus.NguoiBanHanh,
        Thang: getDataBonus.Thang,
        TienThuong: getDataBonus.TienThuong,
        idNhanVien: getDataBonus.idNhanVien
    }
    const handleSubmit = async (values) => {
        await fetch(`/api/admin/khenthuongcanhan/${id}/update`, {
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
                    navigate(`/admin/bonus`)
                }
            }
        )
    }
    const handleReturn = async () => {
        navigate(`/admin/bonus`)
    }


    return (
        <div className='mt-20 md:mt-8 mx-auto w-full md:w-[90%]'>
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-3xl font-bold'>
                    <h1>Cập nhật khen thưởng</h1>
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
                            <h2 className='pl-4 pt-3 text-2xl font-semibold'>Hãy điền thông tin khen thưởng</h2>
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
                                initialValues={initialValueBonus}
                                validationSchema={createBonusPersonalSchema}
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
                                                <InputText
                                                    title="Mã khen thưởng"
                                                    id='MaKT'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.MaKT}
                                                    errors={errors.MaKT}
                                                    touched={touched.MaKT}
                                                    name='MaKT'
                                                    disabled
                                                    type='text'
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
                                                    <SelectInput
                                                        title="Nhân viên khen thưởng"
                                                        id='idNhanVien'
                                                        labelDefault="---Lựa chọn nhân viên---"
                                                        onBlur={handleBlur}
                                                        errors={errors.idNhanVien}
                                                        touched={touched.idNhanVien}
                                                        onChange={handleChange}
                                                        value={values.idNhanVien}
                                                        options={dataEmployee}
                                                        name='idNhanVien'
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                </div>

                                            </div>
                                            <div className='grid grid-cols-1 mb-3'>
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor='CanCu'>
                                                    Căn cứ khen thưởng
                                                </label>
                                                {errors.CanCu && touched.CanCu ? (<div className='text-sm text-red-700 mb-1'>{errors.CanCu}</div>) :
                                                    (<div className='mb-3'></div>)
                                                }
                                                <Field
                                                    id='CanCu'
                                                    name='CanCu'
                                                    as="textarea"
                                                    value={values.CanCu}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className='shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                />
                                            </div>
                                            <div className='grid grid-cols-1 mb-3'>
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor='CanCu'>
                                                    Lý do khen thưởng
                                                </label>
                                                {errors.LyDo && touched.LyDo ? (<div className='text-sm text-red-700 mb-1'>{errors.LyDo}</div>) :
                                                    (<div className='mb-3'></div>)
                                                }
                                                <Field
                                                    id='LyDo'
                                                    name='LyDo'
                                                    as="textarea"
                                                    value={values.LyDo}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className='shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                />
                                            </div>
                                            <div className='grid grid-cols-1 mb-3'>
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor='CanCu'>
                                                    Hình thức khen thưởng
                                                </label>
                                                {errors.HinhThuc && touched.HinhThuc ? (<div className='text-sm text-red-700 mb-1'>{errors.HinhThuc}</div>) :
                                                    (<div className='mb-3'></div>)
                                                }
                                                <Field
                                                    id='HinhThuc'
                                                    name='HinhThuc'
                                                    as="textarea"
                                                    value={values.HinhThuc}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className='shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                />
                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title="Tháng thưởng"
                                                    id='Thang'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.Thang}
                                                    errors={errors.Thang}
                                                    touched={touched.Thang}
                                                    name='Thang'

                                                    type='number'
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                <InputText
                                                    title="Tiền thưởng (VND)"
                                                    id='TienThuong'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.TienThuong}
                                                    errors={errors.TienThuong}
                                                    touched={touched.TienThuong}
                                                    name='TienThuong'
                                                    type='text'
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>

                                                <div className='col-span-2'>
                                                    <InputText
                                                        title="Người ban hành"
                                                        id='NguoiBanHanh'

                                                        onBlur={handleBlur}
                                                        errors={errors.NguoiBanHanh}
                                                        touched={touched.NguoiBanHanh}
                                                        onChange={handleChange}
                                                        value={values.NguoiBanHanh}

                                                        name='NguoiBanHanh'
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                </div>

                                            </div>
                                            <div className="flex items-center justify-center mb-4">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                    Cập nhật khen thưởng
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

export default BonusPersonalUpdate
