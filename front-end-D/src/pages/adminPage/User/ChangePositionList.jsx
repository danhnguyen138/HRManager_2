import React from 'react'
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { BsTrash, BsBag } from 'react-icons/bs';
import { FiEdit3, FiEye } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStateContext } from 'context/ContextProvider';
import { Formik, Field } from 'formik';
import * as yup from "yup";
import InputText from "components/input/InputText";
import { format } from 'date-fns';
const createHistorySchema = yup.object().shape(
    {
        phongbanmoi: yup.string().required('Xin chọn phòng ban mới'),
        chucvumoi: yup.string().required('Xin chọn chức vụ mới'),
    }
)
const ChangePositionList = () => {
    const [selectedRows, setSelectedRows] = useState();
    const [searchPhongBanCu, setSearchPhongBanCu] = useState('');
    const [searchChucVuCu, setSearchChucVuCu] = useState('');
    const token = useSelector(state => state.token);//Lay token 
    const { showNotification } = useStateContext();
    const [getDataHistory, setGetDataHistory] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const nowDate = format(new Date(), 'yyyy-MM-dd');
    //Lay lich su phong ban
    const getHistory = async (id) => {
        await fetch(`/api/admin/lichsuchucvu/${id}`, {
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
    const [dataDepartment, setDataDepartment] = useState(null);// lấy data phòng ban 
    const [getDataPosition, setGetDataPosition] = useState(null);//Lấy data chức vụ
    const getPosition = async () => {
        const res = await fetch('/api/admin/chucvu', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            async (res) => {
                const data = await res.json();

                if (data.error) {
                    showNotification('error', data.error);
                } else {
                    setGetDataPosition(data)
                }
            }
        )
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
                if (data.error) {
                    showNotification('error', data.error);
                } else {
                    setDataDepartment(data)
                }

            }
        )

    }
    const [getDataEmployee, setGetDataEmployee] = useState(null);
    const getEmployee = async (id) => {
        await fetch(`/api/admin/danhsachnhanvien/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(
            async (res) => {
                const data = await res.json();
                setGetDataEmployee(data.user);
            }
        )
    }

    useEffect(() => {
        getHistory(id);
        getDepartment();
        getPosition();
        getEmployee(id);
    }, []);
    if (!getDataHistory) return null;
    if (!getDataEmployee) return null;
    if (!dataDepartment) return null;
    if (!getDataPosition) return null;
    const initialValues = {
        idPhongBan: getDataEmployee.idPhongBan,
        idChucVu: getDataEmployee.idChucVu,
        phongbancu: getDataEmployee.PhongBan ? getDataEmployee.PhongBan.TenPB : "",
        chucvucu: getDataEmployee.ChucVu ? getDataEmployee.ChucVu.TenChucVu : "",
        phongbanmoi: '',
        chucvumoi: '',
        ngayqd: nowDate,
        soqd: '',
        lydo: ''
    }
    let dataPosition = [];
    let dataExcel = []
    getDataHistory.map((item, index) => {
        dataPosition = [
            ...dataPosition,
            {
                id: item.id,
                stt: index,
                TenPhongBanCu: item.TenPhongBanCu,
                TenChucVuCu: item.TenChucVuCu,
                TenPhongBanMoi: item.TenPhongBanMoi,
                TenChucVuMoi: item.TenChucVuMoi,
                NgayQD: item.NgayQD,
                SoQD: item.SoQD,
            }
        ]
        dataExcel.push({
            'STT': index + 1,
            'Phòng ban cũ': item.TenPhongBanCu,
            'Chức vụ cũ': item.TenChucVuCu,
            'Phòng ban mới': item.TenPhongBanMoi,
            'Chức vụ mới': item.TenChucVuMoi,
            'Ngày quyết định': item.NgayQD,
            'Số quyết định': item.SoQD,
            'Lý do': item.LyDo
        })
    });
    const filteredData = dataPosition.filter((row) => {
        return (
            row.TenPhongBanCu.toLowerCase().includes(searchPhongBanCu.toLowerCase()) &&
            row.TenChucVuCu.toLowerCase().includes(searchChucVuCu.toLowerCase())
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
        }
    }
    const columns = [
        {
            name: 'STT',
            selector: row => row.stt,
            sortable: true,
            width:'80px'
        },
        {
            name: 'Phòng ban cũ',
            selector: row => row.TenPhongBanCu,
            sortable: true,
        },
        {
            name: 'Chức vụ cũ',
            selector: row => row.TenChucVuCu,
            sortable: true,
        },
        {
            name: 'Phòng ban mới',
            selector: row => row.TenPhongBanMoi,
            sortable: true,
        },
        {
            name: 'Chức vụ mới',
            selector: row => row.TenChucVuMoi,
            sortable: true,
        },
        {
            name: 'Ngày quyết định',
            selector: row => row.NgayQD,
            sortable: true,
        },
        {
            name: 'Số quyết định',
            selector: row => row.SoQD,
            sortable: true,
        },

    ]
    const handleCreate = () => {
        setShowModal(true);
    }
    const handleExcel = (dataExcel) => {

        const XLSX = require("xlsx");

        // Khởi tạo workbook
        const workbook = XLSX.utils.book_new();

        // Tạo worksheet
        const worksheet = XLSX.utils.json_to_sheet(dataExcel);

        // Thêm worksheet vào workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Xuất file Excel
        XLSX.writeFile(workbook, "lichsuphongban.xlsx");
    }
    const handleSubmit = async (values) => {
        await fetch(`/api/admin/lichsuchucvu/${id}/create`, {
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
                    getHistory(id);
                    getEmployee(id);
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
                    <h1>Trang lịch sử thay đổi phòng ban</h1>
                </div>
                <div className="flex justify-center text-center">

                </div>
            </div>
            <div className='mt-12 mb-8 flex flex-col gap-12'>
                <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                    <div className="relative bg-clip-border flex justify-between mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                        <h6 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-relaxed text-white">
                            Danh sách lịch sử thay đổi
                        </h6>
                        <div className='flex'>
                            <button
                                onClick={handleCreate}
                                className='py-3 px-4 mr-3 bg-red-500 rounded-lg text-white font-bold  text-base transform hover:translate-y-1 transition-all duration-500'>
                                Tạo mới
                            </button>
                            <button
                                onClick={() => handleExcel(dataExcel)}
                                className='py-3 px-4 mr-3 bg-green-500 rounded-lg text-white font-bold  text-base transform hover:translate-y-1 transition-all duration-500'>
                                Xuất excel
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
                            selectableRows
                            onSelectedRowsChange={setSelectedRows}
                            pagination
                            paginationPerPage={5}
                            paginationComponentOptions={[5, 10, 15]}
                            highlightOnHover
                            selectableRowsHighlight
                            subHeader
                            subHeaderComponent={[
                                <input
                                    key="search1"
                                    type="text"
                                    className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                                    placeholder='Tìm kiếm phòng ban cũ...'
                                    value={searchPhongBanCu}
                                    onChange={(e) => setSearchPhongBanCu(e.target.value)}
                                />,
                                <input
                                    key="search2"
                                    type="text"
                                    className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                                    placeholder='Tìm kiếm chức vụ cũ...'
                                    value={searchChucVuCu}
                                    onChange={(e) => setSearchChucVuCu(e.target.value)}
                                />,
                            ]}
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
                                        Tạo mới
                                    </h3>

                                </div>
                                {/*body*/}
                                <Formik
                                    validationSchema={createHistorySchema}
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
                                                            title="Phòng ban cũ"
                                                            id="phongbancu"
                                                            name='phongbancu'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.phongbancu}
                                                            errors={errors.phongbancu}
                                                            touched={touched.phongbancu}
                                                            type='text'
                                                            disabled
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                        <InputText
                                                            title="Chức vụ cũ"
                                                            id="chucvucu"
                                                            name='chucvucu'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.chucvucu}
                                                            errors={errors.chucvucu}
                                                            touched={touched.chucvucu}
                                                            type='text'
                                                            disabled
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                                                        <div className='mb-4'>
                                                            <label className=' block tetx-gray-700 font-bold mb-2'>Phòng ban mới </label>
                                                            {errors.phongbanmoi && touched.phongbanmoi ? (<div className='text-sm text-red-700 mb-1'>{errors.phongbanmoi}</div>) :
                                                                (<div className='mb-3'></div>)
                                                            }
                                                            <Field
                                                                as="select" name='phongbanmoi' value={values.phongbanmoi} className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                            >
                                                                <option value=''>
                                                                    ---Lựa chọn phòng ban---
                                                                </option>
                                                                {

                                                                    dataDepartment.getPhongBan.map((item, index) => {
                                                                        return (<option value={`${item.id} ${item.TenPB}`} key={item.TenPB + index}>{item.TenPB}</option>)
                                                                    })
                                                                }
                                                            </Field>
                                                        </div>
                                                        <div className='mb-4'>
                                                            <label className=' block tetx-gray-700 font-bold mb-2'>Chức vụ mới</label>
                                                            {errors.chucvumoi && touched.chucvumoi ? (<div className='text-sm text-red-700 mb-1'>{errors.chucvumoi}</div>) :
                                                                (<div className='mb-3'></div>)
                                                            }
                                                            <Field
                                                                as="select" name='chucvumoi' value={values.chucvumoi} className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                            >
                                                                <option value=''>
                                                                    ---Lựa chọn chức vụ---
                                                                </option>
                                                                {
                                                                    getDataPosition.getCV.map((item, index) => {
                                                                        return (<option value={`${item.id} ${item.TenChucVu}`} key={item.TenChucVu + index}>{item.TenChucVu}</option>)
                                                                    })
                                                                }
                                                            </Field>
                                                        </div>

                                                    </div>
                                                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                        <InputText
                                                            title='Số quyết định'
                                                            type='text'
                                                            name='soqd'
                                                            id='soqd'
                                                            values={values.soqd}
                                                            errors={errors.soqd}
                                                            touched={touched.soqd}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            className='shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
                                                        />

                                                    </div>
                                                    <div className='grid grid-cols-1 mb-3'>
                                                        <label className="block text-gray-700 font-bold mb-2" htmlFor='lydo'>
                                                            Lý do
                                                        </label>
                                                        <Field
                                                            id='lydo'
                                                            name='lydo'
                                                            as="textarea"
                                                            value={values.lydo}
                                                            onChange={handleChange}
                                                            rows={4}
                                                            className='shadow appearance-none border border-slate-950 rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500'
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
                                                        Tạo
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

export default ChangePositionList
