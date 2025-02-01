/**
 * Cryptography list
 *
 * @type {{ CaesarCipher: { encode: (str: string, key: number) => string; decode: (str: string, key?: number) => {}|string; }; }}
 */
var Cryptography = {

CaesarCipher: {
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    /**
     * Update Caesar Ciphers
     * @param {{chars: string}} options Options to change
     * @returns {Cryptography.CaesarCipher}
     */
    settings: (options={chars:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'})=>{
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
        const cards = Cryptography.CaesarCipher.chars.split(''),
        splice = str.split('').map((i)=>{return i.replaceAll(' ','').toUpperCase();}).filter(k=>k!=='');
        let encoded='';
        for(let i=0;i<splice.length;i++){
            if(cards[cards.indexOf(splice[i])+key]){
                const index = cards.indexOf(splice[i])+key;
                encoded+=cards[index];
            }else{
                const index = (cards.indexOf(splice[i])+key)-cards.length;
                encoded+=cards[index];
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
            let lastStr='',k=0;
            while(!lastStr.match('undefined')){
                decoded[k] = '';
                const cards = Cryptography.CaesarCipher.chars.split(''),
                splice = str.split('').map((i)=>{return i.toUpperCase();});
                for(let i=0;i<splice.length;i++){
                    if(cards[cards.indexOf(splice[i])-k]){
                        const index = cards.indexOf(splice[i])-k;
                        decoded[k] +=cards[index];
                    }else{
                        const index = (cards.indexOf(splice[i])-k)+cards.length;
                        decoded[k] += cards[index];
                    }
                }
                lastStr = decoded[k];
                k++;
            }
            decoded = Object.fromEntries(
                Object.entries(decoded).filter(([key, value]) => !value.match('undefined'))
            );
            return decoded;
        }else{
            const cards = Cryptography.CaesarCipher.chars.split(''),
            splice = str.split('').map((i)=>{return i.toUpperCase();});
            let decoded='';
            for(let i=0;i<splice.length;i++){
                if(cards[cards.indexOf(splice[i])-key]){
                    const index = cards.indexOf(splice[i])-key;
                    decoded+=cards[index];
                }else{
                    const index = (cards.indexOf(splice[i])-key)+cards.length;
                    decoded+=cards[index];
                }
            }
        return decoded;
        }
        }
    }
}
