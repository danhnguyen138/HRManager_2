import React, { useState, useEffect } from 'react';
import MyCalendar from 'components/Calendar';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStateContext } from 'context/ContextProvider';

function convertDecimalToTime(decimalTime) {
    let a = parseFloat(decimalTime)
    const hours = Math.floor(a);
    const minutes = Math.floor((a - hours) * 60);
    const seconds = Math.round((((a - hours) * 60) - minutes) * 60);

    return `${hours}:${minutes}:${seconds}`;
}

const TimekeepingUser = () => {
    const [getDataTime, setGetDataTime] = useState(null);
    const token = useSelector(state => state.token);
    const { id } = useParams();
    const { showNotification } = useStateContext();
    const navigate = useNavigate();

    const getTimeKeeping = async () => {
        await fetch(`/api/admin/chamcong/history/${id}`, {
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
                    setGetDataTime(resData);
                }
            }
        )
    };
    useEffect(() => {
        getTimeKeeping();
    }, [])
    if (!getDataTime) return null;
    let events = [];
    getDataTime.getHistory.forEach(
        (item, index) => {
            events.push({
                id: item.id,
                title: `${item.GioVao} - ${item.GioRa}`,
                start: new Date(item.Ngay),
                end: new Date(item.Ngay),
                description: convertDecimalToTime(item.TongGio)
            })
        }
    )
    
    return (
        <div className='mt-20 md:mt-8 mx-auto w-full md:w-[90%]'>
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Thông tin chấm công</h1>
                </div>
                <button
                    className='border rounded-lg border-slate-400 text-white text-base font-bold px-5 py-2 my-3 bg-green-500 hover:bg-green-700'
                    onClick={() => navigate(`/admin/timekeeping`)}
                >
                    Trở lại
                </button>

            </div>
            <div className='p-6 px-0 pt-0 pb-2'>
                <MyCalendar
                    events={events}
                />
            </div>

        </div>
    )


}

export default TimekeepingUser;
