const SECRET_KEY = "DemoKey123";

// XOR cipher - reversible encryption for transmission
function xorCipher(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return result;
}

export function encryptForTransmission(text) {
  const encrypted = xorCipher(text, SECRET_KEY);
  return btoa(encrypted);
}

export function decryptFromTransmission(encryptedText) {
  try {
    const encrypted = atob(encryptedText);
    return xorCipher(encrypted, SECRET_KEY);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}

// SHA-256 hashing - irreversible for password storage
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function validatePassword(inputPassword, storedHash) {
  const inputHash = await hashPassword(inputPassword);
  return inputHash === storedHash;
}

export function simpleHash(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}
