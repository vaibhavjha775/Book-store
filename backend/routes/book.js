const router = require('express').Router();
const user = require('../usermodel/user');
const jwt = require('jsonwebtoken');
const Book = require('../usermodel/book');
const {authenticate} = require('./userAuth');

router.post('/add-book',authenticate,  async (req, res) => {
    const {id} = req.headers;
        const existinguser = await user.findById(id);
        if(!existinguser){
            return res.status(400).json({message: 'Invalid credentials'});
        }
        if(existinguser.role !== 'admin'){
            return res.status(400).json({message: 'You are not authorized to add books'});
        }
    try{
        const book = new Book ({   
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
               
    });
        await book.save();
        res.status(200).json({message: 'Book added successfully'});
    }
    catch(err){                                              
        console.log(err);   
        res.status(500).json({message: 'Internal server error'});
    }
});
router.put('/update-book',authenticate, async (req, res) => {
    try{
        const {bookid} = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        return res.status(200).json({message: 'Book updated successfully'});
    }
    catch(err){                                              
        

        return res.status(500).json({message: 'An error occured while updating the book'});
    }
}
);
router.delete('/delete-book',authenticate, async (req, res) => {
    try{
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message: 'Book deleted successfully'});
    }
    catch(err){                                              
        console.log(err);   
        res.status(500).json({message: 'An error occured while deleting the book'});
    }
}
);
router.get('/get-recent-books', async (req, res) => {
    try{
        const books = await Book.find().sort({createdAt: -1}).limit(4);
        return res.status(200).json({books});
    }
    catch(err){                                              
        console.log(err);   
        res.status(500).json({message: 'An error occured while fetching the books'});
    }
}
);
router.get('/get-all-books', async (req, res) => {
    try{
        const books = await Book.find();
        return res.status(200).json({books});
    }
    catch(err){                                              
        console.log(err);   
        res.status(500).json({message: 'An error occured while fetching the books'});
    }
}
);
router.get('/get-book-by-id/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({message: 'Book not found'});
        }
        return res.status(200).json({book});

    }
    catch(err){                                              
        console.log(err);   
        res.status(500).json({message: 'An error occured while fetching the book'});
    }
}
);
module.exports = router;



       