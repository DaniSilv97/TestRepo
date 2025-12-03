import { createContext, useContext, useState, useEffect } from 'react';
import { hashPassword, validatePassword, encryptForTransmission, decryptFromTransmission } from '../utils/simpleEncryption';

const AuthContext = createContext(null);

const DEMO_USERS = {
  'demo': 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
  'admin': '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
  'user': '5487d3a7c9f5b2f4bde6fbf5c8e4e5f3e7a8b2c1d4e5f6a7b8c9d0e1f2a3b4c5'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    const encryptedForTransmission = encryptForTransmission(password);
    await new Promise(resolve => setTimeout(resolve, 100));
    const receivedPassword = decryptFromTransmission(encryptedForTransmission);

    if (!DEMO_USERS[username]) {
      return { success: false, error: 'Invalid username or password' };
    }

    const isValid = await validatePassword(receivedPassword, DEMO_USERS[username]);

    if (isValid) {
      const userData = {
        username,
        loginTime: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = async (username, password) => {
    if (DEMO_USERS[username]) {
      return { success: false, error: 'Username already exists' };
    }

    const encryptedForTransmission = encryptForTransmission(password);
    await new Promise(resolve => setTimeout(resolve, 100));
    const receivedPassword = decryptFromTransmission(encryptedForTransmission);

    const passwordHash = await hashPassword(receivedPassword);
    DEMO_USERS[username] = passwordHash;

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
