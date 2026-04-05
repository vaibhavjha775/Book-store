const router = require('express').Router();
const user = require('../usermodel/user');
const {authenticate} = require('./userAuth');

router.put('/add-to-cart', authenticate, async (req, res) => {
    try {
        const { bookid , id} = req.headers;
        
        const existinguser = await user.findById(id);
     const bookincart= existinguser.cart.includes(bookid);
        if(bookincart){
            return res.status(400).json({message: 'Book already in cart'});
        }
        await user.findByIdAndUpdate(id, {
            $push: { cart: bookid }
        });
        return res.status(200).json({message: 'Book added to cart successfully'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'An error occurred while adding the book to the cart'});
    }
}
);
router.delete('/remove-from-cart', authenticate, async (req, res) => {
    try {
        const { bookid , id} = req.headers;
        
        const existinguser = await user.findById(id);
        const bookincart= existinguser.cart.includes(bookid);
        if(!bookincart){
            return res.status(400).json({message: 'Book not in cart'});
        }
        await user.findByIdAndUpdate(id, {
            $pull: { cart: bookid }
        });
        return res.status(200).json({message: 'Book removed from cart successfully'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'An error occurred while removing the book from the cart'});
    }
}
);
router.get('/get-cart', authenticate, async (req, res) => {
    try {
        const { id } = req.headers;
        const existinguser = await user.findById(id).populate('cart');
        const cart = existinguser.cart.reverse();

      
        return res.status(200).json(cart);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'An error occurred while fetching the cart'});
    }
}
);
module.exports = router;