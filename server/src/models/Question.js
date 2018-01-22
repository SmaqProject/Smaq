import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
  title: {
    type: String,
    default: '',
    // required: true,
    minLength: [5, 'title must be at least 5 characters'],
  },
  text: {
    type: String,
    minlength: [5, 'Text need to be longer'],
    maxlength: [1000, 'Text too long'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  numberPeopleFollowingQuestion: {
    type: Number,
    default: 0
  },
  answerCount: {
      type: Number,
      default: 0
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  }],
}, { timestamps: true });

QuestionSchema.statics = {
  incQuestionCount(questionId) {
    return this.findByIdAndUpdate(questionId, { $inc: { numberPeopleFollowingQuestion: 1} }, {new: true });
  },
  decQuestionCount(questionId) {
    return this.findByIdAndUpdate(questionId, { $inc: { numberPeopleFollowingQuestion: -1} }, {new: true });
  }
}

QuestionSchema.statics.addAnswer = async function (id, answer) {
  // We add the answer to the question by using the id of the question
  // And we push the answer in the answers array 
  await this.findByIdAndUpdate(id, { $push: { answers: answer.id } });

  return {
    answer: await answer.save(),
  };
};


export default mongoose.model('Question', QuestionSchema);
