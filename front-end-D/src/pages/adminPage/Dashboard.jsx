import React from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { FaDownload } from 'react-icons/fa';

import {
    BanknotesIcon,
    UserPlusIcon,
    UserIcon,
    ChartBarIcon,
} from "@heroicons/react/24/solid";

import { useStateContext } from '../../context/ContextProvider';

import {DashboardTitle,
        DashboardChart
} from '../../components/Dashboard'; 

const dataPercent = [
    {
      title: "Today's Money",
      value: "$53K",
      percent: "+55%",
      updateTime: " than last week",
      color: "blue",
      to: "dashboard",
      icon: <BanknotesIcon />
    },
    {
      title: "Today's Users",
      value: "2,300",
      percent: "+3%",
      updateTime: " than last month",
      color: "pink",
      to: "dashboard",
      icon:<UserPlusIcon />
    },
    {
      title: "Today's Money",
      value: "$53K",
      percent: "-55%",
      updateTime: " than yesterday",
      color: "green",
      to: "dashboard",
      icon:<UserIcon />
    },
    {
      title: "Today's Money",
      value: "$53K",
      percent: "+55%",
      updateTime: " than yesterday",
      color: "yellow",
      to: "dashboard",
      icon:<ChartBarIcon />
    },
  ]
function Dashboard() {

    return (
        <div className="mt-20 md:mt-8 mx-auto w-full md:w-[90%]">
            <div className='flex flex-wrap lg:flex-nowrap justify-between '>
                <div className='p-4 text-xl md:text-2xl font-bold'>
                    <h1>Trang Chủ</h1>
                </div>
                
            </div>

            <div className='mt-10 px-4 mb-12 grid gap-y-10 gap-x-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
                {dataPercent.map((item,i)=>{
                    return (
                        <DashboardTitle
                            title={item.title}
                            value={item.value} 
                            percent={item.percent}
                            updateTime={item.updateTime}
                            icon={item.icon} 
                            color={item.color}
                            to={item.to}
                            key={i} 
                        />
                    )
                })}
                
            </div>
            <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                <DashboardChart/>
                <DashboardChart/>
                <DashboardChart/>
            </div>

            
        </div>);
}

export default Dashboard;