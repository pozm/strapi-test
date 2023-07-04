import crypto from "crypto"
let key = process.env.COOKIESECRET as string
let iv = process.env.IVSECRET as string

export function EncryptCookie(cookiev : string) {


    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(cookiev, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }
export function DecryptCookie(cookiev : string) {
    if (cookiev.trim() == "") {
        return "";
    }
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(cookiev, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
  }