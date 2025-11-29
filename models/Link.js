import mongoose from 'mongoose';


const linkSchema = new mongoose.Schema({
code: { type: String, required: true, unique: true },
url: { type: String, required: true },
createdAt: { type: Date, default: Date.now },
clicks: { type: Number, default: 0 }
});


export default mongoose.model('Link', linkSchema);