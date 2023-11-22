import React from 'react'
import { useStateContext } from "../../../context/ContextProvider";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import icon_luong from 'data/icon_luong.png';
import { AiOutlineEdit } from 'react-icons/ai';
import "View.css";
const WageView = () => {
    const navigate = useNavigate();
    const { showNotification } = useStateContext();

    const token = useSelector(state => state.token);
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
    const [dataToiThieu, setGetDataToiThieu] = useState(null);
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
                    setGetDataToiThieu(resData.getLuongToiThieu)
                }
            }
        )
    }
    useEffect(() => {
        getNgachLuong();
        getLuongToiThieu()
    }, []);
    if (!dataNgachLuong) return null;
    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Thông tin bậc lương</h1>
                </div>
            </div>
            <div className="relative mt-5 h-72 w-[92%] md:w-full mx-auto overflow-hidden rounded-xl 
            bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] 
            bg-cover bg-center">
                <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
            </div>
            <div className='relative flex flex-col bg-clip-border rounded-xl bg-white w-[85%] md:w-[90%]
            text-gray-700 shadow-md mx-auto -mt-20 mb-6'>
                <div className='p-4'>
                    <div className="mb-10 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <img src={icon_luong} alt="avatar" className='inline-block relative object-cover object-center 
                            w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40' />
                            <div>
                                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug mb-1">Thông tin thang bậc lương</h5>
                                {/* <p className="block antialiased font-sans text-sm leading-normal font-normal">Developer</p> */}
                            </div>
                        </div>
                        <div className="flex justify-center text-center">
                            <button
                                type="button"
                                onClick={() => navigate(`/admin/wage/update`)}
                                className="flex self-center bg-orange-400 text-base text-white opacity-0.9 mr-3 p-3
                                md:mr-0 
                                hover:drop-shadow-xl rounded-xl  "
                            >
                                <AiOutlineEdit className='self-center font-bold text-lg' />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mb-12 px-4">
                        <h6 className='mb-4 text-lg '>Lương tối thiểu tháng theo vùng là {dataToiThieu}  (đồng/tháng)</h6>
                        {
                            dataNgachLuong.map(item => {
                                return (<>
                                    <h6 className='font-bold text-base mb-3'>{item.TenNgachLuong}</h6>
                                    <table className='table-auto mb-3'>
                                        <thead>
                                            <tr>
                                                <th>Tên bậc lương</th>
                                                <th> Tiền lương (đồng/tháng)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.BacLuongs.map(item => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {item.TenBacLuong}
                                                        </td>
                                                        <td>
                                                            {item.TienLuong}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </>
                                )
                            })
                        }
                        {/* <table className="table-auto">
                            <thead>
                                <tr>
                                    <th>Chức vụ</th>
                                    

                                </tr>
                            </thead>
                            <tbody>
                               <tr>
                                    <td></td>
                               </tr>
                            </tbody>
                        </table> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WageView
