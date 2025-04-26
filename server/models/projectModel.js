import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
   title: { type: String, required: true },
   category: { type: String, required: true },
   thumbnail: { type: String, required: true },
   pitch: { type: String, required: true },
   location: { type: String, required: true },
   overview: { type: String, required: true },
   problemSolution: { type: String, required: true },
   goal: { type: Number, required: true },
   duration: { type: Number, required: true },
   minInvestment: { type: Number, required: true },
   impact: { type: String, required: true },
   creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
   },
   currentFunding: { type: Number, default: 0 },
   status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed', 'active'],
      default: 'pending'
   }
}, { timestamps: true });

const projectModel = mongoose.models.projects || mongoose.model('projects', projectSchema);

export default projectModel;
