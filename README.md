# CryptographyJS
A simple JS library for Cryptography

## Table of Contents
* [Initiate](#Initiate)
* [Cryptographies](#Cryptographies)
  * [Caesar Cipher](#Caesar-Cipher)
    * [Encode](#caesar-cipher-(encode))
    * [Decode](#caesar-cipher-(decode))
    * [Configuration](#caesar-cipher-configuration)
  * [Vigenère Cipher](#Vigenère-Cipher)
    * [Encode](#Vigenère-Cipher-(encode))
    * [Decode](#Vigenère-Cipher-(decode))
    * [Configuration](#Vigenère-Cipher-configuration)
  * [Flags](#flags)
***
## Initiate
To load up the script:
```html
<script src="./cryptography.js" type="text/javascript"></script>
<script>
//Cryptography goes here
</script>
```
***
## Cryptographies
Here is the current list of cryptographies
| Name | Encodable | Decodable | Hashable | Forcable | Description |
| ---- | ------ | ------ | ---- | ----------- | ----------- |
| CaesarCipher  | ✔️  | ✔️ |  ❌   |    ✔️      | Encodes/Decodes string in Caesar Cipher |
| VigenereCipher| ✔️ | ✔️ | ❌ | ❌ |          Encodes/Decodes string in Vigenere Cipher |

***
### Caesar Cipher
Caesar Cipher is a common cipher that shifts letters based on key value

#### Caesar Cipher (Encode)
To encode the Caesar Cipher write this code:
```js
Cryptography.CaesarCipher.encode('Test',7); //Returns ALZA
```

#### Caesar Cipher (Decode)
To decode the Caesar Cipher write this code:
```js
console.log(Cryptography.CaesarCipher.decode('ALZA',7)); //TEST
```

**OR**

Leave the key out to _brute force_ through
```js
console.log(Cryptography.CaesarCipher.decode('QYYQVO'));
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
console.log(Cryptography.CaesarCipher.settings({chars: `${Cryptography.options.UPPERCASE_LETTERS}${Cryptography.options.LOWERCASE_LETTERS}`}).encode('Test',7)); //alzA
console.log(Cryptography.CaesarCipher.settings({chars: `${Cryptography.options.UPPERCASE_LETTERS}${Cryptography.options.LOWERCASE_LETTERS}`}).decode('alzA',7)); //Test
console.log(Cryptography.CaesarCipher.settings({chars: `${Cryptography.options.UPPERCASE_LETTERS}${Cryptography.options.LOWERCASE_LETTERS}`}).decode('alzA'));
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
***
### Vigenère Cipher
Vigenère Cipher, just like Caesar Cipher, uses string length as a key.

#### Vigenère Cipher (Encode)
To encode the Vigenère Cipher write this code:
```js
console.log(Cryptography.VigenereCipher.encode('Hello World','KickMeNowP')); //RMNVAABFHS
```

#### Vigenère Cipher (Decode)
To decode the Vigenère Cipher write this code:
```js
console.log(Cryptography.VigenereCipher.decode('RMNVAABFHS', 'KickMeNowP')); //HelloWorld
```

#### Vigenère Cipher (Configuration)
**Refer back to [Ceasar Cipher - Configuration](#caesar-cipher-(configuration))**

***
### Flags
These are some options that you can use for parameters. **Note:** This only works for `.settings(...)` methods for any acceptable cryptography.
| Constant | Value | Path |
| -------- | ----- | ---- |
| UPPERCASE_LETTERS | 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' | _Cryptography.flags.UPPERCASE_LETTERS_ |
| LOWERCASE_LETTERS | 'abcdefghijklmnopqrstuvwxyz' | _Cryptography.flags.LOWERCASE_LETTERS_ |
| NUMBERS | '0123456789' | _Cryptography.flags.NUMBERS_ |
| SPACE | ' ' | _Cryptography.flags.SPACE_ |
| SPECIAL_CHARS | '!@#$%^&*()_+-=[]{}\|;:\'",.<>?/~' | _Cryptography.flags.SPECIAL_CHARS_ |

