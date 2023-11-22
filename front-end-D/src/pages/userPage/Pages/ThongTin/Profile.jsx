import React from 'react'
import avatar from 'data/avatar.jpg';
import { useStateContext } from "../../../../context/ContextProvider";
import { useState, useEffect } from 'react';
import { FaPen, FaDownload } from "react-icons/fa";
import { useSelector } from "react-redux";

const About = () => {
  const { currentColor, screenSize } = useStateContext();

  const user = useSelector((state) => {
    return state.user;
  })
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
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
              <img src={`/assets/${user.HinhAnh}`} alt="avatar" className='inline-block relative object-cover object-center 
                            w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
              <div>
                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">{user.HoTen}</h5>
                <p className="block antialiased font-sans text-sm leading-normal font-normal">{user.Email}</p>
              </div>
            </div>

            <div className="flex justify-center text-center">

            </div>


          </div>
          <div className="grid grid-cols-1 mb-12 px-4 ">
            <div className="bloc-tabs">
              <button
                className={toggleState === 1 ? "tabs active-tabs width-full" : "tabs w-full"}
                onClick={() => toggleTab(1)}
              >
                Thông tin cá nhân
              </button>


            </div>
            <div className="content-tabs">
              <div
                className={toggleState === 1 ? "content  active-content" : "content"}
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-8'>
                  <div>
                    <h4 className='font-bold text-xl mb-4'>I.Thông tin chung</h4>
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Họ và tên:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.HoTen}</p>
                    </div>
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Email:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.Email}</p>
                    </div>
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Ngày sinh:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.NgaySinh}</p>
                    </div>
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Giới tính:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.GioiTinh}</p>
                    </div>
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Hôn nhân:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.HonNhan}</p>
                    </div>
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Dân tộc:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.DanToc}</p>
                    </div>
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Quốc tịch:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.QuocTich}</p>
                    </div>
                    
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Tôn giáo:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.TonGiao}</p>
                    </div>
                   
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Phòng ban:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.PhongBan ? user.PhongBan.TenPB : ""}</p>
                    </div>
                   
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Chức vụ:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.ChucVu ? user.ChucVu.TenChucVu : ''}</p>
                    </div>
                    
                  </div>
                  <div>
                    <h4 className='font-bold text-xl mb-4'>II.Thông tin chi tiết</h4>
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Số điện thoại:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.SoDT}</p>
                    </div>
                   
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Quê quán:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.QueQuan}</p>
                    </div>
                    
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Nơi ở:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.NoiO}</p>
                    </div>
                  
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Hộ Khẩu:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.HoKhau}</p>
                    </div>
                    
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Số CCCD:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.CCCD}</p>
                    </div>
                    
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Ngày cấp:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.NgayCap}</p>
                    </div>
                
                    <div className='mb-2'>
                      <label className=' md:text-lg text-base font-bold'>Nơi cấp:</label>
                      <p className='inline ml-2 md:text-lg text-base'>{user.NoiCap}</p>
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

export default About;
