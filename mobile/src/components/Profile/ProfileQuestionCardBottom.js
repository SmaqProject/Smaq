import React from 'react';
import styled from 'styled-components/native';

import { colors } from '../../utils/constants';


const Root = styled.View`
  height: 40;
  flexDirection: row;
`;

const Button1 = styled.Text`
  flex: 1;
  flexDirection: row;
  textAlignVertical: center;
  textAlign: center;
`;

const Button2 = styled.Text`
  flex: 1;
  flexDirection: row;
  alignItems: center;
  justifyContent: space-around;
`;

const ButtonText = styled.Text`
  fontSize: 14;
  fontWeight: 500;
  color: ${props => props.theme.LIGHT_GRAY};
`;

function ProfileQuestionCardBottom({ answersCount, numberPeopleFollowingQuestion }) {
  return (
    <Root>
      <Button1>
        <ButtonText>
        Answers: { answersCount }
        </ButtonText>
      </Button1>
      <Button2>
        <ButtonText style={{ color: colors.PRIMARY }} >
          Followers: {numberPeopleFollowingQuestion}
        </ButtonText>
      </Button2>
    </Root>
  );
}

export default ProfileQuestionCardBottom;
