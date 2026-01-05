import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated } = useAuth();
  const from = location.state?.from?.pathname || '/dashboard';

  // Redirect authenticated users away from login page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    try {
      const result = isRegistering
        ? await register(username, password)
        : await login(username, password);

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Authentication error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (user, pass) => {
    setError('');
    setIsLoading(true);

    try {
      const result = await login(user, pass);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Authentication error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{isRegistering ? 'Register' : 'Login'}</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
          </button>
        </form>

        {!isRegistering && (
          <div className="quick-login">
            <p className="quick-login-label">Quick Login:</p>
            <div className="quick-login-buttons">
              <button
                onClick={() => handleQuickLogin('demo', 'password123')}
                className="btn-quick"
                disabled={isLoading}
              >
                Demo
              </button>
              <button
                onClick={() => handleQuickLogin('admin', 'admin456')}
                className="btn-quick"
                disabled={isLoading}
              >
                Admin
              </button>
              <button
                onClick={() => handleQuickLogin('user', 'test789')}
                className="btn-quick"
                disabled={isLoading}
              >
                User
              </button>
            </div>
          </div>
        )}

        <div className="toggle-mode">
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            className="btn-link"
          >
            {isRegistering
              ? 'Already have an account? Login'
              : 'Need an account? Register'}
          </button>
        </div>

        <div className="home-link">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
