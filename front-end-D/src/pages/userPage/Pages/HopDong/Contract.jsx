import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Header } from '../../components';
import InputText from '../../components/input/InputText';
import { data } from "autoprefixer";

export default function Contract() {
  const token = useSelector((state) => state.token);
  const userid = useSelector((state) => state.user.id);
  const user = useSelector((state) => state.user);

  const [getDataDaiDien, setGetDataDaiDien] = useState(null);
  const getDaiDien = async () => {
    await fetch('/api/admin/daidienhopdong', {
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
          setGetDataDaiDien(resData.userDaiDien);
        }
      }
    )
  }
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
  const [getDataContract, setGetDataContract] = useState(null)
  const getContract = async (id) => {
    await fetch(`/api/user/contract/${id}`, {
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
          setGetDataContract(resData.getHD)
        }
      }
    )
  }
  useEffect(() => {
    getCompany();
    getDaiDien();
    getContract(user.id);
  }, [])
  if (!getDataDaiDien) return null;
  if (!getDataCompany) return null;
  if (!getDataContract) return (<div className="flex justify-center">Nhân viên chưa có hợp đồng</div>);
  console.log(getDataDaiDien)
  console.log(getDataContract)
  let dataDaiDien = getDataDaiDien.filter(item =>
    item.id === getDataContract.idDaiDien
  )
  console.log(dataDaiDien)

  return (
    <div className="bg-white border shadow-sm m-2 z mt-24 p-2 md:p-10 rounded-3xl">
      <Header title="Chi tiết hợp đồng" />
      <form className="bg-white w-full shadow-md p-3 rounded">
        <h3 className="text-xl font-semibold mb-3">I. Bên A</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3">
          <div className="col-span-2">
            <InputText
              title="Họ và tên"
              id="nameA"
              type="text"
              value={dataDaiDien[0].HoTen}
              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              disabled
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
          

            <InputText
              title="Chức Vụ"
              type="text"
              value={dataDaiDien[0].ChucVu.TenChucVu}
              disabled
              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            />
            <InputText
              title="Đại diện cho"
              type="text"
              value={getDataCompany.TenDonVi}
              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              disabled

            />
         

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
          <InputText
            title="Địa chỉ"
            id="address"
            type="text"
            value={getDataCompany.DiaChi}
            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            disabled

          />
          <InputText
            title="Số điện thoại"
            id="tel"
            type="text"
            value={dataDaiDien[0].SoDT}
            disabled
            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          />
        </div>
        <h3 className="text-xl font-semibold mb-3">II. Bên B</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3">
          <InputText
            title="Mã nhân viên"
            id="employeeCode"
            type="text"
            value={userid}
            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            disabled

          />
          <div className="col-span-2">
            <InputText
              title="Họ và tên"
              id="nameB"
              type="text"
              value={user.HoTen}
              disabled
              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="positionA">
              Chức vụ
            </label>
            <InputText
              disabled
              value={user.ChucVu.TenChucVu}
              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            />
          </div>
          <InputText
            title="Làm việc tại"
            id="department"
            value={user.PhongBan.TenPB}
            disabled
            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3">
          <InputText
            title="Số CCCD"
            id="CCCD"
            type="text"
            value={user.CCCD}
            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            disabled

          />

          <InputText
            title="Ngày Cấp"
            id="licenseDate"
            type="date"
            value={user.NgayCap}
            disabled
            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          />
          <InputText
            title="Tại"
            id="addressCCCD"
            type="text"
            value={user.NoiCap}
            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            disabled
          />
        </div>
        <h3 className="text-xl font-semibold mb-3">III. Thông tin hợp đồng</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3">
          <InputText
            title="Mã hợp đồng"
            id="contractCode"
            type="text"
            value={getDataContract ? getDataContract.MaHD : null}
            disabled
            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          />
          <div className="col-span-2">
            <InputText
              title="Tên hợp đồng"
              id="nameContract"
              type="text"
              value={getDataContract ? getDataContract.TenHD : null}
              disabled
              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3">
          <div className="col-span-2">
            <InputText
              title="Loại hợp đồng"
              id="typeContract"
              value={getDataContract ? getDataContract.LoaiHD : null}
              name="typeContract"
              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            />
          </div>
          {(
            <InputText
              title="Thời hạn hợp đồng"
              name="termContract"
              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              value={getDataContract ? getDataContract.ThoiHan : null}
            />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-2">
          <InputText
            title="Lương cơ bản"
            type="text"
            value={getDataContract ? getDataContract.LuongCoBan : null}
            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          />
          <InputText
            title="Cách trả lương"
            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            value={getDataContract ? getDataContract.CachTra : null}
          />
          <InputText
            title="Vào ngày"
            type="number"
            value={getDataContract ? getDataContract.VaoNgay : null}
            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 mb-3">
          <label className="block text-gray-700 font-bold mb-2">
            Ghi chú
          </label>
          <textarea rows={5} className="shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500">

          </textarea>
        </div>
      </form>
    </div>
  );
}
