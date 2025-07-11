import express from 'express';
import dbConnection from './config/db.js';
import product from './models/pehenoProducts.js';
import cors from 'cors'

const app = express();
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
