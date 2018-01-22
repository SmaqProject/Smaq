import Question from '../../models/Question';
import FollowedQuestion from '../../models/FollowedQuestion';
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../config/pubsub';

const QUESTION_ADDED = 'questionAdded';
export const QUESTION_FOLLOWED = 'questionFollowed';

export default {
  getQuestion: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const quest = Question.findById(_id).populate('answers');
 
      return quest;
    } catch (error) {
      throw error;
    }
  },
  getQuestions: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const p1 = Question.find({}).sort({ createdAt: -1 }).populate('answers');
      const p2 = FollowedQuestion.findOne({ userId: user._id }).populate('answers');
      const [questions, favorites] = await Promise.all([p1, p2]);
            
      const questionsToSend = questions.reduce((arr, question) => {
          const qu = question.toJSON();

          if (favorites.questions.some(q => q.equals(question._id))) {
              arr.push({
                  ...qu,
                  isFollowed: true,
              });
          } else {
              arr.push({
                  ...qu,
                  isFollowed: false,
              })
          }

          return arr;
      }, []);

      return questionsToSend
      
    } catch (error) {
      throw error;
    }
  },
  getUserQuestions: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Question.find({ user: user._id }).sort({ createdAt: -1 }).populate('answers')
    } catch (error) {
      throw error;
    }
  },
  createQuestion: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const question = await Question.create({ ...args, user: user._id });
      question.populate('answers');

      pubsub.publish(QUESTION_ADDED, { [QUESTION_ADDED]: question });

      return question;
    } catch (error) {
      throw error;
    }
  },
  updateQuestion: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const question = await Question.findOne({ _id, user: user._id });

      if (!question) {
        throw new Error('Not found!');
      }

      Object.entries(rest).forEach(([key, value]) => {
        question[key] = value;
      });

      return question.save();
    } catch (error) {
      throw error;
    }
  },
  deleteQuestion: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const question = await Question.findOne({ _id, user: user._id });

      if (!question) {
        throw new Error('Not found!');
      }
      await question.remove();
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  },
  followedQuestion: async (_, { _id }, { user }) => {
    try {
        await requireAuth(user);
        const followed = await FollowedQuestion.findOne ({ userId: user._id });

        return followed.userFollowedQuestion(_id);
      } catch (error) {
        throw error;
      }
  },
  questionAdded: {
    subscribe: () => pubsub.asyncIterator(QUESTION_ADDED)
  },
  questionFollowed: {
    subscribe: () => pubsub.asyncIterator(QUESTION_FOLLOWED),
  }
};
