import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { white, blue} from "../utils/colors";
import SubmitButton from './SubmitButton'
import { handleCreateCard } from '../actions/cards'
import { handleGetDecks } from '../actions/decks'
import { connect } from 'react-redux'

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }
   
    onPress = () => {
        const { question, answer } = this.state
        const { dispatch, navigation, title } = this.props
        dispatch(handleCreateCard(title, question, answer))
        .then(() => 
             navigation.navigate('DeckDetail', {title:title})
        )
    }

    onQuestionChange = (question) => {
        if(question){
            this.setState({
                question
            })
        }
    }    
    onAnswerChange = (answer) => {
        if(answer){
            this.setState({
                answer
            })
        }
    }
    render() {
        return(
            <View style = {styles.container}>
                <Text style={styles.header}>CREATE CARD</Text>
                <TextInput style = {styles.input}
                editable = {true}
                onChangeText = {(question) => this.onQuestionChange(question)}/>
                <TextInput style = {styles.input}
                editable = {true}
                onChangeText = {(answer) => this.onAnswerChange(answer)}/>
                <SubmitButton onPress={this.onPress}> 
                    <Text style={styles.textButton}> Add</Text> 
                </SubmitButton>
            </View>
        )
    }

    componentDidMount() {
        const { dispatch } = this.props
        const decks = dispatch(handleGetDecks())
    }
}



function mapStateToProps({decks},{navigation}) {
    return{
        title:navigation.state.params['title'],
        decks,
        navigation
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
export default connect(mapStateToProps)(AddCard)