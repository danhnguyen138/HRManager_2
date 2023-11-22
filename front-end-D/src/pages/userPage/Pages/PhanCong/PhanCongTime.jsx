import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
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
const PhanCongTime = (props) => {
  const token = useSelector((state) => state.token);
  const { showNotification } = useStateContext();
  const [phancong, setPhanCong] = useState(false);
  const [kpi, setKPI] = useState(0);
  const [error, seterror] = useState('');
  const [danhgiacongviec, setDanhGiaCongViec] = useState(Array(6).fill().map(() => Array(10).fill(false)));
  const [danhgia, setDanhGia] = useState(false);
  const [showTextbox, setShowTextbox] = useState(Array(6).fill(false));
  const [congviec, setCongViec] = useState(Array(6).fill(false));
  const [danhsachcongviec, setDanhsachCongViec] = useState(Array(6).fill([]));
  const [tiendocongviec, setTienDoCongViec] = useState(Array(6).fill([]));
  const [kpis, setKPIs] = useState(Array(6).fill(null));
  const weekOptions = [];
  const currentWeek = getCurrentWeek();
  const currentYear = new Date().getFullYear();
  const start_Date = getMondayOfWeek(currentYear, currentWeek);
  const end_Date = getSaturdayOfWeek(currentYear, currentWeek);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [startDate, setStartDate] = useState(start_Date.toLocaleDateString(('vi-VN')))
  const [endDate, setEndDate] = useState(end_Date.toLocaleDateString(('vi-VN')));
  const [idcongviec, setIDCongViec] = useState(Array(6).fill([]));


  const fetchData = async () => {
    try {
      const email = props.data.Email;
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
  console.log(danhsachcongviec)
  const handleAdd = (event) => {
    seterror('Hãy nhập tên công việc')
    setShowTextbox(prevArray => {
      const newArray = [...prevArray];
      newArray[event.target.value] = true;
      return newArray;
    });
  };

  const handleXoaCongViec = async (event) => {

    const value = (event.target.value)
    const index = parseInt(event.target.id);
    const ngaychon = (increaseDay(startDate, index));
    const idcongviec = parseInt(event.target.name);
    console.log(idcongviec)


    const res = await fetch(`/api/user/xoaphancong/${idcongviec}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const dataRes = await res.json();
    if (dataRes.msg) {
      showNotification('success', dataRes.msg);
    } else {
      showNotification('error', dataRes.error);
    }
    fetchData();
  }
  const handleAddDanhGia = async (event) => {
    if (error) {
      showNotification('error', error)
      return null;
    }
    const i = parseInt(event.target.id);
    const index = parseInt(event.target.name);
    const idcongviec = (event.target.value)
    setDanhGiaCongViec(prevArray => {
      const newArray = [...prevArray];
      newArray[index][i] = false;
      return newArray;
    });

    await fetch(`/api/user/danhgianhanvien/${idcongviec}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ kpi }),
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

  const handleEditKPI = async (event) => {
    const i = parseInt(event.target.id);
    const index = parseInt(event.target.name);
    setDanhGiaCongViec(prevArray => {
      const newArray = [...prevArray];
      newArray[index][i] = true;
      return newArray;
    });
    seterror("Hãy nhập vào 1 số từ 0 đến 100");
    fetchData();
  }
  const handleAddCongViec = async (event) => {
    if (error) {
      showNotification('error', error)
      return null;
    }
    const index = parseInt(event.target.value)
    const ngayphancong = (increaseDay(startDate, index))
    const email = props.data.Email;
    setShowTextbox(prevArray => {
      const newArray = [...prevArray];
      newArray[event.target.value] = false;
      return newArray;
    });

    await fetch('/api/user/phancongnhanvien', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ngayphancong, email, congviec, startDate, endDate }),
    })
      .then(async (res) => {
        const messageRes = await res.json();
        if (messageRes.error) {
          showNotification('error', messageRes.error)

        } else {
          getData(email, ngayphancong, event)
          showNotification('success', messageRes.msg)
        }
      })
    fetchData();
  };
  const getData = async (email, ngayphancong, event) => {
    try {
      const DSCV = await fetch(`/api/user/phancong/${email}/${formatday(ngayphancong)}/${formatday(startDate)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });
      const danhsach = await DSCV.json();
      console.log(danhsach);

      const tenCVs = danhsach.map((item) => item.TenCV);
      const tiendoCVs = danhsach.map((item) => item.TienDo);

      setDanhsachCongViec((prevArray) => {
        const newArray = [...prevArray];
        newArray[event.target.value] = tenCVs;
        return newArray;
      });

      setTienDoCongViec((prevArray) => {
        const newArray = [...prevArray];
        newArray[event.target.value] = tiendoCVs;
        return newArray;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextChange = debounce((event) => {
    seterror('Hãy nhập tên công việc')
    const value = event.target.value;
    if (value != '') {
      seterror('')
    }
    console.log(value)
    setCongViec(value);
  }, 300);
  const handleTextDanhGiaChange = debounce((event) => {
    seterror('');
    const regex = /^(100|[0-9]{1,2})$/;
    const value = event.target.value;
    if (regex.test(value)) {
      setKPI(parseInt(value));
    }
    else {
      seterror("Hãy nhập vào 1 số từ 0 đến 100");
      return null;
    }

  }, 300);


  const weeksInYear = (year) => {
    const yearEnd = new Date(year, 11, 31);
    const daysInYear = (yearEnd - new Date(year, 0, 1)) / 86400000;
    return Math.ceil((daysInYear + 1) / 7);
  };


  const totalWeeksInYear = weeksInYear(currentYear);
  for (let i = 1; i <= totalWeeksInYear; i++) {
    weekOptions.push({ label: `Tuần ${i}`, value: i });
  }
  const handleSubmit = async () => {
    const email = props.data.Email;
    await fetch('/api/user/addphancong', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ startDate, email, endDate }),
    })
      .then(async (res) => {
        const messageRes = await res.json();
        if (messageRes.error) {
          showNotification('error', messageRes.error)

        } else {
          showNotification('success', messageRes.msg)
        }

      })
    setPhanCong(true);
    setDanhGia(false);
  }
  const handleDanhGia = async () => {
    setDanhGia(true);
    setPhanCong(false);
  }
  const handleWeekChange = (event) => {
    const selectedWeek = event.target.value;
    setSelectedWeek(selectedWeek);
    const startDate = getMondayOfWeek(currentYear, selectedWeek);
    const endDate = getSaturdayOfWeek(currentYear, selectedWeek);
    setStartDate(startDate.toLocaleDateString(('vi-VN')));
    setEndDate(endDate.toLocaleDateString(('vi-VN')));
  };
  { console.log(idcongviec) }
  return (

    <div>
      {error && <label htmlFor="password" className="block mb-2 text-sm font-medium text-red-900 dark:text-white">{error}</label>}
      <div className='phancongtime'>
        <div className="dropdown">
          <select name="one" className="dropdown-select" onChange={handleWeekChange} defaultValue={currentWeek}>
            {weekOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='text-sm'>Ngày bắt đầu: </label>
          <input type="text" value={startDate} readOnly className=' border-none text-sm ' />
        </div>
        <div>
          <label className='text-sm'>Ngày kết thúc: </label>
          <input type="text" value={endDate} readOnly className='border-none text-sm' />
        </div>
        <div className='flex gap-4'>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}>
            Phân Công
          </button>
        </div>


      </div>
      {
        phancong && <div style={{ display: "flex" }}>
          {[...Array(6)].map((_, index) => (
            <div className='ngayphancong rounded-md bg-cyan-600 text-slate-100 text-sm' key={index} style={{ flex: 1, textAlign: "center" }}>
              {moment().startOf('isoWeek').add(index, "days").format("dddd").charAt(0).toUpperCase()
                + moment().startOf('isoWeek').add(index, "days").format("dddd").slice(1)
              }
              <div className='text-slate-100'>
                {increaseDay(startDate, index)}
              </div>
              <div>
                {danhsachcongviec[index].map((_, i) => (
                  <div className='bg-cyan-50 text-slate-950 ' key={[index][i]}>
                    <div className='flex gap-3 px-2 mb-3'>
                      <p className="flex-auto sm:text-sm sm:leading-6 font-medium"  >
                        {(danhsachcongviec[index][i])}
                      </p>
                      {console.log((idcongviec[index][i]))}
                      <button
                        id={index}
                        type="submit"
                        name={(idcongviec[index][i])}
                        value={(danhsachcongviec[index][i])}
                        className=" h-8 flex-none mx-0 px-2 py-1 rounded-md bg-indigo-500 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        onClick={handleXoaCongViec}
                      >
                        Xóa
                      </button>
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
                        id={i}
                        name={index}
                        type="submit"
                        value={(danhsachcongviec[index][i])}
                        className={(kpis[index][i]) < 50 ? dangcho : (kpis[index][i]) < 80 ? dangthuchien : dahoanthanh}
                        onClick={handleEditKPI}
                      >
                        {(kpis[index][i]) ? (kpis[index][i]) + "%" : "Chưa đánh giá"}
                      </button>
                    </div>
                    <div className=' px-2 mb-2'>
                      {danhgiacongviec[index][i] && <div className='danhgiacongviec flex gap-2'>
                        <label className="flex-auto sm:text-sm sm:leading-6 font-normal"  >
                          Đạt
                        </label>
                        <input type="text" id="input-box" name="input-box" className='w-12 h-8 text-sm font-light rounded-lg '
                          onChange={handleTextDanhGiaChange}
                        />
                        <label className="flex-auto sm:text-sm sm:leading-6 font-normal">% KPI</label>
                        <button className="flex-none mx-0 px-2 py-1 rounded-md bg-indigo-500 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                          id={i}
                          name={index}
                          value={(idcongviec[index][i])}
                          onClick={handleAddDanhGia}>
                          OK
                        </button>

                      </div>}

                    </div>
                  </div>


                ))
                }

                {showTextbox[index] && <div className="flex gap-3 px-2 mb-3">
                  <input
                    id="congviec"
                    name="congviec"
                    type="text"
                    className="px-2 flex-auto rounded-md border-0 bg-white/5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Tên công việc"
                    onChange={handleTextChange}
                  />
                  <button
                    type="submit"
                    value={index}
                    className="flex-none rounded-md px-3 bg-indigo-500 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={handleAddCongViec}
                  >
                    Add
                  </button>
                </div>}
                {
                  !showTextbox[index] && <div className='flex justify-center items-center'>
                    <button className="rounded-full  bg-blue-100 h-6 w-6 hover:bg-blue-200 font-bold  focus:outline-none focus:shadow-outline  text-black"
                      type="submit"
                      value={index}
                      onClick={handleAdd}>
                      +
                    </button>
                  </div>
                }
              </div>
            </div>
          ))}
        </div>
      }
    </div>);
};

export default PhanCongTime;
