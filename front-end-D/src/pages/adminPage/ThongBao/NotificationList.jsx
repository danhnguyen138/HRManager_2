import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { BsTrash } from 'react-icons/bs';
import { FiEdit3, FiEye, FiSend } from 'react-icons/fi';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from 'context/ContextProvider';
const TrashIcon = ({ ...props }) => {
  return (
    <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-red-500 cursor-pointer hover:bg-red-700'>
      <BsTrash className='text-base text-white' {...props} />
    </div>
  )
}
const EditIcon = ({ ...props }) => {
  return (
    <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-yellow-500 cursor-pointer hover:bg-yellow-700'>
      <FiEdit3 className='text-base text-white' {...props} />
    </div>
  )
}
const SendIcon = ({ ...props }) => {
  return (
    <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-blue-500 cursor-pointer hover:bg-blue-700'>
      <FiSend className='text-base text-white' {...props} />
    </div>
  );
}

const NotificationList = () => {
  const [selectedRows, setSelectedRows] = useState();
  const [searchText, setSearchText] = useState('');
  const [getDataNotification, setGetDataNotification] = useState(null);
  const navigate = useNavigate();
  const token = useSelector(state => state.token);
  const { showNotification } = useStateContext();
  const getNotification = async () => {
    await fetch(`/api/admin/thongbao`, {
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
          setGetDataNotification(resData)
        }
      }
    )
  }
  useEffect(() => {
    getNotification()
  }, []);
  if (!getDataNotification) return null;
  let dataNotification = [];
  getDataNotification.getThongBao.map((item, index) => {
    dataNotification = [...dataNotification,
    {
      id: item.id,
      stt: index,
      title: item.TieuDe,
      status: item.TrangThai,
      time: item.ThoiGianGui?item.ThoiGianGui.toString().slice(0, 10):''
    }]
  })
  const filteredData = dataNotification.filter((row) => {
    return (
      row.title.toLowerCase().includes(searchText.toLowerCase())
    )
  })
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
    },
    active: {
      backgroundColor: '#54c901',
      marginRight: '20px',
      marginTop: '5px',
      marginBottom: '5px',
      display: 'flex',
      justifyContent: 'center',
      color: 'white',
      borderRadius: '50px'
    },
    pause: {
      backgroundColor: '#e7ca01',
      marginRight: '20px',
      marginTop: '5px',
      marginBottom: '5px',
      display: 'flex',
      justifyContent: 'center',

      borderRadius: '50px'
    },
    leave: {
      backgroundColor: '#ec0201',
      marginRight: '20px',
      marginTop: '5px',
      marginBottom: '5px',
      display: 'flex',
      justifyContent: 'center',
      color: 'white',
      borderRadius: '50px'
    }
  }
  const columns = [
    {
      name: 'STT',
      selector: row => row.stt,
      sortable: true,
      style: {
        width: '50px'
      }
    },

    {
      name: 'Tiêu đề',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Trạng thái',
      selector: row => row.status,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.status === 'Đã gửi',
          style: customStyle.active
        },

        {
          when: (row) => row.status === 'Chưa gửi',
          style: customStyle.leave
        }
      ],
      width: '170px',
    },
    {
      name: 'Gửi lúc',
      selector: row => row.time,
      sortable: true
    },
    {
      name: 'Thao tác',
      cell: (row) => {
        return (
          <div className='flex gap-1 pr-2'>
            <TrashIcon onClick={() => handleDelete(row.id)} />
            <EditIcon onClick={() => handleEdit(row.id)} />
            <SendIcon onClick={() => handleSend(row.id)} />
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ]
  const handleSend = async (id) => {
    await fetch(`/api/admin/thongbao/${id}/send`, {
      method: 'PUT',

      headers: {
        Authorization: `Bearer ${token}`
      }

    }).then(
      async (res) => {
        const resData = await res.json();
        if (resData.msg) {
          showNotification('success', resData.msg);
          await getNotification();
        } else {
          showNotification('error', resData.error)
        }
      }
    )
  }
  const handleEdit = (id) => {
    navigate(`/admin/notification/${id}/update`)
  }
  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa thông báo này?")) {
      await fetch(`/api/admin/thongbao/${id}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(
        async (res) => {
          const resData = await res.json();
          if (resData.msg) {
            showNotification('success', resData.msg);
            await getNotification()
          } else {
            showNotification('error', resData.error)
          }
        }
      )
    }
  }
  const handleUpdate = async (id) => {
    navigate(`/admin/notification/${id}/update`);
  }
  return (
    <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
      <div className='flex flex-wrap lg:flex-nowrap justify-between '>
        <div className='p-4 text-xl md:text-2xl font-bold'>
          <h1>Trang thông báo</h1>
        </div>
        <div className="flex justify-center text-center">
          {/* <button
        type="button"
        style={{ backgroundColor: currentColor }}
        className="flex self-center text-base text-white opacity-0.9 mr-3 p-2 pr-3
        md:mr-0 md:py-3 md:px-4 md:pr-5
        hover:drop-shadow-xl rounded-xl  "
    >
        <FaDownload className='self-center mr-1 md:mr-2' /> Download report
    </button> */}
        </div>
      </div>
      <div className='mt-12 mb-8 flex flex-col gap-12'>
        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
          <div className="relative bg-clip-border flex justify-between mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
            <h6 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-relaxed text-white">
              Danh sách thông báo
            </h6>
            <button
              onClick={() => {
                navigate('/admin/notification/create')
              }}
              className='py-3 px-8 bg-red-500 rounded-full text-white font-bold  text-base transform hover:translate-y-1 transition-all duration-500'>
              Tạo thông báo
            </button>
          </div>
          <div className='p-6 px-0 pt-0 pb-2'>
            <DataTable
              className='overflow-auto'
              customStyles={customStyle}
              responsive
              columns={columns}
              data={filteredData}
              selectableRows // Cho phép chọn nhiều dòng
              onSelectedRowsChange={setSelectedRows}
              pagination
              paginationPerPage={5}
              paginationComponentOptions={[5, 10, 15]}
              highlightOnHover
              selectableRowsHighlight
              subHeader
              subHeaderComponent={[
                <input
                  key="search"
                  type="text"
                  className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                  placeholder='Tìm kiếm...'
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />,
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationList
