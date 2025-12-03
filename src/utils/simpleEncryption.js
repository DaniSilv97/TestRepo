/**
 * IMPORTANT: THIS IS INTENTIONALLY INSECURE!
 * This is a demonstration-only "encryption" mechanism.
 * NEVER use this in production or for real security purposes.
 *
 * This simple XOR-based cipher is trivially breakable and is
 * only meant to demonstrate the concept of E2EE in a simplified way.
 */

const SECRET_KEY = "DemoKey123"; // Hardcoded key - INSECURE!

/**
 * Simple XOR cipher for demonstration purposes
 * @param {string} text - Text to encrypt/decrypt
 * @param {string} key - Encryption key
 * @returns {string} - Encrypted/decrypted text in base64
 */
function xorCipher(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    // XOR each character with the key (cycling through key)
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return result;
}

/**
 * "Encrypt" a password (demonstration only)
 * @param {string} password - Plain text password
 * @returns {string} - Base64 encoded "encrypted" password
 */
export function encryptPassword(password) {
  const encrypted = xorCipher(password, SECRET_KEY);
  // Convert to base64 for storage
  return btoa(encrypted);
}

/**
 * "Decrypt" a password (demonstration only)
 * @param {string} encryptedPassword - Base64 encoded encrypted password
 * @returns {string} - Plain text password
 */
export function decryptPassword(encryptedPassword) {
  try {
    const encrypted = atob(encryptedPassword);
    // XOR is symmetric, so we use the same function to decrypt
    return xorCipher(encrypted, SECRET_KEY);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}

/**
 * Simulate "secure" password validation with E2EE concept
 * In a real E2EE system, the server would never see the plain password
 * @param {string} inputPassword - User input password
 * @param {string} storedEncryptedPassword - Stored encrypted password
 * @returns {boolean} - Whether passwords match
 */
export function validatePassword(inputPassword, storedEncryptedPassword) {
  // "Encrypt" the input password
  const encryptedInput = encryptPassword(inputPassword);

  // Compare encrypted values (simulating E2EE validation)
  return encryptedInput === storedEncryptedPassword;
}

/**
 * Generate a simple hash for demonstration (NOT secure)
 * This simulates a client-side hash before "transmission"
 * @param {string} text - Text to hash
 * @returns {string} - Simple hash
 */
export function simpleHash(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
}
