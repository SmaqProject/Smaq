import GraphQLDate from 'graphql-date';

import QuestionResolvers from './question-resolvers';
import AnswerResolvers from './answer-resolvers';
import UserResolvers from './user-resolvers';
import User from '../../models/User';

export default {
  Date: GraphQLDate,
  Question: {
    user: ({ user }) => User.findById(user),
  },
  Answer: {
    user: ({ user }) => User.findById(user),
  },
  Query: {
    getQuestion: QuestionResolvers.getQuestion,
    getQuestions: QuestionResolvers.getQuestions,
    getUserQuestions: QuestionResolvers.getUserQuestions,
    getAnswer: AnswerResolvers.getAnswer,
    getAnswersOfQuestion: AnswerResolvers.getAnswersOfQuestion,
    me: UserResolvers.me
  },
  Mutation: {
    createQuestion: QuestionResolvers.createQuestion,
    updateQuestion: QuestionResolvers.updateQuestion,
    deleteQuestion: QuestionResolvers.deleteQuestion,
    createAnswer: AnswerResolvers.createAnswer,
    updateAnswer: AnswerResolvers.updateAnswer,
    deleteAnswer: AnswerResolvers.deleteAnswer,
    followedQuestion: QuestionResolvers.followedQuestion,
    signup: UserResolvers.signup,
    login: UserResolvers.login
  },
  Subscription: {
    questionAdded: QuestionResolvers.questionAdded,
    questionFollowed: QuestionResolvers.questionFollowed,
    answerAdded: AnswerResolvers.answerAdded,
  }
};
