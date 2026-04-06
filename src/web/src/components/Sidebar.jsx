import React from 'react';
import './Sidebar.css';
import { Icon } from '@iconify/react';

import logoCompleta from '../assets/logo_sidebar.png';
import logoPequena from '../assets/logo_maya.png'; 
import fotoPerfil from '../assets/Maya.png';

const BarraLateral = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <aside className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-area">
          {isCollapsed ? (
            <img src={logoPequena} alt="Maya" className="logo-mini" />
          ) : (
            <img src={logoCompleta} alt="Maya RPG" className="logo-full" />
          )}
        </div>
        
        <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          <Icon icon="solar:sidebar-minimalistic-outline" width="24" height="24" />
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="secao-menu">
          {!isCollapsed && <p className="label-menu">Gestão</p>}
          <ul>
            <li className="active">
              <Icon icon="solar:widget-5-bold-duotone" width="24" height="24" />
              {!isCollapsed && <span>Dashboard</span>}
            </li>
            <li><Icon icon="solar:calendar-bold-duotone" width="24" height="24" />{!isCollapsed && <span>Agenda</span>}</li>
            <li><Icon icon="solar:document-medicine-bold-duotone" width="24" height="24" />{!isCollapsed && <span>Prontuário</span>}</li>
            <li><Icon icon="solar:health-bold-duotone" width="24" height="24" />{!isCollapsed && <span>Clínica</span>}</li>
            <li><Icon icon="solar:bone-crack-bold-duotone" width="24" height="24" />{!isCollapsed && <span>Conteúdo</span>}</li>
          </ul>
        </div>

        <div className="secao-menu">
          {!isCollapsed && <p className="label-menu">Suporte</p>}
          <ul>
            <li><Icon icon="solar:question-circle-bold-duotone" width="24" height="24" />{!isCollapsed && <span>Ajuda</span>}</li>
            <li><Icon icon="solar:flag-bold-duotone" width="24" height="24" />{!isCollapsed && <span>Reportar</span>}</li>
            <li><Icon icon="solar:settings-bold-duotone" width="24" height="24" />{!isCollapsed && <span>Configurações</span>}</li>
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="card-perfil">
          <img src={fotoPerfil} alt="Maya" className="foto-perfil" />
          {!isCollapsed && (
            <div className="info-perfil">
              <p className="nome-perfil">Maya Yamamoto</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default BarraLateral;