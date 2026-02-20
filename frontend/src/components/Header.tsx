import React from 'react';
import './Header.css';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">Usage & Billing System</h1>
        <nav className="nav">
          <button
            className={`nav-button ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => onTabChange('resources')}
          >
            Resources
          </button>
          <button
            className={`nav-button ${activeTab === 'sessions' ? 'active' : ''}`}
            onClick={() => onTabChange('sessions')}
          >
            Usage Sessions
          </button>
          <button
            className={`nav-button ${activeTab === 'billing' ? 'active' : ''}`}
            onClick={() => onTabChange('billing')}
          >
            Billing
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
