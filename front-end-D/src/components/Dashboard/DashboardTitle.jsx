
import React from 'react';
import { useStateContext } from '../../context/ContextProvider';
import { Link } from 'react-router-dom';
function DashboardTitle({ title, value, percent = "", updateTime, icon, color, to }) {

    const { currentColor, currentMode } = useStateContext();
    let colorPercent = "text-green-500";
    if (percent.includes("-")) {
        colorPercent = "text-red-500";
    }
    let colorBackground="bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/40";
    switch(color){
        case "blue":
            colorBackground="bg-gradient-to-tr from-blue-600 to-blue-400 shadow-blue-500/40";
            break;
        case "pink":
            colorBackground="bg-gradient-to-tr from-pink-600 to-pink-400 shadow-pink-500/40";
            break;
        case "yellow":
            colorBackground="bg-gradient-to-tr from-yellow-600 to-yellow-400 shadow-yellow-500/40";
            break;
        case "green":
            colorBackground="bg-gradient-to-tr from-green-600 to-green-400 shadow-green-500/40";
            break;
        default:
            break;
    }
    return (
        <div className="relative flex-flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className={`bg-clip-border mx-4 rounded-xl overflow-hidde text-white shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center ${colorBackground}`}>
                {icon && (<span className='w-6 h-6 text-white'>{icon}</span>)}
                {/* <icon className="w-6 h-6 text-white" /> */}

            </div>
            <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                    {title}
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                    {value}
                </h4>
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className={colorPercent}>{percent}</strong>
                    &nbsp;
                    {updateTime}
                </p>
            </div>
            <div className="border-t border-blue-gray-50">
                <div className="flex w-full justify-center p-4">
                    <Link
                        to={`/${to}`}
                        className={`px-3 py-2 text-sm rounded-xl overflow-hidden text-white  shadow-lg ${colorBackground}`} >
                        Xem chi tiết
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DashboardTitle;