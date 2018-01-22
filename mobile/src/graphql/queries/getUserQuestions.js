import { gql } from 'react-apollo';

export default gql`
  {
    getUserQuestions {
      title
      text
      _id
      createdAt      
      numberPeopleFollowingQuestion   
      answers{
          _id
          text
      }
    }
  }
`;
