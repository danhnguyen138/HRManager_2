import DataTable from 'react-data-table-component';
import { useStateContext } from "../../../context/ContextProvider";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import icon_luong from 'data/icon_luong.png';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { FiEdit3 } from 'react-icons/fi';
import {AiOutlineDownload} from 'react-icons/ai';
import "View.css";
const TrashIcon = ({ ...props }) => {
  return (
    <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-red-500 cursor-pointer hover:bg-red-700'>
      <BsTrash className='text-base text-white' {...props} />
    </div>
  );
}
const EditIcon = ({ ...props }) => {
  return (
    <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-yellow-500 cursor-pointer hover:bg-yellow-700'>
      <FiEdit3 className='text-base text-white' {...props} />
    </div>
  )
}
const DownloadIcon = ({ ...props }) => {
  return (
    <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-blue-500 cursor-pointer hover:bg-blue-700'>
      <AiOutlineDownload className='text-base text-white' {...props} />
    </div>
  )
}
const LawView = () => {
  const token = useSelector(state => state.token);
  const navigate = useNavigate();
  const { showNotification } = useStateContext();
  const [getDataToiThieu, setGetDataToiThieu] = useState(null);
  const [toggleState, setToggleState] = useState(1);
  const [luongSuDung, setLuongSuDung] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusText, setStatusText] = useState('');
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const getLuongToiThieuSuDung = async () => {
    await fetch(`/api/admin/luongtoithieusudung`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then(
      async (res) => {
        const resData = await res.json();
        if (resData.error) {
          showNotification('error', resData.error)
        } else {
          setLuongSuDung(resData)
        }
      }
    )
  }
  //Lay danh sach luong toi thieu
  const [danhSachLuong, setDanhSachLuong] = useState(null)
  const getDanhSach = async () => {
    await fetch(`/api/admin/luongtoithieu`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then(
      async (res) => {
        const resData = await res.json();
        if (resData.error) {
          showNotification('error', resData.error)
        } else {
          setDanhSachLuong(resData.getDanhSach)
        }
      }
    )
  }
  useEffect(() => {
    getLuongToiThieuSuDung();
    getDanhSach();
  }, []);
  if (!luongSuDung) return null;
  if (!danhSachLuong) return null;
  let dataDanhSach = []
  danhSachLuong.forEach((item, index) => {
    dataDanhSach.push({
      stt: index,
      id: item.id,
      SoQD: item.SoQD,
      TenQD: item.TenQD,
      VungIThang: item.VungIThang,
      VungIIThang: item.VungIIThang,
      VungIIIThang: item.VungIIIThang,
      VungIVThang: item.VungIVThang,
      VungIGio: item.VungIGio,
      VungIIGio: item.VungIIGio,
      VungIIIGio: item.VungIIIGio,
      VungIVGio: item.VungIVGio,
      TenFile: item.TenFile,
      TrangThai: item.TrangThai
    })
  });
  const filteredData = dataDanhSach.filter((row) => {
    return (
      row.TenQD.toLowerCase().includes(searchText.toLowerCase()) &&
      row.TrangThai.includes(statusText)

    )
  }
  )
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

      borderRadius: '50px'
    }
  }
  const columns = [
    {
      name: 'STT',
      selector: row => row.stt,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Số quyết định',
      selector: row => row.SoQD,
      sortable: true,
      width: '180px'
    },
    {
      name: 'Tên quyết định',
      selector: row => row.TenQD,
      sortable: true,
      width: '260px'
    },
    {
      name: 'Vùng I (đồng/tháng)',
      selector: row => row.VungIThang,
      sortable: true,
      width: '210px'
    },
    {
      name: 'Vùng I (đồng/giờ)',
      selector: row => row.VungIGio,
      sortable: true,
      width: '210px'
    },
    {
      name: 'Vùng II (đồng/tháng)',
      selector: row => row.VungIIThang,
      sortable: true,
      width: '220px'
    },
    {
      name: 'Vùng II (đồng/giờ)',
      selector: row => row.VungIIGio,
      sortable: true,
      width: '220px'
    },
    {
      name: 'Vùng III (đồng/tháng)',
      selector: row => row.VungIIIThang,
      sortable: true,
      width: '230px'
    },
    {
      name: 'Vùng III (đồng/giờ)',
      selector: row => row.VungIIIGio,
      sortable: true,
      width: '230px'
    },
    {
      name: 'Vùng IV (đồng/tháng)',
      selector: row => row.VungIVThang,
      sortable: true,
      width: '240px'
    },
    {
      name: 'Vùng IV (đồng/giờ)',
      selector: row => row.VungIVGio,
      sortable: true,
      width: '240px'
    },
    {
      name: 'Trạng thái',
      selector: row => row.TrangThai,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.TrangThai === 'Đang sử dụng',
          style: customStyle.active
        },
        {
          when: (row) => row.TrangThai === 'Đã sử dụng',
          style: customStyle.leave
        }
      ],
      width: '170px',

    },
    {
      name: 'Thao tác',
      cell: (row) => {
        return (
          <div className="flex gap-1 pr-2">
            <TrashIcon onClick={() => handleDelete(row.id)} />
            <EditIcon onClick={() => handleEdit(row.id)} />
            <DownloadIcon onClick={() => handleDownload(row.TenFile)} />
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ]
  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chăn muốn xóa quyết định này?")) {
      await fetch(`/api/admin/luongtoithieu/${id}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(async (res) => {
        const dataRes = await res.json();
        if (dataRes.msg) {
          getDanhSach();
          showNotification('success', dataRes.msg);
        } else {
          getDanhSach();
          showNotification('error', dataRes.error);
        }
      })
    }
  }
  const handleEdit = (id) => {
    navigate(`/admin/law/${id}/update`);
  }
  const handleDownload = (tenFile) => {
    fetch(`/api/admin/download/${tenFile}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
        "Authorization": `Bearer ${token}`
        // Định dạng dữ liệu tải xuống là octet-stream
      }
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', tenFile);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
      <div className='flex flex-wrap lg:flex-nowrap justify-between '>
        <div className='p-4 text-xl md:text-2xl font-bold'>
          <h1>Mức lương tối thiểu vùng</h1>
        </div>
      </div>
      <div className="relative mt-5 h-72 w-[92%] md:w-full mx-auto overflow-hidden rounded-xl 
      bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] 
      bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <div className='relative flex flex-col bg-clip-border rounded-xl bg-white w-[85%] md:w-[90%]
      text-gray-700 shadow-md mx-auto -mt-20 mb-6'>
        <div className='p-4'>
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <img src={icon_luong} alt="avatar" className='inline-block relative object-cover object-center 
                            w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
              <div>
                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">Thông tin lương tối thiểu vùng do pháp luật quy định</h5>
                {/* <p className="block antialiased font-sans text-sm leading-normal font-normal">Developer</p> */}
              </div>
            </div>

            <div className="flex justify-center text-center">
              <button
                type="button"
                onClick={() => navigate(`/admin/law/update`)}
                className="flex self-center bg-orange-400 text-base text-white opacity-0.9 mr-3 p-3
                    md:mr-0 
                    hover:drop-shadow-xl rounded-xl  "
              >
                <AiOutlineEdit className='self-center font-bold text-lg' />
              </button>
            </div>


          </div>
          <div className="grid grid-cols-1 mb-12 px-4">
            <div>
              <div className="bloc-tabs">
                <button
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  Thông tin quy định
                </button>
                <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  Lịch sử cập nhật
                </button>

              </div>
              <div className='content-tabs'>
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                  <div className='relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:mb-2 mb-0'>
                      <div>
                        <label className=' text-sm font-bold'>Số quyết định:</label>
                        <p className='inline ml-2  text-sm'>{luongSuDung.dangSuDung ? luongSuDung.dangSuDung.SoQD : ''}</p>
                      </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:mb-2 mb-0'>
                      <div>
                        <label className=' text-sm font-bold'>Tên quyết định:</label>
                        <p className='inline ml-2 text-sm'>{luongSuDung.dangSuDung ? luongSuDung.dangSuDung.TenQD : ''}</p>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-7 gap-3 mb-1'>
                    <div className='col-span-1'>
                      <label className='md:text-sm text-sm font-bold '>Vùng</label>
                    </div>
                    <div className='col-span-3'>
                      <label className='md:text-sm text-sm font-bold '>Mức lương tối thiểu tháng (đồng/tháng)</label>

                    </div>
                    <div className='col-span-3'>
                      <label className='md:text-sm text-sm font-bold '>Mức lương tối thiểu giờ (đồng/giờ)</label>

                    </div>
                  </div>
                  <div className='grid grid-cols-7 gap-3 mb-1'>
                    <div className='col-span-1'>
                      <p className='md:text-sm text-base'>Vùng I</p>
                    </div>
                    <div className='col-span-3 flex justify-center items-center'>
                      <p className='md:text-sm text-base'>{luongSuDung.dangSuDung ? luongSuDung.dangSuDung.VungIThang : ''}</p>
                    </div>
                    <div className='col-span-3 flex justify-center items-center'>
                      <p className='md:text-sm text-base'>{luongSuDung.dangSuDung ? luongSuDung.dangSuDung.VungIGio : ''}</p>
                    </div>
                  </div>
                  <div className='grid grid-cols-7 gap-3 mb-1'>
                    <div className='col-span-1'>
                      <p className='md:text-sm text-base'>Vùng II</p>
                    </div>
                    <div className='col-span-3 flex justify-center'>
                      <p className='md:text-sm text-base'>{luongSuDung.dangSuDung ? luongSuDung.dangSuDung.VungIIThang : ''}</p>
                    </div>
                    <div className='col-span-3 flex justify-center'>
                      <p className='md:text-sm text-base'>{luongSuDung.dangSuDung ? luongSuDung.dangSuDung.VungIIGio : ''}</p>
                    </div>
                  </div>
                  <div className='grid grid-cols-7 gap-3 mb-1'>
                    <div className='col-span-1'>
                      <p className='md:text-sm text-base'>Vùng III</p>
                    </div>
                    <div className='col-span-3 flex justify-center'>
                      <p className='md:text-sm text-base'>{luongSuDung.dangSuDung ? luongSuDung.dangSuDung.VungIIIThang : ''}</p>
                    </div>
                    <div className='col-span-3 flex justify-center'>
                      <p className='md:text-sm text-base'>{luongSuDung.dangSuDung ? luongSuDung.dangSuDung.VungIIIGio : ''}</p>
                    </div>
                  </div>
                  <div className='grid grid-cols-7 gap-3 mb-1'>
                    <div className='col-span-1'>
                      <p className='md:text-sm text-base'>Vùng IV</p>
                    </div>
                    <div className='col-span-3 flex justify-center'>
                      <p className='md:text-sm text-base '>{luongSuDung.dangSuDung ? luongSuDung.dangSuDung.VungIVThang : ''}</p>
                    </div>
                    <div className='col-span-3 flex justify-center'>
                      <p className='md:text-sm text-base'>{luongSuDung.dangSuDung ? luongSuDung.dangSuDung.VungIVGio : ''} </p>
                    </div>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-1 md:mb-2 mb-0'>
                    <div>
                      <label className=' text-sm font-bold'>File văn bản:</label>
                      <a className='inline ml-2 text-sm cursor-pointer text-blue-500 hover:text-blue-700' onClick={() => handleDownload(luongSuDung.dangSuDung ? luongSuDung.dangSuDung.TenFile : '')}>{luongSuDung.dangSuDung ? luongSuDung.dangSuDung.TenFile : ''}</a>
                    </div>
                  </div>
                </div>
                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                  <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">

                    <DataTable
                      customStyles={customStyle}
                      className='table-auto'
                      responsive
                      columns={columns}
                      data={filteredData}

                      pagination // Cho phép phân trang
                      paginationPerPage={5} // Số dòng mỗi trang
                      paginationRowsPerPageOptions={[5, 10, 15]} // Các tùy chọn số dòng mỗi trang
                      highlightOnHover // Tô đậm dòng khi di chuột qua
                      selectableRowsHighlight // Tô đậm các dòng được chọn
                      subHeader
                      subHeaderComponent={[
                        <input
                          key="search"
                          type="text"
                          className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                          placeholder='Tên quyết định...'
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />,
                        <select className='p-2 rounded-lg text-base border-2 mr-3 hover:border-blue-700' onChange={e => setStatusText(e.target.value)}>
                          <option value=''>---Trạng thái---</option>
                          <option value="Đang sử dụng">Đang sử dụng</option>
                          <option value="Đã sử dụng">Đã sử dụng</option>
                        </select>
                        ,

                      ]}
                    // Xác định các dòng được chọn

                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default LawView
