import React from 'react';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import Placeholder from 'rn-placeholder';

import FeedCardHeader from './FeedCardHeader';
import FeedCardBottom from './FeedCardBottom';
import { fakeAvatar } from '../../utils/constants';
import FOLLOWED_QUESTION_MUTATION from '../../graphql/mutations/followedQuestion';

const Root = styled.View`
  minHeight: 180;
  backgroundColor: ${props => props.theme.WHITE};
  width: 100%;
  padding: 7px;
  shadowColor: ${props => props.theme.SECONDARY};
  shadowOffset: 0px 2px;
  shadowRadius: 2;
  shadowOpacity: 0.1;
  marginVertical: 5;
`;

const CardContentContainer = styled.View`
  flex: 1;
  flexDirection: row;
  padding: 10px 20px 10px 0px;
`;

const CardContentText = styled.Text`
  flex: 0.8;
  fontSize: 14;
  textAlign: left;
  fontWeight: 500;
  color: ${props => props.theme.SECONDARY};
`;

const Wrapper = styled.View`
  flex: 1;
`;


function FeedCard({
    title,
    text,
    user,
    avatar,
    createdAt,
    numberPeopleFollowingQuestion,
    favorite,
    isFollowed,
    answers,
    placeholder,
    isLoaded
}) {
    if (placeholder){
      return(
        <Root>
          <Placeholder.ImageContent
            onReady={!isLoaded}
            lineNumber={2}
            animate="shine"
            LastLineWidth="40%"
          >
            <Wrapper />
          </Placeholder.ImageContent>
        </Root>
      )
    }

  return(
    <Root>
      <FeedCardHeader {...user} title={title} createdAt={createdAt} />
      <CardContentContainer>
        <CardContentText numberOfLines={3}>
          {text}
        </CardContentText>
      </CardContentContainer>
      <FeedCardBottom
        answersCount={answers.length}
        isFollowed={isFollowed}
        numberPeopleFollowingQuestion={numberPeopleFollowingQuestion}
        onFavoritePress={favorite}
      />
    </Root>
  )
}

export default graphql(FOLLOWED_QUESTION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    favorite: () =>
      mutate({
        variables: { _id: ownProps._id },
        optimisticResponse: {
          __typename: 'Mutation',
          followedQuestion: {
            __typename: 'Question',
            _id: ownProps._id,
            numberPeopleFollowingQuestion: ownProps.isFollowed
              ? ownProps.numberPeopleFollowingQuestion - 1
              : ownProps.numberPeopleFollowingQuestion + 1,
            isFollowed: !ownProps.isFollowed,
          },
        },
      }),
  }),
})(FeedCard);
