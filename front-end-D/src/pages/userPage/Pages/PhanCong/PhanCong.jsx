import React, { useEffect, useState, useMemo } from 'react';
import { Header } from '../../components';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import PhanCongTime from './PhanCongTime';
import InputText from "../../components/input/InputText";
import Select from 'react-select';
import { useStateContext } from 'context/ContextProvider';

export default function PhanCong() {
  const [dataNhanVien, setDataNhanVien] = useState(null);// Lay du lieu data tu api
  const [dataDuAn, setDataDuAn] = useState(null);// Lay du lieu data tu api
  const [selectedRowData, setSelectedRowData] = useState();
  const token = useSelector(state => state.token);// Lay token kiem tra xac thuc
  const user = useSelector(state => state.user);// Lay token kiem tra xac thuc
  const [expandedRows, setExpandedRows] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [themduan, setThemDuAn] = useState(false);
  const [edit, setEdit] = useState(false);
  const [tenDuAn, setTenDuAn] = useState('');
  const [error, setError] = useState('');
  const [idproject, setIdProject] = useState(0);
  const [ngayBatDau, setNgayBatDau] = useState('');
  const [ngayKetThuc, setNgayKetThuc] = useState('');
  const [nhanVienSelected, setNhanVienSelected] = useState([]);
  const { showNotification } = useStateContext();

  const tinhngaybatdau = (ngaybd) => {
    const targetDate = new Date(ngaybd);
    const targetDay = targetDate.getDay(); // Lấy thứ của ngày cần tìm (0 - Chủ nhật, 1 - Thứ hai, ..., 6 - Thứ bảy)

    // Trừ đi số ngày tương ứng với thứ của ngày cần tìm để tìm ngày bắt đầu của tuần
    const startDate = new Date(targetDate.getTime() - (targetDay - 1) * 24 * 60 * 60 * 1000);
    return startDate.toISOString().split('T')[0];
  }
  const formatday = (day) => {
    const ngayBatDau = day;
    const parts = ngayBatDau.split('-');
    const ngay = parts[2];
    const thang = parseInt(parts[1], 10);
    const nam = parts[0];
    const ngayChuyenDoi = `${ngay}/${thang}/${nam}`;
    return ngayChuyenDoi
  }

  const handleTenDuAnChange = (event) => {

    setTenDuAn(event.target.value);
    setError('');
  };

  const handleNgayBatDauChange = (event) => {
    setNgayBatDau(event.target.value);
    setError('');
  };

  const handleNgayKetThucChange = (event) => {
    setNgayKetThuc(event.target.value);
    setError('');
  };

  const handleNhanVienSelectChange = (selectedOptions) => {
    setNhanVienSelected(selectedOptions);
    setError('');
  };
  const handleback = () => {
    console.log(themduan)
    setThemDuAn(false);
    setEdit(false)
  }
  const handleEdit = async (event) => {
    setEdit(true);
    const idduan = event.target.value;
    console.log(idduan)
    setIdProject(idduan);
    try {
      const res = await fetch(`/api/user/getduan/${idduan}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const dataduan = await res.json();
      console.log(dataduan);
      setTenDuAn(dataduan.duan.TenDuAn);
      setNgayBatDau(dataduan.duan.NgayBatDau);
      setNgayKetThuc(dataduan.duan.NgayKetThuc);
      const nhanVienSelectedString = dataduan.duan.idNhanVien;
      const nhanVienSelectedArray = JSON.parse(nhanVienSelectedString);
      const transformedArray = nhanVienSelectedArray.map(nhanVien => ({
        value: nhanVien,
        label: nhanVien
      }));
      setNhanVienSelected(transformedArray);

    }
    catch (error) {
      console.error(error);
    }

  }
  const handleAddProject = async () => {
    console.log(error)
    setError('');
    console.log(error)
    if (tenDuAn === "") {
      setError('Chưa nhập tên dự án');
      showNotification('error', 'Chưa nhập tên dự án');
      return;
    } else {
      setError('');
    }

    if (ngayBatDau === "") {
      setError('Chưa nhập ngày bắt đầu');
      showNotification('error', 'Chưa nhập ngày bắt đầu');
      return;
    } else {
      setError('');
    }

    if (ngayKetThuc === "") {
      setError('Chưa nhập ngày kết thúc');
      showNotification('error', 'Chưa nhập ngày kết thúc');
      return;
    } else {
      setError('');
    }
    // Kiểm tra ngày kết thúc lớn hơn ngày bắt đầu
    const startDate = new Date(ngayBatDau);
    const endDate = new Date(ngayKetThuc);

    if (endDate <= startDate) {
      setError('Ngày kết thúc phải lớn hơn ngày bắt đầu');
      showNotification('error', 'Ngày kết thúc phải lớn hơn ngày bắt đầu');
      return;
    } else {
      setError('');
    }

    if (nhanVienSelected.length === 0) {
      setError('Chưa chọn nhân viên');
      showNotification('error', 'Chưa chọn nhân viên');
      return;
    }
    else {
      setError('');
    }
    try {
      await fetch(`/api/user/addproject/${tenphongban}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ tenDuAn, ngayBatDau, ngayKetThuc, nhanVienSelected }),
      })
        .then(async (res) => {
          const messageRes = await res.json();
          if (messageRes.error) {
            showNotification('error', messageRes.error)

          } else {
            showNotification('success', messageRes.msg)
          }

        })
      await Promise.all(
        nhanVienSelected.map(async (item, index) => {
          const hoten = item.value;
          try {
            const res = await fetch(`/api/user/getidbyname/${hoten}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            const user = await res.json();
            const iduser = user.nhanViens.id;
            const email = user.nhanViens.Email;
            console.log(iduser);
            try {
              const res = await fetch(`/api/user/getphancongbyidnhanvien/${iduser}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              const phancong = await res.json();
              if (!phancong) return;
              console.log(phancong)

              const startDate = new Date(ngayBatDau);
              const endDate = new Date(ngayKetThuc);

              const days = [];

              const currentDay = new Date(startDate);
              while (currentDay <= endDate) {
                if (currentDay.getDay() !== 0) { // Bỏ qua ngày Chủ nhật (0 là Chủ nhật)
                  const formattedDate = currentDay.toISOString().split('T')[0];
                  days.push(formattedDate);
                }
                currentDay.setDate(currentDay.getDate() + 1);
              }
              await Promise.all(days.map(async (itemday, indexday) => {
                const existingAssignment = phancong.find(itempc => tinhngaybatdau(itemday) === itempc.NgayBatDau);
                if (existingAssignment) {
                  console.log('Đã có');
                  console.log(existingAssignment.NgayBatDau);
                } else {
                  console.log(tinhngaybatdau(itemday));
                  console.log(email);
                  const startDate = formatday(tinhngaybatdau(itemday));
                  const ngayketthuc = new Date(tinhngaybatdau(itemday));
                  ngayketthuc.setDate(ngayketthuc.getDate() + 5);
                  const endDate = formatday(ngayketthuc.toISOString().split('T')[0]);

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
                        showNotification('error', messageRes.error);
                      } else {
                        showNotification('success', messageRes.msg);
                      }
                    });
                }
                const ngayphancong = formatday(itemday);
                const congviec = tenDuAn;
                const startDate = formatday(tinhngaybatdau(itemday));
                await fetch('/api/user/phancongnhanvien', {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                  },
                  body: JSON.stringify({ ngayphancong, email, congviec, startDate }),
                })
                  .then(async (res) => {
                    const messageRes = await res.json();
                    if (messageRes.error) {
                      showNotification('error', messageRes.error)

                    } else {
                      showNotification('success', messageRes.msg)
                    }
                  })
              }));

            }
            catch (error) {
              console.error(error);
            }
          } catch (error) {
            console.error(error);
          }
        })
      );
    }
    catch (error) {
      console.error(error);
    }
    getDSCV();
    setTenDuAn('');
    setNgayBatDau('');
    setNgayKetThuc('');
    setNhanVienSelected([])
    setThemDuAn(false)


  };
  const handleUpdateProject = async (event) => {

    console.log(event.target.id)
    const idduan = event.target.id;
    setIdProject(idduan);
    try {
      const res = await fetch(`/api/user/getduan/${idduan}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const dataduan = await res.json();
      console.log(dataduan);
      setTenDuAn(dataduan.duan.TenDuAn);
      setNgayBatDau(dataduan.duan.NgayBatDau);
      setNgayKetThuc(dataduan.duan.NgayKetThuc);
      const nhanVienSelectedString = dataduan.duan.idNhanVien;
      const nhanVienSelectedArray = JSON.parse(nhanVienSelectedString);
      const transformedArray = nhanVienSelectedArray.map(nhanVien => ({
        value: nhanVien,
        label: nhanVien
      }));

      setNhanVienSelected(transformedArray);
      nhanVienSelectedArray.map((item, index) => {
        console.log(item)
        const tenduan = (dataduan.duan.TenDuAn)
        const ngaybatdau = (dataduan.duan.NgayBatDau)
        const ngayketthuc = (dataduan.duan.NgayKetThuc)
        const startDate = new Date(ngaybatdau);
        const endDate = new Date(ngayketthuc);

        const days = [];

        const currentDay = new Date(startDate);
        while (currentDay <= endDate) {
          if (currentDay.getDay() !== 0) { // Bỏ qua ngày Chủ nhật (0 là Chủ nhật)
            const formattedDate = currentDay.toISOString().split('T')[0];
            days.push(formattedDate);
          }
          currentDay.setDate(currentDay.getDate() + 1);
        }
        (days.map(async (itemday, indexday) => {
          {
            //console.log(tinhngaybatdau(itemday));
            console.log(itemday);
            const startDate = formatday(tinhngaybatdau(itemday));
            const ngayketthuc = new Date(tinhngaybatdau(itemday));
            ngayketthuc.setDate(ngayketthuc.getDate() + 5);
            const endDate = formatday(ngayketthuc.toISOString().split('T')[0]);
          }
          const ngayphancong = formatday(itemday);
          const congviec = tenduan;
          const startDate = formatday(tinhngaybatdau(itemday));
          console.log(ngayphancong)
          console.log(congviec)
          console.log(startDate)
          const res = await fetch(`/api/user/xoacongviec/${congviec}/${ngayphancong}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const dataRes = await res.json();
          if (dataRes.msg) {
            //showNotification('success', dataRes.msg);
          } else {
           // showNotification('error', dataRes.error);
          }
        }));
      })


    }
    catch (error) {
      console.error(error);
    }

    setError('');


    if (tenDuAn === "") {
      setError('Chưa nhập tên dự án');
      showNotification('error', 'Chưa nhập tên dự án');
      return;
    } else {
      setError('');
    }

    if (ngayBatDau === "") {
      setError('Chưa nhập ngày bắt đầu');
      showNotification('error', 'Chưa nhập ngày bắt đầu');
      return;
    } else {
      setError('');
    }

    if (ngayKetThuc === "") {
      setError('Chưa nhập ngày kết thúc');
      showNotification('error', 'Chưa nhập ngày kết thúc');
      return;
    } else {
      setError('');
    }
    // Kiểm tra ngày kết thúc lớn hơn ngày bắt đầu
    const startDate = new Date(ngayBatDau);
    const endDate = new Date(ngayKetThuc);

    if (endDate <= startDate) {
      setError('Ngày kết thúc phải lớn hơn ngày bắt đầu');
      showNotification('error', 'Ngày kết thúc phải lớn hơn ngày bắt đầu');
      return;
    } else {
      setError('');
    }

    if (nhanVienSelected.length === 0) {
      setError('Chưa chọn nhân viên');
      showNotification('error', 'Chưa chọn nhân viên');
      return;
    }
    else {
      setError('');
    }
    try {
      await fetch(`/api/user/updateproject/${idproject}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ tenDuAn, ngayBatDau, ngayKetThuc, nhanVienSelected }),
      })
        .then(async (res) => {
          const messageRes = await res.json();
          if (messageRes.error) {
            showNotification('error', messageRes.error)

          } else {
            showNotification('success', messageRes.msg)
          }
        })
      const startDate = new Date(ngayBatDau);
      const endDate = new Date(ngayKetThuc);

      if (endDate <= startDate) {
        setError('Ngày kết thúc phải lớn hơn ngày bắt đầu');
        showNotification('error', 'Ngày kết thúc phải lớn hơn ngày bắt đầu');
        return;
      } else {
        setError('');
      }

      if (nhanVienSelected.length === 0) {
        setError('Chưa chọn nhân viên');
        showNotification('error', 'Chưa chọn nhân viên');
        return;
      }
      else {
        setError('');
      }
      try {        
        await Promise.all(
          nhanVienSelected.map(async (item, index) => {
            const hoten = item.value;
            try {
              const res = await fetch(`/api/user/getidbyname/${hoten}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              const user = await res.json();
              const iduser = user.nhanViens.id;
              const email = user.nhanViens.Email;
              console.log(iduser);
              try {
                const res = await fetch(`/api/user/getphancongbyidnhanvien/${iduser}`, {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });
                const phancong = await res.json();
                if (!phancong) return;
                console.log(phancong)

                const startDate = new Date(ngayBatDau);
                const endDate = new Date(ngayKetThuc);

                const days = [];

                const currentDay = new Date(startDate);
                while (currentDay <= endDate) {
                  if (currentDay.getDay() !== 0) { // Bỏ qua ngày Chủ nhật (0 là Chủ nhật)
                    const formattedDate = currentDay.toISOString().split('T')[0];
                    days.push(formattedDate);
                  }
                  currentDay.setDate(currentDay.getDate() + 1);
                }
                await Promise.all(days.map(async (itemday, indexday) => {
                  const existingAssignment = phancong.find(itempc => tinhngaybatdau(itemday) === itempc.NgayBatDau);
                  if (existingAssignment) {
                    console.log('Đã có');
                    console.log(existingAssignment.NgayBatDau);
                  } else {
                    console.log(tinhngaybatdau(itemday));
                    console.log(email);
                    const startDate = formatday(tinhngaybatdau(itemday));
                    const ngayketthuc = new Date(tinhngaybatdau(itemday));
                    ngayketthuc.setDate(ngayketthuc.getDate() + 5);
                    const endDate = formatday(ngayketthuc.toISOString().split('T')[0]);

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
                          showNotification('error', messageRes.error);
                        } else {
                          showNotification('success', messageRes.msg);
                        }
                      });
                  }
                  const ngayphancong = formatday(itemday);
                  const congviec = tenDuAn;
                  const startDate = formatday(tinhngaybatdau(itemday));
                  await fetch('/api/user/phancongnhanvien', {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ ngayphancong, email, congviec, startDate }),
                  })
                    .then(async (res) => {
                      const messageRes = await res.json();
                      if (messageRes.error) {
                        //showNotification('error', messageRes.error)

                      } else {
                       // showNotification('success', messageRes.msg)
                      }
                    })
                }));

              }
              catch (error) {
                console.error(error);
              }
            } catch (error) {
              console.error(error);
            }
          })
        );
      }
      catch (error) {
        console.error(error);
      }


    }
    catch (error) {
      console.error(error);
    }
    getDSCV();
    setTenDuAn('');
    setNgayBatDau('');
    setNgayKetThuc('');
    setNhanVienSelected([]);
    setEdit(false);


  };

  const handleTabChange = tab => {
    setActiveTab(tab);
  };
  const tenphongban = user.PhongBan ? user.PhongBan.TenPB : "";
  const handleRowExpand = (row) => {
    const expandedRowIds = [...expandedRows];
    const rowIndex = expandedRows.findIndex((r) => r === row.STT);

    if (rowIndex >= 0) {
      expandedRowIds.splice(rowIndex, 1);
    } else {
      expandedRowIds.push(row.STT);
    }

    setExpandedRows(expandedRowIds);
  };
  const handlethemduan = () => {
    setThemDuAn(true);
  }
  const expandableRowsComponent = ({ data }) => {
    return (
      <div>
        <PhanCongTime data={data} />
      </div>
    );
  };

  const getDSNV = async () => {
    const res = await fetch(`/api/user/nhanvienphongban/${user.idPhongBan}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    setDataNhanVien(data);
  }
  const getDSCV = async () => {
    const res = await fetch(`/api/user/duan/${tenphongban}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const dataduan = await res.json();
    setDataDuAn(dataduan);
  }
  useEffect(() => {
    getDSNV();
    getDSCV();
  }, [])

  let data = [];
  if (!dataNhanVien) return null;
  console.log(dataNhanVien.nhanViens.map(nhanVien => nhanVien.HoTen))
  console.log(dataDuAn)
  data = dataNhanVien.nhanViens.map((item, index) => {
    return {
      STT: index + 1,
      HoTen: item.HoTen,
      Email: item.Email,
      ChucVu: item.ChucVu.TenChucVu
    };
  });

  const customStyle = {
    rows: {
      style: {
        fontSize: '14px',
        fontWeight: '600'
      }
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    }
  }

  const columns = [
    {
      name: 'STT',
      selector: row => row.STT,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Họ Tên',
      selector: row => row.HoTen,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.Email,
      sortable: true,
    },
    {
      name: 'Chức Vụ',
      selector: row => row.ChucVu,
      sortable: true,
    },

  ]
  return (
    <div id="notifi">
      <div className="bg-white border shadow-sm m-2 z mt-24 p-2 md:p-10 rounded-3xl">
        <Header title="Phân Công" />
        <div className="flex justify-between items-center">
          <div className="tabs">
            <div className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => handleTabChange('all')}
            >
              Phân công theo ngày
            </div>
            <div
              className={`tab ${activeTab === 'unread' ? 'active' : ''}`}
              onClick={() => handleTabChange('unread')}
            >
              Phân công theo dự án
            </div>
          </div>

        </div>

        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
          {activeTab === 'all' ? (
            <div className='mt-12 mb-8 flex flex-col gap-12'>
              <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                <div className='p-6 px-0 pt-0 pb-2'>
                  {/* {successNotification && (<div className='mx-6 mb-3 px-4 py-3 border rounded-lg bg-green-600 text-xl text-white'>{successNotification}</div>)} */}
                  <DataTable
                    className='overflow-auto'
                    customStyles={customStyle}
                    responsive
                    columns={columns}
                    data={data}
                    paginationComponentOptions={[10, 20, 30]}
                    highlightOnHover
                    selectableRowsHighlight
                    expandableRows
                    expandableRowExpanded={(row) => expandedRows.includes(row.STT)}
                    onRowClicked={handleRowExpand}
                    expandableRowsComponent={expandableRowsComponent}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <section>

                {!themduan && !edit &&
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
                      <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-slate-900">Danh sách các dự án</h2>
                        <button
                          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
                          onClick={handlethemduan}
                        >
                          <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                            <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                          </svg>
                          Thêm dự án mới
                        </button>
                      </div>
                    </header>
                    {dataDuAn.duan.length > 0 ? (
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Tên dự án
                            </th>
                            <th scope="col" className="px-6 py-3">
                              <div className="flex items-center">
                                Ngày bắt đầu
                              </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                              <div className="flex items-center">
                                Ngày kết thúc
                              </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                              <div className="flex items-center">
                                Danh sách nhân viên
                              </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataDuAn.duan.map((item, index) => {
                            return (
                              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {item.TenDuAn}
                                </th>
                                <td className="px-6 py-4">
                                  {item.NgayBatDau}
                                </td>
                                <td className="px-6 py-4">
                                  {item.NgayKetThuc}
                                </td>
                                <td className="px-6 py-4">
                                  {JSON.parse(item.idNhanVien).map((item, index) => {
                                    return (
                                      <div key={index}>{item}</div>
                                    )
                                  })}

                                </td>
                                <td className="px-6 py-4 text-right">
                                  <button
                                    value={item.id}
                                    className="hover:bg-blue-400 group flex rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2"
                                    onClick={handleEdit}
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            )
                          })}


                        </tbody>
                      </table>
                    ) : "Chưa có dự án"}

                  </div>}

                {themduan && (
                  <div>
                    <button
                      className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 mt-8 py-2 shadow-sm"
                      onClick={handleback}
                    >
                      Quay lại
                    </button>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor='idNhanVien'>
                      Tên dự án
                    </label>
                    <input
                      type="text"
                      value={tenDuAn}
                      onChange={handleTenDuAnChange}
                      placeholder="Tên dự án..."
                      className="h-10 text-sm shadow appearance-none border border-slate-950 rounded-lg w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                    />
                    <label className="block text-gray-700 font-bold mb-2" htmlFor='idNhanVien'>
                      Ngày bắt đầu
                    </label>
                    <input
                      type="date"
                      value={ngayBatDau}
                      onChange={handleNgayBatDauChange}
                      placeholder="Ngày bắt đầu..."
                      className=" text-sm h-10 shadow appearance-none border border-slate-950 rounded-lg w-300 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"

                    />
                    <label className="block text-gray-700 font-bold mb-2" htmlFor='idNhanVien'>
                      Ngày kết thúc
                    </label>
                    <input
                      type="date"
                      value={ngayKetThuc}
                      onChange={handleNgayKetThucChange}
                      placeholder="Ngày kết thúc..."
                      className="h-10 text-sm shadow appearance-none border border-slate-950 rounded-lg w-300 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"

                    />
                    <label className="block text-gray-700 font-bold mb-2" htmlFor='idNhanVien'>
                      Danh sách nhân viên
                    </label>
                    {console.log('dsadasd', nhanVienSelected)}
                    <Select
                      isMulti
                      value={nhanVienSelected}
                      options={dataNhanVien.nhanViens.map(nhanVien => ({
                        value: nhanVien.HoTen,
                        label: nhanVien.HoTen
                      }))}
                      onChange={handleNhanVienSelectChange}
                      className="shadow appearance-none border border-slate-950 rounded-lg w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                    />
                    <button
                      className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 mt-8 py-2 shadow-sm"
                      onClick={handleAddProject}
                    >
                      Thêm dự án
                    </button>

                  </div>
                )}
                {edit && (

                  <div>
                    {console.log(nhanVienSelected)}
                    <button
                      className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 mt-8 py-2 shadow-sm"
                      onClick={handleback}
                    >
                      Quay lại
                    </button>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor='idNhanVien'>
                      Tên dự án
                    </label>
                    <input
                      type="text"
                      value={tenDuAn}
                      onChange={handleTenDuAnChange}
                      placeholder="Tên dự án..."
                      className="h-10 text-sm shadow appearance-none border border-slate-950 rounded-lg w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                    />
                    <label className="block text-gray-700 font-bold mb-2" htmlFor='idNhanVien'>
                      Ngày bắt đầu
                    </label>
                    <input
                      type="date"
                      value={ngayBatDau}
                      onChange={handleNgayBatDauChange}
                      placeholder="Ngày bắt đầu..."
                      className=" text-sm h-10 shadow appearance-none border border-slate-950 rounded-lg w-300 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"

                    />
                    <label className="block text-gray-700 font-bold mb-2" htmlFor='idNhanVien'>
                      Ngày kết thúc
                    </label>
                    <input
                      type="date"
                      value={ngayKetThuc}
                      onChange={handleNgayKetThucChange}
                      placeholder="Ngày kết thúc..."
                      className="h-10 text-sm shadow appearance-none border border-slate-950 rounded-lg w-300 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"

                    />
                    <label className="block text-gray-700 font-bold mb-2" htmlFor='idNhanVien'>
                      Danh sách nhân viên
                    </label>
                    {console.log('22222', nhanVienSelected)}
                    <Select
                      isMulti
                      value={nhanVienSelected}
                      options={dataNhanVien.nhanViens.map(nhanVien => ({
                        value: nhanVien.HoTen,
                        label: nhanVien.HoTen
                      }))}
                      onChange={handleNhanVienSelectChange}
                      className="shadow appearance-none border border-slate-950 rounded-lg w-full p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                    />
                    <button
                      id={idproject}
                      className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 mt-8 py-2 shadow-sm"
                      onClick={handleUpdateProject}
                    >
                      Cập nhật
                    </button>

                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
