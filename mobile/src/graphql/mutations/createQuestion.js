import { gql } from 'react-apollo';

export default gql`
  mutation createQuestion($title: String, $text: String!) {
    createQuestion(title: $title, text: $text) {
      numberPeopleFollowingQuestion
      _id
      createdAt
      title
      text      
      isFollowed
      answers {
        _id
        text
      }
      user {
        avatar
        username
        firstName
        lastName
      }
    }
  }
`;
