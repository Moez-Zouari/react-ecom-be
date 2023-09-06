const express = require('express');
const router = express.Router();
const stripe = require('stripe');
const Stripe =
    stripe('sk_test_51IRyizLQiALsjQ5rm6kcEksUN9FAStqobqCKCVF39c4mMecKzCIR1sQrkYhquQc6v0Xs8TbK1dFqVLQOc9RqHV6e00vfpOztnW');
router.post('/', async (req, res) => {
        let status, error;
        const { token, amount } = req.body;
        try {
            await Stripe.charges.create({
                source: token.id,
                amount,
                currency: 'usd',
            });
            status = 'success';
        } catch (error) {
            console.log(error);
            status = 'Failure';
        }
        res.json({ error, status });
    });
module.exports = router;