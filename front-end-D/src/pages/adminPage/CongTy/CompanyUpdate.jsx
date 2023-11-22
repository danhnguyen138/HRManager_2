import React from 'react'
import icon_congty from 'data/icon-enterprise.png';
import { useStateContext } from "../../../context/ContextProvider";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import InputText from "components/input/InputText";
import { Formik, Field } from 'formik';
const updateCompany = yup.object().shape({
    MaDonVi: yup.string().matches(/^[0-9]+$/, 'Mã đơn vị chỉ bao gồm chữ số').required('Xin nhập mã đơn vị'),
    TenDonVi: yup.string().required('Xin nhập tên đơn vị'),
    DiaChi: yup.string().required('Xin nhập địa chỉ'),
    DienThoai: yup.string().matches(/^[0-9]+$/, 'Số điện thoại chỉ bao gồm chữ số').required('Xin nhập số điện thoại'),
    Fax: yup.string().matches(/^[0-9]+$/, 'Fax chỉ bao gồm chữ số').required('Xin nhập số fax'),
    Website: yup.string().url('Vui lòng nhập địa chỉ url hợp lệ').required('Xin địa chỉ website'),
    Email: yup.string().email('Hãy nhập định dạng email').required('Xin nhập email'),
    LinhVuc: yup.string().required('Xin chọn lĩnh vực'),
    MaSoThue: yup.string().matches(/^[0-9]+$/, 'Mã số thuế chỉ bao gồm chữ số').required('Xin nhập mã số thuế'),
    NganHang: yup.string().required('Xin nhập tên ngân hàng'),
    SoTaiKhoan: yup.string().matches(/^[0-9]+$/, 'Số tài khoảng bao gồm chữ số').required('Xin nhập số tài khoản'),
    DiaBan: yup.string().required('Xin chọn danh mục địa bàn')
})
const CompanyUpdate = () => {
    const token = useSelector(state => state.token);
    const { showNotification } = useStateContext();
    const navigate = useNavigate();
    const [getDataCompany, setGetDataCompany] = useState(null);
    const getCompany = async () => {
        await fetch(`/api/admin/congty`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.error) {
                    showNotification('error', resData.error)
                } else {
                    setGetDataCompany(resData.getCongTy)
                }
            }
        )
    }
    useEffect(() => {
        getCompany();
    }, []);
    if (!getDataCompany) return null;
    console.log(getDataCompany)
    const initialValues = {
        MaDonVi: getDataCompany.MaDonVi,
        TenDonVi: getDataCompany.TenDonVi,
        DiaChi: getDataCompany.DiaChi,
        DienThoai: getDataCompany.DienThoai,
        Fax: getDataCompany.Fax,
        Website: getDataCompany.Website,
        Email: getDataCompany.Email,
        LinhVuc: getDataCompany.LinhVuc,
        MaSoThue: getDataCompany.MaSoThue,
        NganHang: getDataCompany.NganHang,
        SoTaiKhoan: getDataCompany.SoTK,
        DiaBan:getDataCompany.DiaBan
    }
    const handleSubmit = async (values) => {
        console.log(values)
        await fetch(`/api/admin/congty/update`, {
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
                    navigate(`/admin/company`)
                }
            }
        )
    }
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Cập nhật công ty</h1>
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
                                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">Một số thông tin công ty</h5>
                                {/* <p className="block antialiased font-sans text-sm leading-normal font-normal">Developer</p> */}
                            </div>
                        </div>

                        <div className="flex justify-center text-center">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/company')}
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
                                    validationSchema={updateCompany}
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
                                                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                    <InputText
                                                        title="Mã đơn vị"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.MaDonVi}
                                                        name="MaDonVi"
                                                        type='text'
                                                        touched={touched.MaDonVi}
                                                        errors={errors.MaDonVi}
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />

                                                    <InputText
                                                        title='Tên đơn vị'
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        name='TenDonVi'
                                                        type='text'
                                                        errors={errors.TenDonVi}
                                                        touched={touched.TenDonVi}
                                                        value={values.TenDonVi}
                                                        className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                    />


                                                </div>
                                                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                    <InputText
                                                        title="Địa chỉ"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        errors={errors.DiaChi}
                                                        touched={touched.DiaChi}
                                                        value={values.DiaChi}
                                                        name="DiaChi"
                                                        type='text'
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />

                                                    <InputText
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        errors={errors.DienThoai}
                                                        touched={touched.DienThoai}
                                                        value={values.DienThoai}
                                                        title='Điện thoại'
                                                        name='DienThoai'
                                                        type='text'
                                                        className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                    />

                                                </div>
                                                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                    <InputText
                                                        title="Fax"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        errors={errors.Fax}
                                                        touched={touched.Fax}
                                                        value={values.Fax}
                                                        name="Fax"
                                                        type='text'
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                    <InputText
                                                        title="Website"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        errors={errors.Website}
                                                        touched={touched.Website}
                                                        value={values.Website}
                                                        name="Website"
                                                        type='text'
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />

                                                </div>
                                                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                    <InputText
                                                        title="Email"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        errors={errors.Email}
                                                        touched={touched.Email}
                                                        value={values.Email}
                                                        name="Email"
                                                        type='text'
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                    <div className='mb-4'>
                                                        <label className=' block tetx-gray-700 font-bold mb-2'>Lĩnh vực</label>
                                                        {errors.LinhVuc && touched.LinhVuc ? (<div className='text-sm text-red-700 mb-1'>{errors.LinhVuc}</div>) :
                                                            (<div className='mb-3'></div>)
                                                        }
                                                        <Field
                                                            as="select" name='LinhVuc' value={values.LinhVuc} className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        >
                                                            <option value=''>
                                                                ---Lựa chọn lĩnh vực---
                                                            </option>
                                                            <option value='Sản xuất'>Sản xuất</option>
                                                            <option value='Thương mại'>Thương mại</option>
                                                            <option value='Dịch vụ'>Dịch vụ</option>
                                                            <option value='Xây dựng'>Xây dựng</option>
                                                            <option value='Khác'>Khác</option>
                                                        </Field>
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
                                                    <InputText
                                                        title="Mã số thuế"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        errors={errors.MaSoThue}
                                                        touched={touched.MaSoThue}
                                                        value={values.MaSoThue}
                                                        name="MaSoThue"
                                                        type='text'
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                    <InputText
                                                        title="Ngân hàng"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        errors={errors.NganHang}
                                                        touched={touched.NganHang}
                                                        value={values.NganHang}
                                                        name="NganHang"
                                                        type='text'
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                    <InputText
                                                        title="Số tài khoản"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        errors={errors.SoTaiKhoan}
                                                        touched={touched.SoTaiKhoan}
                                                        value={values.SoTaiKhoan}
                                                        name="SoTaiKhoan"
                                                        type='text'
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />

                                                </div>
                                                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                    <div className='mb-4'>
                                                        <label className=' block tetx-gray-700 font-bold mb-2'>Địa bàn công ty thuộc</label>
                                                        {errors.DiaBan && touched.DiaBan ? (<div className='text-sm text-red-700 mb-1'>{errors.DiaBan}</div>) :
                                                            (<div className='mb-3'></div>)
                                                        }
                                                        <Field
                                                            as="select" name='DiaBan' value={values.DiaBan} className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        >
                                                            <option value=''>
                                                                ---Lựa chọn danh mục địa bàn---
                                                            </option>
                                                            <option value='I'>Vùng I</option>
                                                            <option value='II'>Vùng II</option>
                                                            <option value='III'>Vùng III</option>
                                                            <option value='IV'>Vùng IV</option>
                                                        </Field>
                                                    </div>
                                                </div>

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
        </div>
    );
}

export default CompanyUpdate
