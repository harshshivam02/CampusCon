import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom'; // This will render the matched route's component

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
      
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
