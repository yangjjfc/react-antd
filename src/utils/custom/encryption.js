/**
 * 加密处理
 */
import CryptoJS from '@/assets/js/aes/aes-min.min.js';
import SHA256 from '@/assets/js/sha256/sha256.min.js';

/**
 * 密码加密处理
 */
const encryption = (password, clientid, token) => {
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(SHA256(password)), CryptoJS.enc.Utf8.parse(clientid), {
        iv: CryptoJS.enc.Utf8.parse(token),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Iso10126
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
};

export default encryption;