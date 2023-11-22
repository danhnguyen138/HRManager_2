import React, { useState } from 'react';
// import Modal from 'react-modal';

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import 'moment/locale/vi';
import './MyCalendar.css'; // Import file CSS tùy chỉnh
import InputText from './input/InputText';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useStateContext } from 'context/ContextProvider';
const TimeKeepingSchema = yup.object().shape({
    GioVao: yup.string().required('Xin nhập giờ vào')
    // .test('GioVao', 'Giờ vào phải trước giờ ra', (value) => {
    //     const { endTime } = this.parent;
    //     return !endTime || value < endTime;
    // }),
    ,
    GioRa: yup.string().required('Xin nhập giờ ra')
        .test('is-before-start-time', 'Giờ ra phải sau giờ vào', function (
            value
        ) {
            const { GioVao } = this.parent;
            return !GioVao || value > GioVao;
        }),
})
function convertDecimalToTime(decimalTime) {
    let a= parseFloat(decimalTime)
    const hours = Math.floor(a);
    const minutes = Math.floor((a - hours) * 60);
    const seconds = Math.round((((a - hours) * 60) - minutes) * 60);
 
    return `${hours}:${minutes}:${seconds}`;
}
const chuyenTiengAnhSangViet = (e) => {
    const arr = e.split(' ');
    let thu = '';
    let thang = '';
    switch (arr[0]) {
        case 'Mon':
            thu = 'Thứ Hai';
            break;
        case 'Tue':
            thu = 'Thứ Ba';
            break;
        case 'Wed':
            thu = 'Thứ Tư';
            break;
        case 'Thu':
            thu = 'Thứ Năm';
            break;
        case 'Fri':
            thu = 'Thứ Sáu';
            break;
        case 'Sat':
            thu = 'Thứ Bảy';
            break;
        default:
            thu = 'Chủ Nhật';
            break;


    }
    switch (arr[1]) {
        case 'Jan':
            thang = '01';
            break;
        case 'Feb':
            thang = '02';
            break;
        case 'Mar':
            thang = '03';
            break;
        case 'Apr':
            thang = '04';
            break;
        case 'May':
            thang = '05';
            break;
        case 'Jun':
            thang = '06';
            break;
        case 'Jul':
            thang = '07';
            break;
        case 'Aug':
            thang = '08';
            break;
        case 'Sep':
            thang = '09';
            break;
        case 'Oct':
            thang = '10';
            break;
        case 'Nov':
            thang = '11';
            break;
        default:
            thang = '12';
            break;
    }
    return `${thu}, Ngày ${arr[2]}, Tháng ${thang}, Năm ${arr[3]}`
}
const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
        backgroundColor: "#3174ad",
        borderRadius: "0px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
        whiteSpace: "normal", // Cho phép xuống dòng
        wordWrap: "break-word" // Ngắt từ khi quá dài
    };
    return {
        style: style
    };
};
moment.locale('vi');
const messages = {
    allDay: 'Cả ngày',
    previous: 'Trước',
    next: 'Tiếp',
    today: 'Hôm nay',
    month: 'Tháng',
    week: 'Tuần',
    day: 'Ngày',
    agenda: 'Lịch công việc',
    date: 'Ngày',
    time: 'Thời gian',
    event: 'Sự kiện',
    noEventsInRange: 'Không có sự kiện nào trong khoảng thời gian này.',
    showMore: total => `+ xem thêm (${total})`
};
const MyCalendar = ({ events }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedEventUpdate, setSelectedEventUpdate]= useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] =useState(false);
    const [chamCongSchema, setChamCongSchema] = useState(events);
    const { id } = useParams();
    const { showNotification } = useStateContext();
    const token = useSelector(state => state.token);
    const localizer = momentLocalizer(moment);
    const [isModalOpen, setIsModalOpen] = useState(false); // Set trang thai modal
    const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 }); // set vi tri modal
    const handleSelectEvent = (e, event) => {
        setSelectedEventUpdate(e)
        setShowModal2(true)
    }
    // Xử lý sự kiện khi click vào slot (ngày) trống trong calendar
    const handleSelectSlot = (e, event) => {
        setSelectedEvent(e); // Lay vi tri click chuot
        setShowModal(true)
       
    };
    const handleUpdate = async (values)=>{
        await fetch(`/api/admin/chamcong/update`,{
            method:'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(values)
        }).then(
            async (res)=>{
                const resData= await res.json();
                if (resData.error){
                    showNotification('error', resData.error)
                }else{
                    setShowModal2(false)
                    setChamCongSchema(
                        (prev)=>{
                            const index= prev.findIndex(chamcong=>chamcong.id===resData.newChamCong.id)
                            if (index!==-1){
                                prev[index].title=`${resData.newChamCong.GioVao} - ${resData.newChamCong.GioRa}`;
                                prev[index].description= convertDecimalToTime(resData.newChamCong.TongGio)
                              
                            }
                            return prev
                        }
                    )
                    showNotification('success',resData.msg)
                }

        
            }
        )
    }
    const handleCreate = async (values) => {
        await fetch(`/api/admin/chamcong/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(values)
        }).then(
            async (res) => {
                const resData = await res.json();
                if (resData.error) {
                    showNotification('error', resData.error)
                } else {
                    setChamCongSchema(
                        (prev) => [...prev,
                        {
                            id: resData.newChamCong.id,
                            title: `${resData.newChamCong.GioVao} - ${resData.newChamCong.GioRa}`,
                            start: new Date(resData.newChamCong.Ngay),
                            end: new Date(resData.newChamCong.Ngay),
                            description: convertDecimalToTime(resData.newChamCong.TongGio)
                        }
                        ]
                    )

                    setShowModal(false)

                    showNotification('success', resData.msg)
                }
            }
        )
    }
    return (
        <div>
            <Calendar
                messages={messages}
                localizer={localizer}
                events={chamCongSchema}
                defaultView="month"
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                titleAccessor="title"
                selectable={true} // Cho phép chọn slot (ngày) trống
                onSelectEvent={handleSelectEvent} // Sự kiện khi click vào sự kiện
                onSelectSlot={handleSelectSlot} // Sự kiện khi click vào slot (ngày) trống
                eventPropGetter={eventStyleGetter}
            />
            {/* {selectedEvent &&
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    className="custom-modal"
                    overlayClassName="custom-overlay"
                    style={{
                        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', },
                        content: {
                            left: `${modalPosition.left}px`,
                            top: `${modalPosition.top}px`,
                            transform: 'translate(-50%, -50%)',
                            width: '400px',
                            height: '150px',
                            background: 'white',
                            borderRadius: '10px'
                        },
                    }}
                    ariaHideApp={false}
                >
                    <p>Chấm Công Ngày {selectedEvent.start.getDate()} Tháng {selectedEvent.start.getMonth() + 1}  Năm {selectedEvent.start.getFullYear()} </p>
                    <p>Thời gian bắt đầu: {selectedEvent.start.toString().slice(16, 24)}</p>
                    <p>Thời gian kết thúc: {selectedEvent.end.toString().slice(16, 24)}</p>
                    <p>Tổng số giờ làm: {doiGiaySangGioPhutGiay(selectedEvent.end - selectedEvent.start)}</p>
                </Modal>

            } */}
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-3 md:mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {/* {selectedEvent.start.toString().slice(0,15)} */}
                                        {/* {moment(selectedEvent.start.toString().slice(0,15),'ddd MMM DD YYYY').format('dddd, DD [tháng] MM [năm] YYYY')} */}
                                        {chuyenTiengAnhSangViet(selectedEvent.start.toString().slice(0, 15))}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <Formik
                                    onSubmit={handleCreate}
                                    initialValues={{
                                        idNhanVien: id,
                                        Ngay: selectedEvent.start.toString().slice(4, 15),
                                        GioVao: '',
                                        GioRa: ''
                                    }}
                                    validationSchema={TimeKeepingSchema}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleBlur,
                                        handleChange,
                                        handleSubmit,
                                        setFieldValue
                                    }) => {
                                        return (
                                            <form className='bg-white w-full shadow-md p-3 rounded' onSubmit={handleSubmit}>
                                                <div className="relative p-6 flex-auto">
                                                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>

                                                        <InputText
                                                            title="Giờ vào"
                                                            id="GioVao"
                                                            name='GioVao'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.GioVao}
                                                            errors={errors.GioVao}
                                                            touched={touched.GioVao}
                                                            type='time'
                                                            step='1'
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                        <InputText
                                                            title="Giờ ra"
                                                            id="GioRa"
                                                            name='GioRa'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.GioRa}
                                                            errors={errors.GioRa}
                                                            touched={touched.GioRa}
                                                            type='time'
                                                            step='1'
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                        {/* <InputText
                                                            title="Tổng giờ"
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        /> */}
                                                        {/* <InputText
                                                            type='disabled'
                                                            value={}
                                                            name='Ngay'
                                                            onChange={(e) => {
                                                                setFieldValue('Ngay', selectedEvent.start.toString().slice(4, 15))
                                                            }}
                                                        /> */}
                                                    </div>
                                                </div>
                                                {/*footer*/}
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Close
                                                    </button>
                                                   
                                                </div>
                                            </form>
                                        )
                                    }}

                                </Formik>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            {showModal2 ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-3 md:mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {/* {selectedEvent.start.toString().slice(0,15)} */}
                                        {/* {moment(selectedEvent.start.toString().slice(0,15),'ddd MMM DD YYYY').format('dddd, DD [tháng] MM [năm] YYYY')} */}
                                        {chuyenTiengAnhSangViet(selectedEventUpdate.start.toString().slice(0, 15))}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal2(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <Formik
                                    onSubmit={handleUpdate}
                                    initialValues={{
                                        id: selectedEventUpdate.id,
                                        idNhanVien: id,
                                        Ngay: selectedEventUpdate.start.toString().slice(4, 15),
                                        GioVao: selectedEventUpdate.title.toString().slice(0,8),
                                        GioRa: selectedEventUpdate.title.toString().slice(11,19),
                                        TongGio: selectedEventUpdate.description,
                                    }}
                                    validationSchema={TimeKeepingSchema}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleBlur,
                                        handleChange,
                                        handleSubmit,
                                        setFieldValue
                                    }) => {
                                        return (
                                            <form className='bg-white w-full shadow-md p-3 rounded' onSubmit={handleSubmit}>
                                                <div className="relative p-6 flex-auto">
                                                    <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>

                                                        <InputText
                                                            title="Giờ vào"
                                                            id="GioVao"
                                                            name='GioVao'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.GioVao}
                                                            errors={errors.GioVao}
                                                            touched={touched.GioVao}
                                                            type='time'
                                                            step='1'
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                        <InputText
                                                            title="Giờ ra"
                                                            id="GioRa"
                                                            name='GioRa'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.GioRa}
                                                            errors={errors.GioRa}
                                                            touched={touched.GioRa}
                                                            type='time'
                                                            step='1'
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                        <InputText
                                                            title="Tổng giờ"
                                                            type='text'
                                                            name='TongGio'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.TongGio}
                                                            errors={errors.TongGio}
                                                            touched={touched.TongGio}
                                                            disabled
                                                            className="shadow appearance-none border border-slate-950 rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                                                        />
                                                        
                                                    </div>
                                                </div>
                                                {/*footer*/}
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setShowModal2(false)}
                                                    >
                                                        Close
                                                    </button>                                                   
                                                </div>
                                            </form>
                                        )
                                    }}

                                </Formik>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

        </div>
    )
}

export default MyCalendar
