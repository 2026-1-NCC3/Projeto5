import React from 'react';
import { Outlet } from 'react-router-dom';
import BarraLateral from './Sidebar';

const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* A Sidebar fica aqui, fixa para todas as páginas internas */}
      <BarraLateral />
      
      {/* O conteúdo da página (Dashboard, Pacientes, etc) renderiza no Outlet */}
      <main style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;