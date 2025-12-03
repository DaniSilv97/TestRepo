import { createContext, useContext, useState, useEffect } from 'react';
import { encryptPassword, validatePassword } from '../utils/simpleEncryption';

const AuthContext = createContext(null);

/**
 * Demo users database (simulating a backend)
 * In a real app, this would be on a server
 * Passwords are "encrypted" using our demo encryption
 */
const DEMO_USERS = {
  'demo': encryptPassword('password123'), // username: demo, password: password123
  'admin': encryptPassword('admin456'),   // username: admin, password: admin456
  'user': encryptPassword('test789')      // username: user, password: test789
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  /**
   * Login function using our custom "encryption" for validation
   * Simulates E2EE: password is encrypted client-side before validation
   */
  const login = (username, password) => {
    // Check if user exists
    if (!DEMO_USERS[username]) {
      return { success: false, error: 'Invalid username or password' };
    }

    // Validate password using "encrypted" comparison
    // This simulates E2EE where plain password never leaves the client
    const isValid = validatePassword(password, DEMO_USERS[username]);

    if (isValid) {
      const userData = {
        username,
        loginTime: new Date().toISOString()
      };
      setUser(userData);
      // Store in localStorage (in real app, use secure session management)
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: 'Invalid username or password' };
  };

  /**
   * Logout function
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  /**
   * Register a new user (demonstration)
   * In a real app, this would communicate with a backend
   */
  const register = (username, password) => {
    if (DEMO_USERS[username]) {
      return { success: false, error: 'Username already exists' };
    }

    // "Encrypt" the password before "storing"
    DEMO_USERS[username] = encryptPassword(password);

    const userData = {
      username,
      loginTime: new Date().toISOString()
    };
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));

    return { success: true };
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    register,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use the auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
