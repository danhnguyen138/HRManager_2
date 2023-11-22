import React, { useEffect, useState, useMemo } from 'react';
import { Header } from '../../components';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

export default function Notifi() {
  const navigate = useNavigate();
  const [dataTB, setDataTB] = useState(null);// Lay du lieu data tu api
  const [selectedRowData, setSelectedRowData] = useState();
  const token = useSelector(state => state.token);// Lay token kiem tra xac thucconst 
  const user = useSelector(state => state.user);// Lay token kiem tra xac thucconst 
  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowExpand = async (row) => {
    console.log(row)
    const idthongbao = row.ID;
    const tieude = row.TieuDe;
    const thoigiangui = row.NgayThongBao;
    console.log(thoigiangui)
    const id = user.id;
    await fetch(`/api/user/updatethongbao/${id}/${tieude}/${thoigiangui}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ tieude, thoigiangui, id }),
      }

    )
    navigate("/user/notificationdetail", { state: { idthongbao } })
   window.location.reload();
  };

  const getTB = async () => {
    const res = await fetch(`/api/user/notification/${user.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    setDataTB(data);
  }
  useEffect(() => {
    getTB();
    const socket = io('http://localhost:9001', {transports: ['websocket', 'polling', 'flashsocket']});
    console.log(socket)
    socket.on('notification', (data) => {
    if(data) { 
      getTB();
    }
      console.log('Nhận thông báo:', data);
    });

    return () => {
      socket.disconnect(); // Ngắt kết nối khi component bị hủy
    };
  }, [])
  let data = [];
  if (!dataTB) return null;
  if (!dataTB.getThongBao) return <div id="notifi">
    <div className="bg-white border shadow-sm m-2 z mt-24 p-2 md:p-10 rounded-3xl">
      <Header title="Thông Báo" />
      <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
        <div className='flex flex-wrap lg:flex-nowrap justify-between '>
          <div className='p-4 text-xl md:text-2xl font-bold'>
            <h1>Trang Thông Báo</h1>
          </div>
          <div className="flex justify-center text-center">
          </div>
        </div>
        <div className='mt-12 mb-8 flex flex-col gap-12'>
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div className="relative flex justify-between bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
              <h6 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-relaxed text-white">
                Chưa có thông báo
              </h6>
            </div>
            <div className='p-6 px-0 pt-0 pb-2'>
              {/* {successNotification && (<div className='mx-6 mb-3 px-4 py-3 border rounded-lg bg-green-600 text-xl text-white'>{successNotification}</div>)} */}

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  if (dataTB.getThongBao.thongbao != []) {
    dataTB.getThongBao.thongbao.map((item, index) => {
      data.push({
        STT: index + 1,
        TieuDe: item.TieuDe,
        NoiDung: item.NoiDung,
        NgayThongBao: item.ThoiGianGui,
        ID: item.id
      })
    })
  }


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
      name: 'Tiêu đề',
      selector: row => row.TieuDe,
      sortable: true,
    },

    {
      name: 'Ngày Thông Báo',
      selector: row => row.NgayThongBao.substring(0, 10),
      sortable: true,
    },
  ]
  
  return (
    <div id="notifi">
      <div className="bg-white border shadow-sm m-2 z mt-24 p-2 md:p-10 rounded-3xl">
        <Header title="Thông Báo" />
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
          <div className='flex flex-wrap lg:flex-nowrap justify-between '>
            <div className='p-4 text-xl md:text-2xl font-bold'>
              <h1>Trang Thông Báo</h1>
            </div>
            <div className="flex justify-center text-center">
            </div>
          </div>
          <div className='mt-12 mb-8 flex flex-col gap-12'>
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
              <div className="relative flex justify-between bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                <h6 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-relaxed text-white">
                  Danh sách thông báo
                </h6>
              </div>
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
                  onRowClicked={handleRowExpand}

                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
