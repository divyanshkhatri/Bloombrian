import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, BackHandler, Image, AsyncStorage, Platform, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import CountDown from 'react-native-countdown-component';

class TestScreen extends Component {

    backAction = () => {
        Actions.Homepage();
        return true;
    };

    state = {
        questions: undefined,
        totalDuration: 4000,
        subject: "",
        category: "",
        currentQuestion: 0,
        showScore : false,
        score: 0,
        borderColorShow: false,
        subject: "",
        category: "",
        academics: false, 
        communication: false,
        invention: false,
        showModalTimeout: false,
        showModalSubmit: false,
        clickedOption: null
    }

    onPress = () => {
        setTimeout(() => {
            this.setState({showModalTimeout: true})
        }, 0);
        setTimeout(() => {
            Actions.Results()
        }, 2000);
    }

    handleAnswerOptionClick = (isCorrect, index) => {
        this.setState({clickedOption: index});
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
            setTimeout(() => {
                Actions.BottomNavigator();
            }, 2500);
            
		}
    };

    
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        this.setState({questions: this.props.questions})
    }
    
    render() {
        return (
            <SafeAreaView
                style = {{
                    backgroundColor: 'black',
                    height: '100%'
                }}
            >
                <Modal 
                    isVisible = {this.state.showModalSubmit}
                    onBackdropPress = { () => {this.setState({showModalSubmit: false})}}
                >
                    <View
                    style = {{
                        // flex: 1,
                        // borderColor: 'blue',
                        // borderWidth: 2,
                        margin: 20,
                        // marginTop: Dimensions.get('window').height/5,
                        backgroundColor: '#232323',
                        borderRadius: 20,
                        padding: 35,
                        paddingLeft: 10, 
                        paddingRight: 10,
                        width: 310,
                        height: 390,
                        // alignItems: 'center',
                        // justifyContent: 'center',
                        // alignSelf: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                        width: 0,
                        height: 2,
                        },
                        shadowOpacity: 0.75,
                        shadowRadius: 3.84,
                        elevation: 5
                    }}
                    >   
                        <Text
                            style = {{
                                fontFamily: "Poppins-ExtraBold",
                                fontSize: 20,
                                color: "white",
                                textAlign: "center",
                                marginTop: 20,
                            }}
                        >
                                Submit Test?
                        </Text>
                        <Text 
                            style = {{
                                fontFamily: "Poppins-Bold",
                                color: "white",
                                fontSize: 14,
                                textAlign: "center",
                                marginTop: 30,
                                lineHeight: 20
                            }}
                        >
                            Are you sure you want to submit the test? Your responses would be recorded!
                        </Text>
                        <TouchableOpacity 
                            onPress = { () => {
                                this.setState({totalDuration: 1})
                                Actions.BottomNavigator();
                            }}
                        >
                            <Text></Text>
                        </TouchableOpacity>
                        
                    </View>
                </Modal>
                <Modal 
                    isVisible = {this.state.showModalTimeout}
                    onBackdropPress = { () => {this.setState({showModalTimeout: false})}}
                    animationIn = "pulse"
                >
                    <View
                    style = {{
                    }}
                    >   
                        <Image 
                            style = {{
                                width: 300,
                                height: 300,  

                                alignSelf: "center",
                                marginLeft: 20,
                                                
                            }}
                            source = {require("../images/complete.gif")}
                        />
                    </View>
                </Modal>
                <View 
                    style = {{
                        flexDirection: 'row',
                        width: '100%',
                        // borderColor: 'white',
                        // borderWidth: 2,
                        backgroundColor: "#101010",
                        alignItems: 'center',
                        height: 60,
                        justifyContent: "space-between",
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        paddingLeft: 20,
                        paddingRight: 20,
                    }}
                >   
                    <TouchableOpacity
                        onPress = { () => {this.backAction()} }
                    >
                        <Image 
                            style = {{ 
                                width: 22, 
                                height: 22,
                            }}
                            source = {require("../images/back.png")} 
                        />
                    </TouchableOpacity>
                    <View style = {{
                        alignItems: "center",
                        flexDirection: "row",
                        marginLeft: 80,
                        
                    }}>
                        <Image 
                            style = {{
                                width: 18,
                                height: 18,
                                tintColor: "#929292"
                            }}
                            source = {require("../images/clock.png")}
                        />
                        <CountDown
                            until={600}
                            size={30}
                            onFinish={() => Actions.Results()}
                            digitStyle = {{
                                backgroundColor: "#101010",
                                textAlign: 'center',
                                alignContent: 'center',
                                alignItems: "center",
                            }}
                            separatorStyle = {{
                                color: "#929292",
                                alignContent: 'center',
                                alignItems: "center"
                            }}
                            size = {15}
                            digitTxtStyle={{color: '#929292', fontFamily: "Poppins-Bold"}}
                            timeToShow={['M', 'S']}
                            timeLabels={{m: 'MM', s: 'SS'}}
                            showSeparator = {true}
                            timeLabels={{m: null, s: null}}
                        />
                    </View>
                    <TouchableOpacity 
                        onPress = {() => {
                            this.setState({showModalSubmit: true})
                        }}
                        style = {{
                            width: 70,
                            height: 25,
                            paddingTop: 3,
                            borderRadius: 4, 
                            overflow: "hidden",
                            backgroundColor: "#1DD348"
                        }}
                    >
                        <Text style = {{
                            fontFamily: "Poppins-SemiBold",
                            color: "white",
                            textAlign: "center",
                        }}>
                            Submit
                        </Text>
                    </TouchableOpacity>   
                </View>
                {
                    this.state.showScore ? (
                        <View
                            style = {{
                                height: '100%',
                                backgroundColor: "black"
                            }}
                        >
                            <Text style = {{
                                color: "#4ACDF4",
                                fontFamily: "Poppins-Bold",
                                fontSize: 14
                            }}>
                                You scored {this.state.score} out of {this.state.questions.length}
                            </Text> 
                        </View>
                    )
                    :
                    (   
                        <View 
                            style = {{
                                height: '100%',
                                backgroundColor: "black", 
                                paddingTop: 40,
                                paddingLeft: 20, 
                                paddingRight: 20,
                            }}
                        >
                            
                            <View>                    
                                <Text
                                    style = {{
                                        color: "#E1E1E1",
                                        fontFamily: "Poppins-ExtraBold",
                                        fontSize: 24,
                                        marginBottom: 20
                                    }}
                                >Q {this.state.questions!= undefined ? this.state.currentQuestion < 10 ? "0" + (this.state.currentQuestion + 1).toString() : this.state.currentQuestion + 1: null} . </Text>
                                <Text 
                                    style = {{
                                        marginBottom: 10,
                                        color: "#E1E1E1",
                                        fontSize: 14,
                                        maxHeight: 200,
                                        marginBottom: 35,
                                        fontFamily: "Poppins-Bold"
                                    }}
                                >{this.state.questions != undefined ? this.state.questions[this.state.currentQuestion].questionText : null}</Text>
                            </View>
                            {
                                this.state.questions != undefined ? this.state.questions[this.state.currentQuestion].answerOptions.map((answerOption, index) => (
                                    <TouchableOpacity 
                                        style = {{
                                            borderColor: this.state.borderColorShow && answerOption.isCorrect ? "#1DD348": this.state.borderColorShow && !answerOption.isCorrect && index == this.state.clickedOption ? "#FF5226" : "#1A1A1A",
                                            borderWidth: 2,
                                            width: Dimensions.get("window").width - 40,
                                            minHeight: 60,
                                            maxHeight: 150,
                                            borderRadius: 10,
                                            marginBottom: 10,
                                            backgroundColor: "#1A1A1A",
                                            justifyContent: 'center'
                                        }}
                                        onPress={() => this.handleAnswerOptionClick(answerOption.isCorrect, index)}
                                    >
                                        <View style = {{
                                            flexDirection: 'row',
                                            justifyContent: "flex-start",
                                            alignItems: "center"
                                        }}>
                                            <Text style = {{
                                                textAlign: 'center',
                                                color: "#4ACDF4",
                                                fontSize: 24,
                                                marginLeft: 20,
                                                fontFamily: "Poppins-Bold",
                                                marginRight: 20,
                                            }}>
                                                {String.fromCharCode(index + 65)}.
                                            </Text> 
                                            <Text style = {{
                                                textAlign: 'center',
                                                color: "#E1E1E1",
                                                fontFamily: "Poppins-Bold",
                                                flexShrink: 1,
                                                paddingRight: 10,
                                                paddingTop: 10, 
                                                paddingBottom: 10,
                                            }}>
                                                {answerOption.answerText}
                                            </Text> 
                                        </View>
                                    </TouchableOpacity>                     
						        )) : null
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
      width: 80,
    },
    text: {
      fontSize: 15,
      color: '#929292',
      marginLeft: 7,
      fontFamily: "Poppins-Bold"
    },
};

export default TestScreen;