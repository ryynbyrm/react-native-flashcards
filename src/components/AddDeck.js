import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { white, blue} from "../utils/colors";
import SubmitButton from './SubmitButton'
import { handleCreateDeck } from '../actions/decks'
import { connect } from 'react-redux'
class AddDeck extends Component {
    state = {
        textInput : ''
    }
    onPress = () => {
        const { textInput } = this.state
        const { dispatch, navigation } = this.props
     
        dispatch(handleCreateDeck(textInput)).then(() => 
                navigation.navigate('DeckList')
        )
    }

    onTextChange = (text) => {
        console.log(text)
        if(text){
            this.setState({
                textInput: text
            })
        }
    }
    render() {
        return(
            <View style = {styles.container}>
                <Text style={styles.header}>What is the title of deck?</Text>
                <TextInput style = {styles.input}
                editable = {true}
                onChangeText = {(text) => this.onTextChange(text)}/>
                <SubmitButton onPress={this.onPress}> 
                    <Text style={styles.textButton}> Add</Text> 
                </SubmitButton>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: white,
        padding: 10
      }, 
      header: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center"
      },
      input:{
        margin: 15,
        width:300,
        height: 40,
        borderColor: blue,
        borderWidth: 1
      },
      textButton:{
        fontSize: 15,
        paddingLeft:40,
      },
  });
export default connect()(AddDeck)