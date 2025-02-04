# CyberJS
A simple JS library for Cybersecurity usage

## Table of Contents
* [Initiate](#Initiate)
* [Cryptographies](#Cryptographies)
   * [Ciphers](#ciphers)
     * [Caesar Cipher](#Caesar-Cipher)
       * [Encrypt](#caesar-cipher-encrypt)
       * [Decrypt](#caesar-cipher-decrypt)
       * [Configuration](#caesar-cipher-configuration)
     * [Vigenère Cipher](#Vigenère-Cipher)
       * [Encrypt](#Vigenère-Cipher-encrypt)
       * [Decrypt](#Vigenère-Cipher-decrypt)
       * [Configuration](#Vigenère-Cipher-configuration)
     * [One-Time Pad](#one-time-pad)
       * [Encrypt](#one-time-pad-encrypt)
       * [Decrypt](#one-time-pad-decrypt)
       * [Configuration](#one-time-pad-decrypt)
   * [Encoding](#encoding)
     * [Base64](#base64)
       * [Encode](#base64-encode)
       * [Decode](#base64-decode)
     * [Base32](#base32)
       * [Encode](#base32-encode)
       * [Decode](#base32-decode)
   * [Hashing](#hashing)
     * [MD2](#md2)
     * [MD4](#md4)
     * [MD5](#md5)
     * [SHA-1](#sha-1)
     * [SHA-224](#sha-224)
     * [SHA-256](#sha-256)
     * [SHA-384](#sha-384)
     * [Hash](#hash)
   * [Flags](#flags)
***
## Initiate
To load up the script:
```html
<script type="module">
 import {Cryptography} from './cryptography.min.js';
 //Cryptography goes here
</script>
```
***
## Cryptographies
Here is the current list of cryptographies

**KEY**
- **Name**: Name of the cryptography
- **Encryptable/Encodable**: If the cryptography can be encrypted/encoded
- **Decryptable/Decodable**: If the cryptography can be decrypted/decoded
- **Forcable**: If the cryptography can be _brute-forced_
- **Description**: A small description of what cryptography can do.

| Name | Encryptable/Encodable | Decryptable/Decodable | Forcable | Description |
| ---- | --------------------- | --------------------- | -------- | ----------- |
| CaesarCipher  | ✔️  | ✔️   |    ✔️      | Encodes/Decodes string in Caesar Cipher |
| VigenereCipher| ✔️ | ✔️ | ❌  |          Encodes/Decodes string in Vigenere Cipher |
| OneTimePad | ✔️ | ✔️ | ❌  | Encryps/Decrypts string using One-Time pad |
| Base64 | ✔️ | ✔️ | ❌  | Encodes/Decodes string in base64 |
| Base32 | ✔️ | ✔️ | ❌ | Encodes/Decodes string in base32 |
| MD2 | ✔️ | ❌  | ❌ | Hashes the string in MD2 |
| MD4 | ✔️ | ❌  | ❌ | Hashes the string in MD4 |
| MD5 | ✔️ | ❌  | ❌ | Hashes the string in MD5 |
| SHA-1 | ✔️ | ❌  | ❌ | Hashes the string in SHA-1 |
| SHA-224 | ✔️ | ❌  | ❌ | Hashes the string in SHA-224 |
| SHA-256 | ✔️ | ❌  | ❌ | Hashes the string in SHA-256 |
| SHA-384 | ✔️ | ❌  | ❌ | Hashes the string in SHA-384 |

***
## Ciphers
List of ciphers

### Caesar Cipher
Caesar Cipher is a common cipher that shifts letters based on key value

#### Caesar Cipher (Encrypt)
To encode the Caesar Cipher write this code:
```js
Cryptography.CaesarCipher.encrypt('Test',7); //Returns ALZA
```

#### Caesar Cipher (Decrypt)
To decode the Caesar Cipher write this code:
```js
console.log(Cryptography.CaesarCipher.decrypt('ALZA',7)); //TEST
```

**OR**

Leave the key out to _brute force_ through
```js
console.log(Cryptography.CaesarCipher.decrypt('QYYQVO'));
/*
{
    "1": "PXXPUN",
    "2": "OWWOTM",
    "3": "NVVNSL",
    "4": "MUUMRK",
    "5": "LTTLQJ",
    "6": "KSSKPI",
    "7": "JRRJOH",
    "8": "IQQING",
    "9": "HPPHMF",
    "10": "GOOGLE", // Correct brute force
    "11": "FNNFKD",
    "12": "EMMEJC",
    "13": "DLLDIB",
    "14": "CKKCHA",
    "15": "BJJBGZ",
    "16": "AIIAFY",
    "17": "ZHHZEX",
    "18": "YGGYDW",
    "19": "XFFXCV",
    "20": "WEEWBU",
    "21": "VDDVAT",
    "22": "UCCUZS",
    "23": "TBBTYR",
    "24": "SAASXQ",
    "25": "RZZRWP",
    "26": "QYYQVO",
    "27": "PXXPUN",
    "28": "OWWOTM",
    "29": "NVVNSL",
    "30": "MUUMRK",
    "31": "LTTLQJ",
    "32": "KSSKPI",
    "33": "JRRJOH",
    "34": "IQQING",
    "35": "HPPHMF",
    "36": "GOOGLE",
    "37": "FNNFKD",
    "38": "EMMEJC",
    "39": "DLLDIB",
    "40": "CKKCHA"
}
*/
```

#### Caesar Cipher (Configuration)
To configure what can be loaded in use this code:
```js
console.log(Cryptography.CaesarCipher.settings({chars: `${Cryptography.options.UPPERCASE_LETTERS}${Cryptography.options.LOWERCASE_LETTERS}`}).encrypt('Test',7)); //alzA
console.log(Cryptography.CaesarCipher.settings({chars: `${Cryptography.options.UPPERCASE_LETTERS}${Cryptography.options.LOWERCASE_LETTERS}`}).decrypt('alzA',7)); //Test
console.log(Cryptography.CaesarCipher.settings({chars: `${Cryptography.options.UPPERCASE_LETTERS}${Cryptography.options.LOWERCASE_LETTERS}`}).decrypt('alzA'));
/*
{
    "1": "Zkyz",
    "2": "Yjxy",
    "3": "Xiwx",
    "4": "Whvw",
    "5": "Vguv",
    "6": "Uftu",
    "7": "Test", //Correct Brute force
    "8": "Sdrs",
    "9": "Rcqr",
    "10": "Qbpq",
    "11": "Paop",
    "12": "OZno",
    "13": "NYmn",
    "14": "MXlm",
    "15": "LWkl",
    "16": "KVjk",
    "17": "JUij",
    "18": "IThi",
    "19": "HSgh",
    "20": "GRfg",
    "21": "FQef",
    "22": "EPde",
    "23": "DOcd",
    "24": "CNbc",
    "25": "BMab",
    "26": "ALZa",
    "27": "zKYZ",
    "28": "yJXY",
    "29": "xIWX",
    "30": "wHVW",
    "31": "vGUV",
    "32": "uFTU",
    "33": "tEST",
    "34": "sDRS",
    "35": "rCQR",
    "36": "qBPQ",
    "37": "pAOP",
    "38": "ozNO",
    "39": "nyMN",
    "40": "mxLM",
    "41": "lwKL",
    "42": "kvJK",
    "43": "juIJ",
    "44": "itHI",
    "45": "hsGH",
    "46": "grFG",
    "47": "fqEF",
    "48": "epDE",
    "49": "doCD",
    "50": "cnBC",
    "51": "bmAB",
    "52": "alzA"
}
*/
```

### Vigenère Cipher
Vigenère Cipher, just like Caesar Cipher, uses string length as a key.

#### Vigenère Cipher (Encrypt)
To encode the Vigenère Cipher write this code:
```js
console.log(Cryptography.VigenereCipher.encrypt('Hello World','KickMeNowP')); //RMNVAABFHS
```

#### Vigenère Cipher (Decrypt)
To decode the Vigenère Cipher write this code:
```js
console.log(Cryptography.VigenereCipher.decrypt('RMNVAABFHS', 'KickMeNowP')); //HelloWorld
```

#### Vigenère Cipher (Configuration)
**Refer back to [Ceasar Cipher (Configuration)](#caesar-cipher-configuration)**
One thing added is:

**repeatMode** - Automatically fixes the key to be added/removed characters based on string length.

```js
console.log(Cryptography.VigenereCipher.settings({repeatMode:Cryptography.flags.KEY_MODE_REPEAT}).encrypt('AttackAtDawn', 'LEMON')); //LXFOPVEFRNHR
console.log(Cryptography.VigenereCipher.settings({repeatMode:Cryptography.flags.KEY_MODE_REPEAT}).decrypt('LXFOPVEFRNHR', 'LEMON')); //ATTACKATDAWN
```

### One-Time Pad
Encryption technique utilizing a one-time pre-shared key at least as long as the encrypted message

#### One-Time Pad (Encrypt)
To encode the Vigenère Cipher write this code:
```js
console.log(Cryptography.OneTimePad.settings({repeatMode:true}).encrypt('TEST', 'Lemon')); //EIEH
```

#### One-time Pad (Decrypt)
To decode the Vigenère Cipher write this code:
```js
console.log(Cryptography.OneTimePad.settings({repeatMode:true}).decrypt('EIEH', 'Lemon')); //TEST
```

#### One-time Pad (Configuration)
**Refer back to [Vigenère Cipher (Configuration)](#vigenère-cipher-configuration)**

***

## Encoding
This is a list of encodings/decodings you can have.

### Base64
Base64 is an encoded text by a group of binary-to-text using 64 symbols

#### Base64 (Encode)
Encode string using base64
```js
console.log(Cryptography.Base64.encode('Test')); //VGVzdA==
```

#### Base64 (Decode)
Decode Base64 string
```js
console.log(Cryptography.Base64.decode('VGVzdA=='));
```

### Base32
Base32 is an encoded text by a group of binary-to-text using 64 symbols

#### Base32 (Encode)
Encode string using base32
```js
console.log(Cryptography.Base32.encode('Test')); //KRSXG5A=
```

#### Base32 (Decode)
Decode Base32 string
```js
console.log(Cryptography.Base32.decode('KRSXG5A=')); //Test
```

***

## Hashing
This is a list of hash algorithms.

### MD2
To hash MD2
```js
console.log(Cryptography.hash.md2('A')); //08e2a3810d8426443ecacaf47aeedd17
```

### MD4
To hash MD4
```js
console.log(Cryptography.hash.md4('A')); //d5ef20eeb3f75679f86cf57f93ed0ffe
```

### MD5
To hash MD2
```js
console.log(Cryptography.hash.md5('A')); //7fc56270e7a70fa81a5935b72eacbe29
```

### SHA-1
To hash SHA-1
```js
console.log(Cryptography.hash.sha1('Cybersecurity')); //7b7a8d8e9435d1064967f8ba2a43eee1f7804f5e
```

### SHA-224
To hash SHA-224
```js
console.log(Cryptography.hash.sha224('Hello World!')); //4575bb4ec129df6380cedde6d71217fe0536f8ffc4e18bca530a7a1b
```

### SHA-256
To hash SHA-256
```js
console.log(Cryptography.hash.sha256('Test')); //532eaabd9574880dbf76b9b8cc00832c20a6ec113d682299550d7a6e0f345e25
```

### SHA-384
To hash SHA-384
```js
console.log(Cryptography.hash.sha384('Google')); //2af172307e1317b9c04187cc7f664e5ea7907df8523c409bc2f226ab05f3ca031a966d86db52bc3a3600bd97bd8f2e50
```


### Hash
```js
const algo = 'md2', str='String';
console.log(Cryptography.hash.hash(algo,str));
```



***

## Flags
These are some options that you can use for parameters. **Note:** This only works for `.settings(...)` methods for any acceptable cryptography.
| Constant | Value | Type | Path |
| -------- | ----- | ---- | ---- |
| UPPERCASE_LETTERS | 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' | String | _Cryptography.flags.UPPERCASE_LETTERS_ |
| LOWERCASE_LETTERS | 'abcdefghijklmnopqrstuvwxyz' | String | _Cryptography.flags.LOWERCASE_LETTERS_ |
| NUMBERS | '0123456789' | String | _Cryptography.flags.NUMBERS_ |
| SPACE | ' ' | String | _Cryptography.flags.SPACE_ |
| SPECIAL_CHARS | '!@#$%^&*()_+-=[]{}\|;:\'",.<>?/~' | String | _Cryptography.flags.SPECIAL_CHARS_ |
| KEY_MODE_REPEAT | TRUE | Boolean | _Cryptography.flags.KEY_MODE_REPEAT_ |

