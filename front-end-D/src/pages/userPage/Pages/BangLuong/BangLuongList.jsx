import { BsTrash } from 'react-icons/bs';
import { FiEdit3, FiEye, FiSend } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from 'context/ContextProvider';
import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
const ViewIcon = ({ ...props }) => {
    return (
        <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-blue-500 cursor-pointer hover:bg-blue-700'>
            <FiEye className='text-base text-white' {...props} />
        </div>
    );
}
const BangLuongList = () => {
    const [selectedRows, setSelectedRows] = useState();
    const [getDataBangLuong, setGetDataBangLuong] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.user);
    const [searchText, setSearchText] = useState('');
    const token = useSelector(state => state.token);
    const { showNotification } = useStateContext();
    const [dataSalary, setDataSalary] = useState();
    const [getView, setGetView] = useState();
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
    const [dataInfo, setDataInfo] = useState(null);
    const getSalary = async (idNhanVien) => {
        await fetch(`/api/admin/bangluongnhanvien/${idNhanVien}`, {
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
                    setDataInfo(resData.getBangLuong)
                }
            }
        )
    }
    useEffect(() => {
        getBangLuong();
        getSalary(user.id)
    }, []);
    if (!getDataBangLuong) return null;
    if (!dataInfo) return null;

    let data = []
    console.log(getDataBangLuong)

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
        setShowModal(true);
        let dataView = dataInfo.filter(item => item.idBangLuong == id)
        setDataSalary(dataView[0])
    
    }
    console.log(dataSalary)
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
                                        Phiếu lương của {user.HoTen}
                                    </h3>

                                </div>
                                <div className='flex flex-col gap-3 px-8 py-3'>
                                    <div>
                                        <label className='md:text-lg text-base font-bold'>Họ và tên:</label>
                                        <p className='inline ml-2 md:text-lg text-base'>{user.HoTen}</p>
                                    </div>
                                    <div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Hình thức trả lương:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataSalary.HinhThuc}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Mức lương chính:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataSalary.MucLuong} đồng/tháng</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Ngạch lương:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataSalary.NgachLuong}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Bậc lương:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataSalary.BacLuong}</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Khen Thưởng:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataSalary.KhenThuong} đồng</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Số ngày công:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataSalary.TongNgayLam}</p>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền sau tính công:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{`${dataSalary.TienSauTinhCong} đồng`}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền đóng BHXH:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataSalary.BHXHNV} đồng</p>
                                        </div>
                                    </div><div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền đóng BHYT:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{`${dataSalary.BHYTNV} đồng`}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tổng tiền đóng BH:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataSalary.TongBHNV}</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền sau trừ BH:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{`${dataSalary.TienSauTruBH} đồng`}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền giảm trừ cá nhân:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataSalary.GiamTruCaNhan} đồng</p>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Số người phụ thuộc:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataSalary.SoNguoiPhuThuoc}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền giảm trừ phụ thuộc:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataSalary.HeSoLuong}</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền sau giảm trừ:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{`${dataSalary.TienSauGiamTru} đồng`}</p>
                                        </div>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Tiền đóng thuế:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataSalary.TienDongThue} đồng</p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Thực lãnh:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{`${dataSalary.ThucLanh} đồng`}</p>
                                        </div>

                                    </div>
                                    <div className='grid grid-cols-1 gap-u'>
                                        <div>
                                            <label className='md:text-lg text-base font-bold'>Ghi Chú:</label>
                                            <p className='inline ml-2 md:text-lg text-base'>{dataSalary.GhiChu}</p>
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

export default BangLuongList
