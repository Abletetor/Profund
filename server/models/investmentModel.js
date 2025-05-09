import mongoose from 'mongoose';

export const investmentSchema = new mongoose.Schema({
   investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
   },
   amount: {
      type: Number,
      required: true
   },
   paymentRef: {
      type: String,
      required: true
   },
   investedAt: {
      type: Date,
      default: Date.now
   },
   expectedReturn: {
      type: Number,
   },
   repaymentDueDate: {
      type: Date,
   },
   isRepaid: {
      type: Boolean,
      default: false
   },
   repaidAt: {
      type: Date
   }
}, { _id: false });

const investmentModel = mongoose.models.investments || mongoose.model('investments', investmentSchema);

export default investmentModel;
