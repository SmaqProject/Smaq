import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Platform, Keyboard, View, Text } from 'react-native';
import Touchable from '@appandflow/touchable';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { colors } from '../utils/constants';
import CREATE_QUESTION_MUTATION from '../graphql/mutations/createQuestion';
import GET_QUESTIONS_QUERY from '../graphql/queries/getQuestions';

const Root = styled.View`
  backgroundColor: ${props => props.theme.WHITE};
  flex: 1;
  alignItems: center;
`;

const Wrapper = styled.View`
  height: 80%;
  width: 90%;
  paddingTop: 5;
  position: relative;
`;

const TitleInput = styled.TextInput.attrs({
  multiline: false,
  placeholder: "Topic",
  underlineColorAndroid: "transparent",
  maxLength: 50,
  selectionColor: Platform.OS === 'ios' || colors.PRIMARY,
  autoFocus: true,
})`
  height: 10%;
  width: 100%;
  fontSize: 22;
  color: ${props => props.theme.SECONDARY};
`;

const TextInput = styled.TextInput.attrs({
  multiline: true,
  placeholder: "Question",
  underlineColorAndroid: "transparent",
  maxLength: 1000,
  selectionColor: Platform.OS === 'ios' || colors.PRIMARY,
  autoFocus: true,
})`
  width: 100%;
  fontSize: 14;
  color: ${props => props.theme.SECONDARY};
  paddingTop: 2%;
`;

const QuestionButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, left: 20, right: 20, bottom: 20 },
})`
  backgroundColor: ${props => props.theme.PRIMARY};
  justifyContent: center;
  alignItems: center;
  width: 80;
  height: 40;
  borderRadius: 20;
  position: absolute;
  top: 60%;
  right: 0;
`;

const QuestionButtonText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontSize: 16;
`;

const TextLength = styled.Text`
  fontSize: 18;
  color: ${props => props.theme.PRIMARY};
  position: absolute;
  top: 45%;
  right: 5%;
`;

const InputWrapper = styled.View`
height: 50;
width: 70%;
borderBottomWidth: 2;
borderBottomColor: ${props => props.theme.LIGHT_GRAY};
marginVertical: 5;
justifyContent: flex-end;
`;

const Separator = styled.View`
height: 1px;
borderTopWidth: 1px;
borderTopColor: ${props => props.theme.LIGHT_GRAY};
`;


class NewQuestionScreen extends Component {
  state = {
    title: '',
    text: '',
  };

  _onChangeText = text => this.setState({ text });

  _onChangeTitle = title => this.setState({ title });

  _onCreateQuestionPress = async () => {
    const { user } = this.props;

    await this.props.mutate({
      variables: {
        title: this.state.title,
        text: this.state.text
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createQuestion: {
          __typename: 'Question',
          title: this.state.title,
          text: this.state.text,
          numberPeopleFollowingQuestion: 0,
          _id: Math.round(Math.random() * -1000000),
          createdAt: new Date(),
          user: {
            __typename: 'User',
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar
          }
        },
      },
      update: (store, { data: { createQuestion } }) => {
        const data = store.readQuery({ query: GET_QUESTIONS_QUERY });
        if (!data.getQuestions.find(t => t._id === createQuestion._id)) {
          store.writeQuery({ query: GET_QUESTIONS_QUERY, data: { getQuestions: [{ ...createQuestion }, ...data.getQuestions] } });
        }
      }
    });

    Keyboard.dismiss();
    this.props.navigation.goBack(null);
  }

  get _textLength() {
    return 1000 - this.state.text.length;
  }

  get _buttonDisabled() {
    return this.state.text.length < 5;
  }

  render() {
    return (
      <Root>
        <Wrapper>
           <TitleInput value={this.state.title} onChangeText={this._onChangeTitle} />
           <Separator/>
           <TextInput value={this.state.text} onChangeText={this._onChangeText} />
          <TextLength>
              {this._textLength}
            </TextLength>
            <QuestionButton onPress={this._onCreateQuestionPress} disabled={this._buttonDisabled}>
              <QuestionButtonText>Ask</QuestionButtonText>
            </QuestionButton>
        </Wrapper>
      </Root>
    );
  }
}

export default compose(
  graphql(CREATE_QUESTION_MUTATION),
  connect(state => ({ user: state.user.info }))
)(NewQuestionScreen);
