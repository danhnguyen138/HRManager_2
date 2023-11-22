import React, { useEffect, useState, useMemo } from 'react';
import { Header } from '../../components';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { tr } from 'date-fns/locale';


const NotificationDetail = ()=> {
  const location = useLocation();
  const { idthongbao } = location.state;
  console.log(idthongbao);  
  const [dataTB, setDataTB] = useState([]);// Lay du lieu data tu api
  const token = useSelector(state => state.token);// Lay token kiem tra xac thucconst 
  const user = useSelector(state => state.user);// Lay token kiem tra xac thucconst 
  const getTB = async () => {
    try{
      const res = await fetch(`/api/user/notification/${user.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      const thongbao=data.getThongBao.thongbao
      const notification = thongbao.find(item => item.id == idthongbao);
      console.log(thongbao)
      console.log(notification);
      console.log(idthongbao)
      setDataTB(notification);
    }
    catch (error) {
      console.error(error);      
    }
    
  }
  useEffect(() => {
    try{
      getTB();
    }
    catch (error) {
      console.error(error);
      // Xử lý lỗi tại đây (ví dụ: hiển thị thông báo lỗi)
    }
    
  }, [])
  console.log(dataTB)
  //if(!dataTB) return null;
    return (
    <div id="notifi">
      <div className="bg-white border shadow-sm m-2 z mt-24 p-2 md:p-10 rounded-3xl">
        <Header title="Thông Báo" />
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
          <div className='flex flex-wrap lg:flex-nowrap justify-between '>
            
            <div className="flex justify-center text-center">
            </div>
          </div>
          <div className='mt-12 mb-8 flex flex-col gap-12'>
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
              <div className="relative flex justify-between bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                <h6 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-relaxed text-white">
                  Thông báo chi tiết
                </h6>
              </div>
              <div className='p-6 px-2 pt-0 pb-2'>
                <div className='text-sm font-bold'>Tiêu Đề :</div>
                 <div className='text-sm font-bold px-10'>{dataTB.TieuDe ? (dataTB.TieuDe):''}</div>
                
              </div>
              <div className='p-6 px-2 pt-0 pb-2'>
              <div className='text-sm font-bold '> Nội dung :</div>
               <div className='text-base font-normal px-10'>{dataTB.NoiDung ? (dataTB.NoiDung.slice(3, -4)):''}</div>                
              </div>
              <div className='p-6 px-2 pt-0 pb-2'>
              <div className='text-sm font-bold'> Thời Gian Gửi : </div>
                <div className='text-xs font-bold'> {dataTB.ThoiGianGui ? (dataTB.ThoiGianGui.substring(0, 10)):""}</div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default  NotificationDetail