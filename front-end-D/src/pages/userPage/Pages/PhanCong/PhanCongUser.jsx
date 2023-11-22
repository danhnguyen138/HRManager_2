import React, { useState, useEffect } from 'react';
import { Header } from '../../components';
const moment = require('moment');
import "moment/locale/vi";
moment.locale('vi');
import { useSelector } from "react-redux";
import { useStateContext } from 'context/ContextProvider';
import io from 'socket.io-client';

const dangcho = "justify-center items-center rounded-lg border bg-red-500 cursor-pointer text-sm font-light px-2 ";
const dangthuchien = "justify-center items-center rounded-lg border bg-yellow-500 cursor-pointer text-sm font-light px-2";
const dahoanthanh = "justify-center items-center rounded-lg border bg-green-500 cursor-pointer text-sm font-light px-2";
function getMondayOfWeek(year, weekNumber) {
  return moment().year(year).isoWeek(weekNumber).startOf('isoWeek').toDate();
}
function getSaturdayOfWeek(year, weekNumber) {
  return moment().year(year).isoWeek(weekNumber).startOf('isoWeek').add(5, 'days').toDate();
}
function formatday(day) {
  const arr = day.split('/');
  const newStr = arr.join('-');
  return newStr; // "3-5-2023"
}
function increaseDay(day, index) {
  let parts = day.split("/");
  let date = new Date(parts[2], parts[1] - 1, parts[0]);
  // Cộng thêm một ngày bằng phương thức setDate()
  date.setDate(date.getDate() + index);

  // Định dạng lại chuỗi ngày thành dạng "dd/mm/yyyy"
  let newDateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return newDateString;
}
// Sử dụng hàm để lấy ngày Monday trong tuần hiện tại
const today = new Date();
const monday = getMondayOfWeek(2023, 17);
const getCurrentWeek = () => {
  const now = new Date();
  const startOfWeek = new Date(now.getFullYear(), 0, 1);
  const currentWeek = Math.ceil((((now - startOfWeek) / 86400000) + startOfWeek.getDay() + 1) / 7);


  return currentWeek;
};
export default function PhanCongUser() {

  const user = useSelector(state => state.user);// Lay token kiem tra xac thuc
  const token = useSelector((state) => state.token);
  const { showNotification } = useStateContext();

  const weekOptions = [];
  const currentWeek = getCurrentWeek();
  const currentYear = new Date().getFullYear();
  const start_Date = getMondayOfWeek(currentYear, currentWeek);
  const end_Date = getSaturdayOfWeek(currentYear, currentWeek);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [tiendo, setTienDo] = useState(true);
  const [startDate, setStartDate] = useState(start_Date.toLocaleDateString(('vi-VN')))
  const [endDate, setEndDate] = useState(end_Date.toLocaleDateString(('vi-VN')));
  const [danhsachcongviec, setDanhsachCongViec] = useState(Array(6).fill([]));
  const [tiendocongviec, setTienDoCongViec] = useState(Array(6).fill([]));
  const [idcongviec, setIDCongViec] = useState(Array(6).fill([]));
  const [kpis, setKPIs] = useState(Array(6).fill(null));

  const fetchData = async () => {
    try {
      const email = user.Email;
      const promises = []; // khởi tạo mảng promises để lưu các promise từ việc gọi API
      for (let i = 0; i < 6; i++) {
        const ngayphancong = (increaseDay(startDate, i));
        promises.push(fetch(`/api/user/phancong/${email}/${formatday(ngayphancong)}/${formatday(startDate)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        })); // thêm promise từ việc gọi API vào mảng promises
      }
      const results = await Promise.all(promises);
      const jsonResults = await Promise.all(results.map(async res => {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return res.json();
        } else {
          console.log('Kết quả không phải là JSON:', res);
          return null; // hoặc giá trị mặc định phù hợp
        }
      }));
      const expectedArray = [null, null, null, null, null, null];
      const expectedJSON = JSON.stringify(expectedArray);
      const resultsJSON = JSON.stringify(jsonResults);
      if (expectedJSON === resultsJSON) {
        console.log('null')
        setKPIs((Array(6).fill(null)));
        setDanhsachCongViec((Array(6).fill([]))); // gán giá trị cho mảng resultArray
        setTienDoCongViec((Array(6).fill([])));
        setIDCongViec((Array(6).fill([])));
      }
      else {
        console.log(jsonResults)
        const tenCVs = jsonResults.map((t) => t.map(ten => (ten.TenCV)));
        const tiendoCVs = jsonResults.map((t) => t.map(tiendo => (tiendo.TienDo)));
        const ids = jsonResults.map((t) => t.map(id => (id.ID)));
        const kpis = jsonResults.map((t) => t.map(kpi => (kpi.KPI)));
        setKPIs(kpis);
        setDanhsachCongViec(tenCVs); // gán giá trị cho mảng resultArray
        setTienDoCongViec(tiendoCVs);
        setIDCongViec(ids);

      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    const socket = io('http://localhost:9001', { transports: ['websocket', 'polling', 'flashsocket'] });
    console.log(socket)
    socket.on('phancong', (data) => {
      if (data) {
        console.log(data)
        fetchData();
      }
      console.log('Nhận thông báo:', data);
    });

    return () => {
      socket.disconnect(); // Ngắt kết nối khi component bị hủy
    };
  }, [startDate]);

  const handleOnclick = async (event) => {
    const id = (event.target.id)
    const value = (event.target.value)
    await fetch(`/api/user/updatephancong/${id}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ value }),
      }
    ).then(async (res) => {
      const messageRes = await res.json();
      if (messageRes.error) {
        showNotification('error', messageRes.error)
      } else {
        showNotification('success', messageRes.msg)
      }

    });
    fetchData();
  }
  const handleWeekChange = (event) => {
    const selectedWeek = event.target.value;
    setSelectedWeek(selectedWeek);
    const startDate = getMondayOfWeek(currentYear, selectedWeek);
    const endDate = getSaturdayOfWeek(currentYear, selectedWeek);
    setStartDate(startDate.toLocaleDateString(('vi-VN')));
    setEndDate(endDate.toLocaleDateString(('vi-VN')));
  };
  const weeksInYear = (year) => {
    const yearEnd = new Date(year, 11, 31);
    const daysInYear = (yearEnd - new Date(year, 0, 1)) / 86400000;
    return Math.ceil((daysInYear + 1) / 7);
  };
  const totalWeeksInYear = weeksInYear(currentYear);
  for (let i = 1; i <= totalWeeksInYear; i++) {
    weekOptions.push({ label: `Tuần ${i}`, value: i });
  }
  return (
    <div className="bg-white border shadow-sm m-2 z mt-24 p-2 md:p-10 rounded-3xl">
      <Header title="Phân Công" />
      <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
        <div className='mt-12 mb-8 flex flex-col gap-12'>
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div className='p-6 px-0 pt-0 pb-2'>
              <div>
                <div>
                  <div className='phancongtime'>
                    <select onChange={handleWeekChange}>
                      {weekOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div>
                      <label>Ngày bắt đầu: </label>
                      <input type="text" value={startDate} readOnly />
                    </div>
                    <div>
                      <label>Ngày kết thúc: </label>
                      <input type="text" value={endDate} readOnly />
                    </div>

                  </div>
                  {

                    <div style={{ display: "flex" }}>
                      {[...Array(6)].map((_, index) => (
                        <div className='ngayphancong rounded-md bg-cyan-600 text-slate-100' key={index} style={{ flex: 1, textAlign: "center" }}>
                          {moment().startOf('isoWeek').add(index, "days").format("dddd").charAt(0).toUpperCase()
                            + moment().startOf('isoWeek').add(index, "days").format("dddd").slice(1)
                          }
                          <div className='text-slate-100 '>
                            {increaseDay(startDate, index)}
                          </div>
                          <div className='' >
                            {danhsachcongviec[index].map((_, i) => (
                              <div className='bg-cyan-50 text-slate-950 ' key={[index][i]}>
                                <div className='flex gap-3 px-2 mb-3 '>
                                  <p className=" flex-auto sm:text-sm sm:leading-6 font-medium"  >
                                    {(danhsachcongviec[index][i])}
                                  </p>
                                  {(tiendocongviec[index][i]) != "Đã hoàn thành" && <button
                                    className="justify-center items-center rounded-lg border bg-blue-500 cursor-pointer hover:bg-blue-700 text-sm text-slate-100"
                                    id={(idcongviec[index][i])}
                                    value={(tiendocongviec[index][i])}
                                    onClick={handleOnclick}
                                  >
                                    {(tiendocongviec[index][i]) == "Đang chờ" ? "Bắt Đầu" : (tiendocongviec[index][i]) == "Đang thực hiện" ? "Hoàn Thành" : null}
                                  </button>}
                                </div>
                                <div className='flex gap-3 px-2 mb-3'>
                                  <p className="flex-auto  sm:text-sm sm:leading-6 font-medium text-left"  >
                                    Tiến Độ
                                  </p>
                                  <button
                                    className={(tiendocongviec[index][i]) == "Đang chờ" ? dangcho : (tiendocongviec[index][i]) == "Đang thực hiện" ? dangthuchien : dahoanthanh}
                                  >
                                    {(tiendocongviec[index][i])}
                                  </button>
                                </div>
                                <div className='flex gap-3 px-2 mb-3'>
                                  <p className="flex-auto  sm:text-sm sm:leading-6 font-medium text-left"  >
                                    Đánh giá
                                  </p>
                                  <button
                                    className={(kpis[index][i]) < 50 ? dangcho : (kpis[index][i]) < 80 ? dangthuchien : dahoanthanh}
                                  >
                                    {(kpis[index][i]) ? (kpis[index][i]) + "%" : "Chưa có đánh giá"}
                                  </button>
                                </div>
                              </div>

                            ))

                            }

                          </div>


                        </div>
                      ))}
                    </div>

                  }
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
