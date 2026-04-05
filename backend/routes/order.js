const router = require('express').Router();
const Order = require('../usermodel/order');
const Book = require('../usermodel/book');
const {authenticate} = require('./userAuth');
const user = require('../usermodel/user');

router.post('/place-order', authenticate, async (req, res) => {
    try {
        const { id } = req.headers;
        const {Order} = req.body;
        for( const orderData of Order){
            const neworder = new Order({
                bookid: orderData.bookid,
                userid: id
                
            });
            const orderData = await neworder.save();
            await user.findByIdAndUpdate(id, {
                $push: { orders: orderData._id }
            });
            await user.findByIdAndUpdate(id, {
                $pull: { cart: orderData.bookid }
            });
        }
        return res.status(200).json({message: 'Order placed successfully'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'An error occurred while placing the order'});
    }
}
);
router.get('/get-order', authenticate, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await Order.find({ userid: id }).populate('bookid');
        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'An error occurred while fetching the order'});
    }
}
);
module.exports = router;