import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { BsTrash } from 'react-icons/bs';
import { FiEdit3, FiEye, FiSend } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from 'context/ContextProvider';
import { Formik } from 'formik';
import { dataThue } from 'data/dummy';
import * as yup from 'yup';
import InputText from "components/input/InputText";
const createSalarySchema = yup.object().shape(
    {
        Thang: yup.date().required('Xin chọn tháng'),
    }
)
const createThongSo = yup.object().shape(
    {
        BHXHNV: yup.number().positive('Giá trị phải là số dương').required('Vui lòng nhập phần trăm BHXH nhân viên'),
        BHYTNV: yup.number().positive('Giá trị phải là số dương').required('Vui lòng nhập phần trăm BHYT nhân viên'),
        BHXHDN: yup.number().positive('Giá trị phải là số dương').required('Vui lòng nhập phần trăm BHXH doanh nghiệp'),
        BHYTDN: yup.number().positive('Giá trị phải là số dương').required('Vui lòng nhập phần trăm BHYT doanh nghiệp'),
    }
)
const tinhNgayKetThuc = (month) => {
    console.log(month)
    let arr = month.split('-');
    const nextMonth = new Date(arr[0], arr[1], 1);

    // Trừ đi 1 ngày từ ngày đầu tháng tiếp theo
    nextMonth.setDate(nextMonth.getDate() - 1);

    // Lấy ngày cuối cùng của tháng
    const endDateOfMonth = nextMonth.getDate();

    return endDateOfMonth;
}
const TrashIcon = ({ ...props }) => {
    return (
        <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-red-500 cursor-pointer hover:bg-red-700'>
            <BsTrash className='text-base text-white' {...props} />
        </div>
    )
}

const ViewIcon = ({ ...props }) => {
    return (
        <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-blue-500 cursor-pointer hover:bg-blue-700'>
            <FiEye className='text-base text-white' {...props} />
        </div>
    );
}
const BangLuongList = () => {
    const [selectedRows, setSelectedRows] = useState();
    const [showThongSoThue, setShowThongSoThue] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showThongSo, setShowThongSo] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [getDataThongSo, setGetDataThongSo] = useState();
    const token = useSelector(state => state.token)
    const navigate = useNavigate();
    const { showNotification } = useStateContext();
    const getThongSo = async () => {
        await fetch(`/api/admin/thongsobangluong`, {
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
                    setGetDataThongSo(resData.getThongSo)
                }
            }
        )
    }
    const [getDataBangLuong, setGetDataBangLuong] = useState(null);

    const getBangLuong = async () => {
        await fetch(`/api/admin/bangluong`, {
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
                    setGetDataBangLuong(resData.getBangLuong)
                }
            }
        )
    }

    useEffect(() => {
        getThongSo();
        getBangLuong();
    }, []);
    if (!getDataThongSo) return null;
    if (!getDataBangLuong) return null;

    let data = []
    getDataBangLuong.forEach((item, index) => {
        data.push({
            id: item.id,
            stt: index,
            Thang: item.Thang,
            NgayBatDau: item.NgayBatDau,
            NgayKetThuc: item.NgayKetThuc
        })
    });

    const filteredData = data.filter((row) => {
        return (
            row.Thang.toLowerCase().includes(searchText.toLowerCase())
        )
    })
    const initialValues = {
        Thang: '',
        NgayCongChuan: ''
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
            style: {
                width: '50px'
            }
        },

        {
            name: 'Tháng',
            selector: row => row.Thang,
            sortable: true,
        },

        {
            name: 'Ngày bắt đầu',
            selector: row => row.NgayBatDau,
            sortable: true
        },
        {
            name: 'Ngày kết thúc',
            selector: row => row.NgayKetThuc,
            sortable: true
        },
        {
            name: 'Thao tác',
            cell: (row) => {
                return (
                    <div className='flex gap-1 pr-2'>
                        <TrashIcon onClick={() => handleDelete(row.id)} />
                        <ViewIcon onClick={() => handleView(row.id)} />
                    </div>
                );
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ]
    const handleView = async (id) => {
        navigate(`/admin/salary/${id}`)
    }


    const handleSubmitThongSo = async (values) => {
        await fetch(`/api/admin/thongsobangluong`, {
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
                    showNotification('success', resData.msg);
                    setShowThongSo(false)
                    await getThongSo();

                } else {
                    showNotification('error', resData.error)
                }
            }
        )
    }
    const handleDelete = async (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa thông báo này?")) {
            await fetch(`/api/admin/bangluong/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(
                async (res) => {
                    const resData = await res.json();
                    if (resData.msg) {
                        showNotification('success', resData.msg);
                        await getBangLuong()

                    } else {
                        showNotification('error', resData.error)
                    }
                }
            )
        }
    }
    const tinhNgayCong = (thang) => {
        let a = thang.split('-');
        const totalDays = new Date(parseInt(a[0]), parseInt(a[1]), 0).getDate(); // Tổng số ngày trong tháng 6
        let weekends = 0; // Biến đếm số ngày nghỉ cuối tuần

        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(parseInt(a[0]), parseInt(a[1]) - 1, day);
            const dayOfWeek = date.getDay(); // Lấy ngày trong tuần (0-6, 0 là Chủ nhật)

            if (dayOfWeek === 0) {
                weekends++; // Nếu là Chủ nhật (0) hoặc Thứ 7 (6) thì tăng biến đếm số ngày nghỉ cuối tuần
            }
        }
        return totalDays - weekends
    }
    const handleSubmit = async (values) => {
        console.log(values.Thang)
        const date = new Date(values.Thang);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const result = `${year}-${month}`;

        values = {
            ...values,
            NgayBatDau: `${result}-01`,
            NgayKetThuc: `${result}-${tinhNgayKetThuc(result)}`
        }
        values.Thang=result;
        await fetch(
            '/api/admin/bangluong/create',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(values)
            }
        ).then(async (res) => {
            const messageRes = await res.json();
            if (messageRes.error) {
                showNotification('error', messageRes.error)

            } else {
                setShowModal(false);
                getBangLuong();
                showNotification('success', messageRes.msg)

            }

        });
    }
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Trang bảng lương</h1>
                </div>

            </div>
            <div className='mt-12 mb-8 flex flex-col gap-12'>
                <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                    <div className="relative bg-clip-border flex justify-between mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                        <h6 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-relaxed text-white">
                            Danh sách bảng lương tháng
                        </h6>
                        <div className='flex gap-2 '>
                            <button
                                onClick={() => setShowThongSoThue(true)}
                                className='py-2 px-4 bg-green-500 rounded-xl font-bold text-white text-base transform hover:translate-y-1 transition-all duration-500'>
                                Thông số thuế
                            </button>
                            <button
                                onClick={() => setShowThongSo(true)}
                                className='py-2 px-4 bg-yellow-500 rounded-xl font-bold text-white text-base transform hover:translate-y-1 transition-all duration-500'>
                                Định mức bảo hiểm
                            </button>
                            <button
                                onClick={() => {
                                    setShowModal(true)
                                }}
                                className='py-2 px-4 bg-orange-500 rounded-xl font-bold text-white text-base transform hover:translate-y-1 transition-all duration-500'
                            >
                                Tạo bảng lương
                            </button>
                        </div>
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
            {showThongSoThue ? (
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
                                        Thông số thuế TNCN
                                    </h3>

                                </div>
                                {/*body*/}



                                <div className="relative p-6 flex-auto">
                                    <div className='grid grid-cols-2 md:mb-2 mb-0'>
                                        <div>
                                            <label className=' md:text-lg text-base font-bold'>{dataThue[0].name}:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataThue[0].value} đồng/tháng</p>
                                        </div>
                                        <div>
                                            <label className=' md:text-lg text-base font-bold'>Quy định:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataThue[0].SoQD} đồng/tháng</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 md:mb-2 mb-0'>
                                        <div>
                                            <label className=' md:text-lg text-base font-bold'>{dataThue[1].name}:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataThue[1].value} đồng/tháng</p>
                                        </div>
                                        <div>
                                            <label className=' md:text-lg text-base font-bold'>Quy định:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataThue[1].SoQD} đồng/tháng</p>
                                        </div>
                                    </div>
                                    <table className='table-auto mb-3'>
                                        <thead>
                                            <tr>
                                                <th>Thu nhập từ</th>
                                                <th>Thu nhập đến</th>
                                                <th>% Thuế suất</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataThue[2].data.map(item => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {item.start}
                                                        </td>
                                                        <td>
                                                            {item.end}
                                                        </td>
                                                        <td>
                                                            {item.radio}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>




                                </div>



                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowThongSoThue(false)}
                                    >
                                        Đóng
                                    </button>

                                    {/* <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Lưu
                                    </button> */}
                                </div>





                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null
            }
            {
                showModal ? (
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
                                            Chọn tháng
                                        </h3>

                                    </div>
                                    {/*body*/}
                                    <Formik
                                        validationSchema={createSalarySchema}
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
                                            console.log(values)
                                            return (
                                                <form onSubmit={handleSubmit}>
                                                    <div className="relative p-6 flex-auto">

                                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                                            <InputText
                                                                title='Tháng'
                                                                type='month'
                                                                name='Thang'
                                                                id='Thang'
                                                                lang='vi'
                                                                value={values.Thang}
                                                                errors={errors.Thang}
                                                                touched={touched.Thang}
                                                                onBlur={handleBlur}
                                                                onChange={(e) => {
                                                                    console.log(e.target.value)
                                                                    setFieldValue('NgayCongChuan', tinhNgayCong(e.target.value))
                                                                    setFieldValue('Thang', e.target.value)
                                                                }


                                                                }
                                                                className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                            />
                                                            <InputText
                                                                title='Ngày công chuẩn'
                                                                type='number'
                                                                name='NgayCongChuan'
                                                                id='NgayCongChuan'
                                                                lang='vi'
                                                                value={values.NgayCongChuan}
                                                                errors={errors.NgayCongChuan}
                                                                touched={touched.NgayCongChuan}
                                                                onBlur={handleBlur}
                                                                onChange={
                                                                    handleChange
                                                                }
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
                ) : null
            }
            {
                showThongSo ? (
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
                                            Thông số và định mức
                                        </h3>

                                    </div>
                                    {/*body*/}
                                    <Formik
                                        validationSchema={createThongSo}
                                        initialValues={{
                                            BHXHNV: getDataThongSo.BHXHNV,
                                            BHYTNV: getDataThongSo.BHYTNV,
                                            BHXHDN: getDataThongSo.BHXHDN,
                                            BHYTDN: getDataThongSo.BHYTDN,
                                            DinhMuc: getDataThongSo.DinhMuc
                                        }}
                                        onSubmit={handleSubmitThongSo}
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

                                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                                            <InputText
                                                                title='(%) Nhân viên đóng BHXH'
                                                                type='number'
                                                                name='BHXHNV'
                                                                id='BHXHNV'
                                                                lang='vi'
                                                                value={values.BHXHNV}
                                                                errors={errors.BHXHNV}
                                                                touched={touched.BHXHNV}
                                                                onBlur={handleBlur}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                            />
                                                            <InputText
                                                                title='(%) Nhân viên đóng BHYT'
                                                                type='number'
                                                                name='BHYTNV'
                                                                id='BHYTNV'
                                                                lang='vi'
                                                                value={values.BHYTNV}
                                                                errors={errors.BHYTNV}
                                                                touched={touched.BHYTNV}
                                                                onBlur={handleBlur}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                            />
                                                        </div>
                                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                                            <InputText
                                                                title='(%) Doanh nghiệp đóng BHXH'
                                                                type='number'
                                                                name='BHXHDN'
                                                                id='BHXHDN'
                                                                lang='vi'
                                                                value={values.BHXHDN}
                                                                errors={errors.BHXHDN}
                                                                touched={touched.BHXHDN}
                                                                onBlur={handleBlur}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                            />
                                                            <InputText
                                                                title='(%) Doanh nghiệp đóng BHYT'
                                                                type='number'
                                                                name='BHYTDN'
                                                                id='BHYTDN'
                                                                lang='vi'
                                                                value={values.BHYTDN}
                                                                errors={errors.BHYTDN}
                                                                touched={touched.BHYTDN}
                                                                onBlur={handleBlur}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                            />
                                                        </div>

                                                    </div>
                                                    {/*footer*/}
                                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                        <button
                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={() => setShowThongSo(false)}
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
                ) : null
            }
        </div >
    )
}

export default BangLuongList
