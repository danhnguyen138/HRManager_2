import {useState} from "react";
import Tippy from "@tippyjs/react/headless";
import { MdKeyboardArrowDown } from 'react-icons/md';


import { useSelector } from "react-redux";
import UserAvatar from "./UserAvatar";
import ButtonIconSetting from "./ButtonIconProfile";
import { useStateContext } from 'context/ContextProvider';
import avatar1 from "assets/avatar.svg";
import { userProfileData } from "data/dummy";
import { useDispatch } from "react-redux";
import { setLogout } from "state/auth";
import { useNavigate } from "react-router-dom";
const UserProfile = ({ avatar, userAccount }) => {

    const dispatch= useDispatch();
    const navigate= useNavigate();
    const {currentColor}= useStateContext();
    const handleLogout=()=>{
        dispatch(setLogout());
        navigate("/");
    }
    const handleChangePassword=()=>{       
        navigate("/user/changepassword");
    }

    const user= useSelector((state)=>{
        return state.user;
       
      })
    return (
        <Tippy
            placement='bottom'
            interactive={true}
           
            render={
                attrs => {

                  
                    return (
                        <div className="nav-item bg-white  p-4 rounded-lg w-96 shadow-xl border">
                            <UserAvatar avatar={avatar} name={user.HoTen} chucvu={user.ChucVu.TenChucVu} email={user.Email}/>
                            {/* <div>
                                {userProfileData.map((item,index)=>{
                                    return (
                                        <ButtonIconSetting key={index} icon={item.icon} iconColor={item.iconColor} iconBg={item.iconBg} title={item.title} desc={item.desc} />
                                    )
                                })}
                            </div> */}
                            <div className="mt-5">
                                <button 
                                    style={{color: "white", backgroundColor: currentColor, width: "100%", borderRadius:"10px"}}
                                    className="text-md p-3 w-full hover:drop-shadow-xl "
                                    onClick={handleLogout}
                                >
                                   Đăng xuất
                                </button>
                            </div>
                            {!user.isAdmin? (
                                <div className="mt-5">
                                <button 
                                    style={{color: "white", backgroundColor: currentColor, width: "100%", borderRadius:"10px"}}
                                    className="text-md p-3 w-full hover:drop-shadow-xl "
                                    onClick={handleChangePassword}
                                >
                                   Thay đổi mật khẩu
                                </button>
                            </div>
                            ): null}
                            
                        </div>
                    )
                }
            } >
            <div
                className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            
            >
                <img
                    className='rounded-full w-8 h-8'
                    src={avatar}
                    alt="user-profile"
                />
                <p>
                    <span className='text-gray-400 text-14' style={{ textDecoration: "none" }}>Chào,</span>
                    <span className="text-gray-400 font-bold ml-1 text-14">
                        {user.HoTen.split(" ").pop()}
                    </span>
                </p>
                <MdKeyboardArrowDown className='text-gray-400 text-14' />

            </div>
        </Tippy>
    );
}
export default UserProfile;