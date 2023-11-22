import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from 'context/ContextProvider';
const HistoryImport = () => {
    const [selectedRows, setSelectedRows] = useState();
    const [getDataHistory, setGetDataHistory] = useState(null);// Lay du lieu lich su 
    const navigate = useNavigate();
    const token = useSelector(state => state.token);
    const { showNotification } = useStateContext();
    const getHistory = async () => {
        await fetch(`/api/admin/chamcong/history`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.error) {
                    showNotification('error', resData.error)
                } else {
                    setGetDataHistory(resData)
                }
            }
        )
    }
    useEffect(() => {
        getHistory();
    }, []);
    if (!getDataHistory) return null;
    let dataHistory = [];
    getDataHistory.getHistory.forEach((item, index) => {
        dataHistory.push({
            stt: index,
            tenFile: item.TenFile,
            dateStart: item.NgayBatDau,
            dateEnd: item.NgayKetThuc
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
            name: 'Tên File',
            selector: row => row.tenFile,
            sortable: true,
            style: {
                width: '200px'
            }
        },
        {
            name: 'Ngày Bắt Đầu',
            selector: row => row.dateStart,
            sortable: true,
        },
        {
            name: 'Ngày Kết Thúc',
            selector: row => row.dateEnd,
            sortable: true
        },

    ]
    const handleReturn= async()=>{
        navigate(`/admin/timekeeping`)
    }
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='mt-12 mb-8 flex flex-col gap-12'>
                <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                    <div className="relative bg-clip-border flex justify-between mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                        <h6 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-relaxed text-white">
                            Lịch sử upload chấm công
                        </h6>
                        <button
                            onClick={handleReturn}
                            className='py-3 px-8 bg-red-500 rounded-xl text-white font-bold  text-base transform hover:translate-y-1 transition-all duration-500'>
                            Trở về
                        </button>
                    </div>
                    <div className='p-6 px-0 pt-0 pb-2'>
                        <DataTable
                            className='overflow-auto'
                            customStyles={customStyle}
                            responsive
                            columns={columns}
                            data={dataHistory}
                           
                          
                            pagination
                            paginationPerPage={5}
                            paginationComponentOptions={[5, 10, 15]}
                            highlightOnHover
                            selectableRowsHighlight
                            // subHeader
                            // subHeaderComponent={[
                            //     <input
                            //         key="search"
                            //         type="text"
                            //         className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-700 focus-visible:border-blue-700 mb-2 md:mb-0'
                            //         placeholder='Tìm kiếm...'
                            //         value={searchText}
                            //         onChange={(e) => setSearchText(e.target.value)}
                            //     />,
                            // ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryImport
