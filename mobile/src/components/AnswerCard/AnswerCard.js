import React from 'react';
import styled from 'styled-components/native';
import Placeholder from 'rn-placeholder';

import AnswerCardHeader from './AnswerCardHeader';
import { fakeAvatar } from '../../utils/constants';

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

const Separator = styled.View`
height: 1px;
borderTopWidth: 1px;
borderTopColor: ${props => props.theme.LIGHT_GRAY};
`;


function AnswerCard({text, user, avatar, createdAt, placeholder, isLoaded}) {
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
      <AnswerCardHeader {...user} createdAt={createdAt} />
      <CardContentContainer>
        <CardContentText numberOfLines={3}>
          {text}
        </CardContentText>
      </CardContentContainer>

      <Separator/>

    </Root>
  )
}

export default AnswerCard;
