import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,FlatList} from 'react-native';
import { connect } from 'react-redux'
import { handleGetDecks } from '../actions/decks'
import { white, gray } from '../utils/colors'
import Deck from './Deck'

class DeckList extends Component{
    componentDidMount () {
        const { dispatch } = this.props
        const decks = dispatch(handleGetDecks())
    }
    render() {
        const { decks, navigation  } = this.props
        return decks ? 
          (
            <View style = {styles.container}>
                <Text style={styles.header}>Deck List</Text>
                 <FlatList
                    data={Object.values(decks)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Deck key={item.title} deck={item} navigation={this.props.navigation}>{item.title}</Deck>
                    )}
                    keyExtractor={(item, index) => item.title}
                />
            </View>
          ) : (
            <View style = {styles.container}>
                <Text style={styles.header}>There is no deck</Text>
                <SubmitButton style={{ backgroundColor: deck.cards.length !== 0 ? gray : green }}
                onPress={() => {
                navigation.navigate("AddDeck");
                }}></SubmitButton>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: white,
        padding: 20
    }, 
    header: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center"
    },
})

function mapStateToProps({decks}, { navigation }) {
    return{
        decks,
        navigation
    }
}

export default connect(mapStateToProps)(DeckList)