import mongoose from 'mongoose';

const signInSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
    },
    password: {
        type:String,
        required:true,
        minLength: 6,
    },
    email: {
        type: String,
        required:true
    }
})
const userSign = mongoose.model('userSign',signInSchema);
export default userSign