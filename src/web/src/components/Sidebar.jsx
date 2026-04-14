import React from 'react';
import './Sidebar.css';
import { Icon } from '@iconify/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import logoCompleta from '../assets/logo_sidebar.png';
import logoPequena from '../assets/logo_maya.png';
import fotoPerfil from '../assets/Maya.png';

const navItems = [
  { to: '/',         icon: 'solar:widget-5-bold-duotone',          label: 'Dashboard' },
  { to: '/agenda',   icon: 'solar:calendar-bold-duotone',           label: 'Agenda' },
  { to: '/prontuario', icon: 'solar:document-medicine-bold-duotone', label: 'Prontuário' },
  { to: '/clinica',  icon: 'solar:health-bold-duotone',             label: 'Clínica' },
  { to: '/conteudo', icon: 'solar:bone-crack-bold-duotone',         label: 'Conteúdo' },
];

const supportItems = [
  { to: '/ajuda',          icon: 'solar:question-circle-bold-duotone', label: 'Ajuda' },
  { to: '/reportar',       icon: 'solar:flag-bold-duotone',            label: 'Reportar' },
  { to: '/configuracoes',  icon: 'solar:settings-bold-duotone',        label: 'Configurações' },
];

const BarraLateral = ({ isCollapsed, setIsCollapsed }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <aside className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-area">
          {isCollapsed
            ? <img src={logoPequena} alt="Maya" className="logo-mini" />
            : <img src={logoCompleta} alt="Maya RPG" className="logo-full" />}
        </div>
        <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          <Icon icon="solar:sidebar-minimalistic-outline" width="24" height="24" />
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="secao-menu">
          {!isCollapsed && <p className="label-menu">Gestão</p>}
          <ul>
            {navItems.map(({ to, icon, label }) => (
              <NavLink key={to} to={to} end={to === '/'} style={{ textDecoration: 'none' }}>
                {({ isActive }) => (
                  <li className={isActive ? 'active' : ''}>
                    <Icon icon={icon} width="24" height="24" />
                    {!isCollapsed && <span>{label}</span>}
                  </li>
                )}
              </NavLink>
            ))}
          </ul>
        </div>

        <div className="secao-menu">
          {!isCollapsed && <p className="label-menu">Suporte</p>}
          <ul>
            {supportItems.map(({ to, icon, label }) => (
              <NavLink key={to} to={to} style={{ textDecoration: 'none' }}>
                {({ isActive }) => (
                  <li className={isActive ? 'active' : ''}>
                    <Icon icon={icon} width="24" height="24" />
                    {!isCollapsed && <span>{label}</span>}
                  </li>
                )}
              </NavLink>
            ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="card-perfil" onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <img src={fotoPerfil} alt="Maya" className="foto-perfil" />
          {!isCollapsed && (
            <div className="info-perfil">
              <p className="nome-perfil">Maya Yamamoto</p>
              <p style={{ fontSize: '11px', color: '#999' }}>Sair</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default BarraLateral;