import React from 'react';
import './Sidebar.css';
import { Icon } from '@iconify/react';

// Importando Imagens
import logoMaya from '../assets/logo_sidebar';
import fotoPerfil from '../assets/perfil-maya.jpg';

const BarraLateral = () => {
  return (
    // 'aside' é a tag para barras laterais
    <aside className="sidebar-container">
      
      {/* Área do Logotipo */}
      <div className="sidebar-logo">
        {/* Aplicando variável */}
        <img src={logoMaya} alt="Maya RPG" />
      </div>

    {/* Navegação principal */}
      <nav className="sidebar-nav">
        
        {/* Seção de Gestão */}
        <div className="secao-menu">
          <p className="label-menu">Gestão</p>
          <ul>
            {/* 'active' destaca o item atual no CSS */}
            <li className="active">
              <Icon icon="solar:widget-5-bold-duotone" width="24" height="24" />
              <span>Dashboard</span>
            </li>
            <li>
              <Icon icon="solar:calendar-bold-duotone" width="24" height="24" />
              <span>Agenda</span>
            </li>
            <li>
              <Icon icon="solar:document-medicine-bold-duotone" width="24" height="24" />
              <span>Prontuário</span>
            </li>
            <li>
              <Icon icon="solar:health-bold-duotone" width="24" height="24" />
              <span>Clínica</span>
            </li>
            <li>
              <Icon icon="solar:bone-crack-bold-duotone" width="24" height="24" />
              <span>Conteúdo</span>
            </li>
          </ul>
        </div>

        {/* Seção de Suporte */}
        <div className="secao-menu">
          <p className="label-menu">Suporte</p>
          <ul>
            <li>
              <Icon icon="solar:question-circle-bold-duotone" width="24" height="24" />
              <span>Ajuda</span>
            </li>
            <li>
              <Icon icon="solar:flag-bold-duotone" width="24" height="24" />
              <span>Reportar</span>
            </li>
            <li>
              <Icon icon="solar:settings-bold-duotone" width="24" height="24" />
              <span>Configurações</span>
            </li>
          </ul>
        </div>
      </nav>

      {/* Rodapé: Perfil da Maya */}
      <div className="sidebar-footer">
        <div className="card-perfil">
          {/* Foto redonda vinda de 'assets' */}
          <img src={fotoPerfil} alt="Foto de Maya" className="foto-perfil" />
          <div className="info-perfil">
            <p className="nome-perfil">Maya Yamamoto</p>
          </div>
          {/* Ícone de opções (três pontinhos) */}
          <Icon icon="solar:menu-dots-bold-duotune" width="20" height="20" color="#999" />
        </div>
      </div>

    </aside>
  );
};

export default BarraLateral;