import SelectInput from 'components/input/SelectInput';
import { useStateContext } from "../../../context/ContextProvider";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import icon_luong from 'data/icon_luong.png';
import * as yup from "yup";
import InputText from "components/input/InputText";
import { Formik, Field } from 'formik';
import DataTable from 'react-data-table-component';
import { BsTrash } from 'react-icons/bs';
import { FiEdit3 } from 'react-icons/fi';
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
const WageCreate = () => {
  const { showNotification } = useStateContext();
  const token = useSelector(state => state.token);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [idEdit, setIdEdit] = useState({});
  //Chuyen trang
  const [toggleState, setToggleState] = useState(1);

  let time = new Date().getTime();
  time = time.toString();
  time = time.slice(4, 13);
  const [dataTime, setDataTime] = useState(time);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [dataToiThieu, setDataToiThieu] = useState(null);
  const getLuongToiThieu = async () => {
    await fetch('/api/admin/luongtoithieuvung', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(
      async (res) => {
        const resData = await res.json();
        if (resData.error) {
          if (resData.error == 'Lương tối thiểu vùng chưa có, cần cập nhật thông tin') navigate('/admin/law');
          if (resData.error == 'Công ty chưa chọn mã vùng') navigate('/admin/company')
          showNotification('error', resData.error)
        } else {
          setDataToiThieu(resData.getLuongToiThieu)
        }
      }
    )
  }
  //Lay danh sach ngach luong
  const [dataNgachLuong, setDataNgachLuong] = useState(null);
  const getNgachLuong = async () => {
    await fetch('/api/admin/ngachluong', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(
      async (res) => {
        const resData = await res.json();
        if (resData.error) {
          showNotification('error', resData.error)
        } else {
          setDataNgachLuong(resData.getDataNgachLuong)
        }
      }
    )
  }
  const [idSelectNgach, setIdSelectNgach] = useState(0);
  const [dataBacLuong, setDataBacLuong] = useState([]);
  const handleSubmitBacLuong = async (values) => {
    if (values.idNgachLuong != '') {
      await fetch(`/api/admin/bacluong/${values.idNgachLuong}`, {
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
            setIdSelectNgach(values.idNgachLuong);
            setDataBacLuong(resData.getDataBacLuong)
          }
        }
      )
    }
  }
  useEffect(() => {
    getLuongToiThieu();
    getNgachLuong();
  }, []);
  if (!dataToiThieu) return null;
  if (!dataNgachLuong) return null;


  //Phan 2 
  let ngachLuong = []
  let selectNgachLuong = []
  dataNgachLuong.forEach((item, index) => {
    ngachLuong.push({
      stt: index,
      id: item.id,
      MaNgachLuong: item.MaNgachLuong,
      TenNgachLuong: item.TenNgachLuong
    })
    selectNgachLuong.push({
      value: item.id,
      label: item.TenNgachLuong
    })
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
  }
  const columns = [
    {
      name: 'STT',
      selector: row => row.stt,
      sortable: true,
      width: '80px'

    },
    {
      name: 'Mã ngạch lương',
      selector: row => row.MaNgachLuong,
      sortable: true,
    },
    {
      name: 'Tên ngạch lương',
      selector: row => row.TenNgachLuong,
      sortable: true,
    },
    {
      name: 'Thao tác',
      cell: (row) => {
        return (
          <div className="flex gap-1 pr-2">
            <TrashIcon onClick={() => handleDelete(row.id)} />
            <EditIcon onClick={() => handleEdit(row.id)} />
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];
  const handleUpdate = async (values) => {
    await fetch(`/api/admin/ngachluong/${values.idNgachLuong}/update`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(values)
    }).then(
      async (res) => {
        const resData = await res.json();
        if (resData.msg) {
          showNotification('success', resData.msg);
          setShowModal(false)
          getNgachLuong();
        } else {
          showNotification('error', resData.error);
        }
      }
    )
  }
  const handleEdit = async (id) => {
    setShowModal(true)
    let a=ngachLuong.filter(item=>item.id==id)
    setIdEdit(a[0])
    
  }
  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn ngạch lương này?")) {
      await fetch(`/api/admin/ngachluong/${id}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(
        async (res) => {
          const resData = await res.json();
          if (resData.msg) {
            showNotification('success', resData.msg);
            await getNgachLuong();
          } else {
            showNotification('error', resData.error);
          }
        }
      )
    }
  }
  const updateThangLuong = yup.object().shape(
    {
      idNgachLuong: yup.string().required('Xin chọn ngạch lương'),
      I: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').test('checkToiThieu', 'Xin nhập số tiền lớn hơn lương tối thiểu vùng', function (value) {

        return !value || parseFloat(value) > parseFloat(dataToiThieu)
      }),
      // }).test('checkToiThieu', 'Xin nhập số tiền lớn hơn lương tối thiểu vùng', function (value) {
      //   const { II } = this.parent;
      //   return !value || parseFloat(value) < parseFloat(II)
      // }),
      II: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').test('checkToiThieu', 'Xin nhập số tiền lớn hơn bậc 1', function (value) {
        const { I } = this.parent;
        return !value || parseFloat(value) > parseFloat(I)
      }
      ),
      III: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').test('checkToiThieu', 'Xin nhập số tiền lớn hơn bậc 2', function (value) {
        const { II } = this.parent;
        return !value || parseFloat(value) > parseFloat(II)
      }
      ),
      IV: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').test('checkToiThieu', 'Xin nhập số tiền lớn hơn bậc 3', function (value) {
        const { III } = this.parent;
        return !value || parseFloat(value) > parseFloat(III)
      }
      ),
      V: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').test('checkToiThieu', 'Xin nhập số tiền lớn hơn bậc 4', function (value) {
        const { IV } = this.parent;
        return !value || parseFloat(value) > parseFloat(IV)
      }
      ),
      VI: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').test('checkToiThieu', 'Xin nhập số tiền lớn hơn bậc 5', function (value) {
        const { V } = this.parent;
        return !value || parseFloat(value) > parseFloat(V)
      }
      ),
      VII: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').test('checkToiThieu', 'Xin nhập số tiền lớn hơn bậc 6', function (value) {
        const { VI } = this.parent;
        return !value || parseFloat(value) > parseFloat(VI)
      }
      ),
      VIII: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').test('checkToiThieu', 'Xin nhập số tiền lớn hơn bậc 7', function (value) {
        const { VII } = this.parent;
        return !value || parseFloat(value) > parseFloat(VII)
      }
      ),
      IX: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').test('checkToiThieu', 'Xin nhập số tiền lớn hơn bậc 8', function (value) {
        const { VIII } = this.parent;
        return !value || parseFloat(value) > parseFloat(VIII)
      }
      ),
      X: yup.string().matches(/^[0-9]+$/, 'Xin nhập chữ số').test('checkToiThieu', 'Xin nhập số tiền lớn hơn bậc 9', function (value) {
        const { IX } = this.parent;
        return !value || parseFloat(value) > parseFloat(IX)
      }
      ),

    }
  )
  const handleSubmitNgachLuong = async (values, actions) => {
    await fetch(`/api/admin/ngachluong/create`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(values)
    }).then(
      async (res) => {
        const resData = await res.json();
        if (resData.error) {
          showNotification('error', resData.error)
        } else {
          let time = new Date().getTime();
          time = time.toString();
          time = time.slice(4, 13);
          actions.setFieldValue('MaNgachLuong', 'MNL' + time)
          actions.setFieldValue('TenNgachLuong', '')
          getNgachLuong()
          showNotification('success', resData.msg)
        }
      }
    )
  }
  //Thoi gian hien tai

  const handleSubmit = async (values) => {
    await fetch(`/api/admin/bacluong/create`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(values)
    }).then(
      async (res) => {
        const resData = await res.json();
        if (resData.error) {
          showNotification('error', resData.error)
        } else {
          getNgachLuong()
          
          showNotification('success', resData.msg)
        }
      }
    )
  }

  return (
    <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
      <div className='flex flex-wrap lg:flex-nowrap justify-between '>
        <div className='p-4 text-xl md:text-2xl font-bold'>
          <h1>Thông tin bậc lương</h1>
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
                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">Điền thông tin thang bậc lương</h5>
                {/* <p className="block antialiased font-sans text-sm leading-normal font-normal">Developer</p> */}
              </div>
            </div>
            <div className="flex justify-center text-center">
              <button
                type="button"
                onClick={() => navigate('/admin/wage')}
                className="flex self-center bg-green-400 text-base text-white opacity-0.9 mr-3 p-3
                    md:mr-0 
                    hover:drop-shadow-xl rounded-xl  hover:bg-green-700"
              >
                Trở lại
              </button>
            </div>
          </div>
          <div className='grid grid-cols-1 mb-12 px-4'>
            <div>
              <div className="bloc-tabs">
                <button
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  Tạo ngạch lương
                </button>
                <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  Tạo bậc lương
                </button>
              </div>
              <div className='content-tabs'>
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                  <div className="mb-5">
                    <Formik
                      onSubmit={handleSubmitNgachLuong}
                      initialValues={{
                        MaNgachLuong: "MNL" + time,
                        TenNgachLuong: ""
                      }}
                      validationSchema={yup.object().shape({
                        MaNgachLuong: yup.string(),
                        TenNgachLuong: yup.string().required('Xin nhập tên ngạch')
                      })}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,

                      }) => {
                        return (
                          <form className="bg-white w-full shadow-md p-3 rounded" onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                              <InputText
                                title="Mã ngạch"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.MaNgachLuong}
                                errors={errors.MaNgachLuong}
                                touched={touched.MaNgachLuong}
                                name="MaNgachLuong"
                                id='MaNgachLuong'
                                type="text"
                                disabled
                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                              />
                              <InputText
                                title="Tên ngạch"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.TenNgachLuong}
                                errors={errors.TenNgachLuong}
                                touched={touched.TenNgachLuong}
                                name="TenNgachLuong"
                                id='TenNgachLuong'
                                type="text"
                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                              />
                            </div>
                            <div className="flex items-center justify-center mb-4">
                              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Tạo ngạch lương
                              </button>
                            </div>
                          </form>
                        )
                      }}
                    </Formik>
                  </div>
                  <div>
                    <DataTable
                      customStyles={customStyle}
                      className='table-auto'
                      responsive
                      columns={columns}
                      data={ngachLuong}
                      pagination // Cho phép phân trang
                      paginationPerPage={5} // Số dòng mỗi trang
                      paginationRowsPerPageOptions={[5, 10, 15]} // Các tùy chọn số dòng mỗi trang
                      highlightOnHover // Tô đậm dòng khi di chuột qua
                      selectableRowsHighlight // Tô đậm các dòng được chọn

                    // Xác định các dòng được chọn

                    />
                  </div>
                </div>
                <div className={toggleState === 2 ? "content  active-content" : "content"}>

                  <Formik
                    initialValues={{
                      idNgachLuong: '',
                      I: '',
                      II: '',
                      III: '',
                      IV: '',
                      V: '',
                      VI: '',
                      VII: ''

                    }}
                    validationSchema={updateThangLuong}
                    onSubmit={handleSubmit}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      setFieldValue,
                    }) => {
                      return (
                        <form className='bg-white w-full shadow-md p-3 rounded' onSubmit={handleSubmit}>
                          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                            <SelectInput
                              title="Lựa chọn ngạch lương"
                              id='idNgachLuong'
                              name='idNgachLuong'
                              labelDefault="---Lựa chọn ngạch lương---"
                              onBlur={handleBlur}
                              value={values.idNgachLuong}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setFieldValue('idNgachLuong', e.target.value)
                                  setFieldValue('I', '')
                                  setFieldValue('II', '')
                                  setFieldValue('III', '')
                                  setFieldValue('IV', '')
                                  setFieldValue('V', '')
                                  setFieldValue('VI', '')
                                  setFieldValue('VII', '')
                                  for (let i = 0; i < dataNgachLuong.length; i++) {
                                    if (dataNgachLuong[i].id == e.target.value) {
                                      dataNgachLuong[i].BacLuongs.forEach(item => {
                                        if (item.TenBacLuong == 'I') setFieldValue('I', item.TienLuong)
                                        if (item.TenBacLuong == 'II') setFieldValue('II', item.TienLuong)
                                        if (item.TenBacLuong == 'III') setFieldValue('III', item.TienLuong)
                                        if (item.TenBacLuong == 'IV') setFieldValue('IV', item.TienLuong)
                                        if (item.TenBacLuong == 'V') setFieldValue('V', item.TienLuong)
                                        if (item.TenBacLuong == 'VI') setFieldValue('VI', item.TienLuong)
                                        if (item.TenBacLuong == 'VII') setFieldValue('VII', item.TienLuong)
                                      })
                                      break;
                                    }
                                  }
                                } else {
                                  setFieldValue('idNgachLuong', e.target.value)
                                  setFieldValue('I', '')
                                  setFieldValue('II', '')
                                  setFieldValue('III', '')
                                  setFieldValue('IV', '')
                                  setFieldValue('V', '')
                                  setFieldValue('VI', '')
                                  setFieldValue('VII', '')
                                }
                              }}
                              errors={errors.idNgachLuong}
                              touched={touched.idNgachLuong}
                              options={selectNgachLuong}
                              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            />
                            <div className='mb-4'>
                              <h6 className='font-bold text-lg'>Lương tối thiểu vùng là {dataToiThieu} đồng/tháng</h6>
                            </div>
                          </div>
                          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                            <InputText
                              title="Bậc 1"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.I}
                              errors={errors.I}
                              touched={touched.I}
                              name="I"
                              id='I'
                              type="text"
                              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            />
                            <InputText
                              title="Bậc 2"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.II}
                              errors={errors.II}
                              touched={touched.II}
                              name="II"
                              id='II'
                              type="text"
                              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            />
                          </div>
                          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                            <InputText
                              title="Bậc 3"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.III}
                              errors={errors.III}
                              touched={touched.III}
                              name="III"
                              id='III'
                              type="text"
                              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            />
                            <InputText
                              title="Bậc 4"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.IV}
                              errors={errors.IV}
                              touched={touched.IV}
                              name="IV"
                              id='IV'
                              type="text"
                              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            />
                          </div>
                          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                            <InputText
                              title="Bậc 5"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.V}
                              errors={errors.V}
                              touched={touched.V}
                              name="V"
                              id='V'
                              type="text"
                              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            />
                            <InputText
                              title="Bậc 6"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.VI}
                              errors={errors.VI}
                              touched={touched.VI}
                              name="VI"
                              id='VI'
                              type="text"
                              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            />
                          </div>
                          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                            <InputText
                              title="Bậc 7"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.VII}
                              errors={errors.VII}
                              touched={touched.VII}
                              name="VII"
                              id='VII'
                              type="text"
                              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            />
                          </div>
                          <div className="flex items-center justify-center mb-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
                              Cập nhật
                            </button>
                          </div>
                        </form>
                      )
                    }}
                  </Formik>
                </div>
              </div>
            </div>
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
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <Formik
                  onSubmit={handleUpdate}
                  initialValues={{
                    idNgachLuong: idEdit.id,
                    MaNgachLuong: idEdit.MaNgachLuong,
                    TenNgachLuong: idEdit.TenNgachLuong
                  }}
                  validationSchema={yup.object().shape({
                    MaNgachLuong: yup.string(),
                    TenNgachLuong: yup.string().required('Xin nhập tên ngạch')
                  })}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                  }) => {
                    return (
                      <form className='bg-white w-full shadow-md p-3 rounded' onSubmit={handleSubmit}>
                        <div className="relative p-6 flex-auto">
                          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                            <InputText
                              title="Mã ngạch lương"
                              id="MaNgachLuong"
                              name='MaNgachLuong'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.MaNgachLuong}
                              errors={errors.MaNgachLuong}
                              touched={touched.MaNgachLuong}
                              type='text'
                              disabled
                              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            />
                            <InputText
                              title="Tên ngạch lương"
                              type="text"
                              id="TenNgachLuong"
                              name="TenNgachLuong"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.TenNgachLuong}
                              errors={errors.TenNgachLuong}
                              touched={touched.TenNgachLuong}
                              className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Đóng
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                           
                          >
                            Cập nhật
                          </button>
                        </div>
                      </form>
                    )
                  }}
                </Formik>

                {/*footer*/}

              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export default WageCreate


