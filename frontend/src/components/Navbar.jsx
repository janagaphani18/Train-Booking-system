import { Link, useNavigate } from 'react-router-dom';
import { Train } from 'lucide-react';
import { useAuthStore } from '../store';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Train size={28} className="logo-icon" />
          <span>AITrain</span>
        </Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/search">Search Trains</Link>
          {user && <Link to="/bookings">My Bookings</Link>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {user && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Hi, {user.name}</span>}
            <button className="btn-primary" onClick={handleAuthClick}>
              {user ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
