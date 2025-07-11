import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: [String],
  color: [String],
  images: [String]
});

const product = mongoose.model("product", productSchema);
export default product;
