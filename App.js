import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';

const App = () => {
  return (
    <LinearGradient
      colors={['#4F1271', '#783F8E', '#BFACC8']}
      style={styles.linearGradient}>
      <StatusBar backgroundColor="#4F1271" />
      <Text style={styles.buttonText}>ලිරික්ස් ඇප් එක​</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: '25%',
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default App;
