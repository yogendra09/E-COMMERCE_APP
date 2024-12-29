
const CryptoJS = require("crypto-js");

exports.encryptData = (data, key) => {
    if (data) {
      try {
        // Add expiration time (2 minutes from now) to the data
        const expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + 10000); // Expire after 2 minutes
        const dataWithExpiration = { data, expiration: expiration.getTime() };
  
        // Encrypt the data
        const encrypted = CryptoJS.AES.encrypt(
          JSON.stringify(dataWithExpiration),
          key
        ).toString();
  
        return encrypted;
      } catch (error) {
        console.error("Error encrypting data:", error);
        return null; // Or handle the error appropriately
      }
    } else {
      return null;
    }
  };
  
  //decrypt aes encrypted data.
  exports.decryptData = (encryptedData, key) => {
    if (encryptedData) {
      try {
        // Decrypt the data
        const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(
          CryptoJS.enc.Utf8
        );
  
        // Parse the decrypted data as JSON
        const decryptedData = JSON.parse(decrypted);
  
        // Check if the data has expired
        if (
          decryptedData.expiration &&
          new Date(decryptedData.expiration) < new Date()
        ) {
          return { valid: false, data: null }; // Data has expired
        }
  
        // Return the original data
        return { valid: true, data: decryptedData.data };
      } catch (error) {
        console.error("Error decrypting data:", error);
        return { valid: false, data: null }; // Or handle the error appropriately
      }
    } else {
      return { valid: false, data: null };
    }
  };