import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { white, green, blue, red, lightPurp, pink, yellow} from "../utils/colors";
import { connect } from 'react-redux'
import SubmitButton from './SubmitButton'


class Quiz extends Component {
  
    state = {
      correctCount: 0,
      incorrectCount: 0,
      currentIndex: 0, 
      showResults: false,
      shownTextType:"question"
    }
    restartQuiz = () => {
      this.setState({
        correctCount: 0,
        incorrectCount: 0,
        currentIndex: 0, 
        showResults: false,
        shownTextType:"question"
      });
    }
    clickCorrect = () => {
        const { correctCount,currentIndex} = this.state
        const { deck } = this.props
        const increment=currentIndex+1
        this.setState({
          correctCount:correctCount+1,
          currentIndex:increment,
          showResults:increment === deck.cards.length? true: false,
          shownTextType:"question"
        });
    }
    
    clickIncorrect = () => {
        const { incorrectCount,currentIndex} = this.state
        const { deck } = this.props
        const increment=currentIndex+1
        this.setState({
          incorrectCount:incorrectCount+1,
          currentIndex:increment,
          showResults:increment === deck.cards.length? true: false,
          shownTextType:"question"
        });
    }

    showAnswer = () => {
        const { shownTextType} = this.state
        this.setState({
          shownTextType:shownTextType==="question"?"answer":"question"
        });
    }
    render() {
      const { correctCount, incorrectCount, currentIndex, showResults, shownTextType } = this.state;
      const { navigation, deck } = this.props;
  
      return !showResults ? (
        <View style={styles.container}>
          <View style={styles.header}> 
            <Text style={styles.question}>{shownTextType==="answer" ? deck.cards[currentIndex].answer : deck.cards[currentIndex].question}</Text>
            <SubmitButton style={shownTextType==="question"?{ backgroundColor: lightPurp }:{ backgroundColor: yellow }} onPress={this.showAnswer}>
              <Text style={styles.show}>{shownTextType==="question"?"Show Answer":"Show Question"}</Text>
            </SubmitButton>
          </View>
          <View style={styles.actions}>
            <SubmitButton style={{ backgroundColor: green }} onPress={this.clickCorrect}>
              <Text style={styles.textButton}>Correct</Text>
            </SubmitButton>
            <SubmitButton style={{ backgroundColor: red }} onPress={this.clickIncorrect}>
              <Text style={styles.textButton}>Incorrect</Text>
            </SubmitButton>
            <Text style={styles.remaining}>{((deck.cards.length) - (currentIndex+1)) + "/" + deck.cards.length + " remaining"}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
        <Text style={styles.header}>You scored</Text>
        <Text style={styles.result}>Quiz Result: {`${Math.round((correctCount * 100) / (correctCount + incorrectCount))} %`}</Text>
        <View style={styles.actions}>
          <SubmitButton onPress={this.restartQuiz}><Text style={[styles.textButton, styles.whiteText]}>Restart Quiz</Text></SubmitButton>
          <SubmitButton onPress={() => navigation.goBack()}
            style={{ backgroundColor: pink}}><Text style={[styles.textButton, styles.whiteText]}>Back to Deck</Text></SubmitButton>
        </View>
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
        padding: 10
      },
      header: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center"
      },
      question: {
        fontSize: 20,
        color: blue,
        textAlign: "center"
      },
      result: {
        fontSize: 70,
        color: blue,
        textAlign: "center"
      },
      actions: {
        marginTop: 50
      },
      count: {
        color: green,
        fontSize: 20,
        marginTop: 10
      },
      input:{
        margin: 15,
        width:100,
        height: 40,
        borderColor: blue,
        borderWidth: 1
      },
      textButton:{
        fontSize: 15,
        paddingLeft:20
      },
      show:{
        fontSize: 15,
        paddingLeft:20
      },
      whiteText:{
        color:white
      },
      remaining:{
        fontSize: 10,
        padding:20,
        marginLeft:70
      },
  });
function mapStateToProps({decks},{navigation}) {
   const title = navigation.state.params['title']
    return{
        title,
        deck: decks[title],
        navigation,
    }
}
 
export default connect(mapStateToProps)(Quiz)