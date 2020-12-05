import React, {Component} from 'react';
import {StatusBar, View, StyleSheet, Text, SafeAreaView, Animated, TouchableOpacity, BackHandler, Image, AsyncStorage, Platform, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import CountDown from 'react-native-countdown-component';
import { ScrollView } from 'react-native-gesture-handler';
import { Easing } from 'react-native-reanimated';

class TestScreen extends Component {

    state = {
        clickable: true,
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
        showModalSure: false,
        showModalSubmit: false,
        clickedOption: null,
        answeredQustions: new Array(this.props.questions.length).fill(0),
        disabledQuestions: new Array(this.props.questions.length).fill(0),
        index: 0,
        unattempted: 0,
        progressStatus: 100,  
    }

    anim = new Animated.Value(100); 

    onPress = () => {
        setTimeout(() => {
            this.setState({showModalTimeout: true})
        }, 0);
        setTimeout(() => {
            Actions.Results({marks: this.state.score, total: this.state.questions.length, questions: this.state.questions})
        }, 2000);
    }

    handleAnswerOptionClick = (isCorrect, index) => {
        this.setState({clickedOption: index});
		if (isCorrect) {
            this.setState({score: this.state.score + 1});
            this.setState({borderColorShow: true});
            let disabledQuestions = [ ...this.state.disabledQuestions ];
            disabledQuestions[this.state.currentQuestion] = {...disabledQuestions[this.state.currentQuestion], key: 1};
            this.setState({ disabledQuestions });
        }
        else if(!isCorrect) {
            let disabledQuestions = [ ...this.state.disabledQuestions ];
            disabledQuestions[this.state.currentQuestion] = {...disabledQuestions[this.state.currentQuestion], key: 1};
            this.setState({ disabledQuestions });
            this.setState({answeredQuestions: this.state.answeredQustions.push(index)});
            this.setState({borderColorShow: true});
        }
        const nextQuestion = this.state.currentQuestion + 1;
        
		if (nextQuestion < this.state.questions.length) {
            this.setState({clickable: false})
            setTimeout(() => {
                let answeredQustions = [ ...this.state.answeredQustions ];
                answeredQustions[this.state.currentQuestion] = {...answeredQustions[this.state.currentQuestion], key: 1};
                this.setState({ answeredQustions });
                this.setState({currentQuestion: nextQuestion});
                this.setState({borderColorShow: false});
                this.setState({clickable: true})
            }, 600);
            
		} else {
            this.setState({clickable: false})
            let count = 0;
            for(let i = 0; i<this.state.questions.length; i++) {
                if(this.state.answeredQustions[i] == 0) 
                    count++;
            }
            setTimeout(() => {
                console.log(this.state.answeredQustions);
                Actions.Results({marks: this.state.score, total: this.state.questions.length, questions: this.state.questions, unattempted: count});
                this.setState({borderColorShow: false});
                this.setState({clickable: true})
            }, 600);
		}
    };

    handleNext = () => {

        const nextQuestion = this.state.currentQuestion + 1;
        if (nextQuestion < this.state.questions.length) {
            this.setState({currentQuestion: nextQuestion});
		} else {
            this.setState({showModalSubmit: true})
		}
    }

    handlePevious = () => {
        const nextQuestion = this.state.currentQuestion - 1;
        if (nextQuestion >= 0) {
            this.setState({currentQuestion: nextQuestion});
		} else {

        }
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    componentDidMount() {
        this.onAnimate();  
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        this.setState({questions: this.props.questions})
        console.log(this.state.answeredQustions);
    }

    onAnimate = () =>{  
        this.anim.addListener(({value})=> {  
            this.setState({progressStatus: parseInt(value, 10)});  
        });  
        Animated.timing(this.anim,{  
                toValue: 0,  
                duration: 60000,  
        }).start();  
    }  
    
    render() {
        return (
            <SafeAreaView
                style = {{
                    backgroundColor: 'black',
                    height: '100%'
                }}
            >
                <StatusBar 
                    backgroundColor = "black"
                />
                <Modal 
                    isVisible = {this.state.showModalSure}
                    onBackdropPress = { () => {this.setState({showModalSure: false})}}
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
                        height: 310,
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
                                marginTop: 0,
                            }}
                        >
                                Are you sure?
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
                            Going back would lead to an unsuccessful attempt at the test!
                        </Text>
                        <TouchableOpacity 
                            onPress = { () => {this.setState({showModalSure: false})}}
                        >
                                <View
                                    style = {{
                                        marginTop: 40,
                                        width: 250,
                                        height: 45,
                                        borderRadius: 7,
                                        overflow: "hidden",
                                        backgroundColor: "#4ACDF4",
                                        alignSelf: "center",
                                        justifyContent: 'center'
                                    }}
                                >
                                <Text
                                    style = {{
                                        fontFamily: "Poppins-Bold",
                                        color: "white",
                                        textAlign: "center",

                                    }}
                                >
                                    Return to the test
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress = { () => {
                                this.setState({totalDuration: 1})
                                Actions.BottomNavigator({chosen: "test"})
                            }}
                        >
                                <View
                                    style = {{
                                        width: 250,
                                        height: 45,
                                        borderRadius: 7,
                                        overflow: "hidden",
                                        borderColor: "#4ACDF4",
                                        borderWidth: 2,
                                        marginTop: 20,
                                        alignSelf: "center",
                                        justifyContent: 'center'
                                    }}
                                >
                                <Text
                                    style = {{
                                        fontFamily: "Poppins-Bold",
                                        color: "white",
                                        textAlign: "center",

                                    }}
                                >
                                    Go back to main menu
                                </Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>
                </Modal>
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
                        height: 310,
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
                                marginTop: 0,
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
                                let count = 0;
                                this.setState({totalDuration: 1})
                                for(let i = 0; i<this.state.questions.length; i++) {
                                    if(this.state.answeredQustions[i] === 0) count+=1;
                                }
                                this.setState({unattempted: count});
                                console.log(count);
                                Actions.Results({marks: this.state.score, total: this.state.questions.length, questions: this.state.questions, unattempted: count});
                            }}
                        >
                                <View
                                    style = {{
                                        marginTop: 40,
                                        width: 250,
                                        height: 45,
                                        borderRadius: 7,
                                        overflow: "hidden",
                                        backgroundColor: "#4ACDF4",
                                        alignSelf: "center",
                                        justifyContent: 'center'
                                    }}
                                >
                                <Text
                                    style = {{
                                        fontFamily: "Poppins-Bold",
                                        color: "white",
                                        textAlign: "center",

                                    }}
                                >
                                    Submit Test
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress = { () => {this.setState({showModalSubmit: false})}}
                        >
                                <View
                                    style = {{
                                        width: 250,
                                        height: 45,
                                        borderRadius: 7,
                                        overflow: "hidden",
                                        borderColor: "#4ACDF4",
                                        borderWidth: 2,
                                        marginTop: 20,
                                        alignSelf: "center",
                                        justifyContent: 'center'
                                    }}
                                >
                                <Text
                                    style = {{
                                        fontFamily: "Poppins-Bold",
                                        color: "white",
                                        textAlign: "center",

                                    }}
                                >
                                    Go back to test
                                </Text>
                            </View>
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
                        onPress = { () => {this.setState({showModalSure: true})}}
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
                            onFinish={() => Actions.Results({marks: this.state.score, total: this.state.questions.length, questions: this.state.questions})}
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
                        <ScrollView 
                            style = {{
                                height: '100%',
                                backgroundColor: "black", 
                                paddingTop: 40,
                                paddingLeft: 20, 
                                paddingRight: 20,
                            }}
                        >
                            
                            <View>       
                                <View 
                                    style = {{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 20,
                                    }}
                                >          
                                    <Text
                                        style = {{
                                            color: "#E1E1E1",
                                            fontFamily: "Poppins-ExtraBold",
                                            fontSize: 24,
                                        }}
                                    >Q {this.state.questions!= undefined ? this.state.currentQuestion < 10 ? "0" + (this.state.currentQuestion + 1).toString() : this.state.currentQuestion + 1: null} . </Text>
                                    {
                                    this.state.answeredQustions[this.state.currentQuestion] != 0 ?
                                        <Text
                                            style = {{
                                                fontFamily: "Poppins-Bold",
                                                fontSize: 14,
                                                color: "#4ACDF4",
                                            }}
                                        >
                                            Already Answered
                                        </Text>
                                        : null
                                    }
                                </View>   
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
                                    (<View>
                                        <TouchableOpacity 
                                            disabled = {this.state.disabledQuestions[this.state.currentQuestion] != 0}
                                            style = {{
                                                borderColor: ( this.state.borderColorShow && answerOption.isCorrect || this.state.answeredQustions[this.state.currentQuestion] != 0 && answerOption.isCorrect )? "#1DD348": this.state.borderColorShow && !answerOption.isCorrect && index == this.state.clickedOption ? "#FF5226" : "#1A1A1A",
                                                borderWidth: 4,
                                                width: Dimensions.get("window").width - 40,
                                                minHeight: 60,
                                                maxHeight: 150,
                                                borderRadius: 10,
                                                marginBottom: 10,
                                                opacity: this.state.answeredQustions[this.state.currentQuestion] != 0 ? 0.5 : 1,
                                                backgroundColor: "#1A1A1A",
                                                justifyContent: 'center'
                                            }}
                                            
                                            onPress={() => this.handleAnswerOptionClick(answerOption.isCorrect, index)}
                                        >
                                            <View style = {{
                                                flexDirection: 'row',
                                                justifyContent: "flex-start",
                                                alignItems: "center",
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
                                                {/* {
                                                    this.state.answeredQustions[this.state.currentQuestion] != 0 ?
                                                        answerOption.isCorrect ? <Text style = {{
                                                            color: "#1DD348",
                                                            fontFamily: "Poppins-Bold",
                                                            position: "relative",
                                                            right: 0,
                                                        }}>Correct Answer</Text> : null
                                                    :null
                                                } */}
                                            </View>
                                        </TouchableOpacity>  
                                        </View>
                                    )         
						        )) : null
                            }
                            <View style = {{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 150,
                            }}>
                                <TouchableOpacity
                                    onPress = {() => this.handlePevious()}
                                >
                                    <View style = {{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Image 
                                            style = {{
                                                width: 25,
                                                height: 25,
                                                tintColor: "#4ACDF4"
                                            }}
                                            source = {require("../images/backQuestion.png")}
                                        />
                                        <Text
                                            style = {{
                                                color: "white",
                                                fontFamily: "Poppins-Bold",
                                                fontSize: 22,
                                            }}
                                        >
                                            PREV
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress = {() => {this.handleNext()}}
                                >
                                    <View style = {{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text
                                            style = {{
                                                color: "white",
                                                fontFamily: "Poppins-Bold",
                                                fontSize: 22
                                            }}
                                        >
                                            NEXT
                                        </Text>
                                        <Image 
                                            style = {{
                                                width: 25,
                                                height: 25,
                                                transform: [{ rotate: '180deg'}],
                                                tintColor: "#4ACDF4"
                                            }}
                                            source = {require("../images/backQuestion.png")}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View
                                style = {{
                                    height: 70,
                                }}
                            ></View>
                        </ScrollView>
                        
                        
                    )
                }
                <View
                    style = {{
                        width: "100%",  
                        height: 12,  
                        padding: 3,    
                        backgroundColor: "#1A1A1A", 
                        position: "absolute",
                        bottom: 60,
                        justifyContent: "center",  
                    }}
                >  
                    <Animated.View  
                        style={[  
                            { 
                                width: "100%",  
                                height: 12,  
                                borderTopRightRadius: 5,  
                                borderBottomRightRadius: 5,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                backgroundColor:this.state.progressStatus <= 50 && this.state.progressStatus > 20  ? "#FFBF2E" : this.state.progressStatus <= 20 ? "#FF2626" : "#1DD348",  
                            },{width: this.state.progressStatus +"%"},  
                        ]}  
                    />  
                </View>  
            </SafeAreaView>
        )
    }
}

export default TestScreen;

const styles = StyleSheet.create({   
  
});  