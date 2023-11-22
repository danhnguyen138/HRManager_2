import { useEffect, useState } from 'react';
import icon_baohiem from 'data/icon_baohiem.png';
import { useSelector } from 'react-redux';
import "View.css";
import DataTable from 'react-data-table-component';
import { AiOutlineEdit } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import InputText from "components/input/InputText";
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { useStateContext } from 'context/ContextProvider';
import SelectInput from 'components/input/SelectInput';

const updateInsuranceSchema = yup.object().shape(
    {
        LuongDongBaoHiem: yup.string().matches(/^[0-9]+/, 'Xin nhập chữ số').required('Vui lòng nhập lương bảo hiểm'),
        MaBH: yup.string().matches(/^(BHXH)\d{10}$/, 'Vui lòng nhập mã BHXH đúng định dạng').required('Xin nhập mã bảo hiểm'),
        MaYT: yup.string().matches(/^[A-Z]{2}\d{3}\d{10}$/, 'Vui lòng nhập mã hợp lệ').test('validateMaSo', '10 chữ số phải trùng với mã BHXH', function (value) {
            const { MaBH } = this.parent;
            const last10Digits = value?.slice(-10);
            const truongKhacLast10Digits = MaBH?.slice(-10);
            return last10Digits === truongKhacLast10Digits;
        }).required('Xin nhập mã bảo hiểm y tế'),
        NoiKhamYT: yup.string().required('Xin nhập địa chỉ nơi khám chữa bệnh'),
        TrangThai: yup.string().required('Xin chọn trạng thái')
    }
)

const InsuranceView = () => {
    const [toggleState, setToggleState] = useState(1);
    const { id } = useParams();
    const [TruongThayDoi, setTruongThayDoi] = useState('');
    const [NoiDungCu, setNoiDungCu] = useState('');
    const [NoiDungMoi, setNoiDungMoi] = useState('');
    const token = useSelector(state => state.token);
    const [toggleModal, setToggleModal] = useState(false);
    const navigate = useNavigate();
    const { showNotification } = useStateContext();
    const [getDataInsurance, setGetDataInsurance] = useState(null);
    const [getDataCompany, setGetDataCompany] = useState(null);
    const [getDataHistory, setGetDataHistory] = useState(null);
    const getHistory = async () => {
        await fetch(`/api/user/baohiem/lichsucapnhat/${id}`, {
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
                    setGetDataHistory(resData.getHistory)
                }
            }
        )
    }
    const handleSubmit = async (values) => {
        await fetch(`/api/admin/baohiem/${id}/update`, {
            method: 'PUT',
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
                    getInsurance();
                    getHistory();
                    showNotification('success', resData.msg)
                    setToggleModal(false)
                }
            }
        )
    }
    const getCompany = async () => {
        await fetch(`/api/user/congty`, {
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
    //Lay thong tin bao hiem
    const getInsurance = async () => {
        await fetch(`/api/user/insurance/${id}`, {
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
                    setGetDataInsurance(resData.getInsurance)
                }
            }
        )
    }
    //Lay thong tin nhan vien
    const [getDataEmployee, setGetDataEmployee] = useState(null);
    const getEmployee = async () => {
        await fetch(`/api/user/danhsachnhanvien/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.error) {
                    showNotification('error', resData.error)
                } else {
                    setGetDataEmployee(resData.user)
                }
            }
        )
    }
    const [getDataContract, setGetDataContract] = useState(null);
    const getContract = async () => {
        await fetch(`/api/user/hopdong/${id}/detail`, {
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
                    setGetDataContract(resData.hopdong)
                }
            }
        )
    }
    useEffect(() => {
        getInsurance();
        getEmployee();
        getContract();
        getCompany();
        getHistory();

    }, []);
 
    if (!getDataInsurance) return null;
    if (!getDataEmployee) return null;
    if (!getDataContract) return (
        <div className='mt-20 md:mt-8 mx-auto w-full md:w-[90%]'>
            <div className='flex justify-center'>
                Nhân viên phải có hợp đồng mới có bảo hiểm
            </div>
        </div>
    );
    if (!getDataCompany) return null;
    if (!getDataHistory) return null;

    let dataHistory = []
    let dataExcel = []
    getDataHistory.forEach((item, index) => {
        dataHistory.push({
            stt: index,
            TruongTD: item.TruongTD,
            NoiDungCu: item.NoiDungCu,
            NoiDungMoi: item.NoiDungMoi,
            LyDo: item.LyDo,
            NguoiThayDoi: item.thaydoi.HoTen
        });
        dataExcel.push({
            'STT': index + 1,
            'Trường thay đổi': item.TruongTD,
            'Nội dung cũ': item.NoiDungCu,
            'Nội dung mới': item.NoiDungMoi,
            'Lý do': item.LyDo,
            'Người thay đổi': item.thaydoi.HoTen,
            'Thời gian tạo': item.createdAt
        })
    });
    const filteredData = dataHistory.filter((row) => {
        return (
            row.TruongTD.toLowerCase().includes(TruongThayDoi.toLowerCase()) &&
            row.NoiDungCu.toLowerCase().includes(NoiDungCu.toLowerCase()) &&
            row.NoiDungMoi.toLowerCase().includes(NoiDungMoi.toLowerCase())
        )
    })
    const handleExcel = async (dataExcel) => {
        const XLSX = require("xlsx");

        // Khởi tạo workbook
        const workbook = XLSX.utils.book_new();

        // Tạo worksheet
        const worksheet = XLSX.utils.json_to_sheet(dataExcel);

        // Thêm worksheet vào workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Xuất file Excel
        XLSX.writeFile(workbook, "lichsusuachuabaohiem.xlsx");
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
            name: 'Trường thay đổi',
            selector: row => row.TruongTD,
            sortable: true,
            width: '200px'
        },
        {
            name: 'Nội dung cũ',
            selector: row => row.NoiDungCu,
            sortable: true,
            width: '210px'
        },
        {
            name: 'Nội dung mới',
            selector: row => row.NoiDungMoi,
            sortable: true,
            width: '210px'
        },
        {
            name: 'Lý do',
            selector: row => row.LyDo,
            sortable: true,
            width: '250px'
        },
        {
            name: 'Người thay đổi',
            selector: row => row.NguoiThayDoi,
            sortable: true,
            width: '200px'
        },
    ]
    return (
        <div className='mt-20 md:mt-8 mx-auto w-full md:w-[90%]'>
            <div className='flex flex-wrap lg:flex-nowrap justify-between'>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Một số thông tin bảo hiểm</h1>
                </div>
            </div>
            <div className="relative mt-5 h-72 w-[92%] md:w-full mx-auto overflow-hidden rounded-xl 
            bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] 
            bg-cover bg-center">
                <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
            </div>
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white w-[85%] md:w-[90%]
            text-gray-700 shadow-md mx-auto -mt-20 mb-6 '>
                <div className='p-4 md:px-4 px-1'>
                    <div className='mb-10 flex items-center justify-between gap-6'>
                        <div className="flex items-center gap-6">
                            <img src={icon_baohiem} alt="avatar" className='inline-block relative object-cover object-center 
                    w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
                            <div>
                                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">Thông tin bảo hiểm của {getDataEmployee.HoTen}</h5>
                            </div>

                        </div>
                        <div className="flex justify-center text-center gap-3 mr-3 md:mr-0">
                            <button
                                type="button"
                                onClick={() => setToggleModal(true)}
                                className="flex self-center bg-orange-400 text-base text-white opacity-0.9 p-3
                          
                                hover:drop-shadow-xl rounded-xl  "
                            >
                                <AiOutlineEdit className='self-center font-bold text-lg' />
                            </button>
                            <button className='border rounded-lg border-slate-400 text-white text-base px-5 py-2 bg-green-500 hover:bg-green-700' onClick={() => navigate(`/admin/insurance`)}>
                                Trở lại
                            </button>
                        </div>
                    </div>
                    <div className='mb-12 md:px-8 px-0'>
                        <div className="bloc-tabs">
                            <button
                                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                onClick={() => setToggleState(1)}
                            >
                                Tờ khai bảo hiểm xã hội
                            </button>
                            <button
                                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                                onClick={() => setToggleState(2)}
                            >
                                Lịch sử thay đổi bảo hiểm
                            </button>
                           
                        </div>
                        <div className='content-tabs'>
                            <div className={toggleState === 1 ? "content  active-content" : "content"}>
                                <div className='p-1'>
                                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 md:mb-2 mb-0'>
                                        <div className='flex justify-center'>
                                            <img src={`/assets/${getDataEmployee.HinhAnh}`} alt='avatar' className='md:inline-block relative object-cover object-center 
                    w-[180px] h-[180px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
                                        </div>
                                        <div className='col-span-3'>
                                            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 md:mb-2 mb-0'>
                                                <div className='col-span-3'>
                                                    <label className='md:text-lg text-base font-bold '>Họ và tên:</label>
                                                    <p className='ml-2 md:text-lg text-base inline'>{getDataEmployee.HoTen}</p>
                                                </div>
                                                <div className='col-span-2'>
                                                    <label className=' md:text-lg text-base font-bold '>Giới tính:</label>
                                                    <p className='inline ml-2 md:text-lg text-base'>{getDataEmployee.GioiTinh}</p>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 sm:grid-cols-1  md:grid-cols-5 md:mb-2 mb-0'>
                                                <div className='col-span-3'>
                                                    <label className=' md:text-lg text-base font-bold  '>Ngày sinh:</label>
                                                    <p className='inline ml-2 md:text-lg text-base'>{getDataEmployee.NgaySinh}</p>
                                                </div>
                                                <div className='col-span-2'>
                                                    <label className='md:text-lg text-base font-bold'>Dân tộc:</label>
                                                    <p className='inline ml-2 md:text-lg text-base'>{getDataEmployee.DanToc}</p>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:mb-2 mb-0'>
                                                <div>
                                                    <label className='md:text-lg text-base font-bold'>Quốc tịch:</label>
                                                    <p className='inline ml-2 md:text-lg text-base'>{getDataEmployee.QuocTich}</p>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 md:mb-2 mb-0'>
                                                <div>
                                                    <label className=' md:text-lg text-base font-bold'>Hộ khẩu:</label>
                                                    <p className='inline ml-2 md:text-lg text-base'>{getDataEmployee.HoKhau}</p>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 sm:grid-cols-1 md:mb-2 mb-0'>
                                                <div>
                                                    <label className='md:text-lg text-base font-bold'>Chỗ ở hiện tại:</label>
                                                    <p className='inline ml-2 md:text-lg text-base'>{getDataEmployee.NoiO}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='pl-4 grid grid-cols-1 md:grid-cols-2 md:mb-2 mb-0'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Số điện thoại:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getDataEmployee.SoDT}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Email:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getDataEmployee.Email}</p>
                                        </div>
                                    </div>
                                    <div className='pl-4 grid grid-cols-1 md:grid-cols-7 md:mb-2 mb-0'>
                                        <div className='col-span-2'>
                                            <label className='md:text-lg text-base font-bold inline'>Số CCCD:</label>
                                            <p className='ml-2 md:text-lg text-base inline'>{getDataEmployee.CCCD}</p>
                                        </div>
                                        <div className='col-span-2'>
                                            <label className='md:text-lg text-base font-bold'>Ngày cấp:</label>
                                            <p className='ml-2 inline md:text-lg text-base'>{getDataEmployee.NgayCap}</p>
                                        </div>
                                        <div className='col-span-3'>
                                            <label className=' md:text-lg text-base font-bold'>Nơi cấp:</label>
                                            <p className='ml-2 inline md:text-lg text-base'>{getDataEmployee.NoiCap}</p>
                                        </div>
                                    </div>
                                    <div className='pl-4 grid grid-cols-1 md:grid-cols-3 md:mb-2 mb-0'>
                                        <div className='col-span-2'>
                                            <label className='md:text-lg text-base font-bold inline'>Hợp đồng lao động số:</label>
                                            <p className='ml-2 md:text-lg text-base inline'>{getDataContract ? getDataContract.MaHD : ""}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Thời hạn:</label>
                                            <p className='ml-2 inline md:text-lg text-base'>{getDataContract ? getDataContract.ThoiHan : ""}</p>
                                        </div>
                                    </div>
                                    <div className='pl-4 grid grid-cols-1 md:grid-cols-3 md:mb-2 mb-0'>
                                        <div className='col-span-2'>
                                            <label className='md:text-lg text-base font-bold inline'>Loại hợp đồng:</label>
                                            <p className='ml-2 md:text-lg text-base inline'>{getDataContract ? getDataContract.LoaiHD : ""}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Ngày hết hạn:</label>
                                            <p className='ml-2 inline md:text-lg text-base'>{getDataContract ? getDataContract.NgayHetHan : ""}</p>
                                        </div>
                                    </div>
                                    <div className='pl-4 grid grid-cols-1 md:grid-cols-3 md:mb-2 mb-0'>
                                        <div className='col-span-2'>
                                            <label className='md:text-lg text-base font-bold inline'>Tên cơ quan:</label>
                                            <p className='ml-2 md:text-lg text-base inline'>{getDataCompany.TenDonVi}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Chức vụ:</label>
                                            <p className='ml-2 inline md:text-lg text-base'>{getDataEmployee.ChucVu ? getDataEmployee.ChucVu.TenChucVu : ""}</p>
                                        </div>
                                    </div>
                                    <div className='pl-4 grid grid-cols-1 md:grid-cols-1 md:mb-2 mb-0'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold inline'>Địa chỉ:</label>
                                            <p className='ml-2 md:text-lg text-base inline'>{getDataCompany.DiaChi}</p>
                                        </div>
                                    </div>
                                    <div className='pl-4 grid grid-cols-1 md:grid-cols-1 md:mb-2 mb-0'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold inline'>Lương bảo hiểm:</label>
                                            <p className='ml-2 md:text-lg text-base inline'>{getDataInsurance.LuongDongBaoHiem}</p>
                                        </div>
                                    </div>
                                    <div className='pl-4 grid grid-cols-1 md:grid-cols-1 md:mb-2 mb-0'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold inline'>Mã số sổ BHXH đã được cấp (nếu có):</label>
                                            <p className='ml-2 md:text-lg text-base inline'>{getDataInsurance.MaBH}</p>
                                        </div>
                                    </div>
                                    <div className='pl-4 grid grid-cols-1 md:grid-cols-1 md:mb-2 mb-0'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold inline'>Số thẻ BHYT đã được cấp (nếu có):</label>
                                            <p className='ml-2 md:text-lg text-base inline'>{getDataInsurance.MaYT}</p>
                                        </div>
                                    </div>
                                    <div className='pl-4 grid grid-cols-1 md:grid-cols-1 md:mb-2 mb-0'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold inline'>Nơi đăng ký khám chữa bệnh (nếu có):</label>
                                            <p className='ml-2 md:text-lg text-base inline'>{getDataInsurance.NoiKhamYT}</p>
                                        </div>
                                    </div>
                                    <div className='pl-4 grid grid-cols-1 md:grid-cols-1 md:mb-2 mb-0'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold inline'>Trạng thái:</label>
                                            <p className='ml-2 md:text-lg text-base inline'>{getDataInsurance.TrangThai}</p>
                                        </div>
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
                                                key="TruongThayDoi"
                                                type="text"
                                                className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                                                placeholder='Trường thay đổi...'
                                                value={TruongThayDoi}
                                                onChange={(e) => setTruongThayDoi(e.target.value)}
                                            />,
                                            <input
                                                key="NoiDungCu"
                                                type="text"
                                                className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                                                placeholder='Nội dung cũ...'
                                                value={NoiDungCu}
                                                onChange={(e) => setNoiDungCu(e.target.value)}
                                            />,
                                            <input
                                                key="NoiDungMoi"
                                                type="text"
                                                className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                                                placeholder='Nội dung mới...'
                                                value={NoiDungMoi}
                                                onChange={(e) => setNoiDungMoi(e.target.value)}
                                            />,
                                            <button
                                                onClick={() => handleExcel(dataExcel)}
                                                className='py-2 px-4 border-2 bg-green-500 rounded-lg text-white font-bold  text-base transform hover:translate-y-1 transition-all duration-500'>
                                                Xuất Excel
                                            </button>

                                        ]}
                                    // Xác định các dòng được chọn

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {toggleModal ? (
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
                                        Cập nhật tờ khai bảo hiểm
                                    </h3>

                                </div>
                                {/*body*/}
                                <Formik
                                    validationSchema={updateInsuranceSchema}
                                    initialValues={{
                                        LuongDongBaoHiem: getDataInsurance.LuongDongBaoHiem,
                                        MaBH: getDataInsurance.MaBH,
                                        MaYT: getDataInsurance.MaYT,
                                        NoiKhamYT: getDataInsurance.NoiKhamYT,
                                        TrangThai: getDataInsurance.TrangThai

                                    }}
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
                                        console.log(values)
                                        return (
                                            <form onSubmit={handleSubmit}>
                                                <div className="relative p-6 flex-auto">
                                                    <div className='grid grid-cols-1 md:grid-cols-1 md:gap-6'>

                                                        <InputText
                                                            title="Lương chính đóng bảo hiểm"
                                                            id="LuongDongBaoHiem"
                                                            type="text"
                                                            name='LuongDongBaoHiem'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.LuongDongBaoHiem}
                                                            errors={errors.LuongDongBaoHiem}
                                                            touched={touched.LuongDongBaoHiem}
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                            placeholder='Lương chính...'
                                                        />


                                                    </div>
                                                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                        <InputText
                                                            title='Mã số sổ BHXH đã được cấp (nếu có):'
                                                            id='MaBH'
                                                            type='text'
                                                            name='MaBH'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.MaBH}
                                                            errors={errors.MaBH}
                                                            touched={touched.MaBH}

                                                            placeholder='Mã BHXH...'
                                                            className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                        />
                                                        <InputText
                                                            title='Số thẻ BHYT đã được cấp (nếu có):'

                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.MaYT}
                                                            errors={errors.MaYT}
                                                            touched={touched.MaYT}
                                                            type='text'
                                                            name='MaYT'
                                                            id='MaYT'
                                                            className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                        />
                                                    </div>
                                                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                        <InputText
                                                            title='Nơi đăng ký khám chữa bệnh (nếu có):'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.NoiKhamYT}
                                                            errors={errors.NoiKhamYT}
                                                            touched={touched.NoiKhamYT}

                                                            type='text'
                                                            name='NoiKhamYT'
                                                            id='NoiKhamYT'
                                                            className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                        />
                                                        <SelectInput
                                                            title="Trạng thái"
                                                            id='TrangThai'
                                                            name='TrangThai'
                                                            labelDefault="---Lựa chọn trạng thái---"
                                                            onBlur={handleBlur}
                                                            value={values.TrangThai}
                                                            onChange={handleChange}
                                                            errors={errors.TrangThai}
                                                            touched={touched.TrangThai}
                                                            options={[{
                                                                value: 'Chưa tham gia',
                                                                label: 'Chưa tham gia'
                                                            }, {
                                                                value: 'Đã tham gia',
                                                                label: 'Đã tham gia'
                                                            }, {
                                                                value: 'Đã tạm ngưng',
                                                                label: 'Đã tạm ngưng'
                                                            },
                                                            ]}
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                    </div>


                                                </div>
                                                {/*footer*/}
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setToggleModal(false)}
                                                    >
                                                        Đóng
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

export default InsuranceView
