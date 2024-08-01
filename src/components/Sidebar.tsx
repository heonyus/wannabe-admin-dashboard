import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/influencers">
              <i className="fas fa-users"></i> Influencers
            </Link>
          </li>
          <li>
            <Link to="/campaigns">
              <i className="fas fa-bullhorn"></i> Campaigns
            </Link>
          </li>
          <li>
            <Link to="/analytics">
              <i className="fas fa-chart-bar"></i> Analytics
            </Link>
          </li>
          <li>
            <Link to="/messages">
              <i className="fas fa-envelope"></i> Messages
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <i className="fas fa-cog"></i> Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;