import Answer from '../../models/Answer';
import Question from '../../models/Question';
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../config/pubsub';

const ANSWER_ADDED = 'answerAdded';

export default {
  getAnswer: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Answer.findById(_id);
    } catch (error) {
      throw error;
    }
  },
  getAnswersOfQuestion: async (_, { questionId }, { user }) => {    
    await requireAuth(user);
  
    if (!questionId) {
      throw new Error('No question id!');
    }
  
    const question = await Question.findById(questionId);
  
    if (!question) {
      throw new Error('Question not found!');
    }
  
    try {
      const answers = await Answer.find({ question: questionId });  
      
      return answers;  
    } catch (error) {
      throw error;
    }
  },
  createAnswer: async (_, { questionId, text }, { user }) => {
    try {
      await requireAuth(user);
      // questionId is the id of the question being answered
      const answer = await Answer.create({ text, user: user._id, question: questionId });

      Question.addAnswer(questionId, answer);

      pubsub.publish(ANSWER_ADDED, { [ANSWER_ADDED]: answer });

      return answer;
    } catch (error) {
      throw error;
    }
  },
  updateAnswer: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const answer = await Answer.findOne({ _id, user: user._id });

      if (!answer) {
        throw new Error('Not found!');
      }

      Object.entries(rest).forEach(([key, value]) => {
        answer[key] = value;
      });

      return answer.save();
    } catch (error) {
      throw error;
    }
  },
  deleteAnswer: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const answer = await Answer.findOne({ _id, user: user._id });

      if (!answer) {
        throw new Error('Not found!');
      }
      await answer.remove();
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  },
  answerAdded: {
    subscribe: () => pubsub.asyncIterator(ANSWER_ADDED)
  }

}