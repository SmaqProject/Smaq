import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../../utils/constants';

class Profile extends Component {
  state = {  };
  render() {
    return (
      <View style={styles.container}>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  },
});

export default Profile;
