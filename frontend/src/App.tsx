import React, { useState } from 'react';
import Header from './components/Header';
import ResourcesPage from './pages/ResourcesPage';
import SessionsPage from './pages/SessionsPage';
import BillingPage from './pages/BillingPage';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('resources');

  const renderPage = () => {
    switch (activeTab) {
      case 'sessions':
        return <SessionsPage />;
      case 'billing':
        return <BillingPage />;
      default:
        return <ResourcesPage />;
    }
  };

  return (
    <div className="app">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">
        {renderPage()}
      </main>
      <footer className="footer">
        <p>&copy; 2024 Usage & Billing System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
