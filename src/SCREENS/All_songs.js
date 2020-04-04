import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function All_songs() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>All Songs</Text>
      <Button title="GO" onPress={() => navigation.push('Lyrics_view')} />
    </View>
  );
}

export default All_songs;
