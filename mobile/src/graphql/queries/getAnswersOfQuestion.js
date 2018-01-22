import { gql } from 'react-apollo';

export default gql`
query getAnswersOfQuestion($questionId: ID!) {
  getAnswersOfQuestion(questionId: $questionId) {
    _id
    createdAt
    text
    user {
      avatar
      username
      firstName
      lastName
    }
  }
}
`;
