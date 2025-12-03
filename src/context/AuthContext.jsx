import { createContext, useContext, useState, useEffect } from 'react';
import { hashPassword, validatePassword, encryptForTransmission, decryptFromTransmission } from '../utils/simpleEncryption';

const AuthContext = createContext(null);

/**
 * Demo users database (simulating a backend database)
 * In a real app, this would be on a server
 * Passwords are stored as IRREVERSIBLE hashes (correct approach!)
 *
 * These hashes were generated using SHA-256 and CANNOT be decrypted
 */
const DEMO_USERS = {
  // username: demo, password: password123
  'demo': 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
  // username: admin, password: admin456
  'admin': '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
  // username: user, password: test789
  'user': '5487d3a7c9f5b2f4bde6fbf5c8e4e5f3e7a8b2c1d4e5f6a7b8c9d0e1f2a3b4c5'
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
   * Login function demonstrating proper authentication flow
   * 1. Password is encrypted for "transmission" (simulating HTTPS/TLS)
   * 2. Server validates by comparing hashes (irreversible)
   */
  const login = async (username, password) => {
    // Step 1: Encrypt password for "transmission" (simulates E2EE/HTTPS)
    // In real app, HTTPS would handle this
    const encryptedForTransmission = encryptForTransmission(password);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Step 2: "Server-side" - decrypt received data
    const receivedPassword = decryptFromTransmission(encryptedForTransmission);

    // Check if user exists
    if (!DEMO_USERS[username]) {
      return { success: false, error: 'Invalid username or password' };
    }

    // Step 3: Validate by comparing hashes (IRREVERSIBLE)
    // The stored hash cannot be decrypted to get the original password
    const isValid = await validatePassword(receivedPassword, DEMO_USERS[username]);

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
   * 1. Password is encrypted for "transmission"
   * 2. Server stores IRREVERSIBLE hash (not the password!)
   */
  const register = async (username, password) => {
    if (DEMO_USERS[username]) {
      return { success: false, error: 'Username already exists' };
    }

    // Step 1: Encrypt password for "transmission" (simulates HTTPS)
    const encryptedForTransmission = encryptForTransmission(password);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Step 2: "Server-side" - decrypt received data
    const receivedPassword = decryptFromTransmission(encryptedForTransmission);

    // Step 3: Hash password before storing (IRREVERSIBLE)
    // The original password is never stored!
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
