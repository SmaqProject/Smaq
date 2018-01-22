import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { colors, fakeAvatar } from '../../utils/constants';

export default class Header extends Component {
  state = {  };
  render() {
    return (
      <View style={styles.headerBackground}>
        <View style={styles.header}>
          <View style={styles.profilePicWrap}>
            <Image style={styles.profilePic} source={{uri: fakeAvatar}} />
          </View>

          <Text style={styles.name}>JUNES NAJAH</Text>
          <Text style={styles.username}>@IAMADIYPIONEER</Text>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerBackground: {
    flex: 0.4,
    width: null,
    alignSelf: 'stretch',
    backgroundColor: colors.SECONDARY
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profilePicWrap: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 16
  },
  profilePic: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 4
  },
  name: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  username: {
    fontSize: 14,
    color: '#0394c0',
    fontWeight: '300',
    fontStyle: 'italic'
  }
});

