import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="page-container">
      <div className="content-box">
        <h1>React Router Login Demo</h1>

        <div className="info-section">
          <h2>Features</h2>
          <ul>
            <li>React Router DOM v6</li>
            <li>Protected routes</li>
            <li>Authentication flow</li>
            <li>XOR encryption for transmission</li>
            <li>SHA-256 hashing for storage</li>
          </ul>
        </div>

        {isAuthenticated ? (
          <div className="user-status">
            <p className="welcome-message">
              Hello, <strong>{user.username}</strong>! You're logged in.
            </p>
            <div className="button-group">
              <Link to="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="user-status">
            <p>You are not logged in.</p>
            <div className="button-group">
              <Link to="/login" className="btn-primary">
                Login / Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
