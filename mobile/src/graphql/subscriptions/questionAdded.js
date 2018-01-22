import { gql } from 'react-apollo';

export default gql`
  subscription {
    questionAdded {
      title
      text
      _id
      createdAt
      numberPeopleFollowingQuestion
      isFollowed
      user {
        username
        avatar
        firstName
        lastName
      }
    }
  }
`;
