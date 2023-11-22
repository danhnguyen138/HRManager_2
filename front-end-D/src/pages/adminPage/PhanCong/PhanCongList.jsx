import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStateContext } from 'context/ContextProvider';
import InputText from "components/input/InputText";
import { Formik } from 'formik';
import * as yup from 'yup';
const ViewIcon = ({ ...props }) => {
  return (
    <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-blue-500 cursor-pointer hover:bg-blue-700'>
      <FiEye className='text-base text-white' {...props} />
    </div>
  );
}
const TimeKeepingSchema = yup.object().shape(
  {
    dateStart: yup.date().required('Xin chọn ngày bắt đầu'),
    dateEnd: yup.date().required('Xin chọn ngày kết thúc')
      .when('dateStart', (dateStart, schema) => {
        return schema.min(dateStart, 'Ngày kết thúc phải sau ngày bắt đầu')
        // .test('is-next-day','End date must be the next day', fun)
      }),
    fileImport: yup.mixed().required('Xin chọn file excel').test('fileType', 'Sai định dạng file, hãy chọn file có đuôi .xlsx ', (value) => {
      return value && ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(value.type);
    })
  }
)
const PhanCongList = () => {
  const [selectedRows, setSelectedRows] = useState(); // lay nhung dong da chon 
  const [searchText, setSearchText] = useState(''); // Search ten nhan vien
  const [statusText, setStatusText] = useState('');// Tim trang thai nhan vien
  const [departmentText, setDepartmentText] = useState(''); //Tim ten phong ban
  const token = useSelector(state => state.token);//Lay token 
  const { showNotification } = useStateContext();
  const [getDataEmployee, setGetDataEmployee] = useState(null);
  const [getDataDepartment, setGetDataDepartment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const getEmployee = async () => {
    await fetch(`/api/admin/danhsachnhanvien`, {
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
          setGetDataEmployee(resData)
        }
      }
    )
  }
  const getDepartment = async () => {
    await fetch(`/api/admin/phongban`, {
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
          setGetDataDepartment(resData)
        }
      }
    )
  }
  useEffect(() => {
    getDepartment();
    getEmployee();
  }, []);
  if (!getDataDepartment) return null;
  if (!getDataEmployee) return null;
  let dataEmployee = [];
  let dataDepartment = [];
  for (let i = 0; i < getDataEmployee.userlist.length; i++) {
    dataEmployee.push({
      id: getDataEmployee.userlist[i].id,
      stt: i,
      name: getDataEmployee.userlist[i].HoTen,
      email: getDataEmployee.userlist[i].Email,
      tel: getDataEmployee.userlist[i].SoDT,
      department: getDataEmployee.userlist[i].PhongBan ? getDataEmployee.userlist[i].PhongBan.TenPB : '',
      status: getDataEmployee.userlist[i].TinhTrang
    })
  }
  for (let i = 0; i < getDataDepartment.getPhongBan.length; i++) {
    dataDepartment.push({
      value: getDataDepartment.getPhongBan[i].TenPB,
      label: getDataDepartment.getPhongBan[i].TenPB
    })
  }
  const filteredData = dataEmployee.filter((row) => {
    return (
      row.name.toLowerCase().includes(searchText.toLowerCase()) &&
      row.status.includes(statusText) &&
      row.department.includes(departmentText)
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
  const initialValues = {
    dateStart: '',
    dateEnd: '',
    fileImport: ''
  }
  const handleView = (id) => {
    navigate(`/admin/phancong/${id}`);
  };
  const columns = [
    {
      name: 'STT',
      selector: row => row.stt,
      sortable: true,
      width: '80px'

    },
    {
      name: 'Họ và tên',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,

    },
    {
      name: 'Số điện thoại',
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
          when: (row) => row.status === 'Đang Tạm Dừng',
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
            {/* <TrashIcon onClick={() => handleDelete(row.id)} />
            <EditIcon onClick={() => handleEdit(row.id)} /> */}
            <ViewIcon onClick={() => handleView(row.id)} />
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];
  const handleSubmit = async (values) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append('filePath', values.fileImport.name);
    await fetch(
      `/api/admin/chamcong/import`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    }
    ).then(
      async (res) => {
        const resData = await res.json();
        if (resData.error) {
          showNotification('error', resData.error)
        } else {
          setShowModal(false);
          showNotification('success', resData.msg)
        }
      }
    )
  }
  return (
    <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
      <div className='flex flex-wrap lg:flex-nowrap justify-between '>
        <div className='p-4 text-xl md:text-2xl font-bold'>
          <h1>Trang chấm công</h1>
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
          <div className="relative flex justify-between flex-col gap-2 md:flex-row bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
            <h6 className="block antialiased text-xl tracking-normal font-sans font-semibold leading-relaxed text-white">
              Danh sách nhân viên
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
                  <option value="Đang Làm Việc">Đang làm việc</option>
                  <option value="Đang Tạm Dừng">Đang tạm dừng</option>
                  <option value="Đã Nghỉ Việc">Đã nghỉ việc</option>
                </select>
                ,
                <select className='p-2 rounded-lg text-base border-2 mr-3 hover:border-blue-700' onChange={e => setDepartmentText(e.target.value)}>
                  <option className='rounded-lg' value=''>---Phòng Ban---</option>
                  {dataDepartment.map((item, index) => {
                    return (<option value={item.value} key={item.value + ' ' + index}>{item.label}</option>)
                  })}

                </select>
                ,

              ]}
            // Xác định các dòng được chọn

            />
          </div>
        </div>

      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Lấy dữ liệu từ file excel
                  </h3>

                </div>
                {/*body*/}
                <Formik
                  validationSchema={TimeKeepingSchema}
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue
                  }) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        <div className="relative p-6 flex-auto">

                          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                            <InputText
                              title='Từ ngày'
                              type='date'
                              name='dateStart'
                              id='dateStart'
                              values={values.dateStart}
                              errors={errors.dateStart}
                              touched={touched.dateStart}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                            />
                            <InputText
                              title='Đến ngày'
                              type='date'
                              name='dateEnd'
                              id='dateEnd'
                              values={values.dateEnd}
                              errors={errors.dateEnd}
                              touched={touched.dateEnd}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                            />
                          </div>
                          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                            <InputText
                              title='Chọn file'
                              type='file'
                              name='fileImport'
                              id='fileImport'
                              values={values.fileImport}
                              onChange={e => setFieldValue('fileImport', e.currentTarget.files[0])}
                              onBlur={handleBlur}
                              errors={errors.fileImport}
                              touched={touched.fileImport}
                              className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                            />

                          </div>

                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>

                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"

                          >
                            Lưu
                          </button>
                        </div>
                      </form>
                    )
                  }}

                </Formik>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export default PhanCongList
