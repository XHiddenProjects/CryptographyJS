class MD2 {
    constructor() {
        this.HEX_CHARS = '0123456789abcdef'.split('');
        this.S = [
            0x29, 0x2E, 0x43, 0xC9, 0xA2, 0xD8, 0x7C, 0x01, 0x3D, 0x36, 0x54, 0xA1, 0xEC, 0xF0, 0x06, 0x13,
            0x62, 0xA7, 0x05, 0xF3, 0xC0, 0xC7, 0x73, 0x8C, 0x98, 0x93, 0x2B, 0xD9, 0xBC, 0x4C, 0x82, 0xCA, 
            0x1E, 0x9B, 0x57, 0x3C, 0xFD, 0xD4, 0xE0, 0x16, 0x67, 0x42, 0x6F, 0x18, 0x8A, 0x17, 0xE5, 0x12, 
            0xBE, 0x4E, 0xC4, 0xD6, 0xDA, 0x9E, 0xDE, 0x49, 0xA0, 0xFB, 0xF5, 0x8E, 0xBB, 0x2F, 0xEE, 0x7A, 
            0xA9, 0x68, 0x79, 0x91, 0x15, 0xB2, 0x07, 0x3F, 0x94, 0xC2, 0x10, 0x89, 0x0B, 0x22, 0x5F, 0x21,
            0x80, 0x7F, 0x5D, 0x9A, 0x5A, 0x90, 0x32, 0x27, 0x35, 0x3E, 0xCC, 0xE7, 0xBF, 0xF7, 0x97, 0x03, 
            0xFF, 0x19, 0x30, 0xB3, 0x48, 0xA5, 0xB5, 0xD1, 0xD7, 0x5E, 0x92, 0x2A, 0xAC, 0x56, 0xAA, 0xC6, 
            0x4F, 0xB8, 0x38, 0xD2, 0x96, 0xA4, 0x7D, 0xB6, 0x76, 0xFC, 0x6B, 0xE2, 0x9C, 0x74, 0x04, 0xF1, 
            0x45, 0x9D, 0x70, 0x59, 0x64, 0x71, 0x87, 0x20, 0x86, 0x5B, 0xCF, 0x65, 0xE6, 0x2D, 0xA8, 0x02, 
            0x1B, 0x60, 0x25, 0xAD, 0xAE, 0xB0, 0xB9, 0xF6, 0x1C, 0x46, 0x61, 0x69, 0x34, 0x40, 0x7E, 0x0F, 
            0x55, 0x47, 0xA3, 0x23, 0xDD, 0x51, 0xAF, 0x3A, 0xC3, 0x5C, 0xF9, 0xCE, 0xBA, 0xC5, 0xEA, 0x26, 
            0x2C, 0x53, 0x0D, 0x6E, 0x85, 0x28, 0x84, 0x09, 0xD3, 0xDF, 0xCD, 0xF4, 0x41, 0x81, 0x4D, 0x52, 
            0x6A, 0xDC, 0x37, 0xC8, 0x6C, 0xC1, 0xAB, 0xFA, 0x24, 0xE1, 0x7B, 0x08, 0x0C, 0xBD, 0xB1, 0x4A, 
            0x78, 0x88, 0x95, 0x8B, 0xE3, 0x63, 0xE8, 0x6D, 0xE9, 0xCB, 0xD5, 0xFE, 0x3B, 0x00, 0x1D, 0x39, 
            0xF2, 0xEF, 0xB7, 0x0E, 0x66, 0x58, 0xD0, 0xE4, 0xA6, 0x77, 0x72, 0xF8, 0xEB, 0x75, 0x4B, 0x0A, 
            0x31, 0x44, 0x50, 0xB4, 0x8F, 0xED, 0x1F, 0x1A, 0xDB, 0x99, 0x8D, 0x33, 0x9F, 0x11, 0x83, 0x14
        ];
        this.M = [];
        this.X = [];
        this.C = [];
    }

    md2(message) {
        var code, i, j, k, t, L = 0, loop = 1, B,
            index = 0, start = 0, bytes = 0, length = message.length;
        for (i = 0; i < 16; ++i) {
            this.X[i] = this.C[i] = 0;
        }
        this.M[16] = this.M[17] = this.M[18] = 0;
        do {
            this.M[0] = this.M[16];
            this.M[1] = this.M[17];
            this.M[2] = this.M[18];
            this.M[16] = this.M[17] = this.M[18] = this.M[3] =
            this.M[4] = this.M[5] = this.M[6] = this.M[7] =
            this.M[8] = this.M[9] = this.M[10] = this.M[11] =
            this.M[12] = this.M[13] = this.M[14] = this.M[15] = 0;
            for (i = start; index < length && i < 16; ++index) {
                code = message.charCodeAt(index);
                if (code < 0x80) {
                    this.M[i++] = code;
                } else if (code < 0x800) {
                    this.M[i++] = 0xc0 | (code >> 6);
                    this.M[i++] = 0x80 | (code & 0x3f);
                } else if (code < 0xd800 || code >= 0xe000) {
                    this.M[i++] = 0xe0 | (code >> 12);
                    this.M[i++] = 0x80 | ((code >> 6) & 0x3f);
                    this.M[i++] = 0x80 | (code & 0x3f);
                } else {
                    code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
                    this.M[i++] = 0xf0 | (code >> 18);
                    this.M[i++] = 0x80 | ((code >> 12) & 0x3f);
                    this.M[i++] = 0x80 | ((code >> 6) & 0x3f);
                    this.M[i++] = 0x80 | (code & 0x3f);
                }
            }
            bytes += i - start;
            start = i - 16;
            if (index === length && i < 16) {
                loop = 2;
                t = 16 - (bytes & 15);
                for (; i < 16; ++i) {
                    this.M[i] = t;
                }
            }
            for (i = 0; i < 16; ++i) {
                this.C[i] ^= this.S[this.M[i] ^ L];
                L = this.C[i];
            }
            for (i = 0; i < loop; ++i) {
                B = i === 0 ? this.M : this.C;
                this.X[16] = B[0];
                this.X[32] = this.X[16] ^ this.X[0];
                this.X[17] = B[1];
                this.X[33] = this.X[17] ^ this.X[1];
                this.X[18] = B[2];
                this.X[34] = this.X[18] ^ this.X[2];
                this.X[19] = B[3];
                this.X[35] = this.X[19] ^ this.X[3];
                this.X[20] = B[4];
                this.X[36] = this.X[20] ^ this.X[4];
                this.X[21] = B[5];
                this.X[37] = this.X[21] ^ this.X[5];
                this.X[22] = B[6];
                this.X[38] = this.X[22] ^ this.X[6];
                this.X[23] = B[7];
                this.X[39] = this.X[23] ^ this.X[7];
                this.X[24] = B[8];
                this.X[40] = this.X[24] ^ this.X[8];
                this.X[25] = B[9];
                this.X[41] = this.X[25] ^ this.X[9];
                this.X[26] = B[10];
                this.X[42] = this.X[26] ^ this.X[10];
                this.X[27] = B[11];
                this.X[43] = this.X[27] ^ this.X[11];
                this.X[28] = B[12];
                this.X[44] = this.X[28] ^ this.X[12];
                this.X[29] = B[13];
                this.X[45] = this.X[29] ^ this.X[13];
                this.X[30] = B[14];
                this.X[46] = this.X[30] ^ this.X[14];
                this.X[31] = B[15];
                this.X[47] = this.X[31] ^ this.X[15];
        
                t = 0;
                for (j = 0; j < 18; ++j) {
                    for (k = 0; k < 48; ++k) {
                        this.X[k] = t = this.X[k] ^ this.S[t];
                    }
                    t = (t + j) & 0xFF;
                }
            }
        } while (loop === 1);
        
        var hex = '';
        for (i = 0; i < 16; ++i) {
            hex += this.HEX_CHARS[(this.X[i] >> 4) & 0x0F] + this.HEX_CHARS[this.X[i] & 0x0F];
        }
        return hex;
    }
}
const md2 = (msg)=>{
    return (new MD2()).md2(msg);
}
export default md2;