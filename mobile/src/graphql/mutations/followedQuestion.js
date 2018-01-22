import { gql } from 'react-apollo';

export default gql`
  mutation followedQuestion($_id: ID!) {
    followedQuestion(_id: $_id) {
      isFollowed
      numberPeopleFollowingQuestion
      _id
    }
  }
`;
