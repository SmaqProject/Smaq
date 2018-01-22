import React from 'react';
import styled from 'styled-components/native';
import Placeholder from 'rn-placeholder';

const Root = styled.View`
  minHeight: 80;
  backgroundColor: ${props => props.theme.WHITE};
  width: 100%;
  padding: 3px;
  shadowColor: ${props => props.theme.SECONDARY};
  shadowOffset: 0px 2px;
  shadowRadius: 2;
  shadowOpacity: 0.1;
  marginVertical: 5;
`;

const CardContentContainer = styled.View`
  flex: 1;
  flexDirection: column;
  padding: 2px 20px 10px 0px;
`;

const CardContentTitle = styled.Text`
  fontSize: 22;
  textAlign: left;
  fontWeight: 500;
  color: ${props => props.theme.PRIMARY};
`;

const CardContentText = styled.Text`
  fontSize: 16;
  textAlign: left;
  fontWeight: 300;
  paddingTop: 5px;
  paddingLeft: 7px;
  color: ${props => props.theme.SECONDARY};
`;

const Wrapper = styled.View`
  flex: 1;
`;


function QuestionCard({title, text, placeholder, isLoaded}) {
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
      <CardContentContainer>
        <CardContentTitle>
          {title}
        </CardContentTitle>
        <CardContentText>
          {text}
        </CardContentText>
      </CardContentContainer>
    </Root>
  )
}

export default QuestionCard;
