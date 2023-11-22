import React from 'react';

const UserAvatar = ({avatar, name, chucvu, email}) => {
  return (
    <div>
      <>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">Thông tin của bạn</p>
       
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {name} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  {chucvu}   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {email} </p>
        </div>
      </div>
      </>
    </div>
  )
}

export default UserAvatar
