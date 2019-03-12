import { Router } from 'express';
const router = Router();
const ethUtil = require('ethereumjs-util');

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

let users = [];
router.get("/nonce/:address", (req, res) => {
    if (req.params.address) {
        if (!users[req.params.address]) {
            users[req.params.address] = {
                address: req.params.address,
                nonce: rnd(100000, 999999)
            };
            res.json(users[req.params.address]);
        } else {
            res.json(users[req.params.address]);
        }
    } else {
        res.json({success: false});
    }
});

function verifySignature(nonce, reqAddress, reqSignature) {
    const msg = `Sign Nonce: ${nonce}`;
    const msgBuffer = ethUtil.toBuffer(msg);
    const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
    const signatureBuffer = ethUtil.toBuffer(reqSignature);
    const signatureParams = ethUtil.fromRpcSig(signatureBuffer);

    const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s
    );

    const addressBuffer = ethUtil.publicToAddress(publicKey);
    const address = ethUtil.bufferToHex(addressBuffer);

    return address.toLowerCase() === reqAddress.toLowerCase();
}

router.get("/top-secret-content", (req, res) => {
    if (!req.cookies.auth) res.json({success: false});
    const auth = JSON.parse(req.cookies.auth);
    const isVerified = verifySignature(auth.nonce, auth.address, auth.signature);
    if (isVerified) {
        res.json({success: true, data: "THIS IS SUPER SECRET!"});
    } else {
        res.json({success: false});
    }
});

export default router;