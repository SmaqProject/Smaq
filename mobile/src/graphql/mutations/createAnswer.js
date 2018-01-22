import { gql } from 'react-apollo';

export default gql`
  mutation createAnswer($questionId: ID!, $text: String!) {
    createAnswer(questionId: $questionId, text: $text) {
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
