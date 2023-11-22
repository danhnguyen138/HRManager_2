import React from 'react';

const ButtonNotification = ({
    message, desc
}) => {
  return (
    <div className="flex items-center leading-8 gap-5 border-b-1 border-color p-3">      
      <div>
        <p className='font-semibold'>{message}</p>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
    </div>
  )
}

export default ButtonNotification
