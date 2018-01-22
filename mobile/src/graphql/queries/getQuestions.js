import { gql } from 'react-apollo';

export default gql`
  {
    getQuestions {
      title
      text
      _id
      createdAt
      isFollowed
      numberPeopleFollowingQuestion   
      answers{
        _id
        text
      }
      user {
        username
        avatar
        lastName
        firstName
      }
    }
  }
`;
