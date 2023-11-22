import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { useStateContext } from 'context/ContextProvider';

import { chatData } from 'data/dummy';
import ButtonChat from './ButtonChat';

const Chat = ({ icon, color, numNotice = 0, dotColor }) => {
    const { currentColor } = useStateContext();
 
  
    return (
        <Tippy
            placement='bottom'
            interactive={true}

            render={
                attrs => {
                    return (
                        <div className='nav-item bg-white p-4 rounded-lg w-96 border shadow-lg'>
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-lg dark:text-gray-200">Message</p>

                            </div>
                            <div className='mt-5'>
                                {chatData.map((item, index) => {
                                    return (
                                        <ButtonChat
                                    
                                            key={index}
                                            image={item.image}
                                            message={item.message}
                                            desc={item.desc}
                                            dotColor={item.dotColor}
                                            time={item.time}
                                        />
                                    )
                                })}
                            </div>
                            <div className='mt-5'>
                                <button
                                    style={{ color: "white", backgroundColor: currentColor, width: "100%", borderRadius: "10px" }}
                                    className="text-md p-3 w-full hover:drop-shadow-xl "
                                    
                                >
                                    See All Notification
                                </button>
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
    )
}

export default Chat;
