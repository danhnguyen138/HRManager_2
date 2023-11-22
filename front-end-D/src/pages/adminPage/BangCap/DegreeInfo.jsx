import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { BsTrash } from 'react-icons/bs';
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
const DegreeUser = () => {
    const [selectedRows, setSelectedRows] = useState();
    const [searchText, setSearchText] = useState('');
    const [typeDegree, setTypeDegree]= useState('')
    const navigate= useNavigate();
    const token= useSelector(state=>state.token);
    const {id}= useParams();
    const {showNotification}= useStateContext();
    const [getDataDegree, setGetDataDegree]= useState(null);
    const getDegree= async(id)=>{
        await fetch(`/api/admin/bangcap/${id}`,{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(
            async(res)=>{
                const resData= await res.json();
                if (resData.error){
                    showNotification('error', resData.error)
                }else{
                    setGetDataDegree(resData)
                }
            }
        )
    }
    const [getDataEmployee, setGetDataEmployee]= useState(null);
    const getEmployee= async(id)=>{
        await fetch(`/api/admin/danhsachnhanvien/${id}`,{
            method: 'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(
            async(res)=>{
                const resData= await res.json();
                if (resData.error){
                    showNotification('error', resData.error)
                }else{
                    setGetDataEmployee(resData)
                }
            }
        )

    }
    useEffect(()=>{
        getDegree(id);
        getEmployee(id)
    },[]);
    if (!getDataDegree) return null;
    if (!getDataEmployee) return null;

    let dataDegree=[];
    for (let i=0; i<getDataDegree.bangcap.length; i++){
        dataDegree.push({
            id: getDataDegree.bangcap[i].id,
            stt: i,
            degreeCode: getDataDegree.bangcap[i].MaBC,
            title: getDataDegree.bangcap[i].TenBC,
            typeDegree: getDataDegree.bangcap[i].LoaiBC,
            dateSign: getDataDegree.bangcap[i].NgayKy
        })
    }

    const filteredData= dataDegree.filter((row)=>{
        return (
            row.title.toLowerCase().includes(searchText.toLowerCase())&&
            row.typeDegree.includes(typeDegree)
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
            name: 'Mã bằng cấp',
            selector: row => row.degreeCode,
            sortable: true,
        },
        {
            name: 'Tên bằng cấp',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Loại bằng cấp',
            selector: row => row.typeDegree,
            sortable: true,
        },
        {
            name: 'Ngày ký',
            selector: row => row.dateSign,
            sortable: true,
        },
        {
            name: 'Thao tác',
            cell: (row) => {
                return (
                    <div className='flex gap-1 pr-2'>
                        <TrashIcon onClick={() => handleDelete(row.id)} />
                        <EditIcon onClick={() => handleEdit(row.id)} />
                       
                    </div>
                )
            },
            ignoreRowClick: true,
            allowOverflow: true,
            button: true

        }
    ];
    const handleEdit = (idBC) => {
        navigate(`/admin/degree/${id}/update/${idBC}`)
    };
    const handleDelete = async(idBC) => {
        if (window.confirm('Bạn chắc chắn muốn xóa bằng cấp này?')){
            await fetch(`/api/admin/bangcap/${id}/delete/${idBC}`,{
                method: 'DELETE',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(
                async(res)=>{
                    const resData= await res.json();
                    if (resData.msg){
                        getDegree(id);
                        showNotification('success', resData.msg)
                    }else{
                        showNotification('error', resData.error)
                    }
                }
            )
        }
    };
   
    const handleCreateDegree= async()=>{
        navigate(`/admin/degree/${id}/create`)
    }
    return (
        <div className='mt-20 md:mt-8 mx-auto w-full md:w-[90%]'>
            <div className='flex flex-wrap lg:flex-nowrap justify-between'>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Trang Bằng cấp</h1>
                </div>
            </div>
            <div className='mt-12 mb-8 flex flex-col gap-12'>
                <div className='relative flex flex-col bg0clip-border rounded-xl bg-white text-gray-700 shadow-md'>
                    <div className="flex justify-between relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                        <h6 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-relaxed text-white">
                            Bằng cấp của {getDataEmployee.user.HoTen}
                        </h6>
                        <button
                            onClick={handleCreateDegree}
                            className='py-3 px-8 bg-red-500 rounded-full text-white font-bold text-base transform hover:translate-y-1 transition-all duration-500'>
                            Tạo bằng cấp
                        </button>
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
                            paginationRowsPerPageOptions={[5,10,15]}
                            highlightOnHover
                            selectableRowsHighlight
                            subHeader
                            subHeaderComponent={[
                                <input
                                    key='search'
                                    type='text'
                                    className='p-2 mr-3 rounded-lg text-base border-2 hover:border-blue-500 focus-visible:border-blue-700 mb-2 md:mb-0'
                                    placeholder='Tìm kiếm...'
                                    value={searchText}
                                    onChange={(e)=>setSearchText(e.target.value)}
                                />,
                                <select className='p-2 rounded-lg text-base border-2 mr-3 hover:border-blue-700' onChange={e => setTypeDegree(e.target.value)}>
                                    <option value=''>---Loại bằng cấp---</option>
                                    <option value="Chứng chỉ anh văn">Chứng chỉ anh văn</option>
                                    <option value="Chứng chỉ tin học">Chứng chỉ tin học</option>
                                    <option value="Bằng đại học">Bằng đại học</option>
                                    <option value="Bằng cao đẳng">Bằng cao đẳng</option>
                                    <option value="Bằng trung cấp nghề">Bằng trung cấp nghề</option>
                                </select>
                                
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DegreeUser
