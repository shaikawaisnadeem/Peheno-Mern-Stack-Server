import mongoose from 'mongoose';
const MONGO_URI = 'mongodb+srv://awaisn:awais123@cluster0.1pcfw7a.mongodb.net/';

const dbConnection = async()=>{
     const mongoConnection = await mongoose.connect(MONGO_URI);
     console.log('DB Connected');
}
export default dbConnection;