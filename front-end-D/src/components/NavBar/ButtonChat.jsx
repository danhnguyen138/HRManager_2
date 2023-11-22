import React from 'react'

const ButtonChat = ({
    image, message, desc, time, dotColor
}) => {
    return (
        <div className="flex items-center gap-5 border-b-1 border-color p-3 leading-8 cursor-pointer">
            <div className='relative'>
                <img
                    className="rounded-full h-10 w-10"
                    src={image}
                    alt={message}
                />
                <span
                    style={{ background: dotColor }}
                    className="absolute inline-flex rounded-full h-2 w-2 right-0 -top-1"
                />
            </div>
            <div>
                <p className="font-semibold">{message}</p>
                <p className='text-gray-500 text-sm'>{desc}</p>
                <p className='text-gray-500 text-xs'>{time}</p>
            </div>


        </div>
    )
}

export default ButtonChat;

