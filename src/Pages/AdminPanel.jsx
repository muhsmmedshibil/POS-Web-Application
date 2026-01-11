import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Filler, Legend
} from 'chart.js';
import { 
  House, ChartLine, Wallet, Users, Settings, Search, 
  CalendarCheck, Bell, DollarSign, UserPlus, ShoppingCart, 
  MoreVertical, Menu, X 
} from 'lucide-react';
import './AdminPanel.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('Month');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const chartDataValues = [40, 35, 55, 45, 70, 65, 85, 75, 95, 100];
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [{
      fill: true,
      label: 'Revenue',
      data: chartDataValues,
      borderColor: '#4318FF',
      tension: 0.4,
      backgroundColor: 'rgba(67, 24, 255, 0.1)',
    }],
  };

  return (
    <div className="dashboard-container">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* SIDEBAR */}
      <aside className={`adSidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">GEMINI PRO</div>
          <X className="close-menu" onClick={() => setSidebarOpen(false)} />
        </div>
        <nav className="nav-menu">
          <NavItem icon={<House size={20} />} label="Dashboard" active />
          <NavItem icon={<ChartLine size={20} />} label="Analytics" />
          <NavItem icon={<Wallet size={20} />} label="My Wallet" />
          <NavItem icon={<Users size={20} />} label="Clients" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="top-navbar">
          <div className="left-nav">
            <Menu className="mobile-menu-btn" onClick={() => setSidebarOpen(true)} />
            <div className="nav-search">
              <Search size={18} color="#A3AED0" />
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          <div className="nav-actions">
            <Bell className="action-icon" size={20} />
            <img src="https://i.pravatar.cc/150?u=thomas" alt="user" className="avatar" />
          </div>
        </header>

        <section className="stats-row">
          <StatCard icon={<DollarSign />} label="Revenue" value="$4,350" />
          <StatCard icon={<UserPlus />} label="Clients" value="583" color="secondary" />
          <StatCard icon={<ShoppingCart />} label="Sales" value="1,289" color="orange" />
        </section>

        <div className="content-grid">
          <section className="card chart-section">
            <div className="chart-header">
              <h3 className="card-title">Analytics</h3>
              <div className="btn-group">
                {['Day', 'Week', 'Month'].map(tab => (
                  <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>
                ))}
              </div>
            </div>
            <div className="chart-wrapper">
              <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </section>

          <section className="card chat-section">
             <h3 className="card-title">Recent Chats</h3>
             <div className="chat-container">
                <ChatMember name="Adela" msg="Design finalized!" time="1:30 PM" img="1" />
                <ChatMember name="Christian" msg="Report sent." time="11:20 AM" img="2" />
             </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// Sub-components stay the same as previous response...
const NavItem = ({ icon, label, active }) => (
  <div className={`nav-item ${active ? 'active' : ''}`}>
    {icon} <span>{label}</span>
  </div>
);

const StatCard = ({ icon, label, value, color }) => (
  <div className="card stat-card">
    <div className={`stat-icon ${color}`}>{icon}</div>
    <div className="stat-info"><p>{label}</p><h2>{value}</h2></div>
  </div>
);

const ChatMember = ({ name, msg, time, img }) => (
  <div className="chat-item">
    <img src={`https://i.pravatar.cc/150?u=${img}`} alt={name} />
    <div className="chat-info"><h4>{name}</h4><p>{msg}</p></div>
    <span className="chat-time">{time}</span>
  </div>
);

export default AdminPanel;