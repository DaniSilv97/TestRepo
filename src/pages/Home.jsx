import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="page-container">
      <div className="content-box">
        <h1>Welcome to React Router Login Demo</h1>

        <div className="info-section">
          <h2>About This Application</h2>
          <p>
            This is a demonstration React.js application showcasing:
          </p>
          <ul>
            <li>React Router DOM v6 for navigation</li>
            <li>Protected routes and authentication flow</li>
            <li>Custom simple "encryption" mechanism (educational only)</li>
            <li>Simulated End-to-End Encryption (E2EE) concept</li>
          </ul>
        </div>

        <div className="warning-box">
          <strong>⚠️ SECURITY WARNING</strong>
          <p>
            This application uses an intentionally simplified and INSECURE
            "encryption" mechanism for demonstration purposes only.
          </p>
          <p>
            <strong>NEVER use this code in production!</strong> Real applications
            should use proper security libraries, HTTPS, secure backend authentication,
            and industry-standard encryption methods.
          </p>
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
              <Link to="/dashboard" className="btn-secondary">
                Try Protected Route
              </Link>
            </div>
          </div>
        )}

        <div className="features-section">
          <h2>Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>React Router v6</h3>
              <p>Modern routing with protected routes and navigation</p>
            </div>
            <div className="feature-card">
              <h3>Auth Context</h3>
              <p>Centralized authentication state management</p>
            </div>
            <div className="feature-card">
              <h3>Demo "Encryption"</h3>
              <p>XOR-based cipher demonstrating E2EE concept</p>
            </div>
            <div className="feature-card">
              <h3>Local Storage</h3>
              <p>Persistent login sessions across page refreshes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
