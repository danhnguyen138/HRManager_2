import React, { useState } from "react";
import Modal from 'react-modal';

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import './MyCalendar.css'; // Import file CSS tùy chỉnh

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 });
  // Xử lý sự kiện khi click vào sự kiện trong calendar
  const handleSelectEvent = (e, event) => {
    setSelectedEvent(e);
    // Lấy giá trị vị trí của click chuột
    const { pageX, pageY } = event;
    // Tính toán vị trí của Modal
    const modalWidth = 300; // Chiều rộng của Modal
    const modalHeight = 200; // Chiều cao của Modal
    const offsetX = modalWidth / 2;
    const offsetY = modalHeight / 2;
    const x = pageX - offsetX;
    const y = pageY - offsetY;

    // Cập nhật vị trí của Modal
    setModalPosition({ top: y, left: x });
    setIsModalOpen(true);
  };

  // Xử lý sự kiện khi click vào slot (ngày) trống trong calendar
  const handleSelectSlot = ({ start, end }) => {
    // Thực hiện xử lý logic khi click vào ngày trống
    setSelectedEvent(null); // Reset selectedEvent về null
  };

  function doiGiaySangGioPhutGiay(giay) {
    giay = giay / 1000;
    // Tính số giờ
    var gio = Math.floor(giay / 3600);

    // Tính số phút
    var phut = Math.floor((giay % 3600) / 60);

    // Tính số giây
    var giayConLai = giay % 60;

    // Trả về giá trị kết quả dưới dạng chuỗi
    return gio.toString().padStart(2, '0') + ' giờ ' +
      phut.toString().padStart(2, '0') + ' phút ' +
      giayConLai.toString().padStart(2, '0') + ' giây';
  }
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, width: 1000 }}
        selectable={true} // Cho phép chọn slot (ngày) trống
        onSelectEvent={handleSelectEvent} // Sự kiện khi click vào sự kiện
        onSelectSlot={handleSelectSlot} // Sự kiện khi click vào slot (ngày) trống

      />
      {selectedEvent &&
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

      }
    </div>
  );
};

export default MyCalendar;
