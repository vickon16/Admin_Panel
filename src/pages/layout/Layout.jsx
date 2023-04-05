import React from 'react'
import { Outlet } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useMode } from '../../context/ModeContext';
import "./layout.scss";

const Layout = () => {
  const { mode } = useMode();
  const {userCredentials : {userData}} = useAuth();

  return (
    <div className={`app ${mode.darkMode && "dark"}`}>
      {
      userData === null ? (
        <Loader />
      ) : (
      <main>
        <Sidebar />
        <div className='container'>
          <Navbar />
          <Outlet />
        </div>
      </main>
      )
    }
    </div>
  )
}

export default Layout
