import { Router } from 'express';
const router = Router();
import { isAddress } from 'web3-utils';

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

router.get("/verify", (req, res) => {
    const signature = req.headers;
    console.log(signature);
    res.json({
        success: true,
        headers: signature
    });
});

export default router;