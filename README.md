# CryptographyJS
A simple JS library for Cryptography

## Table of Contents
* [Initiate](#Initiate)
* [Cryptographies](#Cryptographies)
  * [Caesar Cipher](#Caesar-Cipher)
    * [Encode](#encode)
    * [Decode](#decode)

## Initiate
To load up the script:
```html
<script src="./cryptography.js" type="text/javascript"></script>
<script>
//Cryptography goes here
</script>
```

## Cryptographies
Here is the current list of cryptographies
| Name | Encodable | Decodable | Hashable | Brute Forcable | Description |
| ---- | ------ | ------ | ---- | ----------- | ----------- |
| CaesarCipher | ✔️ | ✔️ |  ❌   |    ✔️      | Encodes/Decodes string in Caesar Cipher |


### Caesar Cipher
Caesar Cipher is a common cipher that shifts letters based on key value

#### Encode
To encode the Caesar Cipher write this code:
```js
Cryptography.CaesarCipher.encode('Test',7); //Returns ALZA
```

#### Decode
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
