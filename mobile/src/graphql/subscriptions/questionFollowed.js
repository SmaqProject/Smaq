import { gql } from 'react-apollo';

export default gql`
  subscription {
    questionFollowed {
      _id
      numberPeopleFollowingQuestion
    }
  }
`;
