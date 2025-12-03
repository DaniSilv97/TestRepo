import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { decryptPassword, encryptPassword } from '../utils/simpleEncryption';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Demo: Show encryption/decryption in action
  const demoText = 'Hello, World!';
  const encrypted = encryptPassword(demoText);
  const decrypted = decryptPassword(encrypted);

  return (
    <div className="page-container">
      <div className="content-box">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>

        <div className="info-section">
          <h2>Welcome, {user.username}!</h2>
          <p>This is a protected route. Only authenticated users can see this page.</p>
          <p className="text-muted">
            Login time: {new Date(user.loginTime).toLocaleString()}
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Username</h3>
            <p className="stat-value">{user.username}</p>
          </div>
          <div className="stat-card">
            <h3>Status</h3>
            <p className="stat-value">✓ Authenticated</p>
          </div>
          <div className="stat-card">
            <h3>Session</h3>
            <p className="stat-value">Active</p>
          </div>
        </div>

        <div className="demo-section">
          <h2>Encryption Demo</h2>
          <p>See the custom "encryption" mechanism in action:</p>

          <div className="demo-box">
            <div className="demo-row">
              <strong>Original Text:</strong>
              <code>{demoText}</code>
            </div>
            <div className="demo-row">
              <strong>"Encrypted" (Base64):</strong>
              <code className="encrypted">{encrypted}</code>
            </div>
            <div className="demo-row">
              <strong>"Decrypted" Text:</strong>
              <code>{decrypted}</code>
            </div>
          </div>

          <div className="info-box">
            <p>
              <strong>How it works:</strong> The application uses a simple XOR cipher
              with a hardcoded key. Each character is XOR'd with the key, then encoded
              in Base64 for storage. This is intentionally insecure and only demonstrates
              the concept of client-side encryption.
            </p>
          </div>
        </div>

        <div className="actions-section">
          <h2>Quick Actions</h2>
          <div className="button-group">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            <button onClick={handleLogout} className="btn-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
