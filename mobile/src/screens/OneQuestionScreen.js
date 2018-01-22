import React, { Component } from 'react';
import styled from 'styled-components/native';
import { View, ActivityIndicator, FlatList } from 'react-native';
import Touchable from '@appandflow/touchable';
import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { SimpleLineIcons } from '@expo/vector-icons';
import { colors } from '../utils/constants';

import QuestionCard from '../components/QuestionCard/QuestionCard';
import AnswerCard from '../components/AnswerCard/AnswerCard';

import { getUserInfo } from '../actions/user';

import GET_ANSWERS_OF_QUESTION from '../graphql/queries/getAnswersOfQuestion';
import ME_QUERY from '../graphql/queries/me';

const Root = styled.View`
flex: 1;
paddingTop: 5;
`;
const RootQuestion = styled.View`
  backgroundColor: ${props => props.theme.WHITE};
  width: 100%;
  padding: 3px 3px 0px 3px;
  shadowColor: ${props => props.theme.SECONDARY};
  shadowOffset: 0px 2px;
  shadowRadius: 2;
  shadowOpacity: 0.1;
  marginVertical: 5;
  borderBottomColor: ${props => props.theme.PRIMARY};
`;

const RootAnswer = styled.View`
  backgroundColor: ${props => props.theme.WHITE};
  width: 100%;
  padding: 7px;
  shadowColor: ${props => props.theme.SECONDARY};
  shadowOffset: 0px 2px;
  shadowRadius: 2;
  shadowOpacity: 0.1;
  marginVertical: 5;
  justifyContent: center;
  `;
const RootButton = styled.View`
  height: 40;
  flexDirection: row;
`;

const Button = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  flex: 1;
  flexDirection: row;
  alignItems: center;
  justifyContent: space-around;
`;
const ButtonText = styled.Text`
  fontSize: 17;
  fontWeight: 500;
  alignItems: center;
  justifyContent: space-between;
  color: ${props => props.theme.LIGHT_GRAY};
`;

const Separator = styled.View`
height: 1px;
borderTopWidth: 0.5px;
borderTopColor: ${props => props.theme.PRIMARY};
`;

class OneQuestionScreen extends Component {
  state = { };

  componentDidMount() {
    this._getUserInfo();
  }

  _getUserInfo = async () => {
    const { data: { me } } = await this.props.client.query({ query: ME_QUERY });
    this.props.getUserInfo(me);
  };

  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    const { data } = this.props;


    if(data.loading){
      return (
        <Root>
          <ActivityIndicator size="large" />
        </Root>
      )
    }

    return (
      <View>
        <RootQuestion>
          <QuestionCard {...params.myQuest}/>
          <Separator/>
          <RootButton>
            <Button>
              <Touchable onPress={() => navigate('NewAnswer', { questionId: params.myQuest._id })} >
                  <ButtonText>
                    <SimpleLineIcons color={colors.LIGHT_GRAY} size={20} name="pencil" />
                    Answer
                  </ButtonText>
              </Touchable>
            </Button>
          </RootButton>

        </RootQuestion>
          <RootAnswer>
          <FlatList
            contentContainerStyle={{ alignSelf: 'stretch' }}
            data={data.getAnswersOfQuestion}
            keyExtractor={item => item._id}
            renderItem={({ item }) =>
              <AnswerCard {...item}/>
                }
          />
          </RootAnswer>
      </View>
    );
  }
}

export default withApollo(compose(
  connect(undefined, { getUserInfo }),
  graphql(GET_ANSWERS_OF_QUESTION, {
    options: ({ navigation }) => ({ variables: { questionId: navigation.state.params.myQuest._id} }),
  })
)(OneQuestionScreen));
