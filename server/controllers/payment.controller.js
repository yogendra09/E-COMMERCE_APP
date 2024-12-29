

const Payment = require('../models/payment.model.js');


module.exports.verifyPayment = async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET

    try {
        const { validatePaymentVerification } = require('../../node_modules/razorpay/dist/utils/razorpay-utils.js')

        const result = validatePaymentVerification(
            {
                "order_id": razorpayOrderId,
                "payment_id": razorpayPaymentId
            },
            signature,
            secret);

        if (result) {
            const payment = await Payment.findOne({ orderId: razorpayOrderId });
            payment.paymentId = razorpayPaymentId;
            payment.signature = signature;
            payment.status = 'completed';
            await payment.save();
            res.json({ status: true, message: 'Payment verified', payment });
        } else {
            res.status(400).send('Invalid signature');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error verifying payment');
    }
}