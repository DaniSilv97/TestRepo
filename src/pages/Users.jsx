import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../context/AuthContext';

export default function Users() {
  const [users, setUsers] = useState({});
  const [jsonView, setJsonView] = useState('');

  useEffect(() => {
    const loadUsers = () => {
      const allUsers = getAllUsers();
      setUsers(allUsers);
      setJsonView(JSON.stringify(allUsers, null, 2));
    };

    loadUsers();
    const interval = setInterval(loadUsers, 1000);
    return () => clearInterval(interval);
  }, []);

  const downloadJSON = () => {
    const blob = new Blob([jsonView], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users-database.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonView);
    alert('JSON copied to clipboard!');
  };

  return (
    <div className="page-container">
      <div className="content-box">
        <h1>Users Database</h1>

        <div className="info-section">
          <p>All registered users with their SHA-256 password hashes:</p>
        </div>

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Password Hash (SHA-256)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(users).map(([username, hash]) => (
                <tr key={username}>
                  <td className="username-cell">{username}</td>
                  <td className="hash-cell">{hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="json-section">
          <h2>JSON Database</h2>
          <pre className="json-view">{jsonView}</pre>
          <div className="button-group">
            <button onClick={copyToClipboard} className="btn-secondary">
              Copy JSON
            </button>
            <button onClick={downloadJSON} className="btn-secondary">
              Download JSON
            </button>
          </div>
        </div>

        <div className="actions-section">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
