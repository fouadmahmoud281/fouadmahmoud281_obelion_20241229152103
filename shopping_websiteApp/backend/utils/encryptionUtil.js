const crypto = require('crypto');

// Function to encrypt payment data
const encryptData = (data) => {
  const algorithm = 'aes-256-cbc';
  const secretKey = process.env.ENCRYPTION_SECRET_KEY; // Ensure to set this key in your environment variables
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(data)), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex')
  };
};

// Function to decrypt payment data
const decryptData = (hash) => {
  const algorithm = 'aes-256-cbc';
  const secretKey = process.env.ENCRYPTION_SECRET_KEY; // Ensure to set this key in your environment variables
  const iv = Buffer.from(hash.iv, 'hex');
  const encryptedText = Buffer.from(hash.encryptedData, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);

  return JSON.parse(decrypted.toString());
};

module.exports = {
  encryptData,
  decryptData,
};
