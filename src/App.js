import React from 'react';
import { StatusBar } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';

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

import { HEADER_HEIGHT, HEIGHT, WIDTH } from './CONSTANTS/Sizes';
import Header_image from './COMPONENTS/Header_image';
import {
  col_primary,
  col_secondary,
  col_white,
  col_off_white,
} from './CONSTANTS/Colors';

import { Provider } from 'react-redux';
import Store from './REDUX/Store';



//const BottomTab = createMaterialBottomTabNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const statusBarHeight = StatusBar.currentHeight;

const HeaderBackground = () => {
  return (
    <LinearGradient
      colors={[col_primary, col_secondary]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
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
        headerLeft: () => <Header_image />,
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
        headerLeft: () => <Header_image />,
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

function Likes_stack_navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        //headerShown: false,
        headerBackground: () => <HeaderBackground />,
        headerStyle: {
          height: HEADER_HEIGHT,
        },
        headerLeft: () => <Header_image />,
      }}>
      <Stack.Screen
        name="Likes"
        component={Likes_screen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          title: s_app_title,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}
function PlayList_stack_navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        //headerShown: false,
        headerBackground: () => <HeaderBackground />,
        headerStyle: {
          height: HEADER_HEIGHT,
        },
        headerLeft: () => <Header_image />,
      }}>
      <Stack.Screen
        name="Playlist"
        component={Playlist_screen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          title: s_app_title,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

// function Others_top_tab_navigation() {
//   return (
//     <TopTab.Navigator
//       swipeEnabled={false}
//       tabBarOptions={{
//         activeTintColor: '#fff',
//         indicatorStyle: {
//           backgroundColor: 'transparent',
//         },
//         //labelStyle: {fontSize: 12},
//         //tabStyle: {height: HEADER_HEIGH},
//         style: {
//           backgroundColor: 'transparent',
//           position: 'absolute',
//           left: 0,
//           right: 0,
//         },
//       }}>
//       <TopTab.Screen name={s_likes} component={Likes_screen} />
//       <TopTab.Screen name={s_playlists} component={Playlist_screen} />
//     </TopTab.Navigator>
//   );
// }

// function others_stack_navigation() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         //headerShown: false,
//         headerBackground: () => <HeaderBackground />,
//         headerStyle: {
//           height: HEADER_HEIGHT,
//         },
//         headerLeft: () => <Header_image />,
//       }}>
//       <Stack.Screen
//         name={s_app_title}
//         component={Others_top_tab_navigation}
//         options={{
//           ...TransitionPresets.SlideFromRightIOS,
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//           headerStyle: {
//             //height: 160, // Specify the height of your custom header
//             //position: 'absolute',
//           },
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

// modal transition ...TransitionPresets.SlideFromRightIOS,.ModalPresentationIOS
// Transparent modals => search for "Transparent modals"

const Bottom_tab_navigation = () => {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        tabStyle: { backgroundColor: col_primary },
        activeTintColor: col_white,
        inactiveTintColor: col_off_white,
        //keyboardHidesTabBar: true,
      }}>
      <BottomTab.Screen
        name="All_songs"
        component={All_songs_stack_navigation}
        options={{
          tabBarLabel: s_songs,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="music"
              color={color}
              size={HEIGHT(20)}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="All_artists"
        component={All_artists_stack_navigation}
        options={{
          tabBarLabel: s_artists,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="microphone"
              color={color}
              size={HEIGHT(20)}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Likes"
        component={Likes_stack_navigation}
        options={{
          tabBarLabel: s_likes,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="heart"
              color={color}
              size={HEIGHT(20)}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Playlist"
        component={PlayList_stack_navigation}
        options={{
          tabBarLabel: s_playlists,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="list-alt"
              color={color}
              size={HEIGHT(20)}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Bottom_tab_navigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
