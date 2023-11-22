import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { BsTrash } from 'react-icons/bs';
import { FiEdit3, FiEye } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const ViewIcon = ({ ...props }) => {
  return (
    <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-blue-500 cursor-pointer hover:bg-blue-700'>
      <FiEye className='text-base text-white' {...props} />
    </div>
  );
}
const ContractList = () => {
  const [selectedRows, setSelectedRows] = useState();
  const [searchText, setSearchText] = useState('');
  const [statusText, setStatusText] = useState('');
  const [departmentText, setDepartmentText] = useState('');
  const [getDataEmployee, setGetDataEmployee] = useState(null);
  const [getDataDepartment, setGetDataDepartment] = useState(null);
  const token = useSelector(state => state.token);
  const navigate= useNavigate();
  const getEmployee = async () => {
    const res = await fetch('/api/admin/danhsachnhanvien', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    console.log(data)
    setGetDataEmployee(data);
  }
  const getDepartment = async () => {
    const res = await fetch('/api/admin/phongban', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(
      async (res) => {
        const data = await res.json();

        setGetDataDepartment(data)
      }
    )

  }
  useEffect(() => {
    getEmployee();
    getDepartment();
  }, []);

  if (!getDataEmployee) return null;
  if (!getDataDepartment) return null;
  let data = [];
  getDataEmployee.userlist.map((item, index) => {
    data = [...data, {
      id: item.id,
      stt: index,
      name: item.HoTen,
      email: item.Email,
      tel: item.SoDT,
      department: item.PhongBan? item.PhongBan.TenPB :'',
      status: item.TinhTrang
    }]
  })
  const filteredData = data.filter((row) => {
    return (row.name.toLowerCase().includes(searchText.toLowerCase()) &&
      row.status.includes(statusText) &&
      row.department.includes(departmentText)
    );
  })
  const handleView = (id) => {
    
   
    navigate(`/admin/contract/${id}`)
  };
  const customStyle = {
    rows: {
      style: {
        fontSize: '14px',
        fontWeight: '600',
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
      name: "Họ và tên",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true,
    },
    {
      name: "Số điện thoại",
      selector: row => row.tel,
      sortable: true,
    },
    {
      name: 'Phòng ban',
      selector: row => row.department,
      sortable: true,

    },
    {
      name: 'Trạng thái',
      selector: row => row.status,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.status === 'Đang Làm Việc',
          style: customStyle.active
        },
        {
          when: (row) => row.status === 'Đang Tạm Nghỉ',
          style: customStyle.pause
        },
        {
          when: (row) => row.status === 'Đã Nghỉ Việc',
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
            <ViewIcon onClick={() => handleView(row.id)} />
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ]
  return (
    <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
      <div className='flex flex-wrap lg:flex-nowrap justify-between '>
        <div className='p-4 text-xl md:text-2xl font-bold'>
          <h1>Trang Hợp Đồng</h1>
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
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
            <h6 className="block antialiased text-xl tracking-normal font-sans font-semibold leading-relaxed text-white">
              Danh sách hợp đồng nhân viên
            </h6>
          </div>
          <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">

            <DataTable
              customStyles={customStyle}
              className='table-auto'
              responsive
              columns={columns}
              data={filteredData}
              selectableRows // Cho phép chọn nhiều dòng
              onSelectedRowsChange={setSelectedRows}
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
                  placeholder='Tìm kiếm...'
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />,
                <select className='p-2 rounded-lg text-base border-2 mr-3 hover:border-blue-700' onChange={e => setStatusText(e.target.value)}>
                  <option value=''>---Trạng thái---</option>
                  <option value="Đang Làm Việc">Đang Làm Việc</option>
                  <option value="Đang Tạm Nghỉ">Đang Tạm Nghỉ</option>
                  <option value="Đã Nghỉ Việc">Đã Nghỉ Việc</option>
                </select>
                ,
                <select className='p-2 rounded-lg text-base border-2 mr-3 hover:border-blue-700' onChange={e => setDepartmentText(e.target.value)}>
                  <option className='rounded-lg' value=''>---Phòng Ban---</option>
                  {getDataDepartment.getPhongBan.map((item, index) => {
                    return (<option value={item.TenPB} key={item.TenPB + ' ' + index}>{item.TenPB}</option>)
                  })}
                </select>

              ]}
            // Xác định các dòng được chọn

            />
          </div>
        </div>

      </div>



    </div>
  )
}

export default ContractList;
