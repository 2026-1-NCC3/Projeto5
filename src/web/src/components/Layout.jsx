import React, { useState } from 'react';
import BarraLateral from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar fixa */}
      <BarraLateral isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      {/* Área de conteúdo que permite scroll na página toda */}
      <main style={{ 
        flex: 1, 
        marginLeft: isCollapsed ? '140px' : '320px', 
        padding: '40px',
        transition: 'margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: '100vh'
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;