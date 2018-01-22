import mongoose, { Schema } from 'mongoose';

const AnswerSchema = new Schema({  
  text: {
    type: String,
    required: true,
    minLength: [10, '10 characters long at least'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
  },
}, { timestamps: true });

export default mongoose.model('Answer', AnswerSchema);
