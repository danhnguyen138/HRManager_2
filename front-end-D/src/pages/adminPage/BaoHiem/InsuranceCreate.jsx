import { useState, useEffect } from 'react';
import InputText from 'components/input/InputText';
import SelectInput from 'components/input/SelectInput';
import { useSelector } from 'react-redux';
import { useStateContext } from 'context/ContextProvider';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
const createInsuranceSchema = yup.object().shape(
  {
    idNhanVien: yup.string().required('Xin chọn nhân viên'),
    insuranceCode: yup.string().matches(/^[0-9]{10}$/, 'Xin nhập đúng định dạng bảo hiểm').required('Xin nhập mã bảo hiểm'),
    dateStart: yup.date().required('Xin chọn ngày bắt đầu tham gia bảo hiểm'),
    insurancePremium: yup.string().matches(/^[0-9]*$/, 'Xin nhập chữ số').required('Xin nhập mức đóng'),
    percentEmployee: yup.number().required('Xin nhập phần trăm nhân viên đóng'),
    percentCompany: yup.number().required('Xin nhập phần trăm công ty đóng'),
    moneyEmployee: yup.string(),
    creator: yup.string().required('Xin nhập người tạo'),
    noteInsurance: yup.string()
  }
)
const InsuranceCreate = () => {
  const { showNotification } = useStateContext();
  const navigate = useNavigate();
  const token = useSelector(state => state.token);
  const admin = useSelector(state => state.user);
  const [getDataEmployee, setGetDataEmployee] = useState(null);
  const getEmployee = async () => {
    await fetch(`/api/admin/baohiem/nhanvien`, {
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
  useEffect(() => {
    getEmployee();
  }, []);
  if (!getDataEmployee) return null;
  let dataEmployee = []
  for (let i = 0; i < getDataEmployee.employee.length; i++) {
    dataEmployee.push({
      label: getDataEmployee.employee[i].HoTen,
      value: getDataEmployee.employee[i].id
    })
  }
  const initialValuesInsurance = {
    idNhanVien: "",
    insuranceCode: "",
    dateStart: "",
    insurancePremium: "",
    percentCompany: "",
    percentEmployee: "",
    moneyEmployee: "",
    creator: admin.HoTen,
    noteInsurance: ""
  }
  const handleSubmit = async (values) => {
    values.money=values.moneyEmployee.toString();
    await fetch(`/api/admin/baohiem/create`,{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(values)
    }).then(
      async(res)=>{
        const resData= await res.json();
        if (resData.error){
          showNotification('error', resData.error)
        }else{
          showNotification('success', resData.msg)
          navigate(`/admin/insurance`)
        }
      }
    )
  }
  const handleReturn = async () => {
    navigate(`/admin/insurance`)
  }
  return (
    <div className='mt-20 md:mt-8 mx-auto w-full md:w-[90%]'>
      <div className='flex flex-wrap lg:flex-nowrap justify-between '>
        <div className='p-4 text-xl md:text-3xl font-bold'>
          <h1>Tạo bảng ghi bảo hiểm</h1>
        </div>
      </div>
      <div className="relative mt-5 h-72 w-[92%] md:w-full mx-auto overflow-hidden rounded-xl 
            bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=htmlFormat&fit=crop&w=1920&q=80)] 
            bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <div className='relative flex flex-col bg-clip-border rounded-xl bg-white w-[85%] md:w-[90%]
            text-gray-700 shadow-md mx-auto -mt-24 mb-6'>
        <div className='p-4'>
          <div className="mb-8 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* <img src={avatar} alt="avatar" className='inline-block relative object-cover object-center 
                            w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
                            <div>
                                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">Nguyen Danh</h5>
                                <p className="block antialiased font-sans text-sm leading-normal font-normal">Developer</p>
                            </div> */}
              <h2 className='pl-4 pt-3 text-2xl font-semibold'>Hãy điền thông tin bảo hiểm</h2>
            </div>
            <button className='border rounded-lg border-slate-400 text-white text-base px-5 py-3 bg-green-500 hover:bg-green-700' onClick={handleReturn}>
              Trở lại
            </button>
            {/* <div className="flex justify-center text-center">
                            <button
                                type="button"
                                style={{ backgroundColor: currentColor }}
                                className="flex self-center text-base text-white opacity-0.9 mr-3 p-2 pr-3
                    md:mr-0 md:py-3 md:px-4 md:pr-5
                    hover:drop-shadow-xl rounded-xl  "
                            >
                                <FaDownload className='self-center mr-1 md:mr-2' /> Download report
                            </button>
                        </div> */}


          </div>
          <div className='grid grid-cols-1 gap-12 mb-12'>
            <div className='w-full'>
              <Formik
                initialValues={initialValuesInsurance}
                onSubmit={handleSubmit}
                validationSchema={createInsuranceSchema}
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
                      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                        <SelectInput
                          title="Chọn nhân viên"
                          labelDefault="---Lựa chọn nhân viên---"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name='idNhanVien'
                          id='idNhanVien'
                          value={values.idNhanVien}
                          errors={errors.idNhanVien}
                          touched={touched.idNhanVien}
                          options={dataEmployee}
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                        <InputText
                          title="Mã bảo hiểm"
                          id="insuranceCode"
                          name='insuranceCode'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.insuranceCode}
                          errors={errors.insuranceCode}
                          touched={touched.insuranceCode}
                          type='text'
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                        <InputText
                          title="Ngày tham gia"
                          id="dateStart"
                          name='dateStart'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.dateStart}
                          errors={errors.dateStart}
                          touched={touched.dateStart}
                          type='date'
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />

                        <InputText
                          title="Mức đóng"
                          id="insurancePremium"
                          name='insurancePremium'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.insurancePremium}
                          errors={errors.insurancePremium}
                          touched={touched.insurancePremium}
                          type='text'
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
                        <InputText
                          title="Phần trăm nhân viên (%)"
                          id="percentEmployee"
                          name='percentEmployee'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.percentEmployee}
                          errors={errors.percentEmployee}
                          touched={touched.percentEmployee}
                          type='number'
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                        <InputText
                          title="Phần trăm công ty (%)"
                          id="percentCompany"
                          name='percentCompany'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.percentCompany}
                          errors={errors.percentCompany}
                          touched={touched.percentCompany}
                          type='number'
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                        <InputText
                          title="Nhân viên thực đóng"
                          id="moneyEmployee"
                          name='moneyEmployee'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.moneyEmployee=values.insurancePremium * values.percentEmployee / 100}
                          errors={errors.moneyEmployee}
                          touched={touched.moneyEmployee}
                          type='text'
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                        <InputText
                          title="Người thực hiện"
                          id="creator"
                          name='creator'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.creator}
                          errors={errors.creator}
                          touched={touched.creator}
                          disabled
                          type='text'
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                      </div>
                      <div className='grid grid-cols-1 mb-3'>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor='noteInsurance'>
                          Ghi chú
                        </label>
                        <Field
                          id='noteInsurance'
                          name='noteInsurance'
                          as="textarea"
                          value={values.noteInsurance}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={5}
                          className='shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                        />
                      </div>
                      <div className="flex items-center justify-center mb-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                          Tạo bảo hiểm
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
  )
}

export default InsuranceCreate
