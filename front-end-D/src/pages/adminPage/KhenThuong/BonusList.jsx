import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import gift from 'data/gift.png';
import { BsTrash } from 'react-icons/bs';
import { FiEdit3, FiSend } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from 'context/ContextProvider';
const TrashIcon = ({ ...props }) => {
    return (
        <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-red-500 cursor-pointer hover:bg-red-700'>
            <BsTrash className='text-base text-white' {...props} />
        </div>
    )
}
const EditIcon = ({ ...props }) => {
    return (
        <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-yellow-500 cursor-pointer hover:bg-yellow-700'>
            <FiEdit3 className='text-base text-white' {...props} />
        </div>
    )
}

const BonusList = () => {
    const [selectedRows, setSelectedRows] = useState();
    const [toggleState, setToggleState] = useState(1);
    const [CanCuPersonal, setCanCuPersonal] = useState('');
    const [HinhThucPersonal, setHinhThucPersonal] = useState('');
    const [TenPersonal, setTenPersonal] = useState('');
    const [CanCuGroup, setCanCuGroup] = useState('');
    const [HinhThucGroup, setHinhThucGroup] = useState('');
    const [PhongBanGroup, setPhongBanGroup] = useState('');
    const navigate = useNavigate();
    const token = useSelector(state => state.token);
    const { showNotification } = useStateContext();
    const [getDataBonusPersonal, setGetDataBonusPersonal] = useState(null);
    const getBonusPersonal = async () => {
        await fetch(`/api/admin/khenthuongcanhan`, {
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
                    setGetDataBonusPersonal(resData.khenthuongcanhan)
                }
            }
        )
    }
    const [getDataBonusGroup, setGetDataGroup] = useState(null)
    const getBonusGroup = async () => {
        await fetch(`/api/admin/khenthuongtapthe`, {
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
                    setGetDataGroup(resData.khenthuongtapthe)
                }
            }
        )
    }
    useEffect(() => {
        getBonusPersonal();
        getBonusGroup();
    }, []);
    if (!getDataBonusPersonal) return null;
    if (!getDataBonusGroup) return null;
    let dataBonusPersonal = [];
    let dataPersonalExcel = [];
    let dataBonusGroup = [];
    let dataGroupExcel = [];
    getDataBonusPersonal.forEach((item, index) => {
        dataBonusPersonal.push({
            id: item.id,
            stt: index,
            MaKT: item.MaKT,
            NguoiKhenThuong: item.NhanVien ? item.NhanVien.HoTen : "",
            CanCu: item.CanCu,
            LyDo: item.LyDo,
            HinhThuc: item.HinhThuc,
            NgayQD: item.NgayQD,
            SoQD: item.SoQD,
        })
        dataPersonalExcel.push({
            'STT': index + 1,
            'Mã khen thưởng': item.MaKT,
            'Người khen thưởng': item.NhanVien ? item.NhanVien.HoTen : "",
            'Số quyết định': item.SoQD,
            'Ngày quyết định': item.NgayQD,
            'Căn cứ khen thưởng': item.CanCu,
            'Lý do khen thưởng': item.LyDo,
            'Hình thức khen thưởng': item.HinhThuc,
            'Tháng khen thưởng': item.Thang,
            'Tiền thưởng': item.TienThuong,
            'Người ban hành': item.NguoiBanHanh
        })
    });
    getDataBonusGroup.forEach((item, index) => {
        dataBonusGroup.push({
            id: item.id,
            stt: index,
            MaKT: item.MaKT,
            CanCu: item.CanCu,
            LyDo: item.LyDo,
            DoiTuong: item.PhongBan ? item.PhongBan.TenPB : '',
            HinhThuc: item.HinhThuc,
            NguonChi: item.NguonChi,
            TienThuong: item.TienThuong,
            TrangThai: item.TrangThai,
            NgayKT: item.NgayKT,
            NgayQD: item.NgayQD,
            SoQD: item.SoQD
        })
        dataGroupExcel.push({
            'STT': index + 1,
            'Mã khen thưởng': item.MaKT,
            'Đối tượng khen thưởng': item.PhongBan ? item.PhongBan.TenPB : "",
            'Số quyết định': item.SoQD,
            'Ngày quyết định': item.NgayQD,
            'Ngày khen thưởng': item.NgayKT,
            'Căn cứ khen thưởng': item.CanCu,
            'Lý do khen thưởng': item.LyDo,
            'Hình thức khen thưởng': item.HinhThuc,
            'Nguồn chi': item.NguonChi,
            'Tháng khen thưởng': item.Thang,
            'Trạng thái':item.TrangThai,
            'Tiền thưởng': item.TienThuong,
            'Người ban hành': item.NguoiBanHanh
        })
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
    const columnGroup = [
        {
            name: 'STT',
            selector: row => row.stt,
            sortable: true,
            width: '80px'

        },
        {
            name: 'Mã khen thưởng',
            selector: row => row.MaKT,
            sortable: true,
            width: '200px'

        },
        {
            name: 'Căn cứ khen thưởng',
            selector: row => row.CanCu,
            sortable: true,
            width: '230px'
        },
        {
            name: 'Lý do khen thưởng',
            selector: row => row.LyDo,
            sortable: true,
            width: '240px'
        },
        {
            name: 'Đối tượng khen thưởng',
            selector: row => row.DoiTuong,
            sortable: true,
            width: '240px'
        },
        {
            name: 'Hình thức khen thưởng',
            selector: row => row.HinhThuc,
            sortable: true,
            width: '250px'
        },
        {
            name: 'Nguồn khen thưởng',
            selector: row => row.NguonChi,
            sortable: true,
            width: '250px'
        },
        {
            name: 'Ngày khen thưởng',
            selector: row => row.NgayQD,
            sortable: true,
            width: '230px'
        },
        {
            name: 'Số quyết định',
            selector: row => row.SoQD,
            sortable: true
        },
        {
            name: 'Thao tác',
            cell: (row) => {
                return (
                    <div className='flex gap-1 pr-2'>
                        <TrashIcon onClick={() => handleDeleteGroup(row.id)} />
                        <EditIcon onClick={() => handleEditGroup(row.id)} />
                      
                    </div>
                );
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ]
    const filteredDataGroup = dataBonusGroup.filter((row) => {
        return (
            row.CanCu.toLowerCase().includes(CanCuGroup.toLowerCase()) &&
            row.DoiTuong.toLowerCase().includes(PhongBanGroup.toLowerCase()) &&
            row.HinhThuc.toLowerCase().includes(HinhThucGroup.toLowerCase())

        )
    })
    const filteredDataPersonal = dataBonusPersonal.filter((row) => {
        return (
            row.NguoiKhenThuong.toLowerCase().includes(TenPersonal.toLowerCase()) &&
            row.CanCu.toLowerCase().includes(CanCuPersonal.toLowerCase()) &&
            row.HinhThuc.toLowerCase().includes(HinhThucPersonal.toLowerCase())

        )
    })
    const columnsPersonal = [
        {
            name: 'STT',
            selector: row => row.stt,
            sortable: true,

            width: '80px'

        },
        {
            name: 'Mã khen thưởng',
            selector: row => row.MaKT,
            sortable: true,
            width: '190px'

        },
        {
            name: 'Người khen thưởng',
            selector: row => row.NguoiKhenThuong,
            sortable: true,
            width: '240px'

        },
        {
            name: 'Căn cứ khen thưởng',
            selector: row => row.CanCu,
            sortable: true,
            width: '230px'
        },
        {
            name: 'Lý do khen thưởng',
            selector: row => row.LyDo,
            sortable: true,
            width: '240px'
        },
        {
            name: 'Hình thức khen thưởng',
            selector: row => row.HinhThuc,
            sortable: true,
            width: '250px'
        },
        {
            name: 'Ngày khen thưởng',
            selector: row => row.NgayQD,
            sortable: true,
            width: '230px'
        },
        {
            name: 'Số quyết định',
            selector: row => row.SoQD,
            sortable: true
        },
        {
            name: 'Thao tác',
            cell: (row) => {
                return (
                    <div className='flex gap-1 pr-2'>
                        <TrashIcon onClick={() => handleDeletePersonal(row.id)} />
                        <EditIcon onClick={() => handleEditPersonal(row.id)} />
                        
                    </div>
                );
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ]
    const exportToExcel = (dataExcel,nameFile) => {

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
    const handleEditPersonal = (id) => {
        // Xử lý khi người dùng click vào nút chỉnh sửa
        navigate(`/admin/bonus/${id}/updatePersonal`);
    };
    const handleEditGroup=(id)=>{
        navigate(`/admin/bonus/${id}/updateGroup`);
    }
    const handleDeleteGroup= async(id)=>{
        if (window.confirm("Bạn chắc chắn muốn xóa khen thưởng này?")) {
            await fetch(`/api/admin/khenthuongtapthe/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(
                async (res) => {
                    const resData = await res.json();
                    if (resData.msg) {
                        showNotification('success', resData.msg);
                        await getBonusGroup();
                    } else {
                        showNotification('error', resData.error);
                    }
                }
            )
        }
    }
    const handleDeletePersonal = async (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa khen thưởng này?")) {
            await fetch(`/api/admin/khenthuongcanhan/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(
                async (res) => {
                    const resData = await res.json();
                    if (resData.msg) {
                        showNotification('success', resData.msg);
                        await getBonusPersonal();
                    } else {
                        showNotification('error', resData.error);
                    }
                }
            )
        }
    };

 
    const handleCreateBonus = async () => {
        navigate(`/admin/bonus/create`);
    }
    return (
        <div className='mt-20 md:mt-8 mx-auto w-full md:w-[90%]'>
            <div className='flex flex-wrap lg:flex-nowrap justify-between'>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Trang khen thưởng</h1>
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
                            <img src={gift} alt="avatar" className='inline-block relative object-cover object-center 
                    w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
                            <div>
                                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">Thông tin khen thưởng</h5>
                            </div>

                        </div>
                        <div className="flex justify-center text-center gap-3 mr-3 md:mr-0">
                            {/* <button
                                type="button"
                                onClick={() => setToggleModal(true)}
                                className="flex self-center bg-orange-400 text-base text-white opacity-0.9 p-3
                          
                                hover:drop-shadow-xl rounded-xl  "
                            >
                                <AiOutlineEdit className='self-center font-bold text-lg' />
                            </button> */}

                            <button className='border rounded-lg border-slate-400 text-white text-base px-5 py-2 bg-red-500 hover:bg-red-700' onClick={() => navigate(`/admin/bonus/create`)}>
                                Tạo
                            </button>
                        </div>
                    </div>
                    <div className='mb-12 md:px-8 px-0'>
                        <div className="bloc-tabs">
                            <button
                                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                onClick={() => setToggleState(1)}
                            >
                                Khen thưởng cá nhân
                            </button>
                            <button
                                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                                onClick={() => setToggleState(2)}
                            >
                                Khen thưởng tập thể
                            </button>
                        </div>
                        <div className='content-tabs'>
                            <div className={toggleState === 1 ? "content  active-content" : "content"}>
                                <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                                    <DataTable
                                        customStyles={customStyle}
                                        className='table-auto'
                                        responsive
                                        columns={columnsPersonal}
                                        data={filteredDataPersonal}
                                        pagination // Cho phép phân trang
                                        paginationPerPage={5} // Số dòng mỗi trang
                                        paginationRowsPerPageOptions={[5, 10, 15]} // Các tùy chọn số dòng mỗi trang
                                        highlightOnHover // Tô đậm dòng khi di chuột qua
                                        selectableRowsHighlight // Tô đậm các dòng được chọn
                                        subHeader
                                        subHeaderComponent={[
                                            <input
                                                key="CanCuPersonal"
                                                type="text"
                                                className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                                                placeholder='Tên khen thưởng...'
                                                value={TenPersonal}
                                                onChange={(e) => setTenPersonal(e.target.value)}
                                            />,
                                            <input
                                                key="LyDoPersonal"
                                                type="text"
                                                className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                                                placeholder='Căn cứ khen thưởng...'
                                                value={CanCuPersonal}
                                                onChange={(e) => setCanCuPersonal(e.target.value)}
                                            />,

                                            <input
                                                key="HinhThucPersonal"
                                                type="text"
                                                className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                                                placeholder='Hình thức khen thưởng...'
                                                value={HinhThucPersonal}
                                                onChange={(e) => setHinhThucPersonal(e.target.value)}
                                            />,
                                            <button onClick={() => exportToExcel(dataPersonalExcel,'khenthuongcanhan')} className='p-2 px-4 text-white border border-green-500 bg-green-500 ml-2 mb-2 md:mb-0 
                                                 hover:bg-green-800 rounded-xl 
                                            '>Xuất file excel</button>

                                        ]}
                                    // Xác định các dòng đư
                                    />
                                </div>
                            </div>
                            <div className={toggleState === 2 ? "content  active-content" : "content"}>
                                <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                                    <DataTable
                                        customStyles={customStyle}
                                        className='table-auto'
                                        responsive
                                        columns={columnGroup}
                                        data={filteredDataGroup}
                                        pagination // Cho phép phân trang
                                        paginationPerPage={5} // Số dòng mỗi trang
                                        paginationRowsPerPageOptions={[5, 10, 15]} // Các tùy chọn số dòng mỗi trang
                                        highlightOnHover // Tô đậm dòng khi di chuột qua
                                        selectableRowsHighlight // Tô đậm các dòng được chọn
                                        subHeader
                                        subHeaderComponent={[
                                            <input
                                                key="CanCuGroup"
                                                type="text"
                                                className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                                                placeholder='Phòng ban khen thưởng...'
                                                value={PhongBanGroup}
                                                onChange={(e) => setPhongBanGroup(e.target.value)}
                                            />,
                                            <input
                                                key="LyDoGroup"
                                                type="text"
                                                className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                                                placeholder='Căn cứ khen thưởng...'
                                                value={CanCuGroup}
                                                onChange={(e) => setCanCuGroup(e.target.value)}
                                            />,
                                            <input
                                                key="HinhThucGroup"
                                                type="text"
                                                className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                                                placeholder='Hình thức khen thưởng...'
                                                value={HinhThucGroup}
                                                onChange={(e) => setHinhThucGroup(e.target.value)}
                                            />,
                                            <button onClick={() => exportToExcel(dataGroupExcel,'khenthuongtapthe')} className='p-2 px-4 text-white border border-green-500 bg-green-500 ml-2 mb-2 md:mb-0 
                                                 hover:bg-green-800 rounded-xl 
                                            '>Xuất file excel</button>
                                        ]}
                                    // Xác định các dòng đư
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BonusList
