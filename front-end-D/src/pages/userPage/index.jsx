import React from 'react'
import { Route, Routes} from 'react-router-dom';
import { useSelector } from "react-redux";
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";
import { useStateContext } from 'context/ContextProvider';
import "../../App.css";
import Home from './Pages/TrangChu/Home.jsx';
import ChangePassword from './Pages/MatKhau/ChangePassword.jsx';
import Contract from './Pages/HopDong/Contract.jsx';
import Calendar from './Pages/ChamCong/Calendar.jsx';
import PhanCong from './Pages/PhanCong/PhanCong';
import PhanCongUser from './Pages/PhanCong/PhanCongUser.jsx';
import Insurance from './Pages/BaoHiem/Insurance.jsx';
import Profile from './Pages/ThongTin/Profile.jsx';
import Notification from './Pages/ThongBao/Notification.jsx';
import BangLuongList from './Pages/BangLuong/BangLuongList';
import NotificationDetail from './Pages/ThongBao/NotificationDetail.jsx';

const UserPage = () => {
  const { activeMenu } = useStateContext();
  const ChucVu= useSelector((state)=>{
    if (state.user.ChucVu){   
     return state.user.ChucVu.TenChucVu         
   }else{
     return false;
   }
 });

  return (
    <div className="dashboard overflow-hidden">
   
        <div className='flex relative'>
          {
            activeMenu ? (
              <div className='w-72 fixed sidebar bg-white'>
                <SideBar />
              </div>
            ) : (
              <div className='w-0'>
                <SideBar />
              </div>
            )
          }
          <div className={
            activeMenu ? 'bg-main-bg min-h-screen md:ml-72 w-full overflow-hidden'
              : ' bg-main-bg w-full min-h-screen flex-2 overflow-hidden'
          }>
            <div className="fixed md:static bg-main-bg navbar w-full">
              <NavBar />
            </div>
            <div>
              <Routes>
                <Route path="/dashboard" element={<Profile />} />
                <Route path="/" element={<Profile/>} />
                <Route path='/salary' element={<BangLuongList />} />               
                <Route path="/changepassword" element={<ChangePassword/>} />
                <Route path="/contract" element={<Contract />} />
                <Route path="/chamcong" element={<Calendar />} />
                <Route path="/phancong" element={ChucVu=='Trưởng phòng' ? <PhanCong/>:<PhanCongUser/>} />
                <Route path="/insurance" element={<Insurance />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/notificationdetail" element={<NotificationDetail />} />
              </Routes>
            </div>
          </div>
        </div>    
    </div>
  );
}

export default UserPage;
