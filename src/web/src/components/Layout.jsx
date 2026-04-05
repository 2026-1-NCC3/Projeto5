import { Outlet } from 'react-router-dom';
import BarraLateral from './Sidebar';

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <BarraLateral />
      
      {/* O segredo está no marginLeft aqui embaixo */}
      <main style={{ 
        flex: 1, 
        marginLeft: '320px', // Abre espaço para a Sidebar que está fixa
        padding: '40px',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa' // Uma corzinha só para testar se o fundo aparece
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;