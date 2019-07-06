import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { black, white, gray } from '../utils/colors'
import { connect } from 'react-redux'

class Deck extends Component {
    render() {
        const { deck, navigation } = this.props
        const count = deck.cards ? deck.cards.length:0
        return (
            <TouchableOpacity onPress={() => 
              navigation.navigate('DeckDetail', {title:deck.title})}>
               <Text style={styles.title}>{deck.title}</Text>
               <Text style={styles.count}>{count} {count === 1 ? `card` : `cards`}</Text>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    title: {
      fontSize: 30,
      textAlign: "center",
      marginBottom: 5
    },
    count: {
      fontSize: 20,
      textAlign: "center",
      color: gray,
      marginBottom: 5
    }
  });


export default connect()(Deck)