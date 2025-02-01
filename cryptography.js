/**
 * Cryptography list
 *
 * @type {{ CaesarCipher: { encode: (str: string, key: number) => string; decode: (str: string, key?: number) => {}|string; }; }}
 */
var Cryptography = {
flags: Object.freeze({
    UPPERCASE_LETTERS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    LOWERCASE_LETTERS: 'abcdefghijklmnopqrstuvwxyz',
    NUMBERS: '0123456789',
    SPACE: ' ',
    SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:\'",.<>?/~`'
})
}
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
                Object.entries(decoded).filter(([key, value]) => !value.match('undefined')&&!value.match(str))
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
Cryptography.VigenereCipher = {
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
     * @param {String} key Number to shift
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
        key = key.split('').map((i)=>{
            if(Cryptography.CaesarCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)&&Cryptography.CaesarCipher.chars.match(Cryptography.flags.UPPERCASE_LETTERS))
                return i;
            else if(Cryptography.CaesarCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)) 
                return i.toLowerCase();
            else return i.toUpperCase();
        }).filter(k=>{return !cards.includes(' ') ? k!==' ' : k;});
        if(splice.length!=key.length) throw new RangeError(`String(${splice.length}) and key(${key.length}) are not the same length`);
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
            let cards = Cryptography.CaesarCipher.chars.split(''),
            splice = str.split('').map((i)=>{
                if(!cards.includes(' ')) i.replaceAll(' ','');
                if(Cryptography.CaesarCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)&&Cryptography.CaesarCipher.chars.match(Cryptography.flags.UPPERCASE_LETTERS))
                    return i;
                else if(Cryptography.CaesarCipher.chars.match(Cryptography.flags.LOWERCASE_LETTERS)) 
                    return i.toLowerCase();
                else return i.toUpperCase();
            }).filter(k=>{return !cards.includes(' ') ? k!==' ' : k;});
            key = key.split('').map((i)=>{
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
}
