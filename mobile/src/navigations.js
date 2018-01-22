import React, { Component } from 'react';
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import { Keyboard, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome, SimpleLineIcons, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

import HomeScreen from './screens/HomeScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';
import NewQuestionScreen from './screens/NewQuestionScreen';
import NewAnswerScreen from './screens/NewAnswerScreen';
import OneQuestionScreen from './screens/OneQuestionScreen';
import Profile from './screens/ProfileTabs/Profile';
import Activity from './screens/ProfileTabs/Activity';

import HeaderAvatar from './components/HeaderAvatar';
import ButtonHeader from './components/ButtonHeader';

import { colors } from './utils/constants';

const TAB_ICON_SIZE = 20;

const CloseButton = styled(Touchable)`
marginLeft: 10;
`;

const ProfileTabs = TabNavigator ({
  Profile: { screen: Profile },
  Activity: { screen: Activity },
},
  {
    lazy: true,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: false,
    tabBarOptions: {
      indicatorStyle: { backgroundColor: 'transparent' },
      showLabel: true,
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: colors.LIGHT_GRAY,
      labelStyle: {
        fontSize: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
      },
      style: {
        backgroundColor: colors.WHITE,
        height: 40,
},
    },
  },);

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Home',
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <ButtonHeader
            side="right"
            onPress={() => navigation.navigate('NewQuestion')}
          >
            <SimpleLineIcons color={colors.WHITE} size={20} name="pencil" />
          </ButtonHeader>
        ),
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="home" />,
      }),
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: () => ({
        headerTitle: 'Notifications',
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="bell" />,
      }),
    },
    Profile: {
      screen: ProfileTabs,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Profile',
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <ButtonHeader
            side="right"
            onPress={() => navigation.navigate('NewQuestion')}
          >
            <SimpleLineIcons color={colors.WHITE} size={20} name="pencil" />
          </ButtonHeader>
        ),
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="user" />,
      }),
    },
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      indicatorStyle: { backgroundColor: 'transparent' },
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: colors.LIGHT_GRAY,
      style: {
        backgroundColor: colors.WHITE,
        height: 50,
      },
    },
  },
);

const NewQuestionModal = StackNavigator(
  {
    NewQuestion: {
      screen: NewQuestionScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <ButtonHeader
            side="right"
            onPress={() => {
              Keyboard.dismiss();
              navigation.goBack(null);
            }}
          >
            <EvilIcons color={colors.WHITE} size={25} name="close" />
          </ButtonHeader>
        ),
      }),
    },
  },
  {
    headerMode: 'none',
  },
);

const NewAnswerModal = StackNavigator(
  {
    NewAnswer: {
      screen: NewAnswerScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <ButtonHeader
            side="right"
            onPress={() => {
              Keyboard.dismiss();
              navigation.goBack(null);
            }}
          >
            <EvilIcons color={colors.WHITE} size={25} name="close" />
          </ButtonHeader>
        ),
      }),
    },
  },
  {
    headerMode: 'none',
  },
);

const AppMainNav = StackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    NewQuestion: {
      screen: NewQuestionModal,
    },
    NewAnswer: {
      screen: NewAnswerModal,
    },
    OneQuestion: {
      screen: OneQuestionScreen,
      navigationOptions: ({ navigation }) => ({
          headerLeft: (
              <CloseButton feedback="opacity" onPress={() => navigation.goBack()}>
                <MaterialIcons
                    name="close"
                    color={colors.WHITE}
                    size={30}
                />
              </CloseButton>
          ),
      }),
    },
  },
  {
    mode: 'modal',
    cardStyle: {
      backgroundColor: '#F1F6FA',
    },
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: colors.PRIMARY,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.WHITE,
        alignSelf: 'center',
      },
    }),
  },
);

class AppNavigator extends Component {
  render() {
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });
    if (!this.props.user.isAuthenticated) {
      return <AuthenticationScreen />;
    }
    return <AppMainNav navigation={nav} />;
  }
}

export default connect(state => ({
  nav: state.nav,
  user: state.user,
}))(AppNavigator);

export const router = AppMainNav.router;
