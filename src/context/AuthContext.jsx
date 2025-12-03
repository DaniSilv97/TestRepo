import { createContext, useContext, useState, useEffect } from 'react';
import { hashPassword, validatePassword, encryptForTransmission, decryptFromTransmission } from '../utils/simpleEncryption';

const AuthContext = createContext(null);

const DEMO_USERS = {};
let usersInitialized = false;

function saveUsersToStorage() {
  localStorage.setItem('usersDatabase', JSON.stringify(DEMO_USERS));
}

function loadUsersFromStorage() {
  const stored = localStorage.getItem('usersDatabase');
  if (stored) {
    const parsed = JSON.parse(stored);
    Object.assign(DEMO_USERS, parsed);
    return true;
  }
  return false;
}

async function initializeDemoUsers() {
  if (usersInitialized) return;

  if (!loadUsersFromStorage()) {
    DEMO_USERS['demo'] = await hashPassword('password123');
    DEMO_USERS['admin'] = await hashPassword('admin456');
    DEMO_USERS['user'] = await hashPassword('test789');
    saveUsersToStorage();
  }

  usersInitialized = true;
}

export function getAllUsers() {
  return { ...DEMO_USERS };
}

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
    await initializeDemoUsers();

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
    await initializeDemoUsers();

    if (DEMO_USERS[username]) {
      return { success: false, error: 'Username already exists' };
    }

    const encryptedForTransmission = encryptForTransmission(password);
    await new Promise(resolve => setTimeout(resolve, 100));
    const receivedPassword = decryptFromTransmission(encryptedForTransmission);

    const passwordHash = await hashPassword(receivedPassword);
    DEMO_USERS[username] = passwordHash;
    saveUsersToStorage();

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
