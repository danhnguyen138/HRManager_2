import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStateContext } from 'context/ContextProvider';
import { Formik, Field } from 'formik';
import * as yup from "yup";
import InputText from "components/input/InputText";
import SelectInput from 'components/input/SelectInput';

const ChangeSalaryUser = () => {


    const [searchHinhThucCu, setSearchHinhThucCu] = useState('');
    const [searchHinhThucMoi, setSearchHinhThucMoi] = useState('');
    const navigate = useNavigate();
    const [dataBacLuong, setDataBacLuong] = useState([])
    const { id } = useParams();
    const token = useSelector(state => state.token);
    const { showNotification } = useStateContext();
    const [showModal, setShowModal] = useState(false);
    //Lay lich su thay doi luong
    const [getDataLichSu, setDataGetLichSu] = useState();
    const getLichSu = async (id) => {
        await fetch(`/api/admin/thaydoiluong/${id}`, {
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
                    setDataGetLichSu(resData.getThayDoi)
                }
            }
        )
    }
    const [checkHinhThuc, setCheckHinhThuc] = useState(0);
    const handleCheckHinhThuc = (value) => {
        if (value == 'Trả lương theo bậc lương') {
            setCheckHinhThuc(1)
        } else if (value == 'Trả lương theo lương chính') {
            setCheckHinhThuc(2)
        } else {
            setCheckHinhThuc(0)
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
    const [dataNhanVien, setDataNhanVien] = useState(null);
    const getLuongCu = async (id) => {
        await fetch(`/api/admin/luongcunhanvien/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.error) {
                    navigate(`/admin/changesalary`)
                    showNotification('error', resData.error)
                } else {
                    setDataNhanVien(resData)
                }
            }
        )
    }
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
    useEffect(() => {
        getNgachLuong();
        getLuongCu(id);
        getLuongToiThieu();
        getLichSu(id);
    }, [])
    if (!dataNgachLuong) return null;
    if (!dataNhanVien) return null;
    if (!dataToiThieu) return null;
    if (!getDataLichSu) return null;
    let data = []
    getDataLichSu.forEach((item, index) => {
        data.push({
            STT: index,
            id: item.id,
            HinhThucCu: item.HinhThucCu,
            NgachLuongCu: item.NgachLuongCu,
            BacLuongCu: item.BacLuongCu,
            TienLuongCu: item.TienLuongCu,
            HinhThucMoi: item.HinhThucMoi,
            NgachLuongMoi: item.NgachLuongMoi,
            BacLuongMoi: item.BacLuongMoi,
            TienLuongMoi: item.TienLuongMoi,
            LyDo: item.LyDo
        })
    })
    const filteredData = data.filter((row) => {
        return (
            row.HinhThucCu.toLowerCase().includes(searchHinhThucCu.toLowerCase()) &&
            row.HinhThucMoi.toLowerCase().includes(searchHinhThucMoi.toLowerCase())
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
            selector: row => row.STT,
            sortable: true,
            width: '80px'
        },
        {
            name: 'Hình thức cũ',
            selector: row => row.HinhThucCu,
            sortable: true,
            width: '300px'
        },
        {
            name: 'Ngạch lương cũ',
            selector: row => row.NgachLuongCu,
            sortable: true,
            width: '190px'
        },
        {
            name: 'Bậc lương cũ',
            selector: row => row.BacLuongCu,
            sortable: true,
            width: '190px'
        },
        {
            name: 'Tiền lương cũ',
            selector: row => row.TienLuongCu,
            sortable: true,
            width: '190px'
        },
        {
            name: 'Hình thức mới',
            selector: row => row.HinhThucMoi,
            sortable: true,
            width: '300px'
        },
        {
            name: 'Ngạch lương mới',
            selector: row => row.NgachLuongMoi,
            sortable: true,
            width: '190px'
        },
        {
            name: 'Bậc lương mới',
            selector: row => row.BacLuongMoi,
            sortable: true,
            width: '190px'
        },
        {
            name: 'Tiền lương mới',
            selector: row => row.TienLuongMoi,
            sortable: true,
            width: '190px'
        },
        {
            name: 'Lý do',
            selector: row => row.LyDo,
            sortable: true,
            width: '320px'
        },


    ]
    const createHistorySchema = yup.object().shape(
        {
            HinhThucMoi: yup.string().required('Xin chọn hình thức trả lương'),
            NgachLuongMoi: yup.string().test('CheckNgachLuong', 'Xin chọn ngạch lương', function (value) {
                if (checkHinhThuc == 1 && !value) return false;
                return true
            }),
            BacLuongMoi: yup.string().test('CheckBacluong', 'Xin chọn bậc lương', function (value) {
                if (checkHinhThuc == 1 && !value) return false;
                return true
            }),
            TienLuongMoi: yup.string().matches(/^[0-9]*$/, 'Xin nhập chữ số')
                .test('Kiemtraluongchinh', 'Xin nhập tiền lương chính', function (value) {

                    if (checkHinhThuc == 2 && !value) return false;
                    return true;
                }).test('Kiemtraluongtoithieu', 'Số tiền phải lớn hơn lương tối thiểu vùng', function (value) {
                    return !value || parseInt(value) > parseInt(dataToiThieu)
                }),
        }
    )
    let initialValues = {
        idNhanVien: id,
        HinhThucCu: dataNhanVien.user.isBacLuong == '0' ? 'Trả lương theo lương chính' : 'Trả lương theo bậc lương',
        NgachLuongCu: dataNhanVien.bacLuong ? dataNhanVien.bacLuong.NgachLuong.TenNgachLuong : '',
        BacLuongCu: dataNhanVien.bacLuong ? dataNhanVien.bacLuong.TenBacLuong : '',
        TienLuongCu: dataNhanVien.user.LuongChinh ? dataNhanVien.user.LuongChinh : '',
        HinhThucMoi: '',
        NgachLuongMoi: '',
        BacLuongMoi: '',
        TienLuongMoi: '',
        LyDo: ''
    }
    let optionNgachLuong = [];
    dataNgachLuong.forEach((item, index) => {
        optionNgachLuong.push({
            value: item.id + ' ' + item.TenNgachLuong,
            label: item.TenNgachLuong
        })
    })
    const handleSubmit = async (values) => {
        await fetch(`/api/admin/thaydoiluong/create`, {
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
                    setShowModal(false)
                    getLichSu(id)
                    showNotification('success', resData.msg)
                }
            }
        )
    }
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Trang thay đổi lương</h1>
                </div>
                <div className="flex justify-center text-center">

                </div>
            </div>
            <div className="mt-12 mb-8 flex flex-col gap-12">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="relative flex justify-between bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                        <h6 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-relaxed text-white">
                            Lịch sử thay đổi
                        </h6>
                        <div>
                            <button
                                onClick={() => setShowModal(true)}
                                className='py-3 px-4 bg-red-500 rounded-lg text-white font-bold text-base transform hover:translate-y-1 transition-all duration-500'>
                                Tạo thay đổi
                            </button>
                            <button
                                onClick={() => navigate('/admin/changesalary')}
                                className='py-3 px-4 ml-3 bg-green-500 rounded-lg text-white font-bold text-base transform hover:translate-y-1 transition-all duration-500'>
                                Trở về
                            </button>
                        </div>
                    </div>
                    <div className="p-6 px-0 pt-0 pb-2">
                        <DataTable
                            className='overflow-auto'
                            customStyles={customStyle}
                            responsive
                            columns={columns}
                            data={filteredData}

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
                                    placeholder='Tìm kiếm hình thức cũ...'
                                    value={searchHinhThucCu}
                                    onChange={(e) => setSearchHinhThucCu(e.target.value)}
                                />,
                                <input
                                    key="search2"
                                    type="text"
                                    className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                                    placeholder='Tìm kiếm hình thức mới...'
                                    value={searchHinhThucMoi}
                                    onChange={(e) => setSearchHinhThucMoi(e.target.value)}
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
                                                            title="Hình thức trả lương cũ"
                                                            id="HinhThucCu"
                                                            name='HinhThucCu'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.HinhThucCu}
                                                            errors={errors.HinhThucCu}
                                                            touched={touched.HinhThucCu}
                                                            type='text'
                                                            disabled
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                        <InputText
                                                            title="Tiền lương cũ (đồng/tháng)"
                                                            id="TienLuongCu"
                                                            name='TienLuongCu'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.TienLuongCu}
                                                            errors={errors.TienLuongCu}
                                                            touched={touched.TienLuongCu}
                                                            type='text'
                                                            disabled
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                        <InputText
                                                            title="Ngạch lương cũ"
                                                            id="NgachLuongCu"
                                                            name='NgachLuongCu'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.NgachLuongCu}
                                                            errors={errors.NgachLuongCu}
                                                            touched={touched.NgachLuongCu}
                                                            type='text'
                                                            disabled
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                        <InputText
                                                            title="Bậc lương cũ"
                                                            id="BacLuongCu"
                                                            name='BacLuongCu'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.BacLuongCu}
                                                            errors={errors.BacLuongCu}
                                                            touched={touched.BacLuongCu}
                                                            type='text'
                                                            disabled
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                        <SelectInput
                                                            title="Hình thức trả lương"
                                                            id="HinhThucMoi"
                                                            name='HinhThucMoi'
                                                            labelDefault="---Lựa chọn hình thức trả---"
                                                            onBlur={handleBlur}
                                                            value={values.HinhThucMoi}
                                                            onChange={(e) => {
                                                                setFieldValue('HinhThucMoi', e.target.value)
                                                                setFieldValue('LuongChinhMoi', '');
                                                                setFieldValue('BacLuongMoi', '')
                                                                setFieldValue('NgachLuongMoi', '')
                                                                handleCheckHinhThuc(e.target.value)
                                                            }}
                                                            errors={errors.HinhThucMoi}
                                                            touched={touched.HinhThucMoi}
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                            options={[
                                                                { value: 'Trả lương theo bậc lương', label: 'Trả lương theo bậc lương' },
                                                                { value: 'Trả lương theo lương chính', label: 'Trả lương theo lương chính' },
                                                            ]}
                                                        />
                                                        {
                                                            checkHinhThuc == 2 && (
                                                                <InputText
                                                                    title="Tiền lương mới (đồng/tháng)"
                                                                    id="TienLuongMoi"
                                                                    name='TienLuongMoi'
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    value={values.TienLuongMoi}
                                                                    errors={errors.TienLuongMoi}
                                                                    touched={touched.TienLuongMoi}
                                                                    type='text'
                                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                                />
                                                            )
                                                        }

                                                    </div>
                                                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
                                                        {checkHinhThuc == 1 && (
                                                            <>
                                                                <SelectInput
                                                                    title="Ngạch lương mới"
                                                                    id="NgachLuongMoi"
                                                                    name='NgachLuongMoi'
                                                                    labelDefault="---Lựa chọn ngạch lương---"
                                                                    onBlur={handleBlur}
                                                                    value={values.NgachLuongMoi}
                                                                    onChange={(e) => {
                                                                        setFieldValue('NgachLuongMoi', e.target.value);
                                                                        setDataBacLuong([])
                                                                        if (e.target.value != '') {
                                                                            let getValue = e.target.value;
                                                                            let getId = getValue.slice(0, getValue.indexOf(' '))
                                                                            dataNgachLuong.forEach(item => {
                                                                                if (item.id == getId) {
                                                                                    if (item.BacLuongs.length != 0) {
                                                                                        let data = []
                                                                                        item.BacLuongs.forEach(item => {
                                                                                            data.push({
                                                                                                value: item.id + ' ' + item.TenBacLuong,
                                                                                                label: item.TenBacLuong
                                                                                            })
                                                                                        })
                                                                                        setDataBacLuong(data)
                                                                                    }
                                                                                }
                                                                            })
                                                                        }
                                                                    }}
                                                                    errors={errors.NgachLuongMoi}
                                                                    touched={touched.NgachLuongMoi}
                                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                                    options={
                                                                        optionNgachLuong
                                                                    }
                                                                />
                                                                <SelectInput
                                                                    title="Bậc lương mới"
                                                                    id="BacLuongMoi"
                                                                    name='BacLuongMoi'
                                                                    labelDefault="---Lựa chọn bậc lương---"
                                                                    onBlur={handleBlur}
                                                                    value={values.BacLuongMoi}
                                                                    onChange={handleChange}
                                                                    errors={errors.BacLuongMoi}
                                                                    touched={touched.BacLuongMoi}
                                                                    className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                                    options={dataBacLuong}
                                                                />
                                                            </>
                                                        )}

                                                    </div>
                                                    <div className='grid grid-cols-1 mb-3'>
                                                        <label className="block text-gray-700 font-bold mb-2" htmlFor='lydo'>
                                                            Lý do
                                                        </label>
                                                        <Field
                                                            id='LyDo'
                                                            name='LyDo'
                                                            as="textarea"
                                                            value={values.LyDo}
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

export default ChangeSalaryUser
