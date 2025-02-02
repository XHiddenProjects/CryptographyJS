var Cryptography = {
flags: Object.freeze({
    UPPERCASE_LETTERS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    LOWERCASE_LETTERS: 'abcdefghijklmnopqrstuvwxyz',
    NUMBERS: '0123456789',
    SPACE: ' ',
    SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:\'",.<>?/~`',
    KEY_MODE_REPEAT: true
})
}

//Uses the Caesar Cipher algorithm
Cryptography.CaesarCipher = {
    chars: Cryptography.flags.UPPERCASE_LETTERS,
    /**
     * Update Caesar Ciphers
     * @param {{chars: string}} options Options to change
     * @returns {Cryptography.CaesarCipher}
     */
    settings: (options={chars:Cryptography.flags.UPPERCASE_LETTERS})=>{
        if(options.chars) Cryptography.CaesarCipher.chars = options.chars;
        return Cryptography.CaesarCipher;
    },
    /**
     * Encode string using Caesar Cipher
     * @param {String} str String to encode
     * @param {Number} key Number to shift
     * @returns {String} Encoded string
     */
    encode: (str,key)=>{
        if(!key) throw new TypeError('Key must have a value to encode');
        let cards = Cryptography.CaesarCipher.chars.split(''),
        splice = str.split('').map((i)=>{
            if(Cryptography.CaesarCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)&&Cryptography.CaesarCipher.chars.match(Cryptography.flags.UPPERCASE_LETTERS))
                return i;
            else if(Cryptography.CaesarCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)) 
                return i.toLowerCase();
            else return i.toUpperCase();
        }).filter(k=>{return !cards.includes(' ') ? k!==' ' : k;});
        const canSpace = cards.includes(' ') ? true : false;
        cards = cards.filter(i=>i!==' ');
        let encoded='';
        for(let i=0;i<splice.length;i++){
            if(!canSpace){
                if(cards[cards.indexOf(splice[i])+key]){
                    const index = cards.indexOf(splice[i])+key;
                    encoded+=cards[index];
                }else{
                    const index = (cards.indexOf(splice[i])+key)-cards.length;
                    encoded+=cards[index];
                }
            }else{
                if(splice[i]!==' '){
                    if(cards[cards.indexOf(splice[i])+key]){
                        const index = cards.indexOf(splice[i])+key;
                        encoded+=cards[index];
                    }else{
                        const index = (cards.indexOf(splice[i])+key)-cards.length;
                        encoded+=cards[index];
                    }
                }else encoded+=' ';
            }
            
        }
        return encoded;
    },
    /**
     * Decode string using Caesar Cipher
     * @param {String} str Encoded string
     * @param {Number|null} [key=null] Number of shifts. Leave null to brute force 
     * @returns 
     */
    decode: (str,key=null)=>{
        if(!key){
            let decoded={};
            let lastStr='',k=1;
            while(!lastStr.match('undefined')){
                decoded[k] = '';
                let cards = Cryptography.CaesarCipher.chars.split(''),
                splice = str.split('').map((i)=>{
                    if(Cryptography.CaesarCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)&&Cryptography.CaesarCipher.chars.match(Cryptography.flags.UPPERCASE_LETTERS))
                        return i;
                    else if(Cryptography.CaesarCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)) 
                        return i.toLowerCase();
                    else return i.toUpperCase();
                }).filter(k=>{return !cards.includes(' ') ? k!==' ' : k;});
                const canSpace = cards.includes(' ') ? true : false;
                cards = cards.filter(i=>i!==' ');
                for(let i=0;i<splice.length;i++){
                    if(!canSpace){
                        if(cards[cards.indexOf(splice[i])-k]){
                            const index = cards.indexOf(splice[i])-k;
                            decoded[k] +=cards[index];
                        }else{
                            const index = (cards.indexOf(splice[i])-k)+cards.length;
                            decoded[k] += cards[index];
                        }
                    }else{
                        if(splice[i]!==' '){
                            if(cards[cards.indexOf(splice[i])-k]){
                                const index = cards.indexOf(splice[i])-k;
                                decoded[k] +=cards[index];
                            }else{
                                const index = (cards.indexOf(splice[i])-k)+cards.length;
                                decoded[k] += cards[index];
                            }
                        }else decoded[k]+=' ';
                    }
                    
                }
                lastStr = decoded[k];
                k++;
            }
            decoded = Object.fromEntries(
                Object.entries(decoded).filter(([, value]) => !value.match('undefined') && !value.match(str))
            );
            return decoded;
        }else{
            let cards = Cryptography.CaesarCipher.chars.split(''),
            splice = str.split('').map((i)=>{
                if(!cards.includes(' ')) i.replaceAll(' ','');
                if(Cryptography.CaesarCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)&&Cryptography.CaesarCipher.chars.match(Cryptography.flags.UPPERCASE_LETTERS))
                    return i;
                else if(Cryptography.CaesarCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)) 
                    return i.toLowerCase();
                else return i.toUpperCase();
            }).filter(k=>{return !cards.includes(' ') ? k!==' ' : k;});
            let decoded='';
            const canSpace = cards.includes(' ') ? true : false;
            cards = cards.filter(i=>i!==' ');
            for(let i=0;i<splice.length;i++){
                if(!canSpace){
                    if(cards[cards.indexOf(splice[i])-key]){
                        const index = cards.indexOf(splice[i])-key;
                        decoded+=cards[index];
                    }else{
                        const index = (cards.indexOf(splice[i])-key)+cards.length;
                        decoded+=cards[index];
                    }
                }else{
                    if(splice[i]!==' '){
                        if(cards[cards.indexOf(splice[i])-key]){
                            const index = cards.indexOf(splice[i])-key;
                            decoded+=cards[index];
                        }else{
                            const index = (cards.indexOf(splice[i])-key)+cards.length;
                            decoded+=cards[index];
                        }
                    }else decoded+=' ';
                }
            }
        return decoded;
        }
    }
};
// Uses the Vigènere Cipher algorithm
Cryptography.VigenereCipher = {
    chars: Cryptography.flags.UPPERCASE_LETTERS,
    keyModeRepeat: false,
    /**
     * Update Caesar Ciphers
     * @param {{chars: string,repeatMode:boolean}} options Options to change
     * @returns {Cryptography.CaesarCipher}
     */
    settings: (options={chars:Cryptography.flags.UPPERCASE_LETTERS,repeatMode:false})=>{
        Cryptography.VigenereCipher.chars = options.chars??Cryptography.flags.UPPERCASE_LETTERS;
        Cryptography.VigenereCipher.keyModeRepeat = options.repeatMode??false;
        return Cryptography.VigenereCipher;
    },
    /**
     * Encode string using Caesar Cipher
     * @param {String} str String to encode
     * @param {String} key Number to shift
     * @returns {String} Encoded string
     */
    encode: (str,key)=>{
        if(!key) throw new TypeError('Key must have a value to encode');
        let cards = Cryptography.VigenereCipher.chars.split(''),
        splice = str.split('').map((i)=>{
            if(Cryptography.VigenereCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)&&Cryptography.VigenereCipher.chars.match(Cryptography.flags.UPPERCASE_LETTERS))
                return i;
            else if(Cryptography.VigenereCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)) 
                return i.toLowerCase();
            else return i.toUpperCase();
        }).filter(k=>{return !cards.includes(' ') ? k!==' ' : k;});
        key = key.split('').map((i)=>{
            if(Cryptography.VigenereCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)&&Cryptography.VigenereCipher.chars.match(Cryptography.flags.UPPERCASE_LETTERS))
                return i;
            else if(Cryptography.VigenereCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)) 
                return i.toLowerCase();
            else return i.toUpperCase();
        }).filter(k=>k!==' ');
        if(Cryptography.VigenereCipher.keyModeRepeat){
            if(splice.length>key.length){
                const temp = key.length;
                for(let i=key.length;i<=splice.length;i++){
                    key.push(key[i-temp]);
                }
            }else if(splice.length<key.length)
                key = key.slice(-key.length,splice.length); 
        }else{
            if(splice.length!=key.length) throw new RangeError(`String(${splice.length}) and key(${key.length}) are not the same length`);
        }
        const canSpace = cards.includes(' ') ? true : false;
        cards = cards.filter(i=>i!==' ');
        let encoded='';
        for(let i=0;i<splice.length;i++){
            if(!canSpace){
                if(cards[cards.indexOf(splice[i])+cards.indexOf(key[i])]){
                    const index = cards.indexOf(splice[i])+cards.indexOf(key[i]);
                    encoded+=cards[index];
                }else{
                    const index = (cards.indexOf(splice[i])+cards.indexOf(key[i]))-cards.length;
                    encoded+=cards[index];
                }
            }else{
                if(splice[i]!==' '){
                    if(cards[cards.indexOf(splice[i])+cards.indexOf(key[i])]){
                        const index = cards.indexOf(splice[i])+cards.indexOf(key[i]);
                        encoded+=cards[index];
                    }else{
                        const index = (cards.indexOf(splice[i])+cards.indexOf(key[i]))-cards.length;
                        encoded+=cards[index];
                    }
                }else encoded+=' ';
            }
            
        }
        return encoded;
    },
    /**
     * Decode string using Caesar Cipher
     * @param {String} str Encoded string
     * @param {String} key Key to shift
     * @returns 
     */
    decode: (str,key)=>{
            let cards = Cryptography.VigenereCipher.chars.split(''),
            splice = str.split('').map((i)=>{
                if(!cards.includes(' ')) i.replaceAll(' ','');
                if(Cryptography.VigenereCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)&&Cryptography.VigenereCipher.chars.match(Cryptography.flags.UPPERCASE_LETTERS))
                    return i;
                else if(Cryptography.VigenereCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)) 
                    return i.toLowerCase();
                else return i.toUpperCase();
            }).filter(k=>{return !cards.includes(' ') ? k!==' ' : k;});
            key = key.split('').map((i)=>{
                if(Cryptography.VigenereCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)&&Cryptography.VigenereCipher.chars.match(Cryptography.flags.UPPERCASE_LETTERS))
                    return i;
                else if(Cryptography.VigenereCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)) 
                    return i.toLowerCase();
                else return i.toUpperCase();
            }).filter(k=>k!==' ');
            if(Cryptography.VigenereCipher.keyModeRepeat){
                if(splice.length>key.length){
                    const temp = key.length;
                    for(let i=key.length;i<=splice.length;i++){
                        key.push(key[i-temp]);
                    }
                }else if(splice.length<key.length)
                    key = key.slice(-key.length,splice.length); 
            }else{
                if(splice.length!=key.length) throw new RangeError(`String(${splice.length}) and key(${key.length}) are not the same length`);
            }
            let decoded='';
            const canSpace = cards.includes(' ') ? true : false;
            cards = cards.filter(i=>i!==' ');
            for(let i=0;i<splice.length;i++){
                if(!canSpace){
                    if(cards[cards.indexOf(splice[i])-cards.indexOf(key[i])]){
                        const index = cards.indexOf(splice[i])-cards.indexOf(key[i]);
                        decoded+=cards[index];
                    }else{
                        const index = (cards.indexOf(splice[i])-cards.indexOf(key[i]))+cards.length;
                        decoded+=cards[index];
                    }
                }else{
                    if(splice[i]!==' '){
                        if(cards[cards.indexOf(splice[i])-cards.indexOf(key[i])]){
                            const index = cards.indexOf(splice[i])-cards.indexOf(key[i]);
                            decoded+=cards[index];
                        }else{
                            const index = (cards.indexOf(splice[i])-cards.indexOf(key[i]))+cards.length;
                            decoded+=cards[index];
                        }
                    }else decoded+=' ';
                }
            }
        return decoded;
    }
};

// Uses the OneTime-Pad algorithm
Cryptography.OneTimePad = {
    chars: Cryptography.flags.UPPERCASE_LETTERS,
    keyModeRepeat: false,
    /**
     * Update One-Time Pad settings
     * @param {{chars: string, repeatMode: boolean}} options Options to change
     * @returns {Cryptography.OneTimePad}
     */
    settings: (options = { chars: Cryptography.flags.UPPERCASE_LETTERS, repeatMode: false }) => {
        Cryptography.OneTimePad.chars = options.chars ?? Cryptography.flags.UPPERCASE_LETTERS;
        Cryptography.OneTimePad.keyModeRepeat = options.repeatMode ?? false;
        return Cryptography.OneTimePad;
    },
    /**
     * Encrypt string using One-Time Pad
     * @param {String} str String to encrypt
     * @param {String} key Key for encryption
     * @returns {String} Encrypted string
     */
    encrypt: (str, key) => {
        if (Cryptography.OneTimePad.keyModeRepeat) key = key.repeat(Math.ceil(str.length / key.length)).slice(0, str.length);
        else if (!Cryptography.OneTimePad.keyModeRepeat && str.length !== key.length) throw new RangeError('String and key must be the same length');
        else;
        let encrypted = '';
        for (let i = 0; i < str.length; i++) {
            let charIndex = Cryptography.OneTimePad.chars.indexOf(str[i]);
            let keyIndex = Cryptography.OneTimePad.chars.indexOf(key[i]);
            if (charIndex === -1 || keyIndex === -1) throw new RangeError('Invalid character in input or key');
            let encryptedIndex = (charIndex + keyIndex) % Cryptography.OneTimePad.chars.length;
            encrypted += Cryptography.OneTimePad.chars[encryptedIndex];
        }
        return encrypted;
    },
    /**
     * Decrypt string using One-Time Pad
     * @param {String} str Encrypted string
     * @param {String} key Key for decryption
     * @returns {String} Decrypted string
     */
    decrypt: (str, key) => {
        if (Cryptography.OneTimePad.keyModeRepeat) key = key.repeat(Math.ceil(str.length / key.length)).slice(0, str.length);
        else if (!Cryptography.OneTimePad.keyModeRepeat && str.length !== key.length) throw new RangeError('String and key must be the same length');
        else;
        let decrypted = '';
        for (let i = 0; i < str.length; i++) {
            let charIndex = Cryptography.OneTimePad.chars.indexOf(str[i]);
            let keyIndex = Cryptography.OneTimePad.chars.indexOf(key[i]);
            if (charIndex === -1 || keyIndex === -1) throw new RangeError('Invalid character in input or key');
            let decryptedIndex = (charIndex - keyIndex + Cryptography.OneTimePad.chars.length) % Cryptography.OneTimePad.chars.length;
            decrypted += Cryptography.OneTimePad.chars[decryptedIndex];
        }
        return decrypted;
    }
};
//Uses base64
Cryptography.base64 = {
    /**
     * Encode string to Base64
     * @param {String} str String to encode
     * @returns {String} Encoded string
     */
    encode: (str) => {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));
    },
    /**
     * Decode Base64 to string
     * @param {String} str Base64 encoded string
     * @returns {String} Decoded string
     */
    decode: (str) => {
        return decodeURIComponent(atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    }
}
