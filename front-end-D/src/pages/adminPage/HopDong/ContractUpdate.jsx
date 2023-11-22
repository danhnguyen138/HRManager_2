import { useState, useEffect } from 'react';
import InputText from 'components/input/InputText';
import SelectInput from 'components/input/SelectInput';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { useStateContext } from 'context/ContextProvider';
import { Formik, Field } from 'formik';
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
const createContractSchema = yup.object().shape(
    {
        idDaiDien: yup.string().required('Xin chọn người đại diện'),
        tenhopdong: yup.string().required('Xin nhập tên'),
        loaihopdong: yup.string().required('Xin chọn loại hợp đồng'),
        thoihan: yup.string().required('Xin nhập thời hạn hợp đồng'),
        luongcoban: yup.string().matches(/^[0-9]*$/, 'Xin nhập chữ số').required('Xin nhập lương cơ bản'),
        cachtra: yup.string().required('Xin chọn cách trả'),
        ngaytra: yup.string().required('Xin nhập ngày trả'),
        trangthai: yup.string().required('Xin chọn trạng thái'),
    }
)
const ContractUpdate = () => {

    const { showNotification } = useStateContext();
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.user);
    const { id, idHD } = useParams();
    const navigate = useNavigate();

    const [getDataContract, setGetDataContract] = useState(null)
    const getContract = async (id, idHD) => {
        await fetch(`/api/admin/hopdong/${id}/${idHD}`, {
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
                    setGetDataContract(resData.contract)
                }
            }
        )
    }
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
    useEffect(() => {
        getContract(id, idHD);
        getNgachLuong();
    }, [])

    if (!getDataContract) return null;
    if (!dataNgachLuong) return null;
    
    
    console.log(getDataContract)
    //Them truong dai dien vao form

    const handleSubmit = async (values) => {
        await fetch(`/api/admin/hopdong/${id}/update/${idHD}`, {
            method: 'PUT',
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
                    <h1>Cập nhật hợp đồng</h1>
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
                            <h3 className='text-xl font-semibold mb-3'>I. Bên A</h3>
                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>

                                <div className='col-span-2'>
                                    <InputText
                                        title="Họ và tên"
                                        value={getDataContract.HoTenA}

                                        type="text"
                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                <InputText
                                    title="Chức vụ"

                                    value={getDataContract.ChucVuA}
                                    type='text'
                                    disabled
                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                />
                                <InputText
                                    title="Đại diện cho"

                                    value={getDataContract.DaiDienA}
                                    type='text'
                                    disabled
                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                />
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                <InputText
                                    title="Địa chỉ"

                                    value={getDataContract.DiaChiA}
                                    type='text'
                                    disabled
                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                />
                                <InputText
                                    title="Số điện thoại"

                                    value={getDataContract.SoDTA}
                                    type='text'
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
                                        value={getDataContract.HoTenB}
                                        type="text"
                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                <InputText
                                    title="Số CCCD"
                                    value={getDataContract.CCCDB}
                                    type="text"
                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                    disabled
                                />
                                <InputText
                                    title="Ngày Cấp"
                                    value={getDataContract.NgayCapB}
                                    type="date"
                                    disabled
                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                />
                                <InputText
                                    title="Tại"
                                    id="tai"
                                    name="tai"
                                    value={getDataContract.TaiB}
                                    type="text"
                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                    disabled
                                />
                            </div>
                            <hr className='my-2'></hr>
                            <h3 className='text-xl font-semibold mb-3'>III. Thông tin hợp đồng</h3>
                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                <InputText
                                    title="Mã hợp đồng"
                                    value={getDataContract.MaHD}
                                    type="text"
                                    disabled
                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                />
                                <div className='col-span-2'>
                                    <InputText
                                        title="Tên hợp đồng"
                                        disabled
                                        value={getDataContract.TenHD}
                                        type="text"
                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                <div className='col-span-2'>
                                    <InputText
                                        title="Loại hợp đồng"
                                        value={getDataContract.LoaiHD}
                                        type="text"
                                        disabled
                                        className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                    />
                                </div>
                                {
                                    getDataContract.LoaiHD != 'Hợp đồng không xác định thời hạn' && (
                                        <InputText
                                            title="Thời hạn"
                                            disabled
                                            value={getDataContract.TenHD}
                                            type="text"
                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                        />
                                    )
                                }
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-3 sm:gap-6 md:grid-cols-3 md:gap-3'>
                                <InputText
                                    title="Thời gian làm việc"
                                    value={getDataContract.ThoiGianLV}
                                    type="text"
                                    disabled
                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                />

                                {
                                    getDataContract.LoaiHD == 'Thỏa thuận thử việc' && (
                                        <InputText
                                            title="Lương chính"
                                            value={getDataContract.LuongChinhThuViec}
                                            type="text"
                                            disabled
                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                        />
                                    )
                                }
                                {
                                    getDataContract.LoaiHD == 'Thỏa thuận thực tập' && (
                                        <InputText
                                            title="Bồi dưỡng thực tập"
                                            value={getDataContract.LuongChinhThucTap}
                                            type="text"
                                            disabled
                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                        />
                                    )
                                }
                                {
                                    getDataContract.HinhThucTra == 'Trả lương theo lương chính' && (
                                        <>
                                            <InputText
                                                title="Hình thức trả lương"
                                                value={getDataContract.HinhThucTra}
                                                type="text"
                                                disabled
                                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                            />
                                            <InputText
                                                title="Lương chính"
                                                value={getDataContract.LuongChinh}
                                                type="text"
                                                disabled
                                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                            />
                                        </>
                                    )
                                }
                                {
                                    getDataContract.HinhThucTra == 'Trả lương theo bậc lương' && (

                                        <InputText
                                            title="Hình thức trả lương"
                                            value={getDataContract.HinhThucTra}
                                            type="text"
                                            disabled
                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                        />


                                    )
                                }
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-2'>
                                {
                                    getDataContract.HinhThucTra == 'Trả lương theo bậc lương' && (
                                        <>
                                            <InputText
                                                title="Ngạch lương"
                                                value={getDataContract.NgachLuong}
                                                type="text"
                                                disabled
                                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                            />
                                            <InputText
                                                title="Bậc lương"
                                                value={getDataContract.BacLuong}
                                                type="text"
                                                disabled
                                                className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                            />
                                        </>
                                    )
                                }
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContractUpdate
