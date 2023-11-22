import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { BsTrash } from 'react-icons/bs';
import { AiFillPrinter } from 'react-icons/ai';
import { FiEdit3, FiEye, FiSend } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from 'context/ContextProvider';
import { Formik } from 'formik';
import * as yup from 'yup';
import InputText from "components/input/InputText";
const PrintIcon = ({ ...props }) => {
    return (
        <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-blue-500 cursor-pointer hover:bg-blue-700'>
            <FiEye className='text-base text-white' {...props} />
        </div>
    );
}
const BangLuongUser = () => {
    const [selectedRows, setSelectedRows] = useState();
    const [searchText, setSearchText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [getView, setGetView] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    const token = useSelector(state => state.token);
    const { showNotification } = useStateContext();
    const [getDataBangLuong, setGetDataBangLuong] = useState(null);
    const getBangLuong = async () => {
        await fetch(`/api/admin/bangluong/${id}`, {
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
        getBangLuong()
    }, [])
    if (!getDataBangLuong) return null;
    console.log(getDataBangLuong)
    let data = []
    let dataExcel = [];
    getDataBangLuong.NhanViens.forEach((item, index) => {
        data.push({
            id: item.NhanVienBangLuong.id,
            stt: index,
            HoTen: item.HoTen,
            HinhThuc: item.NhanVienBangLuong ? item.NhanVienBangLuong.HinhThuc : '',
            NgachLuong: item.NhanVienBangLuong ? item.NhanVienBangLuong.NgachLuong : '',
            BacLuong: item.NhanVienBangLuong ? item.NhanVienBangLuong.BacLuong : '',
            MucLuong: item.NhanVienBangLuong ? item.NhanVienBangLuong.MucLuong : '',
            KhenThuong: item.NhanVienBangLuong ? item.NhanVienBangLuong.KhenThuong : '',
            TongNgayLam: item.NhanVienBangLuong ? item.NhanVienBangLuong.TongNgayLam : '',
            TienSauTinhCong: item.NhanVienBangLuong ? item.NhanVienBangLuong.TienSauTinhCong : '',
            BHXHNV: item.NhanVienBangLuong ? item.NhanVienBangLuong.BHXHNV : '',
            BHYTNV: item.NhanVienBangLuong ? item.NhanVienBangLuong.BHYTNV : '',
            TongBHNV: item.NhanVienBangLuong ? item.NhanVienBangLuong.TongBHNV : '',
            BHXHDN: item.NhanVienBangLuong ? item.NhanVienBangLuong.BHXHDN : '',
            BHYTDN: item.NhanVienBangLuong ? item.NhanVienBangLuong.BHYTDN : '',
            TongBHXH: item.NhanVienBangLuong ? item.NhanVienBangLuong.TongBHXH : '',
            TienSauTruBH: item.NhanVienBangLuong ? item.NhanVienBangLuong.TienSauTruBH : '',
            GiamTruCaNhan: '11000000',
            SoNguoiPhuThuoc: item.NhanVienBangLuong ? item.NhanVienBangLuong.SoNguoiPhuThuoc : '',
            GiamTruPhuThuoc: '4400000',
            TienSauGiamTru: item.NhanVienBangLuong ? item.NhanVienBangLuong.TienSauGiamTru : '',
            TienDongThue: item.NhanVienBangLuong ? item.NhanVienBangLuong.TienDongThue : '',
            ThucLanh: item.NhanVienBangLuong ? item.NhanVienBangLuong.ThucLanh : '',
            GhiChu: item.NhanVienBangLuong ? item.NhanVienBangLuong.GhiChu : '',


        })
        dataExcel.push({
            'STT': index + 1,
            "Họ và tên": item.HoTen,
            "Hình thức trả lương": item.NhanVienBangLuong ? item.NhanVienBangLuong.HinhThuc : '',
            "Ngạch lương": item.NhanVienBangLuong ? item.NhanVienBangLuong.NgachLuong : '',
            "Bậc lương": item.NhanVienBangLuong ? item.NhanVienBangLuong.BacLuong : '',
            "Mức lương": item.NhanVienBangLuong ? item.NhanVienBangLuong.MucLuong : '',
            "Khen thưởng": item.NhanVienBangLuong ? item.NhanVienBangLuong.KhenThuong : '',
            "Số ngày làm": item.NhanVienBangLuong ? item.NhanVienBangLuong.TongNgayLam : '',
            "Tiền sau tính công": item.NhanVienBangLuong ? item.NhanVienBangLuong.TienSauTinhCong : '',
            "Tiền đóng BHXH nhân viên": item.NhanVienBangLuong ? item.NhanVienBangLuong.BHXHNV : '',
            "Tiền đóng BHYT nhân viên": item.NhanVienBangLuong ? item.NhanVienBangLuong.BHYTNV : '',
            "Tổng tiền đóng BH nhân viên": item.NhanVienBangLuong ? item.NhanVienBangLuong.TongBHNV : '',
            "Tiền đóng BHXH doanh nghiệp": item.NhanVienBangLuong ? item.NhanVienBangLuong.BHXHDN : '',
            "Tiền đóng BHYT doanh nghiệp": item.NhanVienBangLuong ? item.NhanVienBangLuong.BHYTDN : '',
            "Tổng tiền đóng BH doanh nghiệp": item.NhanVienBangLuong ? item.NhanVienBangLuong.TongBHXH : '',
            "Tiền sau trừ BH": item.NhanVienBangLuong ? item.NhanVienBangLuong.TienSauTruBH : '',
            "Giảm trừ cá nhân": '11000000',
            "Số người phụ thuộc": item.NhanVienBangLuong ? item.NhanVienBangLuong.SoNguoiPhuThuoc : '',
            "Giảm trừ phụ thuộc": '4400000',
            "Tiền sau giảm trừ": item.NhanVienBangLuong ? item.NhanVienBangLuong.TienSauGiamTru : '',
            "Tiền đóng thuế": item.NhanVienBangLuong ? item.NhanVienBangLuong.TienDongThue : '',
            "Thực lãnh": item.NhanVienBangLuong ? item.NhanVienBangLuong.ThucLanh : '',
            "Ghi Chú": item.NhanVienBangLuong ? item.NhanVienBangLuong.GhiChu : '',
        })
    }
    )
    const exportToExcel = (dataExcel, nameFile) => {

        const XLSX = require("xlsx");

        // Khởi tạo workbook
        const workbook = XLSX.utils.book_new();

        // Tạo worksheet
        const worksheet = XLSX.utils.json_to_sheet(dataExcel);

        // Thêm worksheet vào workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Xuất file Excel
        XLSX.writeFile(workbook, `${nameFile}.xlsx`);
    }
    const conditionalRowStyles = [
        {
            when: (row) => row.id === 'total',
            style: {
                fontWeight: 'bold',
            },
        },
    ];
    const getTotalThucLanh = (data) => {
        const totalAge = data.reduce((accumulator, currentRow) => accumulator + currentRow.ThucLanh, 0);
        return totalAge;
    };
    const getTotalBHXHNV = (data) => {
        const totalAge = data.reduce((accumulator, currentRow) => accumulator + parseFloat(currentRow.BHXHNV), 0);
        return totalAge;
    };
    const getTotalBHYT = (data) => {
        const totalAge = data.reduce((accumulator, currentRow) => accumulator + parseFloat(currentRow.BHYTNV), 0);
        return totalAge;
    };
    const dataTotalThucLanh = getTotalThucLanh(data);
    const dataTotalBHXHNV = getTotalBHXHNV(data)
    const dataTotalBHYTNV = getTotalBHYT(data)
    const totalRow = {
        id: 'total',
        name: 'Total',
        ThucLanh: dataTotalThucLanh,
        BHXHNV: dataTotalBHXHNV,
        BHYTNV: dataTotalBHYTNV,
        ThaoTac: '0'
    };
    data = [...data, totalRow]


    const filteredData = data.filter((row) => {
        if (row.HoTen)
            return (
                row.HoTen.toLowerCase().includes(searchText.toLowerCase())
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

    }
    const columns = [
        {
            name: 'STT',
            selector: row => row.stt,
            sortable: true,
            width: '80px'
        },
        {
            name: 'Họ và tên',
            selector: row => row.HoTen,
            sortable: true,
            width: '200px'
        },
        {
            name: 'Hình thức trả lương',
            selector: row => row.HinhThuc,
            sortable: true,
            width: '250px'
        },
        {
            name: 'Ngạch lương',
            selector: row => row.NgachLuong,
            sortable: true,
            width: '200px'
        },
        {
            name: 'Bậc lương',
            selector: row => row.BacLuong,
            sortable: true,
            width: '200px'
        },
        {
            name: 'Mức lương chính',
            selector: row => row.MucLuong,
            sortable: true,
            width: '200px'
        },
        {
            name: 'Tiền khen thưởng',
            selector: row => row.KhenThuong,
            sortable: true,
            width: '200px'
        },
        {
            name: 'Tổng ngày công',
            selector: row => row.TongNgayLam,
            sortable: true,
            width: '200px'
        },
        {
            name: 'Tiền sau tính công',
            selector: row => row.TienSauTinhCong,
            sortable: true,
            width: '230px'
        },
        {
            name: 'Tiền đóng BHXH nhân viên',
            selector: row => row.BHXHNV,
            sortable: true,
            width: '280px'
        },
        {
            name: 'Tiền đóng BHYT nhân viên',
            selector: row => row.BHYTNV,
            sortable: true,
            width: '250px'
        },

        {
            name: 'Tổng tiền đóng BH',
            selector: row => row.TongBHNV,
            sortable: true,
            width: '200px'
        },
        {
            name: 'Tiền BHXH doanh nghiệp đóng',
            selector: row => row.BHXHDN,
            sortable: true,
            width: '290px'
        },
        {
            name: 'Tiền BHYT doanh nghiệp đóng',
            selector: row => row.BHYTDN,
            sortable: true,
            width: '290px'
        },
        {
            name: 'Tổng BH doanh nghiệp đóng',
            selector: row => row.TongBHXH,
            sortable: true,
            width: '280px'
        },
        {
            name: 'Tiền sau trừ BH',
            selector: row => row.TienSauTruBH,
            sortable: true,
            width: '200px'
        },
        {
            name: 'Tiền giảm trừ cá nhân',
            selector: row => row.GiamTruCaNhan,
            sortable: true,
            width: '230px'
        },
        {
            name: 'Số người phụ thuộc',
            selector: row => row.SoNguoiPhuThuoc,
            sortable: true,
            width: '260px'
        },
        {
            name: 'Tiền giảm trừ phụ thuộc',
            selector: row => row.GiamTruPhuThuoc,
            sortable: true,
            width: '230px'
        },
        {
            name: 'Tiền sau giảm trừ',
            selector: row => row.TienSauGiamTru,
            sortable: true,
            width: '200px'
        },
        {
            name: 'Tiền đóng thuế',
            selector: row => row.TienDongThue,
            sortable: true,
            width: '200px'
        },

        {
            name: 'Thực lãnh',
            selector: row => row.ThucLanh,
            sortable: true,
            width: '200px'
        },
        {
            name: 'Ghi chú',
            selector: row => row.GhiChu,
            sortable: true,
            width: '300px'
        },
        {
            name: 'Thao tác',
            cell: (row) => {
                if (row.id == 'total') return (<div>

                </div>)
                return (
                    <div className='flex gap-1 pr-2'>
                        <PrintIcon onClick={() => handleView(row.id)} />
                    </div>
                );
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ]
    const handleView = async (id) => {
        setShowModal(true);
        let dataView = data.filter(item => item.id == id);
        setGetView(dataView[0]);
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
                        <div className='flex gap-3'>
                            <button
                                onClick={() => {
                                    exportToExcel(dataExcel, 'bangluong')
                                }}
                                className='py-3 px-4 bg-green-500 rounded-lg text-white font-bold  text-base transform hover:translate-y-1 transition-all duration-500'>
                                Xuất excel
                            </button>
                            <button
                                onClick={() => {
                                    navigate(`/admin/salary`)
                                }}
                                className='py-3 px-4 bg-orange-500 rounded-lg text-white font-bold  text-base transform hover:translate-y-1 transition-all duration-500'>
                                Trở lại
                            </button>
                        </div>
                    </div>
                    <div className='p-6 px-0 pt-0 pb-2'>
                        <DataTable
                            className='overflow-auto'
                            customStyles={customStyle}
                            responsive
                            columns={columns}
                            data={data}
                            selectableRows // Cho phép chọn nhiều dòng
                            onSelectedRowsChange={setSelectedRows}
                            pagination
                            paginationPerPage={5}
                            paginationComponentOptions={[5, 10, 15]}
                            highlightOnHover
                            selectableRowsHighlight
                            subHeader
                            conditionalRowStyles={conditionalRowStyles}
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
                                        Phiếu lương của {getView.HoTen}
                                    </h3>

                                </div>
                                <div className='flex flex-col gap-3 px-8 py-3'>
                                    <div>
                                        <label className='md:text-lg text-base font-bold'>Họ và tên:</label>
                                        <p className='inline ml-2 md:text-lg text-base'>{getView.HoTen}</p>
                                    </div>
                                    <div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Hình thức trả lương:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getView.HinhThuc}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Mức lương chính:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getView.MucLuong} đồng/tháng</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Ngạch lương:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getView.NgachLuong}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Bậc lương:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getView.BacLuong}</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Khen Thưởng:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getView.KhenThuong} đồng</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Số ngày công:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getView.TongNgayLam}</p>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền sau tính công:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{`${getView.TienSauTinhCong} đồng`}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền đóng BHXH:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getView.BHXHNV} đồng</p>
                                        </div>
                                    </div><div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền đóng BHYT:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{`${getView.BHYTNV} đồng`}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tổng tiền đóng BH:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getView.TongBHNV}</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền sau trừ BH:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{`${getView.TienSauTruBH} đồng`}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền giảm trừ cá nhân:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getView.GiamTruCaNhan} đồng</p>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Số người phụ thuộc:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getView.SoNguoiPhuThuoc}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền giảm trừ phụ thuộc:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getView.HeSoLuong}</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền sau giảm trừ:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{`${getView.TienSauGiamTru} đồng`}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền đóng thuế:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getView.TienDongThue} đồng</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Thực lãnh:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{`${getView.ThucLanh} đồng`}</p>
                                        </div>

                                    </div>
                                    <div className='grid grid-cols-1 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Ghi Chú:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{getView.GhiChu}</p>
                                        </div>

                                    </div>



                                </div>
                                {/*body*/}

                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
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
            ) : null}
        </div>
    )
}

export default BangLuongUser
