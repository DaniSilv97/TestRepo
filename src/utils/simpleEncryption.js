/**
 * IMPORTANT: THIS IS INTENTIONALLY INSECURE!
 * This is a demonstration-only "encryption" mechanism.
 * NEVER use this in production or for real security purposes.
 *
 * This demonstrates two concepts:
 * 1. REVERSIBLE encryption (XOR) - for simulating encrypted transmission (E2EE)
 * 2. IRREVERSIBLE hashing (SHA-256-like) - for password storage
 */

const SECRET_KEY = "DemoKey123"; // Hardcoded key - INSECURE!

// ============================================================================
// REVERSIBLE ENCRYPTION (for transmission/E2EE simulation)
// ============================================================================

/**
 * Simple XOR cipher for demonstration purposes
 * Used to simulate encrypted transmission between client and server
 * @param {string} text - Text to encrypt/decrypt
 * @param {string} key - Encryption key
 * @returns {string} - Encrypted/decrypted text
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
 * "Encrypt" data for transmission (demonstration only)
 * This simulates encrypting data before sending it (like TLS/HTTPS)
 * @param {string} text - Plain text to encrypt
 * @returns {string} - Base64 encoded "encrypted" text
 */
export function encryptForTransmission(text) {
  const encrypted = xorCipher(text, SECRET_KEY);
  // Convert to base64 for transmission
  return btoa(encrypted);
}

/**
 * "Decrypt" received data (demonstration only)
 * This simulates decrypting received data
 * @param {string} encryptedText - Base64 encoded encrypted text
 * @returns {string} - Plain text
 */
export function decryptFromTransmission(encryptedText) {
  try {
    const encrypted = atob(encryptedText);
    // XOR is symmetric, so we use the same function to decrypt
    return xorCipher(encrypted, SECRET_KEY);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}

// ============================================================================
// IRREVERSIBLE HASHING (for password storage)
// ============================================================================

/**
 * Simple SHA-256-like hash for demonstration (still not production-ready!)
 * This is IRREVERSIBLE - you cannot get the original password back
 * Simulates proper password hashing (like bcrypt, Argon2, etc.)
 *
 * In production, use: bcrypt, Argon2, scrypt, or PBKDF2
 * @param {string} text - Text to hash
 * @returns {Promise<string>} - Irreversible hash
 */
export async function hashPassword(password) {
  // Use Web Crypto API for a proper one-way hash
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Validate password against stored hash
 * This is the CORRECT way to validate passwords - by comparing hashes
 * The original password is never stored or retrieved
 * @param {string} inputPassword - User input password
 * @param {string} storedHash - Stored password hash
 * @returns {Promise<boolean>} - Whether passwords match
 */
export async function validatePassword(inputPassword, storedHash) {
  // Hash the input password
  const inputHash = await hashPassword(inputPassword);

  // Compare hashes (not passwords!)
  return inputHash === storedHash;
}

/**
 * Simple fallback hash for demonstration (NOT secure, but fast)
 * Use this for non-password data or demos where speed matters
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
