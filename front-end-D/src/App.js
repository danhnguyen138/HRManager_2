
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import { ContextProvider } from "./context/ContextProvider";

import LoginPage from "./pages/auth/Login";
import AdminPage from './pages/adminPage/index';
import UserPage from './pages/userPage/index';
function App() {
  const isAuth = useSelector((state) => state.token);
  const isAdmin= useSelector((state)=>{
    if (state.user){
      return state.user.isAdmin
    }else{
      return false;
    }
  })
  
  const isUser= useSelector((state)=>{
    if (state.user){
      return !(state.user.isAdmin)
    }else{
      return false;
    }
  })
  //isAuth ? isAdmin ? <AdminPage/> : <UserPage/> : 
  return (
    <div className='app'>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/admin/*" element={isAuth&& isAdmin ? <AdminPage /> : <Navigate to="/" />} /> 
            <Route path="/user/*" element={isAuth&& isUser ? <UserPage /> : <Navigate to="/" />} /> 
            {/* isAuth && isAdmin ? <AdminPage /> : <LoginPage /> */}
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
