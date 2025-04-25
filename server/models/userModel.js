import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   fullName: { type: String, required: true, },
   email: { type: String, required: true, unique: true, },
   password: { type: String, required: true, },
   role: { type: String, enum: ['creator', 'investor'], required: true, },
   createdAt: { type: Date, default: Date.now, }
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
