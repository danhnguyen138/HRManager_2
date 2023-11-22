import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { BsTrash } from 'react-icons/bs';
import { FiEdit3, FiEye } from 'react-icons/fi';
import { FaExchangeAlt } from 'react-icons/fa';
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
const ViewIcon = ({ ...props }) => {
    return (
        <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-blue-500 cursor-pointer hover:bg-blue-700'>
            <FiEye className='text-base text-white' {...props} />
        </div>
    )
}
const ChangeIcon = ({ ...props }) => {
    return (
        <div className='h-9 w-9 flex justify-center items-center rounded-lg border bg-orange-500 cursor-pointer hover:bg-orange-700'>
            <FaExchangeAlt className='text-base text-white' {...props} />
        </div>
    )
}
const ContractUser = () => {
    const [selectedRows, setSelectedRows] = useState();
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const token = useSelector(state => state.token);
    const { showNotification } = useStateContext();
    const [getDataEmployeeInfo, setGetDataEmployeeInfo] = useState(null);
    const [getDataEmployee, setGetDataEmployee] = useState(null);
    const getEmployeeInfo = async () => {
        await fetch(`/api/admin/hopdong/${id}`, {
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
                    setGetDataEmployeeInfo(resData.hopdong)
                }
            }
        )
    }
    const getEmployee = async () => {
        await fetch(`/api/admin/danhsachnhanvien/${id}`, {
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
                    setGetDataEmployee(resData)
                }
            }
        )
    }
    useEffect(() => {
        getEmployeeInfo();
        getEmployee();
    }, []);
    if (!getDataEmployeeInfo) return null;
    if (!getDataEmployee) return null;
    let dataEmployeeInfo = [];
    for (let i = 0; i < getDataEmployeeInfo.length; i++) {
        const date = new Date(getDataEmployeeInfo[i].createdAt);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${year}-${month}-${day}`;
        dataEmployeeInfo.push({
            id: getDataEmployeeInfo[i].id,
            stt: i,
            decisionNumber: getDataEmployeeInfo[i].MaHD,
            typeContract: getDataEmployeeInfo[i].LoaiHD,
            peroid: getDataEmployeeInfo[i].ThoiHan,
            signDate: formattedDate,
            status: getDataEmployeeInfo[i].TrangThai
        })
    }

    const filteredData = dataEmployeeInfo.filter((row) => {
        return (
            row.decisionNumber.includes(searchText)
        )
    });
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
            name: 'Mã hợp đồng',
            selector: row => row.decisionNumber,
            sortable: true,
        },
        {
            name: 'Loại hợp đồng',
            selector: row => row.typeContract,
            sortable: true,
        },
        {
            name: 'Ngày ký',
            selector: row => row.signDate,
            sortable: true,
        },
        {
            name: 'Thời hạn',
            selector: row => row.peroid,
            sortable: true
        },
        {
            name: 'Trạng thái',
            selector: row => row.status,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: (row) => row.status === 'Còn hiệu lực',
                    style: customStyle.active
                },

                {
                    when: (row) => row.status === 'Hết hiệu lực',
                    style: customStyle.leave
                }
            ],
        },
        {
            name: 'Thao tác',
            cell: (row) => {
                return (
                    <div className="flex gap-1 pr-2">
                        <TrashIcon onClick={() => handleDelete(row.id)} />
                        <ViewIcon onClick={() => handleEdit(row.id)} />
                        <ChangeIcon onClick={() => handleChange(row.id)} />
                    </div>
                );
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ]
    const handleCreateContract = async () => {
        navigate(`/admin/contract/${id}/create`)
    }
    const handleChange = async (id) => {
        console.log('aaaaaaaa')
        await fetch(`/api/admin/thaydoihopdong/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.msg) {
                    getEmployeeInfo();
                } else {
                    showNotification('error', resData.error)
                }
            }
        )
    }
    const handleEdit = (idHD) => {
        navigate(`/admin/contract/${id}/update/${idHD}`);
    };
    const handleDelete = async (idHD) => {
        if (window.confirm("Bạn chắc chắn muốn xóa hợp đồng này?")) {
            await fetch(`/api/admin/hopdong/${id}/delete/${idHD}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(
                async (res) => {
                    const resData = await res.json();
                    if (resData.msg) {
                        getEmployeeInfo();
                        showNotification('success', resData.msg)
                    } else {
                        showNotification('error', resData.error)
                    }
                }
            )
        }
    };
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Trang hợp đồng</h1>
                </div>
                <div className="flex justify-center text-center">
                    {/* <button
            type="button"
            style={{ backgroundColor: currentColor }}
            className="flex self-center text-base text-white opacity-0.9 mr-3 p-2 pr-3
            md:mr-0 md:py-3 md:px-4 md:pr-5
            hover:drop-shadow-xl rounded-xl  "
        >
            <FaDownload className='self-center mr-1 md:mr-2' /> Download report
        </button> */}
                </div>
            </div>
            <div className="mt-12 mb-8 flex flex-col gap-12">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="relative flex justify-between bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                        <h6 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-relaxed text-white">
                            Hợp đồng của {getDataEmployee.user.HoTen}
                        </h6>
                        <div>
                            <button
                                onClick={handleCreateContract}
                                className='py-3 px-4 bg-red-500 rounded-lg text-white font-bold text-base transform hover:translate-y-1 transition-all duration-500'>
                                Tạo hợp đồng
                            </button>
                            <button
                                onClick={() => navigate('/admin/contract')}
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
                                // <select className='p-2 rounded-lg text-base border-2 mr-3 hover:border-blue-700' onChange={e => setStatusText(e.target.value)}>
                                //     <option value=''>---Trạng thái---</option>
                                //     <option value="Đang làm việc">Đang làm việc</option>
                                //     <option value="Đang tạm dừng">Đang tạm dừng</option>
                                //     <option value="Đã nghỉ việc">Đã nghỉ việc</option>
                                // </select>
                                // ,
                                // <select className='p-2 rounded-lg text-base border-2 mr-3 hover:border-blue-700' onChange={e => setDepartmentText(e.target.value)}>
                                //     <option className='rounded-lg' value=''>---Phòng Ban---</option>
                                //     <option value='Phòng nhân sự'>Phòng nhân sự</option>
                                //     <option value='Phòng sales'>Phòng sales</option>
                                // </select>

                            ]}
                        // Xác định các dòng được chọn

                        />
                    </div>
                </div>

            </div>



        </div>
    )
}

export default ContractUser;
