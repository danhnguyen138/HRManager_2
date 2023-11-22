import React, { useContext, useState, createContext } from "react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const StateContext = createContext();
const initialState = {
    char: false,
    cart: false,
    useProfile: false,
    notification: false
}

export const ContextProvider = ({ children }) => {
    const [screenSize, setScreenSize] = useState(screen.width);
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [isLogin, setIsLogin] = useState(false);
    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value)
    }
    const setColor = (color) => {
        setCurrentColor(color)
        localStorage.setItem('colorMode', color);
    }
    const handleClick = (clicked) => {
        return setIsClicked({ ...initialState, [clicked]: true })
    }
    const showNotification = (type, message) => {
        switch (type) {
            case 'success':
                NotificationManager.success('Thành công', message);
                break;
            case 'error':
                NotificationManager.error('Thất bại', message);
                break;
            case 'warning':
                NotificationManager.warning(message);
                break;
            case 'info':
                NotificationManager.info(message);
                break;
            default:
                break;
        }
    };
    return (
        <StateContext.Provider value={{ isLogin, setIsLogin, currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings, showNotification }}>
            <NotificationContainer />
            {children}
        </StateContext.Provider>
    );

}
export const useStateContext = () => useContext(StateContext);