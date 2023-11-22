import { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react/headless';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';


const Notification = ({ icon, color, dotColor }) => {
    const navigate = useNavigate();
    const token = useSelector(state => state.token);// Lay token kiem tra xac thuc
    const user = useSelector(state => state.user);// Lay token kiem tra xac thuc
    const [dataTB, setDataTB] = useState([]);// Lay du lieu data tu api
    const [dataTBAll, setDataTBAll] = useState([]);// Lay du lieu data tu api

    const [activeTab, setActiveTab] = useState('all');
    const [numNotice, setNumNotice] = useState(0);

    // Hàm thay đổi tab
    const handleTabChange = tab => {
        setActiveTab(tab);
    };

    const handleClick = async (events) => {
        try {
          const tieude = events.target.value;
          const thoigiangui = events.target.id;
          const id = user.id;
          const idthongbao = events.target.name;
            
          const response = await fetch(`/api/user/updatethongbao/${id}/${tieude}/${thoigiangui}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ tieude, thoigiangui, id }),
          });
      
          if (response.ok) {
            console.log(idthongbao)
            console.log(tieude)
            
            navigate("/user/notificationdetail", { state: { idthongbao } });
            window.location.reload();
          } else {
            // Xử lý lỗi nếu cần thiết
            console.error('Có lỗi xảy ra trong quá trình cập nhật thông báo');
          }
        } catch (error) {
          console.error(error);
        }
      };
      
    const getTB = async () => {
        try {
          const res = await fetch(`/api/user/notificationunread/${user.id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const dataThongbao = await res.json();
          console.log(dataThongbao);
      
          if (!dataThongbao.thongbaos) {           
          }
      
          const data = dataThongbao.thongbaos.map((item, index) => ({
            STT: index + 1,
                    TieuDe: item.TieuDe,
                    NoiDung: item.NoiDung,
                    NgayThongBao: item.ThoiGianGui,
                    TrangThai: item.NhanVienThongBao.TrangThai,
                    ID:item.id
          }));
      
          
          const resall = await fetch(`/api/user/notification/${user.id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });        
        setDataTB(data);
        setNumNotice(data.length)       
        } catch (error) {
          console.error(error);          
        }
      };
      
    const getTBAll = async () => {
        try{
            const res = await fetch(`/api/user/notification/${user.id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const dataThongbaoall = await res.json();
            console.log(dataThongbaoall)
            if (!dataThongbaoall) return;
            let data = [];
            dataThongbaoall.getThongBao.thongbao.forEach((item, index) => {
                data.push({
                    STT: index + 1,
                    TieuDe: item.TieuDe,
                    NoiDung: item.NoiDung,
                    NgayThongBao: item.ThoiGianGui,
                    TrangThai: item.NhanVienThongBao.TrangThai,
                    ID:item.id
                });
    
            });
            setDataTBAll(data);
        }
        catch (error) {
            console.error(error);          
          }
       
    }
    useEffect(() => {  
        try{
            getTB();
            getTBAll(); 
            const socket = io('http://localhost:9001', {transports: ['websocket', 'polling', 'flashsocket']});
            console.log(socket)
            socket.on('notification', (data) => {
            if(data) { 
                getTB();
                getTBAll();
                console.log(dataTB)
                setNumNotice(dataTB.length)   
                }

            console.log('Nhận thông báo:', data);
            });

            return () => {
            socket.disconnect(); // Ngắt kết nối khi component bị hủy
            };
        }
        catch (error) {
            console.error(error);          
          }
            
        
    }, []);
    console.log(dataTB)
    if (dataTBAll.length === 0) return (
        <Tippy
            placement='bottom'
            interactive={true}

            render={
                attrs => {
                    return (
                        <div className='nav-item bg-white p-4 rounded-lg w-96 border shadow-lg'>
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-lg ">Thông Báo</p>

                            </div>
                            <div className='mt-5'>
                                Chưa có thông báo
                            </div>
                        </div>
                    )
                }
            }
        >
            <button
                type="button"

                style={{ color }}
                className="relative text-2xl rounded-full p-3 hover:bg-light-gray"
            >
                {numNotice == 0 || (<span
                    style={{ background: dotColor }}
                    className="absolute inline-flex justify-center rounded-full h-4 w-4 right-1 top-1 text-0.7 leading-4 text-white "
                >
                    {numNotice}
                </span>)
                }

                {icon}
            </button>
        </Tippy>
    );
    return (
        <Tippy
            placement='bottom'
            interactive={true}

            render={
                attrs => {
                    return (
                        <div className='nav-item bg-white p-4 rounded-lg w-96 border shadow-lg'>
                            <div className="flex justify-between items-center">
                                <div className="tabs">
                                    <div className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                                        onClick={() => handleTabChange('all')}
                                    >
                                        Tất cả
                                    </div>
                                    <div
                                        className={`tab ${activeTab === 'unread' ? 'active' : ''}`}
                                        onClick={() => handleTabChange('unread')}
                                    >
                                        Chưa đọc
                                    </div>
                                </div>
                            </div>

                            <div className="notification-list" id="notification-list">
                                {activeTab === 'all' ? (
                                    <div className='mt-5'>
                                        {dataTBAll.map((item, index) => {
                                            return (
                                                <div key={index} className={`${item.TrangThai === 'Đã xem' ? 'mt-2 flex items-center leading-8 gap-5 border-b-1 border-color p-3' : 'mt-2 flex items-center leading-8 gap-5 border-b-1 border-color p-3 font-semibold bg-sky-700 text-stone-50'}`}>
                                                    <div>
                                                        <button className={`${item.TrangThai === 'Đã xem' ? '' : ''}`}
                                                            value={item.TieuDe}
                                                            id={item.NgayThongBao}
                                                            name={item.ID}
                                                            onClick={handleClick}>
                                                            {item.TieuDe}
                                                        </button>
                                                        <p className="text-sm">{item.NgayThongBao.slice(0, 10)}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className='mt-5'>
                                        {(dataTB.length === 0) && <div className='nav-item bg-white p-4 rounded-lg border'>
                                            <div className='mt-5'>
                                                Chưa có thông báo mới
                                            </div>
                                        </div>}
                                        {dataTB.map((item, index) => {
                                            console.log(item)
                                            return (
                                                <div key={index} className="mt-2 flex items-center leading-8 gap-5 border-b-1 border-color p-3 font-semibold bg-sky-700 text-stone-50">
                                                    <div>
                                                        <button
                                                            value={item.TieuDe}
                                                            id={item.NgayThongBao}
                                                            name={item.ID}
                                                            onClick={handleClick}>
                                                            {item.TieuDe}
                                                        </button>
                                                        <p className="text-sm">{item.NgayThongBao.slice(0, 10)}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                            </div>
                        </div>
                    )
                }
            }
        >
            <button
                type="button"

                style={{ color }}
                className="relative text-2xl rounded-full p-3 hover:bg-light-gray"
            >
                {numNotice == 0 || <span
                    style={{ background: dotColor }}
                    className="absolute inline-flex justify-center rounded-full h-4 w-4 right-1 top-1 text-0.7 leading-4 text-white "
                >
                    {numNotice}
                </span>
                }

                {icon}
            </button>
        </Tippy>

    );

}

export default Notification;
