import CryptoJS from "crypto-js";
let key="Super";

const Encrypt=word=>{
    return CryptoJS.AES.encrypt(word,key).toString();
}

const Decrypt=word=>{
    return CryptoJS.AES.decrypt(word,key).toString(CryptoJS.enc.Utf8);
}

export {Encrypt,Decrypt};