import mongoose from 'mongoose';

const mongooseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userSign'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    quantity: {
        type: Number,
        default: 1,
    }
});

const addtocart = mongoose.model('Addtocart', mongooseSchema);
export default addtocart;