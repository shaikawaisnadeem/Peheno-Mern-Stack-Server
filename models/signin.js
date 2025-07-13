
import mongoose from 'mongoose';

const SignupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    }
})
const userLog = mongoose.model('userLog',SignupSchema);
export default userLog