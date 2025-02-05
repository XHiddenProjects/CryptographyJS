class SHA512 {
    constructor() {
        this.k = [
            0x428a2f98n, 0x71374491n, 0xb5c0fbcfn, 0xe9b5dba5n,
            0x3956c25bn, 0x59f111f1n, 0x923f82a4n, 0xab1c5ed5n,
            0xd807aa98n, 0x12835b01n, 0x243185ben, 0x550c7dc3n,
            0x72be5d74n, 0x80deb1fen, 0x9bdc06a7n, 0xc19bf174n,
            0xe49b69c1n, 0xefbe4786n, 0x0fc19dc6n, 0x240ca1ccn,
            0x2de92c6fn, 0x4a7484aan, 0x5cb0a9dcn, 0x76f988dan,
            0x983e5152n, 0xa831c66dn, 0xb00327c8n, 0xbf597fc7n,
            0xc6e00bf3n, 0xd5a79147n, 0x06ca6351n, 0x14292967n,
            0x27b70a85n, 0x2e1b2138n, 0x4d2c6dfcn, 0x53380d13n,
            0x650a7354n, 0x766a0abbn, 0x81c2c92en, 0x92722c85n,
            0xa2bfe8a1n, 0xa81a664bn, 0xc24b8b70n, 0xc76c51a3n,
            0xd192e819n, 0xd6990624n, 0xf40e3585n, 0x106aa070n,
            0x19b4c79bn, 0x1e376c48n, 0x2748774cn, 0x34b0bcb5n,
            0x391c0cb3n, 0x4ed8aa11n, 0x5b9cca4fn, 0x682e6ff3n,
            0x748f82een, 0x78a5636fn, 0x84c87814n, 0x8cc70208n,
            0x90befffan, 0xa4506cebn, 0xbef9a3f7n, 0xc67178f2n
        ];
        this.h = [
            0x6a09e667n, 0xbb67ae85n, 0x3c6ef372n, 0xa54ff53an,
            0x510e527fn, 0x9b05688cn, 0x1f83d9abn, 0x5be0cd19n
        ];
    }

    hash(message) {
        const blocks = this.prepareMessage(message);

        for (const block of blocks) {
            this.processBlock(block);
        }

        return this.finalize();
    }

    prepareMessage(message) {
        const msgUtf8 = unescape(encodeURIComponent(message));
        const msgLength = msgUtf8.length;

        // Padding according to the SHA-512 specifications
        const totalBits = msgLength * 8;
        const totalBytes = Math.ceil((totalBits + 1 + 128) / 512) * 64;
        const blocks = new Array(totalBytes / 4);

        for (let i = 0; i < blocks.length; i++) {
            blocks[i] = 0n;
        }

        for (let i = 0; i < msgLength; i++) {
            blocks[i >> 2] |= BigInt(msgUtf8.charCodeAt(i)) << BigInt(64 - ((i % 4) + 1) * 16);
        }

        // Append the '1' bit
        blocks[msgLength >> 2] |= 0x80n << BigInt(64 - ((msgLength % 4) + 1) * 16);

        // Append the length
        blocks[blocks.length - 1] = BigInt(totalBits);

        return blocks;
    }

    processBlock(block) {
        const w = new Array(80).fill(0n);
        for (let i = 0; i < 16; i++) {
            w[i] = (block >> BigInt((15 - i) * 4)) & 0xffffffffffffffffn;
        }

        for (let i = 16; i < 80; i++) {
            const s0 = this.rotr(w[i - 15], 1) ^ this.rotr(w[i - 15], 8) ^ (w[i - 15] >> 7n);
            const s1 = this.rotr(w[i - 2], 19) ^ this.rotr(w[i - 2], 61) ^ (w[i - 2] >> 6n);
            w[i] = (w[i - 16] + s0 + w[i - 7] + s1) & 0xffffffffffffffffn;
        }

        let a = this.h[0];
        let b = this.h[1];
        let c = this.h[2];
        let d = this.h[3];
        let e = this.h[4];
        let f = this.h[5];
        let g = this.h[6];
        let h = this.h[7];

        for (let i = 0; i < 80; i++) {
            const S1 = this.rotr(e, 14) ^ this.rotr(e, 18) ^ this.rotr(e, 41);
            const ch = (e & f) ^ (~e & g);
            const temp1 = (h + S1 + ch + this.k[i] + w[i]) & 0xffffffffffffffffn;
            const S0 = this.rotr(a, 28) ^ this.rotr(a, 34) ^ this.rotr(a, 39);
            const maj = (a & b) ^ (a & c) ^ (b & c);
            const temp2 = (S0 + maj) & 0xffffffffffffffffn;

            h = g;
            g = f;
            f = e;
            e = (d + temp1) & 0xffffffffffffffffn;
            d = c;
            c = b;
            b = a;
            a = (temp1 + temp2) & 0xffffffffffffffffn;
        }

        this.h[0] = (this.h[0] + a) & 0xffffffffffffffffn;
        this.h[1] = (this.h[1] + b) & 0xffffffffffffffffn;
        this.h[2] = (this.h[2] + c) & 0xffffffffffffffffn;
        this.h[3] = (this.h[3] + d) & 0xffffffffffffffffn;
        this.h[4] = (this.h[4] + e) & 0xffffffffffffffffn;
        this.h[5] = (this.h[5] + f) & 0xffffffffffffffffn;
        this.h[6] = (this.h[6] + g) & 0xffffffffffffffffn;
        this.h[7] = (this.h[7] + h) & 0xffffffffffffffffn;
    }

    finalize() {
        let hash = '';
        for (const value of this.h) {
            hash += value.toString(16).padStart(16, '0');
        }
        return hash;
    }

    rotr(value, amount) {
        return (value >> BigInt(amount)) | (value << (64n - BigInt(amount)));
    }
}

const sha512 = (msg)=>{
    const sha512 = new SHA512();
    return sha512.hash(msg);
}
export default sha512;