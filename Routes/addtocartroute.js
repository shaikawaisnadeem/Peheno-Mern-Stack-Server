import express from 'express';
import addtocart from '../models/AddtoCart.js';
import authenticateUser from '../Middlewares/authenticateUser';

const router = express.Router();
router.post('/api/data/addtocart', authenticateUser, async (req, res) => {
    try {
        const {productId, quantity} = req.body;
        const userId = req.user._id;
        const cartItem = await addtocart.findOne({
            userId,
            productId,
            quantity
        })
        res.status(201).json({
            success: true,
            message: 'Item added to cart successfully',
            data: cartItem
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        });


    }
})
export default router;