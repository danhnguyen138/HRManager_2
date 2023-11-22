import React from 'react'
import Dashboard from './Dashboard.jsx';
import User from './User/User.jsx';
import UserList from './User/UserList.jsx';
import CreateUser from './User/UserCreate.jsx';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";
import { useStateContext } from 'context/ContextProvider';
import "../../App.css";
import LawView from './CongTy/LawView.jsx';
import ContractList from './HopDong/ContractList.jsx';
import ContractUser from './HopDong/ContractUser.jsx';
import ContractCreate from './HopDong/ContractCreate.jsx';
import ContractUpdate from './HopDong/ContractUpdate.jsx'
import DegreeList from './BangCap/DegreeList.jsx';
import DegreeUser from './BangCap/DegreeInfo.jsx';
import DegreeCreate from './BangCap/DegreeCreate.jsx';
import DegreeUpdate from './BangCap/DegreeUpdate.jsx';
import DepartmentCreate from './PhongBan/DepartmentCreate.jsx';
import DepartmentList from './PhongBan/DepartmentList.jsx';
import DepartmentUpdate from './PhongBan/DepartmentUpdate.jsx';
import DepartmentView from './PhongBan/DepartmentView.jsx';
import PositionCreate from './ChucVu/PositionCreate.jsx';
import PositionList from './ChucVu/PositionList.jsx';
import PositionUpdate from './ChucVu/PositionUpdate.jsx';
import UserUpdate from './User/UserUpdate.jsx';
import BonusList from './KhenThuong/BonusList.jsx';
import BonusCreate from './KhenThuong/BonusCreate.jsx';
import BonusPersonalUpdate from './KhenThuong/BonusPersonalUpdate.jsx';
import PunishList from './KyLuat/PunishList.jsx';
import PunishCreate from './KyLuat/PunishCreate.jsx';
import PunishUpdate from './KyLuat/PunishUpdate.jsx';
import InsuranceCreate from './BaoHiem/InsuranceCreate.jsx';
import InsuranceView from './BaoHiem/InsuranceView.jsx';
import InsuranceList from './BaoHiem/InsuranceList.jsx';
import InsuranceUpdate from './BaoHiem/InsuranceUpdate.jsx';
import TimekeepingList from './ChamCong/TimekeepingList.jsx';
import TimekeepingUser from './ChamCong/TimekeepingUser.jsx';
import PhanCongList from './PhanCong/PhanCongList.jsx';
import PhanCongUser from './PhanCong/PhanCongUser.jsx';
import HistoryImport from './ChamCong/HistoryImport.jsx';
import NotificationList from './ThongBao/NotificationList.jsx';
import NotificationCreate from './ThongBao/NotificationCreate.jsx';
import NotificationUpdate from './ThongBao/NotificationUpdate.jsx';
import CompanyView from './CongTy/CompanyView.jsx';
import CompanyUpdate from './CongTy/CompanyUpdate.jsx';
import BangLuongList from './BangLuong/BangLuongList.jsx';
import BangLuongUser from './BangLuong/BangLuongUser.jsx';
import ChangePositionList from './User/ChangePositionList.jsx';
import BonusGroupUpdate from './KhenThuong/BonusGroupUpdate';
import LawUpdate from './CongTy/LawUpdate.jsx';
import LawUpdateId from './CongTy/LawUpdateId.jsx';
import WageView from './CongTy/WageView.jsx';
import WageUpdate from './CongTy/WageCreate.jsx'
import ChangeSalaryList from './ThayDoiLuong/ChangeSalaryList.jsx';
import ChangeSalaryUser from './ThayDoiLuong/ChangeSalaryUser.jsx';
const AdminPage = () => {
  const { activeMenu } = useStateContext();

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
              <Route path="/" element={<CompanyView />} />
              <Route path='/changesalary/:id' element={<ChangeSalaryUser />} />
              <Route path='/changesalary' element={<ChangeSalaryList />} />
              <Route path="/company" element={<CompanyView />} />
              <Route path='/wage' element={<WageView />} />
              <Route path='/wage/update' element={<WageUpdate />} />
              <Route path='/company/update' element={<CompanyUpdate />} />
              <Route path='/law/update' element={<LawUpdate />} />
              <Route path='/law/:id/update' element={<LawUpdateId />} />
              <Route path='/law' element={<LawView />} />
              <Route path="/userlist" element={<UserList />} />
              <Route path='/user/:id/changePosition' element={<ChangePositionList />} />
              <Route path='/user/:id/view' element={<User />} />
              <Route path='/user/create' element={<CreateUser />} />
              <Route path='/userlist/:id/update' element={<UserUpdate />} />
              <Route path="/contract" element={<ContractList />} />
              <Route path="/contract/:id" element={<ContractUser />} />
              <Route path="/contract/:id/create" element={<ContractCreate />} />
              <Route path='/contract/:id/update/:idHD' element={<ContractUpdate />} />
              <Route path="/degree" element={<DegreeList />} />
              <Route path="/degree/:id" element={<DegreeUser />} />
              <Route path="/degree/:id/create" element={<DegreeCreate />} />
              <Route path='/degree/:id/update/:idBC' element={<DegreeUpdate />} />
              <Route path='/department/create' element={<DepartmentCreate />} />
              <Route path='/department' element={<DepartmentList />} />
              <Route path='/department/:MaPB/update' element={<DepartmentUpdate />} />
              <Route path='/department/:MaPB/view' element={<DepartmentView />} />
              <Route path='/position/create' element={<PositionCreate />} />
              <Route path='/position' element={<PositionList />} />
              <Route path='/position/:id/update' element={<PositionUpdate />} />
              <Route path='/bonus' element={<BonusList />} />
              <Route path='/bonus/create' element={<BonusCreate />} />
              <Route path='/bonus/:id/updatePersonal' element={<BonusPersonalUpdate />} />
              <Route path='/bonus/:id/updateGroup' element={<BonusGroupUpdate />} />
              <Route path='/punish' element={<PunishList />} />
              <Route path='/punish/create' element={<PunishCreate />} />
              <Route path='/punish/:id/update' element={<PunishUpdate />} />
              <Route path='/insurance/create' element={<InsuranceCreate />} />
              <Route path='/insurance' element={<InsuranceList />} />
              <Route path='/insurance/:id' element={<InsuranceUpdate />} />
              <Route path='/insurance/:id/view' element={<InsuranceView />} />
              <Route path='/timekeeping' element={<TimekeepingList />} />
              <Route path='/phancong' element={<PhanCongList />} />
              <Route path='/timekeeping/:id' element={<TimekeepingUser />} />
              <Route path='/phancong/:id' element={<PhanCongUser />} />
              <Route path='/timekeeping/history' element={<HistoryImport />} />
              <Route path='/notification' element={<NotificationList />} />
              <Route path='/notification/create' element={<NotificationCreate />} />
              <Route path='/notification/:id/update' element={<NotificationUpdate />} />
              <Route path='/salary' element={<BangLuongList />} />
              <Route path='/salary/:id' element={<BangLuongUser />} />
            </Routes>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AdminPage;
