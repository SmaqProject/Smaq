import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql, compose, withApollo } from 'react-apollo';
import { FlatList, StatusBar } from 'react-native';
import Touchable from '@appandflow/touchable';
import { connect } from 'react-redux';

import ProfileQuestionCard from '../../components/Profile/ProfileQuestionCard';

import { getUserInfo } from '../../actions/user';

import GET_USER_QUESTIONS from '../../graphql/queries/getUserQuestions';
import ME_QUERY from '../../graphql/queries/me';

const Root = styled.View`
  flex: 1;
  paddingTop: 5;
`;

class Activity extends Component {
  
  componentDidMount() {
    this._getUserInfo();
    StatusBar.setHidden(true);
  }

  _getUserInfo = async () => {
    const { data: { me } } = await this.props.client.query({ query: ME_QUERY });
    this.props.getUserInfo(me);
  };


  _renderPlaceholder = () => <ProfileQuestionCard placeholder isLoaded={this.props.data.loading} />

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
          data={data.getUserQuestions}
          keyExtractor={item => item._id}
          renderItem={({ item }) =>
              <Touchable feedback="opacity" onPress={() => navigate('OneQuestion', { myQuest: item })}>
                <ProfileQuestionCard {...item} />
              </Touchable>
              }
        />
      </Root>
    );
  }
}

export default withApollo(compose(
  connect(undefined, { getUserInfo }),
  graphql(GET_USER_QUESTIONS)
)(Activity));
