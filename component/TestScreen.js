import React, {Component} from 'react';
import {View, Text, Button, SafeAreaView, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

export default class TestScreen extends Component {
    
    componentDidMount() {
        // setTimeout(() => {
        //     Actions.Homepage();
        // }, 3000);
    }

    state = {
        totalDuration: 90000,
        questions: [
            {
                questionText: 'What is the capital of France?',
                answerOptions: [
                    { answerText: 'New York', isCorrect: false },
                    { answerText: 'London', isCorrect: false },
                    { answerText: 'Paris', isCorrect: true },
                    { answerText: 'Dublin', isCorrect: false },
                ],
            },
            {
                questionText: 'Who is CEO of Tesla?',
                answerOptions: [
                    { answerText: 'Jeff Bezos', isCorrect: false },
                    { answerText: 'Elon Musk', isCorrect: true },
                    { answerText: 'Bill Gates', isCorrect: false },
                    { answerText: 'Tony Stark', isCorrect: false },
                ],
            },
            {
                questionText: 'The iPhone was created by which company?',
                answerOptions: [
                    { answerText: 'Apple', isCorrect: true },
                    { answerText: 'Intel', isCorrect: false },
                    { answerText: 'Amazon', isCorrect: false },
                    { answerText: 'Microsoft', isCorrect: false },
                ],
            },
            {
                questionText: 'How many Harry Potter books are there?',
                answerOptions: [
                    { answerText: '1', isCorrect: false },
                    { answerText: '4', isCorrect: false },
                    { answerText: '6', isCorrect: false },
                    { answerText: '7', isCorrect: true },
                ],
            },
        ],
        currentQuestion: 0,
        showScore : false,
        score: 0,
        borderColorShow: false
    }

    handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
            this.setState({score: this.state.score + 1});
            this.setState({borderColorShow: true});
        }
        else if(!isCorrect) {
            this.setState({borderColorShow: true});
        }
        const nextQuestion = this.state.currentQuestion + 1;
        
		if (nextQuestion < this.state.questions.length) {
            setTimeout(() => {
                this.setState({currentQuestion: nextQuestion});
                this.setState({borderColorShow: false});
            }, 1500);
            
		} else {
            setTimeout(() => {
                this.setState({showScore: true});
                this.setState({borderColorShow: false});
            }, 1500);
            
		}
    };
    
    render() {
        return (
            <SafeAreaView>
                {
                    this.state.showScore ? (
                        <View>
                            <Text>
                                You scored {this.state.score} out of {this.state.questions.length}
                            </Text> 
                        </View>
                    )
                    :
                    (
                        <View 
                            style = {{
                                alignItems: "center",
                                justifyContent: 'center',
                                height: '100%'
                            }}
                        >

                            <View>
                                <Timer 
                                    options = {options}
                                    totalDuration={this.state.totalDuration}
                                    handleFinish={() => Actions.LandingMain()}
                                    start = {true}
                                />
                                <Text>Question {this.state.currentQuestion + 1}/{this.state.questions.length}</Text>
                                <Text 
                                    style = {{
                                        marginBottom: 10
                                    }}
                                >{this.state.questions[this.state.currentQuestion].questionText}</Text>
                            </View>
                            {
                                this.state.questions[this.state.currentQuestion].answerOptions.map((answerOption, index) => (
                                    <TouchableOpacity 
                                        style = {{
                                            borderColor: this.state.borderColorShow && answerOption.isCorrect ? "#4ACDF4": this.state.borderColorShow && !answerOption.isCorrect ? "red" : "white",
                                            borderWidth: 2,
                                            width: 200,
                                            height: 50,
                                            borderRadius: 10,
                                            marginBottom: 10,
                                            justifyContent: 'center'
                                        }}
                                        onPress={() => this.handleAnswerOptionClick(answerOption.isCorrect)}
                                    >
                                        <Text style = {{
                                            textAlign: 'center',
                                            
                                        }}>
                                            {answerOption.answerText}
                                        </Text> 
                                    </TouchableOpacity>                     
						        ))
                            }
                        </View>
                    )
                }
            </SafeAreaView>
        )
    }
}
const options = {
    container: {
      padding: 5,
      borderRadius: 5,
      width: 150,
    },
    text: {
      fontSize: 15,
      color: '#929292',
      marginLeft: 7,
      fontFamily: "Poppins-Bold"
    }
};
  