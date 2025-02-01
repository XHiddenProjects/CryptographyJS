const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
/**
 * Cryptography list
 *
 * @type {{ CaesarCipher: { encode: (str: string, key: number) => string; decode: (str: string, key?: number) => {}|string; }; }}
 */
var Cryptography = {

CaesarCipher: {
    /**
     * Encode string using Caesar Cipher
     * @param {String} str String to encode
     * @param {Number} key Number to shift
     * @returns {String} Encoded string
     */
    encode: (str,key)=>{
        const cards = chars.split(''),
        splice = str.split('').map((i)=>{return i.toUpperCase();});
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
                const cards = chars.split(''),
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
            const cards = chars.split(''),
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