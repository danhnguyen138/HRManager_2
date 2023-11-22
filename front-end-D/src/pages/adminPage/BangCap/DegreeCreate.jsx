import { useState, useEffect } from 'react';
import InputText from 'components/input/InputText';
import SelectInput from 'components/input/SelectInput';
import { useSelector } from 'react-redux';
import { useStateContext } from 'context/ContextProvider';
import { Formik, Field } from 'formik';
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
const createDegreeSchema = yup.object().shape(
  {
    degreeCode: yup.string().required('Xin chọn người đại diện'),
    decisionNumber: yup.string().required('Xin nhập số quyết định'),
    title: yup.string().required('Xin nhập số quyết định'),
    typeDegree: yup.string().required('Xin chọn loại bằng cấp'),
    specialized: yup.string().required('Xin nhập chuyên ngành'),
    formsTrain: yup.string().required('Xin chọn hình thức đào tạo'),
    rating: yup.string().required('Xin nhập xếp loại'),
    score: yup.string().required('Xin nhập điểm số'),
    dateSign: yup.date().required('Xin chọn ngày ký'),
    termDegree: yup.string().required('Xin chọn hiệu lực'),
    placeDegree: yup.string().required('Xin nhập tổ chức cấp bằng'),
    addressDegree: yup.string().required('Xin nhập địa chỉ của tổ chức'),
  }
)
const DegreeCreate = () => {
  const { id } = useParams();
  const { showNotification } = useStateContext();
  const navigate = useNavigate();
  const token = useSelector(state => state.token);
  let time = new Date().getTime();
  time = time.toString();
  time = time.slice(4, time.length);
  const initialValuesDegree = {
    degreeCode: 'MBC' + time,
    decisionNumber: "",
    title: "",
    typeDegree: "",
    specialized: "",
    formsTrain: "",
    rating: "",
    score: "",
    dateSign: "",
    termDegree: "",
    placeDegree: "",
    addressDegree: "",
    noteDegree: ""
  }
  const handleSubmit = async (values) => {
    await fetch(`/api/admin/bangcap/${id}/create`, {
      method: 'POST',
      headers: {
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
          navigate(`/admin/degree/${id}`)
        }
      }
    )
  }
  const handleReturn = async () => {
    navigate(`/admin/degree/${id}`)
  }
  return (
    <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
      <div className='flex flex-wrap lg:flex-nowrap justify-between '>
        <div className='p-4 text-xl md:text-3xl font-bold'>
          <h1>Tạo bằng cấp</h1>
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
              <h2 className='pl-4 pt-3 text-2xl font-semibold'>Hãy điền thông tin bằng cấp</h2>
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
                initialValues={initialValuesDegree}
                onSubmit={handleSubmit}
                validationSchema={createDegreeSchema}
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
                        <InputText
                          title="Mã bằng cấp"
                          id="degreeCode"
                          name='degreeCode'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.degreeCode}
                          errors={errors.degreeCode}
                          touched={touched.degreeCode}
                          type='text'
                          disabled
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                        <InputText
                          title='Số quyết định'
                          id='decisionNumber'
                          name='decisionNumber'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.decisionNumber}
                          errors={errors.decisionNumber}
                          touched={touched.decisionNumber}
                          type='text'
                          className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                        />
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                        <InputText
                          title="Tên bằng cấp"
                          id="title"
                          name='title'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.title}
                          errors={errors.title}
                          touched={touched.title}
                          type='text'

                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                        <SelectInput
                          title='Loại bằng cấp'
                          id='typeDegree'
                          labelDefault="---Lựa chọn loại bằng cấp---"
                          onBlur={handleBlur}
                          errors={errors.typeDegree}
                          touched={touched.typeDegree}
                          onChange={handleChange}
                          value={values.typeDegree}
                          options={[
                            { value: 'Chứng chỉ anh văn', label: 'Chứng chỉ anh văn' },
                            { value: 'Chứng chỉ tin học', label: 'Chứng chỉ tin học' },
                            { value: 'Bằng đại học', label: 'Bằng đại học' },
                            { value: 'Bằng cao đẳng', label: 'Bằng cao đẳng' },
                            { value: 'Bằng trung cấp nghề', label: 'Bằng trung cấp nghề' },
                          ]}
                          className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                        />
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                        <InputText
                          title="Chuyên ngành"
                          id="specialized"
                          name='specialized'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.specialized}
                          errors={errors.specialized}
                          touched={touched.specialized}
                          type='text'
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                        <SelectInput
                          title='Hình thức đào tạo'
                          id='formsTrain'
                          labelDefault="---Lựa chọn hình thức đào tạo---"
                          onBlur={handleBlur}
                          errors={errors.formsTrain}
                          touched={touched.formsTrain}
                          onChange={handleChange}
                          value={values.formsTrain}
                          options={[
                            { value: 'Tại chức', label: 'Tại chức' },
                            { value: 'Đào tạo từ xa', label: 'Đào tạo từ xa' },
                            { value: 'Vừa làm vừa học', label: 'Vừa làm vừa học' },
                            { value: 'Đào tạo ngắn hạn', label: 'Đào tạo ngắn hạn' },
                            { value: 'Đào tạo dài hạn', label: 'Đào tạo dài hạn' },
                            { value: 'Đào tạo chuyên sâu', label: 'Đào tạo chuyên sâu' },
                            { value: 'Đào tạo cơ bản', label: 'Đào tạo cơ bản' },
                            { value: 'Đào tạo nghề nghiệp', label: 'Đào tạo nghề nghiệp' },
                            { value: 'Đào tạo văn bằng', label: 'Đào tạo văn bằng' },
                            { value: 'Đào tạo chính quy', label: 'Đào tạo chính quy' },
                          ]}
                          className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                        />
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
                        <InputText
                          title="Xếp loại"
                          id="rating"
                          name='rating'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.rating}
                          errors={errors.rating}
                          touched={touched.rating}
                          type='text'
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                        <InputText
                          title="Điểm số"

                          id="score"
                          name='score'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.score}
                          errors={errors.score}
                          touched={touched.score}
                          type='text'
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                        <InputText
                          title="Ngày ký"
                          id="dateSign"
                          name='dateSign'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.dateSign}
                          errors={errors.dateSign}
                          touched={touched.dateSign}
                          type='date'
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                        <SelectInput
                          title='Hiệu lực'
                          id='termDegree'
                          labelDefault="---Lựa chọn hiệu lực---"
                          onBlur={handleBlur}
                          errors={errors.termDegree}
                          touched={touched.termDegree}
                          onChange={handleChange}
                          value={values.termDegree}
                          options={[
                            { value: '6 tháng', label: '6 tháng' },
                            { value: '1 năm', label: '1 năm' },
                            { value: '2 năm', label: '2 năm' },
                            { value: '5 năm', label: '5 năm' },
                            { value: 'Không thời hạn', label: 'Không thời hạn' },
                          ]}
                          className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                        />
                        <InputText
                          title="Tổ chức"
                          id="placeDegree"
                          name='placeDegree'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.placeDegree}
                          errors={errors.placeDegree}
                          touched={touched.placeDegree}
                          type='text'
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />

                      </div>
                      <div className='grid grid-cols-1'>
                        <InputText
                          title="Địa chỉ"
                          id="addressDegree"
                          name='addressDegree'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.addressDegree}
                          errors={errors.addressDegree}
                          touched={touched.addressDegree}
                          type='text'
                          className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                      </div>
                      <div className='grid grid-cols-1 mb-3'>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor='noteDepartment'>
                          Ghi chú
                        </label>
                        <Field
                          id='noteDegree'
                          name='noteDegree'
                          as="textarea"
                          value={values.noteDegree}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={5}
                          className='shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                        />
                      </div>
                      <div className="flex items-center justify-center mb-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                          Tạo bằng cấp
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

export default DegreeCreate
