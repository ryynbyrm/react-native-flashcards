import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { white, blue, pink } from './src/utils/colors'
import { Provider } from 'react-redux'
import reducer from './src/reducers'
import middleware from './src/middleware'
import { createStore } from 'redux'
import { TabNavigator, StackNavigator} from 'react-navigation'
import { setLocalNotification } from "./src/utils/helpers";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DeckList from "./src/components/DeckList";
import AddDeck from "./src/components/AddDeck";
import AddCard from "./src/components/AddCard";
import DeckDetail from "./src/components/DeckDetail";
import Deck from './src/components/Deck';
import Quiz from "./src/components/Quiz";

const MainStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
const Tabs = TabNavigator({
      DeckList: {
        screen: DeckList,
        navigationOptions: {
          tabBarLabel: 'Decks',
          tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        },
      },
      AddDeck: {
        screen: AddDeck,
        navigationOptions: {
          tabBarLabel: 'Add Deck',
          tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        },
      },
    }, 
    {
      navigationOptions: {
        header: null
      },
      tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? blue : white,
        style: {
          height: 56,
          padding:10,
          backgroundColor: Platform.OS === 'ios' ? white : blue,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      }
    }
  );
  const MainNavigator = StackNavigator({
    Home: {
      screen: Tabs,
    }, 
    Deck:{
      screen: Deck,
    },
    DeckDetail:{
      screen: DeckDetail,
    },
    AddCard: {
      screen: AddCard,
    },
    Quiz: {
      screen: Quiz,
    }
  }
);
  
class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
      <MainStatusBar backgroundColor={blue}/>
      <View style={{ flex: 1 }}>
        <MainNavigator /> 
      </View>
    </Provider>

   
    )
  }  
  componentDidMount(){
    setLocalNotification()
  }
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;