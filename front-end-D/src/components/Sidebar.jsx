import React,{ useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { useSelector } from "react-redux";
import { links_admin, links_user,links_user_tp } from '../data/dummy';
import { useStateContext } from "../context/ContextProvider";
function Sidebar() {
    const ChucVu= useSelector((state)=>{
        if (state.chucvu){   
         return state.chucvu;          
       }else{
         return false;
       }
     })
    
    const isAdmin= useSelector((state)=>{
         if (state.user){            
          return state.user.isAdmin;          
        }else{
          return false;
        }
      })
    const links= isAdmin? links_admin:links_user_tp;  
    const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

    //Xu ly khi Link vao trang chu
    const handleCloseSidebar = () => {
        if (screenSize <= 900) {
            setActiveMenu(false)
        }
    }   

    const activeLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
    const normalLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700" +
        "dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";
    return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            {activeMenu && (
                <>
                    <div className="flex justify-between items-center">
                        <Link to="/admin/company" onClick={handleCloseSidebar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
                            <SiShopware />
                            <span>Dashboard</span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setActiveMenu(!activeMenu)}
                            style={{ color: currentColor }}
                            className="text-xl rounded-full p-3 mt-4 overflow-hidden block md:hidden"
                        >
                            <MdOutlineCancel />
                        </button>
                    </div>
                    <div className="mt-10">
                        {                      
                        links.map((item) => {
                            return (
                                <div key={item.title}>
                                    <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                                        {item.title}
                                    </p>
                                    {item.links.map((link) => {
                                        
                                        return (
                                            <NavLink
                                                key={link.name}
                                                to={link.to}
                                                onClick={handleCloseSidebar}
                                                style={({ isActive }) => ({
                                                    backgroundColor: isActive ? currentColor : '',
                                                })}
                                                className={({ isActive }) => (isActive ? activeLink : normalLink)}

                                            >
                                                {link.icon}
                                                <span className="capitalize">{link.name}</span>
                                            </NavLink>
                                        )
                                    })}
                                </div>

                            )

                        })}
                    </div>
                </>
            )}

        </div>
    );
}

export default Sidebar;