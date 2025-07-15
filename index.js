import express from 'express';
import dbConnection from './config/db.js';
import product from './models/pehenoProducts.js';
import cors from 'cors';
import userLog from './models/signup.js';
import userSign from './models/signin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import addtocart from './models/AddtoCart.js';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json())
app.use(cookieParser());

const port = 3000;
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));

app.use(express.json()); 
dbConnection();

app.post('/api/data/products', async (req, res) => {
  try {
    const { gender, category, price, name, description, size, color, images } = req.body;

    const newProduct = await product.create({
  gender,
  category,
  price,
  name,
  description,
  size,
  color,
  images
});


    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
});

app.get('/',async(req,res)=>{
    const data = await product.find({});
    res.status(201).json({
      data,
    })
})

app.post('/api/data/signup', async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await userSign.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userSign.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User signed up successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
});

app.post('/api/data/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await userSign.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const jwt_token = jwt.sign({ email: foundUser.email }, 'yourSecretKey');

    res.status(200).json({
      message: 'Login successful',
      jwt_token,
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
