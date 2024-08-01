import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Threads Dashboard</Link>
      </div>
      <nav>
        <ul>
          {/* <li><Link to="/">Home</Link></li> */}
          {/* <li><Link to="/influencers">Influencers</Link></li>
          <li><Link to="/analytics">Analytics</Link></li>
          <li><Link to="/settings">Settings</Link></li> */}
        </ul>
      </nav>
      <div className="user-menu">
        <img src="/avatar.png" alt="User Avatar" className="avatar" />
        <span>John Doe</span>
      </div>
    </header>
  );
};

export default Header;