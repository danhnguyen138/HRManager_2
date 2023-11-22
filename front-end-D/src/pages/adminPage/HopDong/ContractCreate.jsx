import { useState, useEffect } from 'react';
import InputText from 'components/input/InputText';
import SelectInput from 'components/input/SelectInput';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { useStateContext } from 'context/ContextProvider';
import { Formik, Field } from 'formik';
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
const ContractCreate = () => {
    const [getDataDaiDien, setGetDataDaiDien] = useState(null);
    const [dataBacLuong, setDataBacLuong]= useState([])
    const { showNotification } = useStateContext();
    const token = useSelector(state => state.token);
    const { id } = useParams();
    const navigate = useNavigate();
    const [checkTypeContract, setCheckTypeContract] = useState(true);
    const [checkHinhThuc, setCheckHinhThuc] = useState(0);
    const [checkThoaThuan, setCheckThoaThuan] = useState(0)
    const handleCheckThoaThuan = (value) => {
        if (value == 'Thoả thuận thử việc') {
            setCheckThoaThuan(1)
        } else if (value == 'Thỏa thuận thực tập') {
            setCheckThoaThuan(2)
        } else {
            setCheckThoaThuan(0)
        }
        setCheckHinhThuc(0);
    }

    const handleCheckHinhThuc = (value) => {
        if (value == 'Trả lương theo bậc lương') {
            setCheckHinhThuc(1)
        } else if (value == 'Trả lương theo lương chính') {
            setCheckHinhThuc(2)
        } else {
            setCheckHinhThuc(0)
        }
    }
    
    //Kiểm tra hợp đồng có là thỏa thuận không?

    const handleTypeContract = (selectTypeContract) => {
        // setSelectTypeContract(selectTypeContract);
        setCheckTypeContract(true);
        if (selectTypeContract === 'Hợp đồng không xác định thời hạn') {
            setCheckTypeContract(false);
        }
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

    const [getDataEmployee, setGetDataEmployee] = useState(null);
    const getEmployee = async (id) => {
        await fetch(`/api/admin/danhsachnhanvien/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.error) {
                    showNotification('error'.resData.error)
                } else {
                    setGetDataEmployee(resData)
                }
            }
        )
    }
    const [getDataCompany, setGetDataCompany] = useState(null);
    const getCompany = async () => {
        await fetch(`/api/admin/congty`, {
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
                    setGetDataCompany(resData.getCongTy)
                }
            }
        )
    }
    const getDaiDien = async () => {
        await fetch('/api/admin/daidienhopdong', {
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
                    setGetDataDaiDien(resData.userDaiDien);
                }
            }
        )
    }
    //Lấy lương tối thiểu theo tháng
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
    //Lấy thang luong cac chuc vu
    useEffect(() => {
        getDaiDien();
        getEmployee(id);
        getCompany();
        getLuongToiThieu();
        getNgachLuong();
    }, [])
    if (!getDataDaiDien) return null;
    if (!getDataEmployee) return null;
    if (!getDataCompany) return null;
    if (!dataNgachLuong) return null;
    let dataDaiDien = [];
    for (let i = 0; i < getDataDaiDien.length; i++) {
        if (getDataDaiDien[i].id != id && getDataDaiDien[i].ChucVu) {
            if (getDataDaiDien[i].ChucVu.TenChucVu == 'Giám đốc' || getDataDaiDien[i].ChucVu.TenChucVu == 'Phó giám đốc') {
                dataDaiDien.push({
                    id: getDataDaiDien[i].id,
                    HoTen: getDataDaiDien[i].HoTen,
                    DiaChi: getDataDaiDien[i].NoiO,
                    SoDienThoai: getDataDaiDien[i].SoDT,
                    ChucVu: getDataDaiDien[i].ChucVu.TenChucVu
                })
            }
        }
    }
    let optionNgachLuong = [];
    dataNgachLuong.forEach((item, index) => {
        optionNgachLuong.push({
            value: item.id+' '+item.TenNgachLuong,
            label: item.TenNgachLuong
        })
    })

    const createContractSchema = yup.object().shape(
        {
            idDaiDien: yup.string().required('Xin chọn người đại diện'),
            tenhopdong: yup.string().required('Xin nhập tên'),
            loaihopdong: yup.string().required('Xin chọn loại hợp đồng'),
            thoihan: yup.string().test('checkThoiHan','Xin chọn thời hạn hợp đồng', function(value){
                if (checkTypeContract&& !value) return false;
                return true;
            }),
            luongchinh: yup.string().matches(/^[0-9]*$/, 'Xin nhập chữ số')
                .test('Kiemtraluongchinh', 'Xin nhập tiền lương chính', function (value) {
       
                    if (checkHinhThuc == 2 && !value) return false;
                    return true;
                }).test('Kiemtraluongtoithieu', 'Số tiền phải lớn hơn lương tối thiểu vùng', function (value) {
                    return !value || parseInt(value) > parseInt(dataToiThieu)
                }),
            // hinhthuctra: yup.string().required('Xin chọn hình thức'),
            luongchinhthuctap: yup.string().matches(/^[0-9]*$/, 'Xin nhập chữ số').test('KiemtraCoDuLieu', 'Xin nhập tiền lương thực tập', function (value) {
                if (checkThoaThuan == 2 && !value) return false;
                return true
            }),
            luongchinhthuviec: yup.string().matches(/^[0-9]*$/, 'Xin nhập chữ số').test('KiemtraCoDuLieu', 'Xin nhập tiền lương thực tập', function (value) {
                if (checkThoaThuan == 1 && !value) return false;
                return true
            }).test('Kiemtraluongtoithieu', 'Số tiền phải lớn hơn lương tối thiểu vùng', function (value) {
                return !value || parseInt(value) > parseInt(dataToiThieu)
            }),
            hinhthuctra: yup.string().test('checkHinhThuc', 'Xin chọn hình thức trả lương',function(value){
                if (checkThoaThuan==0 && !value) return false;
                return true
            }),
            ngachluong: yup.string().test('CheckNgachLuong','Xin chọn ngạch lương',function(value){
                if (checkHinhThuc==1 && !value) return false;
                return true
            }),
            bacluong: yup.string().test('CheckBacluong','Xin chọn bậc lương',function(value){
                if (checkHinhThuc==1 && !value) return false;
                return true
            }),
            DiaChiLV: yup.string().required('Xin nhập địa chỉ làm việc')
        }
    )
    let time = new Date().getTime();
    time = time.toString();
    time = time.slice(4, time.length);
    const initialValuesContract = {
        idDaiDien: "",
        hotena: "",
        chucvu: "",
        daidien: getDataCompany.TenDonVi,
        diachia: getDataCompany.DiaChi,
        sodienthoaia: "",
        thoigianlamviec: 'Theo quy định công ty',
        idNhanVien: getDataEmployee.user.id,
        hotenB: getDataEmployee.user.HoTen,
        cccdb: getDataEmployee.user.CCCD,
        ngaycapb: getDataEmployee.user.NgayCap,
        tai: getDataEmployee.user.NoiCap,
        DiaChiLV: '',
        mahd: 'MHD' + time,
        tenhopdong: "Hợp đồng lao động",
        loaihopdong: "",
        thoihan: "",
        luongchinh: "",
        luongchinhthuctap: '',
        luongchinhthuviec: '',
        ngachluong: '',
        bacluong: '',
        ghichu: "",
        hinhthuctra:'',
    }

    const handleSubmit = async (values) => {
        
        await fetch(`/api/admin/hopdong/${id}/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(values)
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.msg) {
                    showNotification('success', resData.msg)
                    navigate(`/admin/contract/${id}`)
                } else {
                    showNotification('error', resData.error)
                }
            }
        )
    }
    const handleReturn = async () => {
        navigate(`/admin/contract/${id}`)
    }
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-3xl font-bold'>
                    <h1>Tạo hợp đồng</h1>
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
                            <h2 className='pl-4 pt-3 text-2xl font-semibold'>Hãy điền thông tin hợp đồng</h2>
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
                                initialValues={initialValuesContract}
                                onSubmit={handleSubmit}
                                validationSchema={createContractSchema}
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
                                            <h3 className='text-xl font-semibold mb-3'>I. Bên A</h3>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                                <div className='mb-4'>
                                                    <label className=' block tetx-gray-700 font-bold mb-3'>Chọn người đại diện</label>
                                                    {errors.idDaiDien && touched.idDaiDien ? (<div className='text-sm text-red-700 mb-1'>{errors.idDaiDien}</div>) :
                                                        (<div className='mb-3'></div>)
                                                    }
                                                    <Field
                                                        onChange={(e) => {
                                                            if (e.target.value) {
                                                                for (let i = 0; i < dataDaiDien.length; i++) {
                                                                    if (dataDaiDien[i].id == e.target.value) {
                                                                        setFieldValue('hotena', dataDaiDien[i].HoTen)
                                                                        setFieldValue('sodienthoaia', dataDaiDien[i].SoDienThoai)
                                                                        setFieldValue('chucvu', dataDaiDien[i].ChucVu)
                                                                    }
                                                                }
                                                            } else {
                                                                setFieldValue('hotena', "")
                                                                setFieldValue('sodienthoaia', "")
                                                                setFieldValue('chucvu', "")
                                                            }
                                                            setFieldValue('idDaiDien', e.target.value)
                                                        }}
                                                        as="select" name='idDaiDien' className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    >
                                                        <option value=''>
                                                            ---Lựa chọn người đại diện---
                                                        </option>
                                                        {

                                                            dataDaiDien.map((item, index) => {
                                                                return (<option value={item.id} key={item.HoTen + index}>{item.HoTen}</option>)
                                                            })
                                                        }
                                                    </Field>
                                                </div>
                                                <div className='col-span-2'>
                                                    <InputText
                                                        title="Họ và tên"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.hotena}
                                                        errors={errors.hotena}
                                                        touched={touched.hotena}
                                                        name="hotena"
                                                        id='hovatendem'
                                                        type="text"
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title="Chức vụ"
                                                    id="chucvu"
                                                    name='chucvu'
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.chucvu}
                                                    errors={errors.chucvu}
                                                    touched={touched.chucvu}
                                                    type='text'
                                                    disabled
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                <InputText
                                                    title="Đại diện cho"
                                                    type="text"
                                                    id="daidien"
                                                    name="daidien"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.daidien}
                                                    errors={errors.daidien}
                                                    touched={touched.daidien}
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    disabled

                                                />

                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                <InputText
                                                    title="Địa chỉ"
                                                    type="text"
                                                    id="diachia"
                                                    name="diachia"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.diachia}
                                                    errors={errors.diachia}
                                                    touched={touched.diachia}
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    disabled

                                                />
                                                <InputText
                                                    title="Số điện thoại"
                                                    id="sodienthoaia"
                                                    name="sodienthoaia"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.sodienthoaia}
                                                    errors={errors.sodienthoaia}
                                                    touched={touched.sodienthoaia}
                                                    type="text"
                                                    disabled
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                            </div>
                                            <hr className='my-2'></hr>
                                            <h3 className='text-xl font-semibold mb-3'>II. Bên B</h3>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                                <div className='col-span-2'>
                                                    <InputText
                                                        title="Họ và tên"
                                                        type="text"
                                                        id="hotenB"
                                                        name="hotenB"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.hotenB}
                                                        errors={errors.hotenB}
                                                        touched={touched.hotenB}
                                                        disabled
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                                <InputText
                                                    title="Số CCCD"
                                                    id="cccdb"
                                                    name="cccdb"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.cccdb}
                                                    errors={errors.cccdb}
                                                    touched={touched.cccdb}
                                                    type="text"
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    disabled

                                                />
                                                <InputText
                                                    title="Ngày Cấp"
                                                    id="ngaycapb"
                                                    name="ngaycapb"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.ngaycapb}
                                                    errors={errors.ngaycapb}
                                                    touched={touched.ngaycapb}
                                                    type="date"
                                                    disabled
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                <InputText
                                                    title="Tại"
                                                    id="tai"
                                                    name="tai"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.tai}
                                                    errors={errors.tai}
                                                    touched={touched.tai}
                                                    type="text"
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    disabled
                                                />
                                            </div>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                                <div className='col-span-2'>
                                                    <InputText
                                                        title="Địa chỉ làm việc"
                                                        id="DiaChiLV"
                                                        name="DiaChiLV"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.DiaChiLV}
                                                        errors={errors.DiaChiLV}
                                                        touched={touched.DiaChiLV}
                                                        type="text"
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <hr className='my-2'></hr>
                                            <h3 className='text-xl font-semibold mb-3'>III. Thông tin hợp đồng</h3>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                                <InputText
                                                    title="Mã hợp đồng"
                                                    id="mahd"
                                                    name="mahd"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.mahd}
                                                    errors={errors.mahd}
                                                    touched={touched.mahd}
                                                    type="text"
                                                    disabled
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                <div className='col-span-2'>
                                                    <InputText
                                                        title="Tên hợp đồng"
                                                        id="tenhopdong"
                                                        name="tenhopdong"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.tenhopdong}
                                                        errors={errors.tenhopdong}
                                                        touched={touched.tenhopdong}
                                                        type="text"
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                                <div className='col-span-2'>
                                                    <SelectInput
                                                        title="Loại hợp đồng"
                                                        id="loaihopdong"
                                                        name='loaihopdong'
                                                        labelDefault="---Lựa chọn loại hợp đồng---"
                                                        onBlur={handleBlur}
                                                        value={values.loaihopdong}
                                                        onChange={(e) => {
                                                            setFieldValue('loaihopdong', e.target.value)
                                                            setFieldValue('thoihan', '')
                                                            setFieldValue('hinhthuctra', '')
                                                            setFieldValue('luongchinh', '')
                                                            setFieldValue('luongchinhthuctap', '')
                                                            setFieldValue('ngachluong','')
                                                            setFieldValue('bacluong','')
                                                            handleTypeContract(e.target.value)
                                                            handleCheckThoaThuan(e.target.value)
                                                        }}
                                                        errors={errors.loaihopdong}
                                                        touched={touched.loaihopdong}
                                                        options={[
                                                            {
                                                                value: 'Hợp đồng xác định thời hạn',
                                                                label: 'Hợp đồng xác định thời hạn'
                                                            },
                                                            {
                                                                value: 'Hợp đồng không xác định thời hạn',
                                                                label: 'Hợp đồng không xác định thời hạn'
                                                            },
                                                            {
                                                                value: 'Thoả thuận thử việc',
                                                                label: 'Thỏa thuận thử việc'
                                                            },
                                                            {
                                                                value: 'Thỏa thuận thực tập',
                                                                label: 'Thỏa thuận thực tập'
                                                            },
                                                        ]}

                                                        className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'

                                                    />
                                                </div>
                                                {checkTypeContract && (
                                                    <SelectInput
                                                        title="Thời hạn hợp đồng"
                                                        id="thoihan"
                                                        name='thoihan'
                                                        labelDefault="---Lựa chọn thời hạn---"
                                                        onBlur={handleBlur}
                                                        value={values.thoihan}
                                                        onChange={handleChange}
                                                        errors={errors.thoihan}
                                                        touched={touched.thoihan}
                                                        className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                        options={[
                                                            {
                                                                value: '1 Tháng',
                                                                label: '1 Tháng'
                                                            },
                                                            {
                                                                value: '3 Tháng',
                                                                label: '3 Tháng'
                                                            },
                                                            {
                                                                value: '6 Tháng',
                                                                label: '6 Tháng'
                                                            },
                                                            {
                                                                value: '1 Năm',
                                                                label: '1 Năm'
                                                            },
                                                            {
                                                                value: '2 Năm',
                                                                label: '2 Năm'
                                                            },
                                                        ]}


                                                    />
                                                )}
                                            </div>
                                            <div className='grid grid-cols-1 sm:grid-cols-3 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                                <InputText
                                                    title="Thời gian làm việc"
                                                    id="thoigianlamviec"
                                                    name="thoigianlamviec"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.thoigianlamviec}
                                                    errors={errors.thoigianlamviec}
                                                    touched={touched.thoigianlamviec}
                                                    type="text"
                                                    disabled
                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                />
                                                {checkThoaThuan == 2 && (
                                                    <InputText
                                                        title="Bồi dưỡng thực tập"
                                                        id="luongchinhthuctap"
                                                        name="luongchinhthuctap"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.luongchinhthuctap}
                                                        errors={errors.luongchinhthuctap}
                                                        touched={touched.luongchinhthuctap}
                                                        type="text"
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                )}
                                                {checkThoaThuan == 1 && (
                                                    <InputText
                                                        title="Lương chính"
                                                        id="luongchinhthuviec"
                                                        name="luongchinhthuviec"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.luongchinhthuviec}
                                                        errors={errors.luongchinhthuviec}
                                                        touched={touched.luongchinhthuviec}
                                                        type="text"
                                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                    />
                                                )}
                                                {checkThoaThuan == 0 && (
                                                    <>
                                                        <SelectInput
                                                            title="Hình thức trả lương"
                                                            id="hinhthuctra"
                                                            name='hinhthuctra'
                                                            labelDefault="---Lựa chọn hình thức trả---"
                                                            onBlur={handleBlur}
                                                            value={values.hinhthuctra}
                                                            onChange={(e) => {
                                                                setFieldValue('hinhthuctra', e.target.value)
                                                                setFieldValue('luongchinh','');
                                                                setFieldValue('ngachluong','')
                                                                setFieldValue('bacluong','')
                                                                handleCheckHinhThuc(e.target.value)
                                                            }}
                                                            errors={errors.hinhthuctra}
                                                            touched={touched.hinhthuctra}
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                            options={[
                                                                { value: 'Trả lương theo bậc lương', label: 'Trả lương theo bậc lương' },
                                                                { value: 'Trả lương theo lương chính', label: 'Trả lương theo lương chính' },
                                                            ]}
                                                        />

                                                        {checkHinhThuc == 2 && (
                                                            <InputText
                                                                title="Lương chính"
                                                                id="luongchinh"
                                                                name="luongchinh"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.luongchinh}
                                                                errors={errors.luongchinh}
                                                                touched={touched.luongchinh}
                                                                type="text"
                                                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-2'>
                                                {checkHinhThuc == 1 && (
                                                    <>
                                                        <SelectInput
                                                            title="Ngạch lương"
                                                            id="ngachluong"
                                                            name='ngachluong'
                                                            labelDefault="---Lựa chọn ngạch lương---"
                                                            onBlur={handleBlur}
                                                            value={values.ngachluong}
                                                            onChange={(e)=>{
                                                                setFieldValue('ngachluong',e.target.value);
                                                                setDataBacLuong([])
                                                                if (e.target.value!=''){
                                                                    let getValue= e.target.value;
                                                                    let getId= getValue.slice(0,getValue.indexOf(' '))
                                                                    dataNgachLuong.forEach(item=>{
                                                                        if(item.id==getId){
                                                                            if(item.BacLuongs.length!=0){
                                                                                let data=[]
                                                                                item.BacLuongs.forEach(item=>{
                                                                                    data.push({
                                                                                        value:item.id +' '+item.TenBacLuong,
                                                                                        label: item.TenBacLuong
                                                                                    })
                                                                                })
                                                                                setDataBacLuong(data)
                                                                            }
                                                                        }
                                                                    })
                                                                }
                                                            }}
                                                            errors={errors.ngachluong}
                                                            touched={touched.ngachluong}
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                            options={
                                                                optionNgachLuong
                                                            }
                                                        />
                                                        <SelectInput
                                                            title="Bậc lương"
                                                            id="bacluong"
                                                            name='bacluong'
                                                            labelDefault="---Lựa chọn bậc lương---"
                                                            onBlur={handleBlur}
                                                            value={values.bacluong}
                                                            onChange={handleChange}
                                                            errors={errors.bacluong}
                                                            touched={touched.bacluong}
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                            options={dataBacLuong}
                                                        />
                                                    </>
                                                )}
                                                
                                            </div>
                                            <div className='grid grid-cols-1 mb-3'>
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor='noteDepartment'>
                                                    Ghi chú
                                                </label>
                                                <Field
                                                    id='ghichu'
                                                    name='ghichu'
                                                    as="textarea"
                                                    value={values.ghichu}
                                                    onChange={handleChange}
                                                    rows={5}
                                                    className='shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                />


                                            </div>
                                            <div className="flex items-center justify-center mb-4">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                    Tạo hợp đồng
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

export default ContractCreate
