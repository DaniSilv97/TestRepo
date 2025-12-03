import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  encryptForTransmission,
  decryptFromTransmission,
  hashPassword
} from '../utils/simpleEncryption';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [passwordHash, setPasswordHash] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const demoText = 'Hello, World!';
  const encryptedForTransmission = encryptForTransmission(demoText);
  const decryptedFromTransmission = decryptFromTransmission(encryptedForTransmission);

  const demoPassword = 'myPassword123';
  useEffect(() => {
    hashPassword(demoPassword).then(hash => setPasswordHash(hash));
  }, []);

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
          <h2>Encryption vs Hashing</h2>

          <h3 style={{ marginTop: '2rem', color: '#28a745' }}>
            Reversible Encryption (Transmission)
          </h3>
          <div className="demo-box">
            <div className="demo-row">
              <strong>Original:</strong>
              <code>{demoText}</code>
            </div>
            <div className="demo-row">
              <strong>Encrypted:</strong>
              <code className="encrypted">{encryptedForTransmission}</code>
            </div>
            <div className="demo-row">
              <strong>Decrypted:</strong>
              <code style={{ color: '#28a745' }}>{decryptedFromTransmission}</code>
            </div>
          </div>

          <h3 style={{ marginTop: '2rem', color: '#dc3545' }}>
            Irreversible Hashing (Storage)
          </h3>
          <div className="demo-box">
            <div className="demo-row">
              <strong>Original:</strong>
              <code>{demoPassword}</code>
            </div>
            <div className="demo-row">
              <strong>Hash:</strong>
              <code className="encrypted" style={{ fontSize: '0.75rem' }}>
                {passwordHash || 'Computing...'}
              </code>
            </div>
            <div className="demo-row">
              <strong>Reversible?</strong>
              <code style={{ color: '#dc3545', fontWeight: 'bold' }}>No</code>
            </div>
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
