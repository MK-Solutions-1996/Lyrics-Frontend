import React from 'react';
import {StatusBar} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

import All_songs_screen from './SCREENS/All_songs';
import All_artists_screen from './SCREENS/All_artists';
import Likes_screen from './SCREENS/Likes';
import Playlist_screen from './SCREENS/Playlist';
import Others_screen from './SCREENS/Others';
import Single_artist_screen from './SCREENS/Single_artist';
import Lyrics_view_screen from './SCREENS/Lyrics_view';

import {
  s_songs,
  s_artists,
  s_likes,
  s_playlists,
  s_others,
  s_app_title,
} from './CONSTANTS/Sinhala';

import {HEADER_HEIGHT} from './CONSTANTS/Sizes';

const BottomTab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const statusBarHeight = StatusBar.currentHeight;

const HeaderBackground = () => {
  return (
    <LinearGradient
      // colors={[
      //   ' rgba(201,45,253,1) ',
      //   'rgba(143,46,235,0.9) ',
      //   'rgba(107,42,210,0.9) ',
      //   'rgba(125,48,216,1) ',
      //   'rgba(118,62,255,1) ',
      //   'rgba(107,42,210,0.9) ',
      // ]}
      //colors={['#13547a', '#80d0c7']}
      //colors={['#c79081', '#dfa579']}
      //colors={['#09203f', '#537895']}
      colors={['#667eea', '#764ba2']}
      style={{flex: 1}}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
    </LinearGradient>
  );
};

function All_songs_stack_navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        //headerShown: false,
        headerBackground: () => <HeaderBackground />,
        headerStyle: {
          height: HEADER_HEIGHT,
        },
      }}>
      <Stack.Screen
        name="All_songs"
        component={All_songs_screen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          title: s_app_title,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Lyrics_view"
        component={Lyrics_view_screen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function All_artists_stack_navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        //headerShown: false,
        headerBackground: () => <HeaderBackground />,
        headerStyle: {
          height: HEADER_HEIGHT,
        },
      }}>
      <Stack.Screen
        name="All_artists"
        component={All_artists_screen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          title: s_app_title,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Single_artist"
        component={Single_artist_screen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function Others_top_tab_navigation() {
  return (
    <TopTab.Navigator
      //timingConfig={5000}
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: '#fff',
        indicatorStyle: {
          backgroundColor: 'transparent',
        },
        //labelStyle: {fontSize: 12},
        //tabStyle: {height: HEADER_HEIGH},
        style: {
          backgroundColor: 'transparent',
          position: 'absolute',
          //top: 0,
          left: 0,
          right: 0,
          //bottom: 20,
        },
      }}>
      <TopTab.Screen name={s_likes} component={Likes_screen} />
      <TopTab.Screen name={s_playlists} component={Playlist_screen} />
    </TopTab.Navigator>
  );
}

function others_stack_navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        //headerShown: false,
        headerBackground: () => <HeaderBackground />,
        headerStyle: {
          height: HEADER_HEIGHT,
        },
      }}>
      <Stack.Screen
        name={s_app_title}
        component={Others_top_tab_navigation}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            //height: 160, // Specify the height of your custom header
            //position: 'absolute',
          },
        }}
      />
    </Stack.Navigator>
  );
}

// modal transition ...TransitionPresets.SlideFromRightIOS,.ModalPresentationIOS
// Transparent modals => search for "Transparent modals"

const Bottom_tab_navigation = () => {
  return (
    <BottomTab.Navigator
      //initialRouteName={s_so}
      activeColor="#fff"
      inactiveColor="rgba(255,255,255,0.5)"
      barStyle={{backgroundColor: '#667eea'}}>
      <BottomTab.Screen name={s_songs} component={All_songs_stack_navigation} />
      <BottomTab.Screen
        name={s_artists}
        component={All_artists_stack_navigation}
      />
      <BottomTab.Screen name={s_others} component={others_stack_navigation} />
    </BottomTab.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Bottom_tab_navigation />
    </NavigationContainer>
  );
}

export default App;
