import React, { useState } from 'react';
const moment = require('moment');
import "moment/locale/vi";
moment.locale('vi');
import { useSelector, useDispatch } from "react-redux";
import { useStateContext } from 'context/ContextProvider';
import { Header } from '../../components';
import { useNavigate } from "react-router-dom";
import { setLogout } from "state/auth";


export default function ChangePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { showNotification } = useStateContext();
    const user = useSelector(state => state.user);// Lay token kiem tra xac thuc
    const token = useSelector((state) => state.token);
    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const handleNewPassChange = ((event) => {
        setNewPassword(event.target.value);
    });
    const handleOldPassChange = ((event) => {
        setOldPassword(event.target.value);
    });
    const handleConfirmPassChange = ((event) => {
        setConfirmPassword(event.target.value);
    });
    const handleClick = async () => {
        if (newpassword === "" || confirmpassword === "") {
            setError("Mật khẩu không được để trống");
        }
        else if (newpassword === confirmpassword) {
            const email = user.Email;
            await fetch(`/api/user/changepassword/${email}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ newpassword,oldpassword }),
            }).then(async (res) => {
                const messageRes = await res.json();
                if (messageRes.error) {
                    showNotification('error', messageRes.error)
                } else {
                    showNotification('success', messageRes.msg);
                    dispatch(setLogout());
                    navigate("/");
                }

            });

        }
        else {
            setError("Hãy nhập 2 mật khẩu giống nhau")
        }
        setNewPassword('');
        setConfirmPassword('');
    }

    return (
        <div className="bg-white border shadow-sm m-2 z mt-24 p-2 md:p-10 rounded-3xl">
            <Header title="Đổi mật khẩu" />
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        {error && <label for="password" className="block mb-2 text-sm font-medium text-red-900 dark:text-white">{error}</label>}
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Đổi mật khẩu
                        </h2>
                        <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu cũ</label>
                                <input
                                    type="password" name="password" id="password"
                                    value={oldpassword}
                                    onChange={handleOldPassChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu mới</label>
                                <input
                                    type="password" name="password" id="password"
                                    value={newpassword}
                                    onChange={handleNewPassChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác thực mật khẩu</label>
                                <input type="password"
                                    value={confirmpassword}
                                    onChange={handleConfirmPassChange}
                                    name="confirm-password" id="confirm-password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <button
                                    onClick={handleClick}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Thay đổi mật khẩu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}
