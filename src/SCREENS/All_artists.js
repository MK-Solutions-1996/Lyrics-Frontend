import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
function All_artists() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>All Artists</Text>
      <Button title="GO" onPress={() => navigation.push('Single_artist')} />
    </View>
  );
}

export default All_artists;
