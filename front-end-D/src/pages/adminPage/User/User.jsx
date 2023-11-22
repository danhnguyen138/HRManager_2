import React from 'react'
import avatar from 'data/avatar.jpg';
import { useStateContext } from "../../../context/ContextProvider";
import { useState, useEffect } from 'react';
import { FaPen, FaDownload } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "View.css";
const User = () => {
    const { currentColor, screenSize } = useStateContext();
    const { id } = useParams();
    const token = useSelector(state => state.token);
    const [getDataEmployee, setGetDataEmployee] = useState(null);
    const [toggleState, setToggleState] = useState(1);
    const { showNotification } = useStateContext();
    const navigate = useNavigate();
    const toggleTab = (index) => {
        setToggleState(index);
    };
    const [getDataHopDong, setGetDataHopDong] = useState(null)
    const getHopDong = async (id) => {
        await fetch(`/api/user/contract/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(
            async (res) => {
                const data = await res.json();
                if (data.error) {
                    showNotification('error', data.error);
                } else {
                    setGetDataHopDong(data)
                }
            }
        )
    }
  
    const getEmployee = async (id) => {
        await fetch(`/api/admin/danhsachnhanvien/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(
            async (res) => {
                const data = await res.json();
                if (data.error){
                    if (data.error=='Nhân viên không tồn tại hoặc đã bị xóa'){
                        navigate('/admin/userlist')
                    }
                    showNotification('error', data.error)
                }
                setGetDataEmployee(data);
            }
        )
    }
    useEffect(() => {
        getHopDong(id);
        getEmployee(id);


    }, []);
    if (!getDataEmployee) return null;
    if (!getDataHopDong) return null;
    console.log(getDataHopDong)
    console.log(getDataEmployee)
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Thông tin của bạn</h1>
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
                            <img src={`/assets/${getDataEmployee.HinhAnh}`} alt="avatar" className='inline-block relative object-cover object-center 
                            w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
                            <div>
                                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">{getDataEmployee.HoTen}</h5>
                                <p className="block antialiased font-sans text-sm leading-normal font-normal">{getDataEmployee.Email}</p>
                            </div>
                        </div>

                        <div className="flex justify-center text-center">
                            <button
                                type="button"
                                style={{ backgroundColor: currentColor }}
                                className="flex self-center text-base text-white opacity-0.9 mr-3 p-2 pr-3
                    md:mr-0 md:py-3 md:px-4 md:pr-5
                    hover:drop-shadow-xl rounded-xl  "
                                onClick={() => navigate(`/admin/userlist`)}
                            >
                                Trở lại
                            </button>
                        </div>


                    </div>
                    <div className="grid grid-cols-1 mb-12 px-4 ">
                        <div className="bloc-tabs">
                            <button
                                className={toggleState === 1 ? "tabs active-tabs " : "tabs "}
                                onClick={() => toggleTab(1)}
                            >
                                Thông tin cá nhân
                            </button>
                            <button
                                className={toggleState === 2 ? "tabs active-tabs " : "tabs "}
                                onClick={() => toggleTab(2)}
                            >
                                Thông tin công việc
                            </button>

                        </div>
                        <div className="content-tabs">
                            <div
                                className={toggleState === 1 ? "content  active-content" : "content"}
                            >
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-8'>
                                    <div>
                                        <h4 className='font-bold text-xl mb-4'>I.Thông tin chung</h4>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Họ và tên:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.HoTen}</p>
                                        </div>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Email:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.Email}</p>
                                        </div>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Ngày sinh:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.NgaySinh}</p>
                                        </div>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Giới tính:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.GioiTinh}</p>
                                        </div>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Hôn nhân:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.HonNhan}</p>
                                        </div>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Dân tộc:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.DanToc}</p>
                                        </div>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Quốc tịch:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.QuocTich}</p>
                                        </div>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Tôn giáo:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.TonGiao}</p>
                                        </div>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Loại nhân viên:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.LoaiNV?getDataEmployee.user.LoaiNV:''}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className='font-bold text-xl mb-4'>II.Thông tin chi tiết</h4>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Số điện thoại:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.SoDT}</p>
                                        </div>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Quê quán:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.QueQuan}</p>
                                        </div>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Nơi ở:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.NoiO}</p>
                                        </div>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Hộ Khẩu:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.HoKhau}</p>
                                        </div>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Số CCCD:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.CCCD}</p>
                                        </div>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Ngày cấp:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.NgayCap}</p>
                                        </div>
                                        <div className='mb-2 flex flex-start'>
                                            <p className='font-bold text-lg basis-1/3'>Nơi cấp:</p>
                                            <p className='text-lg basis-2/3'>{getDataEmployee.user.NoiCap}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={toggleState === 2 ? "content  active-content" : "content"}
                            >
                                <div className='p-1 px-3'>
                                    <h3 className='font-bold text-lg'>Thông tin công việc</h3>
                                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                        <div className='col-span-2'>
                                            <label className=' md:text-lg text-base font-bold'>Đơn vị làm việc:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getDataHopDong.getHD ? getDataHopDong.getHD.DiaChiLV : ''}</p>
                                        </div>
                                        {/* <div>
                                            <label className=' md:text-lg text-base font-bold'>Hộ khẩu:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>123</p>
                                        </div> */}
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                        <div>
                                            <label className=' md:text-lg text-base font-bold'>Phòng ban:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getDataEmployee.PhongBan ? getDataEmployee.PhongBan.TenPB : ''}</p>
                                        </div>
                                        <div>
                                            <label className=' md:text-lg text-base font-bold'>Chức vụ:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getDataEmployee.ChucVu ? getDataEmployee.ChucVu.TenChucVu : ''}</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                        <div>
                                            <label className=' md:text-lg text-base font-bold'>Hình thức trả lương:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getDataEmployee.isBacLuong==0 ? 'Trả lương theo lương chính' : 'Trả lương theo bậc lương'}</p>
                                        </div>
                                        <div>
                                            <label className=' md:text-lg text-base font-bold'>Chức vụ:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getDataEmployee.ChucVu ? getDataEmployee.ChucVu.TenChucVu : ''}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
