import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  username: string | null;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Threads Dashboard</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/influencers">Influencers</Link></li>
          <li><Link to="/analytics">Analytics</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
      <div className="user-menu">
        {username ? (
          <span>{username}</span>
        ) : (
          <span>로그인이 필요합니다</span>
        )}
      </div>
    </header>
  );
};

export default Header;