export default `
  scalar Date

  type Status {
    message: String!
  }

  type Auth {
    token: String!
  }

  type User {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Me {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Question {
    _id: ID!
    title: String!
    text: String!
    user: User!
    isFollowed: Boolean
    numberPeopleFollowingQuestion: Int!
    answers: [Answer]
    createdAt: Date!
    updatedAt: Date!
  }

  type Answer {
    _id: ID!
    text: String!
    user: User!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getQuestion(_id: ID!): Question
    getQuestions: [Question]
    getUserQuestions: [Question]
    getAnswer(_id: ID!): Answer
    getAnswersOfQuestion(questionId: ID!): [Answer]
    me: Me
  }

  type Mutation {
    createQuestion(title: String, text: String!): Question
    updateQuestion(_id: ID!, text: String): Question
    deleteQuestion(_id: ID!): Status
    followedQuestion(_id: ID!): Question
    createAnswer(questionId: ID!, text: String!): Answer
    updateAnswer(_id: ID!, text: String): Answer
    deleteAnswer(_id: ID!): Status
    signup(email: String!, fullName: String!, password: String!, avatar: String, username: String): Auth
    login(email: String!, password: String!): Auth
  }

  type Subscription {
    questionAdded: Question
    questionFollowed: Question
    answerAdded: Answer
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
