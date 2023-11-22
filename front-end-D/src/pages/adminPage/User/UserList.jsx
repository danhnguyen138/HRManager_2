import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { BsTrash, BsBag } from 'react-icons/bs';
import { FiEdit3, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStateContext } from 'context/ContextProvider';
const TrashIcon = ({ ...props }) => {
    return (
        <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-red-500 cursor-pointer hover:bg-red-700'>
            <BsTrash className='text-base text-white' {...props} />
        </div>
    );
}
const EditIcon = ({ ...props }) => {
    return (
        <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-yellow-500 cursor-pointer hover:bg-yellow-700'>
            <FiEdit3 className='text-base text-white' {...props} />
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
const BagIcon = ({ ...props }) => {
    return (
        <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-orange-500 cursor-pointer hover:bg-orange-700'>
            <BsBag className='text-base text-white' {...props} />
        </div>
    );
}
const UserList = () => {
   
    const [selectedRows, setSelectedRows] = useState();
    const [searchText, setSearchText] = useState('');
    const [statusText, setStatusText] = useState('');
    const [departmentText, setDepartmentText] = useState(''); //Tim ten phong ban
    const token= useSelector(state=>state.token);//Lay token 
    const {showNotification}= useStateContext();
    const [getDataEmployee, setGetDataEmployee]= useState(null);
    const [getDataDepartment, setGetDataDepartment] = useState(null);
    const navigate= useNavigate();
    //Goi Api danh sach nhan vien
    const getEmployee= async ()=>{
        const res =await fetch ('/api/admin/danhsachnhanvien',{
            method:'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data= await res.json();
   
        setGetDataEmployee(data.userlist);
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

                setGetDataDepartment(data)
            }
        )

    }
    useEffect(()=>{
        getEmployee();
        getDepartment();
    },[]);
    let dataEmployee=[]
    let dataDepartment = [];
    let dataExcel=[];
    if (getDataEmployee&&getDataDepartment){
        getDataEmployee.map((item, index)=>{
            dataEmployee.push({
                id: item.id,
                stt: index,
                name: item.HoTen,
                email: item.Email,
                tel: item.SoDT,
                department: item.PhongBan?item.PhongBan.TenPB:'',
                status: item.TinhTrang
            })
            dataExcel.push({
                'STT': index + 1,
                'Họ và tên': item.HoTen,
                'Ngày Sinh': item.NgaySinh,
                'Email': item.Email,
                'Giới tính': item.GioiTinh,
                'Hôn nhân': item.HonNhan,
                'Dân tộc': item.DanToc,
                'Quốc tịch': item.QuocTich,
                'Tôn giáo': item.TonGiao,
                'Số điện thoại': item.SoDT,
                'Quê quán': item.QueQuan,
                'Nơi ở': item.NoiO,
                'Hộ khẩu': item.HoKhau,
                'Căn cước công dân': item.CCCD,
                'Ngày cấp': item.NgayCap,
                'Nơi cấp': item.NoiCap,
                'Tình trạng': item.TinhTrang,
                'Phòng ban': item.PhongBan?item.PhongBan.TenPB:"",
                'Chức vụ': item.ChucVu?item.ChucVu.TenChucVu:"",
            })
        })
        
        getDataDepartment.getPhongBan.map((item) => {
            dataDepartment.push({
                value: item.TenPB,
                label: item.TenPB
            })
        })
    } else{
        return null;
    }
    const filteredData = dataEmployee.filter((row) => {
        return (
            row.name.toLowerCase().includes(searchText.toLowerCase()) &&
            row.status.includes(statusText) &&
            row.department.includes(departmentText)
        )
    }
    )

    const handleEdit = (id) => {
        // Xử lý khi người dùng click vào nút chỉnh sửa
        navigate(`/admin/userlist/${id}/update`);
    };

    const handleDelete = async(id) => {

        if (window.confirm("Bạn chắc chăn muốn xóa nhân viên này?")){
            await fetch(`/api/admin/danhsachnhanvien/${id}/delete`,{
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(async(res)=>{
                const dataRes= await res.json();
                if (dataRes.msg){
                    getEmployee();
                    showNotification('success', dataRes.msg);
                }else{
                    showNotification('error', dataRes.error);
                }
            })
        }

    };

    const handleView = (id) => {
        // Xử lý khi người dùng click vào nút xem chi tiết
        navigate(`/admin/user/${id}/view`)
    };
    const handleCreateEmployee=()=>{
        navigate('/admin/user/create')
    };
    const handleChange= async(id)=>{
        // await fetch(`/api/admin/hopdong/${id}/detail`,{
        //     method:'GET',
        //     headers:{
        //         Authorization:`Bearer ${token}`
        //     }
        // }).then(
        //     async(res)=>{
        //         const resData= await res.json();
              
        //         if (resData.error){
        //             navigate(`/admin/contract/${id}`)
        //             showNotification('error',resData.error)
        //         }else{
        //             navigate(`/admin/user/${id}/changePosition`)
        //         }
        //     })
        
        navigate(`/admin/user/${id}/changePosition`)
        
    }
    const handleExcel=(dataExcel)=>{
        const XLSX = require("xlsx");

        // Khởi tạo workbook
        const workbook = XLSX.utils.book_new();

        // Tạo worksheet
        const worksheet = XLSX.utils.json_to_sheet(dataExcel);

        // Thêm worksheet vào workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Xuất file Excel
        XLSX.writeFile(workbook, "danhsachnhanvien.xlsx");
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

        active: {
            backgroundColor: '#54c901',
            marginRight: '20px',
            marginTop: '5px',
            marginBottom: '5px',
            display: 'flex',
            justifyContent: 'center',

            borderRadius: '50px'
        },
        pause: {
            backgroundColor: '#e7ca01',
            marginRight: '20px',
            marginTop: '5px',
            marginBottom: '5px',
            display: 'flex',
            justifyContent: 'center',

            borderRadius: '50px'
        },
        leave: {
            backgroundColor: '#ec0201',
            marginRight: '20px',
            marginTop: '5px',
            marginBottom: '5px',
            display: 'flex',
            justifyContent: 'center',

            borderRadius: '50px'
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
            name: 'Họ và tên',
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
            name: 'Phòng ban',
            selector: row => row.department,
            sortable: true,

        },
        {
            name: 'Trạng thái',
            selector: row => row.status,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: (row) => row.status === 'Đang Làm Việc',
                    style: customStyle.active
                },
                {
                    when: (row) => row.status === 'Đang Tạm Dừng',
                    style: customStyle.pause
                },
                {
                    when: (row) => row.status === 'Đã Nghỉ Việc',
                    style: customStyle.leave
                }
            ],
            width: '170px',

        },
        {
            name: 'Thao tác',
            cell: (row) => {
                return (
                    <div className="flex gap-1 pr-2">
                        <TrashIcon onClick={() => handleDelete(row.id)} />
                        <EditIcon onClick={() => handleEdit(row.id)} />
                        <ViewIcon onClick={() => handleView(row.id)} />
                        <BagIcon onClick={()=>handleChange(row.id)}/>
                    </div>
                );
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ];
   

    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Trang nhân viên</h1>
                </div>
            </div>
            <div className="mt-12 mb-8 flex flex-col gap-12">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="relative flex justify-between bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                        <h6 className="block antialiased text-xl tracking-normal font-sans font-semibold leading-relaxed text-white">
                            Danh sách nhân viên
                        </h6>
                        <div className='flex'>
                        <button
                            onClick={handleCreateEmployee}
                            className='py-3 px-4 bg-red-500 mr-3 rounded-lg text-white font-bold  text-base transform hover:translate-y-1 transition-all duration-500'>
                            Tạo nhân viên
                        </button>
                        <button
                            onClick={()=>handleExcel(dataExcel)}
                            className='py-3 px-4 bg-green-500 rounded-lg text-white font-bold  text-base transform hover:translate-y-1 transition-all duration-500'>
                           Xuất Excel
                        </button>
                        </div>
                       

                    </div>
                    <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">

                        <DataTable
                            customStyles={customStyle}
                            className='table-auto'
                            responsive
                            columns={columns}
                            data={filteredData}
                            selectableRows // Cho phép chọn nhiều dòng
                            onSelectedRowsChange={setSelectedRows}
                            pagination // Cho phép phân trang
                            paginationPerPage={5} // Số dòng mỗi trang
                            paginationRowsPerPageOptions={[5, 10, 15]} // Các tùy chọn số dòng mỗi trang
                            highlightOnHover // Tô đậm dòng khi di chuột qua
                            selectableRowsHighlight // Tô đậm các dòng được chọn
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
                                <select className='p-2 rounded-lg text-base border-2 mr-3 hover:border-blue-700' onChange={e => setStatusText(e.target.value)}>
                                    <option value=''>---Trạng thái---</option>
                                    <option value="Đang Làm Việc">Đang làm việc</option>
                                    <option value="Đang Tạm Dừng">Đang tạm dừng</option>
                                    <option value="Đã Nghỉ Việc">Đã nghỉ việc</option>
                                </select>
                                ,
                                <select className='p-2 rounded-lg text-base border-2 mr-3 hover:border-blue-700' onChange={e => setDepartmentText(e.target.value)}>
                                    <option className='rounded-lg' value=''>---Phòng Ban---</option>
                                    {dataDepartment.map((item, index)=>{
                                        return (<option value={item.value} key={item.value+' '+index}>{item.label}</option>)
                                    })}
                                </select>
                                ,

                            ]}
                        // Xác định các dòng được chọn

                        />
                    </div>
                </div>

            </div>



        </div>
    );
}

export default UserList




