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

  // Demo 1: Reversible encryption (for transmission)
  const demoText = 'Hello, World!';
  const encryptedForTransmission = encryptForTransmission(demoText);
  const decryptedFromTransmission = decryptFromTransmission(encryptedForTransmission);

  // Demo 2: Irreversible hashing (for storage)
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
          <h2>🔐 Encryption vs Hashing Demo</h2>
          <p>This app demonstrates TWO different cryptographic concepts:</p>

          <h3 style={{ marginTop: '2rem', color: '#28a745' }}>
            1. REVERSIBLE Encryption (For Transmission)
          </h3>
          <div className="demo-box">
            <div className="demo-row">
              <strong>Original Message:</strong>
              <code>{demoText}</code>
            </div>
            <div className="demo-row">
              <strong>Encrypted for Transmission:</strong>
              <code className="encrypted">{encryptedForTransmission}</code>
            </div>
            <div className="demo-row">
              <strong>Decrypted on Server:</strong>
              <code style={{ color: '#28a745' }}>{decryptedFromTransmission}</code>
            </div>
          </div>
          <div className="info-box" style={{ background: '#d4edda', borderColor: '#28a745' }}>
            <p>
              <strong>✓ Reversible (XOR Cipher):</strong> Used to encrypt data during transmission
              between client and server (simulating HTTPS/TLS). The server can decrypt it to read
              the original message. This is necessary for communication!
            </p>
          </div>

          <h3 style={{ marginTop: '2rem', color: '#dc3545' }}>
            2. IRREVERSIBLE Hashing (For Storage)
          </h3>
          <div className="demo-box">
            <div className="demo-row">
              <strong>Original Password:</strong>
              <code>{demoPassword}</code>
            </div>
            <div className="demo-row">
              <strong>Stored Hash (SHA-256):</strong>
              <code className="encrypted" style={{ fontSize: '0.75rem' }}>
                {passwordHash || 'Computing...'}
              </code>
            </div>
            <div className="demo-row">
              <strong>Can we decrypt it back?</strong>
              <code style={{ color: '#dc3545', fontWeight: 'bold' }}>
                ❌ NO! It's IMPOSSIBLE to reverse!
              </code>
            </div>
          </div>
          <div className="warning-box">
            <p>
              <strong>✓ Irreversible (SHA-256 Hash):</strong> Used to store passwords in the database.
              Even if someone steals the database, they CANNOT get the original passwords. Login
              validation works by comparing hashes, not passwords!
            </p>
          </div>

          <div className="info-box">
            <p>
              <strong>The Complete Flow:</strong>
            </p>
            <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>User enters password → Encrypted with XOR (transmission)</li>
              <li>Server receives → Decrypts to get password</li>
              <li>Server hashes password with SHA-256 → Stores hash</li>
              <li>Login: Hash input password → Compare hashes → Allow/Deny</li>
            </ol>
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
