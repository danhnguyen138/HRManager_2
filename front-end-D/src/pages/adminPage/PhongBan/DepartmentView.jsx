import React from 'react';
import { useState, useEffect, useRef } from 'react';
import icon_phongban from 'data/icon-phongban.png'
import { useStateContext } from "../../../context/ContextProvider";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import "View.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const DepartmentView = () => {
    const chartGioiTinh = useRef(null);
    const chartChucVu = useRef(null);
    const navigate= useNavigate();
    const [getDataDepartment, setGetDaTaDepartment] = useState(null);// Lay du lieu cua phong ban
    const { MaPB } = useParams();
    const [toggleState, setToggleState] = useState(1);
    const [toggleState2, setToggleState2] = useState(1);
    const [searchText, setSearchText] = useState('');//Tìm kiếm tên nhân viên
    const toggleTab = (index) => {
        setToggleState(index);
    };
    const token = useSelector(state => state.token);
    const { showNotification } = useStateContext();
    const handleDownloadGioiTinh = () => {
        const chartNode = chartGioiTinh.current;

        html2canvas(chartNode).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();

            pdf.addImage(imgData, 'PNG', 0, 60, 210, 0);
            pdf.save('chart.pdf');
        });
    };
    const handleDownloadChucVu = () => {
        const chartNode = chartChucVu.current;

        html2canvas(chartNode).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();

            pdf.addImage(imgData, 'PNG', 0, 60, 210, 0);
            pdf.save('chart.pdf');
        });
    };




    const getDepartment = async (id) => {
        await fetch(`/api/admin/phongban/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.error) {
                    showNotification('error', resData.error)
                } else {
                    setGetDaTaDepartment(resData.getPBInfo);
                }
            }
        )
    }
    useEffect(() => {
        getDepartment(MaPB);
    }, []);
    if (!getDataDepartment) return null;
    console.log(getDataDepartment)
    let dataEmployee = []
    let dataExcel=[]
    for (let i = 0; i < getDataDepartment.getUserInPB.length; i++) {
        dataEmployee.push({
            id: getDataDepartment.getUserInPB[i].id,
            stt: i,
            name: getDataDepartment.getUserInPB[i].HoTen,
            email: getDataDepartment.getUserInPB[i].Email,
            tel: getDataDepartment.getUserInPB[i].SoDT,
            chucvu: getDataDepartment.getUserInPB[i].ChucVu.TenChucVu
        });
        dataExcel.push({
            'STT': i + 1,
            'Họ và tên': getDataDepartment.getUserInPB[i].HoTen,
            'Ngày Sinh': getDataDepartment.getUserInPB[i].NgaySinh,
            'Email': getDataDepartment.getUserInPB[i].Email,
            'Giới tính': getDataDepartment.getUserInPB[i].GioiTinh,
            'Hôn nhân': getDataDepartment.getUserInPB[i].HonNhan,
            'Dân tộc': getDataDepartment.getUserInPB[i].DanToc,
            'Quốc tịch': getDataDepartment.getUserInPB[i].QuocTich,
            'Tôn giáo': getDataDepartment.getUserInPB[i].TonGiao,
            'Số điện thoại': getDataDepartment.getUserInPB[i].SoDT,
            'Quê quán': getDataDepartment.getUserInPB[i].QueQuan,
            'Nơi ở': getDataDepartment.getUserInPB[i].NoiO,
            'Hộ khẩu': getDataDepartment.getUserInPB[i].HoKhau,
            'Căn cước công dân': getDataDepartment.getUserInPB[i].CCCD,
            'Ngày cấp': getDataDepartment.getUserInPB[i].NgayCap,
            'Nơi cấp': getDataDepartment.getUserInPB[i].NoiCap,
            'Tình trạng': getDataDepartment.getUserInPB[i].TinhTrang,
            'Chức vụ': getDataDepartment.getUserInPB[i].ChucVu?getDataDepartment.getUserInPB[i].ChucVu.TenChucVu:"",
        })
    }
    //Lọc thông tin data nhân viên
    const filteredData = dataEmployee.filter((row) => {
        return (
            row.name.toLowerCase().includes(searchText.toLowerCase())
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
            width: '80px'
        },
        {
            name: 'Tên nhân viên',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Số điện thoại',
            selector: row => row.tel,
            sortable: true,
        },
        {
            name:'Chức vụ',
            selector: row=>row.chucvu,
            sortable: true
        }

    ]
    const dataGioTinh = [
        { name: 'Nam', 'Số lượng': getDataDepartment.countNam },
        { name: 'Nữ', 'Số lượng': getDataDepartment.getUserInPB.length - getDataDepartment.countNam },
    ];
    let dataChucVu = []
    getDataDepartment.getCountChucVu.forEach(element => {
        dataChucVu.push({
            name: element.ChucVu.TenChucVu,
            'Số lượng': element.count
        })
    });
    const handleExcel = (dataExcel)=>{
        const XLSX = require("xlsx");

        // Khởi tạo workbook
        const workbook = XLSX.utils.book_new();

        // Tạo worksheet
        const worksheet = XLSX.utils.json_to_sheet(dataExcel);

        // Thêm worksheet vào workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Xuất file Excel
        XLSX.writeFile(workbook, "nhanvienphongban.xlsx");
    }
    const handleReturn = async()=>{
        navigate(`/admin/department`);
    }
    return (<div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
        <div className='flex flex-wrap lg:flex-nowrap justify-between '>
            <div className='p-4 text-xl md:text-2xl font-bold'>
                <h1>Thông tin phòng ban</h1>
            </div>

        </div>
        <div className="relative mt-5 h-72 w-[92%] md:w-full mx-auto overflow-hidden rounded-xl 
    bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] 
    bg-cover bg-center">
            <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
        </div>
        <div className='relative flex flex-col bg-clip-border rounded-xl bg-white w-[85%] md:w-[90%]
    text-gray-700 shadow-md mx-auto -mt-20 mb-6 '>
            <div className="p-4">
                <div className="mb-10 flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <img src={icon_phongban} alt="avatar" className='inline-block relative object-cover object-center 
                    w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
                        <div>
                            <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">{getDataDepartment.TenPB}</h5>
                            <p className="block antialiased font-sans text-sm leading-normal font-normal">{getDataDepartment.MaPB}</p>
                        </div>
                    </div>


                    <button className='border rounded-lg border-slate-400 text-white text-base px-5 py-3 bg-green-500 hover:bg-green-700' onClick={handleReturn}>
                        Trở lại
                    </button>



                </div>
                <div className="mb-12 px-8">
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 mb-5'>
                        <div className='flex flex-start gap-3'>
                            <label className='text-base font-bold '>Số lượng giới hạn:</label>
                            <p>{getDataDepartment.SoLuong}</p>
                        </div>
                        <div className='flex flex-start gap-3'>
                            <label className='text-base font-bold '>Số lượng nhân viên hiện tại:</label>
                            <p>{getDataDepartment.SiSo}</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 mb-5'>
                        <div className='flex flex-start gap-3'>
                            <label className='text-base font-bold '>Số điện thoại:</label>
                            <p>{getDataDepartment.SoDienThoai}</p>
                        </div>
                        <div className='flex flex-start gap-3'>
                            <label className='text-base font-bold '>Ngày thành lập:</label>
                            <p>{getDataDepartment.NgayThanhLap}</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-1 mb-5'>

                        <div className='flex flex-start gap-3'>
                            <label className='text-base font-bold '>Địa chỉ:</label>
                            <p>{getDataDepartment.DiaChi}</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-1 mb-5'>

                        <div className='flex flex-start gap-3'>
                            <label className='text-base font-bold '>Mô tả:</label>
                            <textarea rows='5' className='grow border border-black px-3 py-2 rounded-sm' defaultValue={getDataDepartment.MoTa}>

                            </textarea>
                        </div>
                    </div>

                </div>
                <div className="mb-12 px-8">
                    <div className="bloc-tabs">
                        <button
                            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab(1)}
                        >
                            Danh sách nhân viên
                        </button>
                        <button
                            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab(2)}
                        >
                            Số liệu thống kê
                        </button>

                    </div>

                    <div className="content-tabs">
                        <div
                            className={toggleState === 1 ? "content  active-content" : "content"}
                        >
                            <div className='p-6 px-0 pt-0 pb-2'>
                                <DataTable
                                    className='overflow-auto'
                                    customStyles={customStyle}
                                    responsive
                                    columns={columns}
                                    data={filteredData}

                                    pagination
                                    paginationPerPage={10}
                                    paginationComponentOptions={[10, 20, 30]}
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
                                        <button
                                            onClick={()=>handleExcel(dataExcel)}
                                            className='p-2 text-white rounded-lg text-base bg-green-500 border-2 hover:bg-green-700 focus-visible:border-green-700 mb-2 md:mb-0'
                                        >
                                            Xuất Excel
                                        </button>
                                    ]}
                                />

                            </div>
                        </div>

                        <div
                            className={toggleState === 2 ? "content  active-content" : "content"}
                        >
                            <div className="flex">
                                <div>
                                    <ul className='flex flex-col'>
                                        <li className={toggleState2 === 1 ? 'p-4 border-b-1 cursor-pointer border-r-4 border-r-red-500' : 'p-4 border-b-1 cursor-pointer'} onClick={() => setToggleState2(1)}>Biểu đồ nam nữ</li>
                                        <li className={toggleState2 === 2 ? 'p-4 border-b-1 cursor-pointer border-r-4 border-r-red-500' : 'p-4 border-b-1 cursor-pointer'} onClick={() => setToggleState2(2)}>Biểu đồ chức vụ</li>

                                    </ul>
                                </div>
                                <div className="tab-content1">
                                    <div className={toggleState2 === 1 ? 'tab-panel1 active' : 'tab-panel1'}>
                                        <div className='flex justify-center gap-3 items-start' >
                                            <div ref={chartGioiTinh}>
                                                <BarChart width={500} height={300} data={dataGioTinh} >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="Số lượng" fill="#8884d8" />

                                                </BarChart>
                                            </div>
                                            <button onClick={handleDownloadGioiTinh} className='p-1 text-white border rounded-md text-sm bg-red-600 hover:bg-red-800 '>Tải file PDF</button>
                                        </div>

                                    </div>
                                    <div className={toggleState2 === 2 ? 'tab-panel1 active' : 'tab-panel1'}>
                                        <div className='flex justify-center gap-3 items-start' >
                                            <div ref={chartChucVu}>
                                                <BarChart width={500} height={300} data={dataChucVu} >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="Số lượng" fill="#8884d8" />

                                                </BarChart>
                                            </div>
                                            <button onClick={handleDownloadChucVu} className='px-4 py-3 text-white border rounded-md bg-red-600 hover:bg-red-800 '>Tải file PDF</button>
                                        </div>

                                    </div>

                                </div>
                            </div>


                        </div>


                    </div>
                </div>
            </div>
        </div>

    </div>
    );
}

export default DepartmentView
