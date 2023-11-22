import React from 'react'
import avatar from 'data/avatar.jpg';
import icon_congty from 'data/icon-enterprise.png';
import { useStateContext } from "../../../context/ContextProvider";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const CompanyView = () => {
    const token = useSelector(state => state.token);
    const navigate= useNavigate();
    const { showNotification } = useStateContext();
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
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Thông tin công ty</h1>
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
                                onClick={()=>navigate(`/admin/company/update`)}
                                className="flex self-center bg-orange-400 text-base text-white opacity-0.9 mr-3 p-3
                    md:mr-0 
                    hover:drop-shadow-xl rounded-xl  "
                            >
                                <AiOutlineEdit className='self-center font-bold text-lg' />
                            </button>
                        </div>


                    </div>
                    <div className="grid grid-cols-1 mb-12 px-4 md:px-28">
                        <div>
                            <div className='relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none'>
                                <ul className="flex flex-col gap-2 p-0">
                                    <li className="flex items-center gap-2">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                            Mã đơn vị: 
                                        </p>
                                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                            {getDataCompany.MaDonVi}
                                        </p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                            Tên đơn vị:
                                        </p>
                                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                            {getDataCompany.TenDonVi}</p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                            Địa chỉ:
                                        </p>
                                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                            {getDataCompany.DiaChi}
                                        </p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                            Điện thoại:
                                        </p>
                                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                            {getDataCompany.DienThoai}
                                        </p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                            Fax:
                                        </p>
                                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                            {getDataCompany.Fax}
                                        </p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                            Website:
                                        </p>
                                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                            {getDataCompany.Website}
                                        </p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                            Email:
                                        </p>
                                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                            {getDataCompany.Email}
                                        </p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                            Lĩnh vực:
                                        </p>
                                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                            {getDataCompany.LinhVuc}
                                        </p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                            Mã số thuế:
                                        </p>
                                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                            {getDataCompany.MaSoThue}
                                        </p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                            Ngân hàng:
                                        </p>
                                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                            {getDataCompany.NganHang}
                                        </p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                            Số tài khoản:
                                        </p>
                                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                            {getDataCompany.SoTK}
                                        </p>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold capitalize">
                                            Danh mục địa bàn:
                                        </p>
                                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-500">
                                            {`Vùng ${getDataCompany.DiaBan}`}
                                        </p>
                                    </li>
                                </ul>

                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyView
