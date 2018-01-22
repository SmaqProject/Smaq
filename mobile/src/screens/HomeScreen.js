import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql, compose, withApollo } from 'react-apollo';
import { FlatList, StatusBar } from 'react-native';
import Touchable from '@appandflow/touchable';
import { connect } from 'react-redux';

import FeedCard from '../components/FeedCard/FeedCard';

import { getUserInfo } from '../actions/user';

import GET_QUESTIONS_QUERY from '../graphql/queries/getQuestions';
import ME_QUERY from '../graphql/queries/me';
import QUESTION_ADDED_SUBSCRIPTION from '../graphql/subscriptions/questionAdded';
import QUESTION_FOLLOWED_SUBSCRIPTION from '../graphql/subscriptions/questionFollowed';

const Root = styled.View`
  flex: 1;
  paddingTop: 5;
`;

class HomeScreen extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: QUESTION_ADDED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newQuestion = subscriptionData.data.questionAdded;

        if (!prev.getQuestions.find(q => q._id === newQuestion._id)) {
          return {
            ...prev,
            getQuestions: [{ ...newQuestion }, ...prev.getQuestions]
          }
        }

        return prev;
      }
    });

    this.props.data.subscribeToMore({
      document: QUESTION_FOLLOWED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newQuestion = subscriptionData.data.questionFollowed;
        return {
          ...prev,
          getQuestions: prev.getQuestions.map(
            question =>
              question._id === newQuestion._id
                ? {
                  ...question,
                  numberPeopleFollowingQuestion: newQuestion.numberPeopleFollowingQuestion,
                }
                : question,
          ),
        };
      },
    });
  }

  componentDidMount() {
    this._getUserInfo();
    StatusBar.setHidden(true);
  }

  _getUserInfo = async () => {
    const { data: { me } } = await this.props.client.query({ query: ME_QUERY });
    this.props.getUserInfo(me);
  };


  _renderPlaceholder = () => <FeedCard placeholder isLoaded={this.props.data.loading} />

  render() {
    const { data } = this.props;
    const { navigate } = this.props.navigation;

    if (data.loading) {
      return (
        <Root>
          <FlatList
            contentContainerStyle={{ alignSelf: 'stretch' }}
            data={[1, 2, 3]}
            renderItem={this._renderPlaceholder}
            keyExtractor={item => item}
          />
        </Root>
      );
    }
    return (
      <Root>
        <FlatList
          contentContainerStyle={{ alignSelf: 'stretch' }}
          data={data.getQuestions}
          keyExtractor={item => item._id}
          renderItem={({ item }) =>
              <Touchable feedback="opacity" onPress={() => navigate('OneQuestion', { myQuest: item })}>
                <FeedCard {...item} />
              </Touchable>
              }
        />
      </Root>
    );
  }
}

export default withApollo(compose(
  connect(undefined, { getUserInfo }),
  graphql(GET_QUESTIONS_QUERY)
)(HomeScreen));
