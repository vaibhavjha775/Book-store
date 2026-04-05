const router = require('express').Router();
const User = require('../usermodel/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {authenticate} = require('./userAuth');

// router.post('/sign-up', async (req, res) => {

//     try{
//        const {username, email, password,address} = req.body;
//        if(username.length<4){
//               return res.status(400).json({message: 'Username must be at least 4 characters long'});
//        }

//        const existingUser = await User.findOne({username: username});
//          if(existingUser){
//                   return res.status(400).json({message: 'Username already exists'});
//          }
//          const existingEmail = await User.findOne({email: email});
//          if(existingEmail){
//                   return res.status(400).json({message: 'Email already exists'});
//          }
//          if(password.length<6){
//               return res.status(400).json({message: 'Password must be at least 6 characters long'});
//          }
//          const hashpassword = await bcrypt.hash(password, 10);
//          if(!hashpassword){
//               return res.status(500).json({message: 'Error hashing password'});
//          }
//          const newUser = new User({
//             username: username,
//             email: email,
//             password: hashpassword,
//             address: address
              
//          });
//          await newUser.save();
//          return res.status(200).json({message: 'sign-up successfully'});
//     }
//     catch(err){                                              
//         console.log(err);   
//         res.status(500).json({message: 'Internal server error'});
//     }
// });
router.post('/sign-up', async (req, res) => {
  const { username, email, password ,address} = req.body;
   console.log('Signup Request Body:', req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
            username: username,
            email: email,
            password:hashedPassword,
            address: address
              
         });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/sign-in', async (req, res) => {
  console.log("SIGNIN request body:", req.body);

  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const authclass = {
      username: existingUser.username,
      role: existingUser.role
    };

    const token = jwt.sign({ authclass }, "bookstore123", { expiresIn: '30d' });

    return res.status(200).json({
      id: existingUser._id,
      token: token,
      role: existingUser.role
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// router.post('/sign-in', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1d' });

//     res.status(200).json({ message: 'Login successful', token, username: user.username });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// router.get('/getuser',authenticate, async (req, res) => {       
//     try{
//         const {id} = req.headers;
//         const data = await User.findById(id).select("-password");
        
//         return res.status(200).json(data);
//     }
//     catch(err){                                              
//         console.log(err);   
//         res.status(500).json({message: 'Internal server error'});
//     }
// });
router.put('/update-address',authenticate, async (req, res) => {       
    try{
        const {id} = req.headers;
        const { address} = req.body;
         await User.findByIdAndUpdate(id,{ address: address});
        
        return res.status(200).json({message: 'Address updated successfully'});
    }
    catch(err){                                              
        console.log(err);   
        res.status(500).json({message: 'Internal server error'});
    }
});
module.exports = router;