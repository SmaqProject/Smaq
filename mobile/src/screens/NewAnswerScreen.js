import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Platform, Keyboard } from 'react-native';
import Touchable from '@appandflow/touchable';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { colors } from '../utils/constants';
import CREATE_ANSWER_MUTATION from '../graphql/mutations/createAnswer';
import GET_ANSWERS_OF_QUESTION from '../graphql/queries/getAnswersOfQuestion';

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

const Input = styled.TextInput.attrs({
  multiline: true,
  placeholder: "Provide your best answer, dude!",
  maxLength: 1000,
  selectionColor: Platform.OS === 'ios' || colors.PRIMARY,
  autoFocus: true,
})`
  height: 40%;
  width: 100%;
  fontSize: 18;
  color: ${props => props.theme.SECONDARY};
`;

const AnswerButton = styled(Touchable).attrs({
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

const AnswerButtonText = styled.Text`
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

class NewAnswerScreen extends Component {
  state = {
    text: '',
  };

  _onChangeText = text => this.setState({ text });

  _onCreateAnswerPress = async () => {
    const { user } = this.props;
    const { params } = this.props.navigation.state;

    await this.props.mutate({
      variables: {
        questionId: params.questionId,
        text: this.state.text
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createAnswer: {
          __typename: 'Answer',
          questionId: params.questionId,
          text: this.state.text,
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
      update: (store, { data: { createAnswer } }) => {
        const data = store.readQuery({ query: GET_ANSWERS_OF_QUESTION, variables: { questionId: params.questionId, } });

        if (!data.getAnswersOfQuestion.find(a => a._id === createAnswer._id)) {
          store.writeQuery({ query: GET_ANSWERS_OF_QUESTION, variables: { questionId: params.questionId, }, data: { getAnswersOfQuestion: [{ ...createAnswer }, ...data.getAnswersOfQuestion] } });
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
          <Input value={this.state.text} onChangeText={this._onChangeText} />
          <TextLength>
            {this._textLength}
          </TextLength>
          <AnswerButton onPress={this._onCreateAnswerPress} disabled={this._buttonDisabled}>
            <AnswerButtonText>Answer</AnswerButtonText>
          </AnswerButton>
        </Wrapper>
      </Root>
    );
  }
}

export default compose(
  graphql(CREATE_ANSWER_MUTATION),
  connect(state => ({ user: state.user.info }))
)(NewAnswerScreen);

// export default graphql(CREATE_ANSWER_MUTATION)(NewAnswerScreen);
