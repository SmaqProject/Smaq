import React from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

import { colors } from '../../utils/constants';

const ICON_SIZE = 20;

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

const Button2 = styled(Touchable).attrs({
  feedback: 'opacity',
})`
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

function FeedCardBottom({ answersCount, numberPeopleFollowingQuestion, onFavoritePress, isFollowed }) {
  return (
    <Root>
      <Button1>
        <ButtonText>
          Answers: { answersCount }
        </ButtonText>
      </Button1>
      <Button2 onPress={onFavoritePress}>
        <ButtonText style={{ color: isFollowed ? colors.PRIMARY : colors.LIGHT_GRAY }} >
          Following: {numberPeopleFollowingQuestion}
        </ButtonText>
      </Button2>
    </Root>
  );
}

export default FeedCardBottom;
