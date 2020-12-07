import React, {Component} from 'react';
import {View, StatusBar, Text, SafeAreaView, TouchableOpacity, BackHandler, Image, AsyncStorage, Platform, Dimensions} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Actions } from 'react-native-router-flux';
import { FlatList } from 'react-native-gesture-handler';

class Test extends Component {

    backAction = () => {
        Actions.Homepage();
        return true;
    };

    state = {
        tests: [
            {
                courseName: "All Subjects",
                testName: "Straight Lines 01",
                questionNumber: "15",
                time: "30",
                attempted: true,
                questions: [
                    {
                        questionText: 'What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number?',
                        answerOptions: [
                            { answerText: '1', isCorrect: true },
                            { answerText: '2', isCorrect: false },
                            { answerText: '3', isCorrect: false },
                            { answerText: '4', isCorrect: false },
                        ],
                    },
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
                    {
                        questionText: 'What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number?',
                        answerOptions: [
                            { answerText: '1', isCorrect: true },
                            { answerText: '2', isCorrect: false },
                            { answerText: '3', isCorrect: false },
                            { answerText: '4', isCorrect: false },
                        ],
                    },
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
                    {
                        questionText: 'What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number?',
                        answerOptions: [
                            { answerText: '1', isCorrect: true },
                            { answerText: '2', isCorrect: false },
                            { answerText: '3', isCorrect: false },
                            { answerText: '4', isCorrect: false },
                        ],
                    },
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
            },
            {
                courseName: "All Subjects",
                testName: "Straight Lines 02",
                questionNumber: "15",
                time: "30",
                attempted: false,
                questions: [
                    {
                        questionText: 'What is the test number?',
                        answerOptions: [
                            { answerText: '1', isCorrect: false },
                            { answerText: '2', isCorrect: true },
                            { answerText: '3', isCorrect: false },
                            { answerText: '4', isCorrect: false },
                        ],
                    },
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
                    {
                        questionText: 'What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number?',
                        answerOptions: [
                            { answerText: '1', isCorrect: true },
                            { answerText: '2', isCorrect: false },
                            { answerText: '3', isCorrect: false },
                            { answerText: '4', isCorrect: false },
                        ],
                    },
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
                    {
                        questionText: 'What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number?What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number? What is the test number?',
                        answerOptions: [
                            { answerText: '1', isCorrect: true },
                            { answerText: '2', isCorrect: false },
                            { answerText: '3', isCorrect: false },
                            { answerText: '4', isCorrect: false },
                        ],
                    },
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
            },
            {
                courseName: "All Subjects",
                testName: "Parabola 01",
                questionNumber: "15",
                time: "30",
                attempted: true,
                questions: [
                    {
                        questionText: 'What is the test number?',
                        answerOptions: [
                            { answerText: '1', isCorrect: false },
                            { answerText: '2', isCorrect: false },
                            { answerText: '3', isCorrect: true },
                            { answerText: '4', isCorrect: false },
                        ],
                    },
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
            },
            {
                courseName: "All Subjects",
                testName: "Parabola 02",
                questionNumber: "15",
                time: "30",
                attempted: false,
                questions: [
                    {
                        questionText: 'What is the test number?',
                        answerOptions: [
                            { answerText: '1', isCorrect: false },
                            { answerText: '2', isCorrect: false },
                            { answerText: '3', isCorrect: false },
                            { answerText: '4', isCorrect: true },
                        ],
                    },
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
            },
            {
                courseName: "All Subjects",
                testName: "Parabola 02",
                questionNumber: "15",
                time: "30",
                attempted: false,
                questions: [
                    {
                        questionText: 'What is the test number?',
                        answerOptions: [
                            { answerText: '1', isCorrect: false },
                            { answerText: '2', isCorrect: false },
                            { answerText: '3', isCorrect: false },
                            { answerText: '4', isCorrect: true },
                        ],
                    },
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
            },
            {
                courseName: "All Subjects",
                testName: "Parabola 02",
                questionNumber: "15",
                time: "30",
                attempted: false,
                questions: [
                    {
                        questionText: 'What is the test number?',
                        answerOptions: [
                            { answerText: '1', isCorrect: false },
                            { answerText: '2', isCorrect: false },
                            { answerText: '3', isCorrect: false },
                            { answerText: '4', isCorrect: true },
                        ],
                    },
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
            },
            {
                courseName: "All Subjects",
                testName: "Parabola 02",
                questionNumber: "15",
                time: "30",
                attempted: false,
                questions: [
                    {
                        questionText: 'What is the test number?',
                        answerOptions: [
                            { answerText: '1', isCorrect: false },
                            { answerText: '2', isCorrect: false },
                            { answerText: '3', isCorrect: false },
                            { answerText: '4', isCorrect: true },
                        ],
                    },
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
            },
        ],
        subjects: [
            {
                label: 'Algebra',
                value: 'Algebra',
            },
            {
                label: 'Fractions',
                value: 'Fractions',

            },
        ],
        totalDuration: 90000,
        subject: "",
        category: "",
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
        borderColorShow: false,
        subject: "",
        category: "",
        academics: false, 
        communication: false,
        invention: false,
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

    
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        AsyncStorage.getItem('subject')
        .then((val) => this.setState({subject: val}))
        .catch((e) => console.log(e))
        AsyncStorage.getItem('category')
        .then((val) => this.setState({category: val}))
        .catch((e) => console.log(e))

        AsyncStorage.getItem('id')
        .then((val) => {
            let url = 'http://idirect.bloombraineducation.com/idirect/lms/test?id='+val;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                })
                .then((response) => {
                    if(response.ok) {
                        response.json().then((responseJson) => {
                            this.setState({tests: responseJson["test"]})
                        })
                        
                    } else {
                        if(response.status == 404) {
                            console.log("404");
                        }
                        if(response.status == 500) {
                            console.log("500");
                        }
                    }
                })
                .catch((error) => {
                    this.setState({login: false})
                    console.error(error);
            });
        })
    }
    
    render() {
        return (
            <SafeAreaView
                style = {{
                    backgroundColor: 'black'
                }}
            >
                <StatusBar 
                    backgroundColor = "black"
                />
                <View style = {{
                    // flex: 1,
                    marginTop: 10, 
                    marginLeft: 16, 
                    marginRight: 16,
                    justifyContent: 'space-between',
                    // width: 200, 
                    // borderWidth: 2,
                    marginBottom: 25,
                }}>
                <View style = {{
                    flexDirection: "row",
                    alignContent: "space-between",
                    justifyContent: "space-between"
                }}>
                    <View
                        style = {{
                            flexDirection: 'row',

                        }}
                    >
                    <TouchableOpacity
                        onPress = { () => Actions.Homepage()}
                    >
                        <Image
                            style = {{
                                marginRight: 10, 
                                // marginTop: 15,
                                // borderWidth: 1, 
                                // borderColor: 'white',
                                marginLeft: -2,
                                width: 30, 
                                height: 30
                            }}
                        source = {require('../images/back.png')}/>
                    </TouchableOpacity>
                    <Image 
                    source = {require("../images/dp.png")}
                    style = {{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderColor: '#32C6F3',
                        borderWidth: 1

                    }}
                    />
                    </View>
                    <TouchableOpacity 
                    style = {{
                        width: 140,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress = {() => {
                        this.state.category === "Academics" ? this.setState({academics: true}) :
                        this.state.category === "Invention" ? this.setState({invention: true}) : 
                        this.setState({communication: true})
                    }}>
                    <Text style = {{
                        paddingTop: Platform.OS == 'ios' ? 5 : 3,
                        justifyContent: 'center',
                        alignContent: 'center',
                        textAlign: 'center', 
                        alignSelf: 'center',
                        fontFamily: "Poppins-SemiBold", 
                        color: "white",
                        fontSize: Platform.OS == "android" ? 12 : 14, 
                        borderRadius: 15,
                        width: 140,
                        height: 30,
                        overflow: 'hidden',
                        // borderColor: 'white', 
                        // borderWidth: 2, 
                        backgroundColor: "#232323"
                    }}>Change Subject</Text>
                </TouchableOpacity>
                </View>
                
                <RNPickerSelect

                    placeholder={{
                        label: 'Coordinate Geometry',
                        value: 'Coordinate Geometry',
                        color: '',
                        // fontFamily: 'Poppins-Medium'
                    }}
                    
                    style = {{
                        inputIOSContainer: {
                            marginTop: 20,
                            height: 45,                            
                            borderRadius: 25,
                            backgroundColor: '#2C2B2B',
                        },
                        placeholder: {
                            paddingLeft: Platform.OS === 'android' ? 15 : 15,
                            fontSize: 14,
                            fontFamily: Platform.OS === 'android' ? 'Poppins-Bold' : 'Poppins-Bold',
                            color: 'white',
                            
                        },
                        inputAndroid: {
                            padding: 15,
                            fontSize: 14,
                            fontFamily: 'Poppins-Bold',
                            color: 'white'
                        },
                        inputAndroidContainer: {
                            // borderColor: 'white',
                            // borderWidth: 2,

                            marginTop: 20,
                            height: 45,                            
                            borderRadius: 25,
                            backgroundColor: '#2C2B2B',
                        },
                        inputIOS: {
                            padding: 15,
                            fontSize: 14,
                            fontFamily: 'Poppins-Bold',
                            color: 'white'
                        }
                        
                    }}

                    items = {this.state.subjects}
                    
                    useNativeAndroidPickerStyle = {false}

                    onValueChange = { (value, index) => {
                    }}

                    Icon = { () => {
                        return (
                            <View
                            style = {{
                                // borderWidth: 2,
                                // borderColor: 'white',
                                marginTop: 12,
                                marginRight: 20
                            }}>
                            <Image 
                            style = {{
                                width: 20,
                                height: 20,
                                
                            }}
                            source = {require('../images/icon.png')}/>

                            </View>
                        )
                    }}
                >

                </RNPickerSelect>
                </View>
                {
                    this.state.showScore ? (
                        <View
                            style = {{
                                height: '100%',
                                backgroundColor: "#181818"
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
                            
                        >

                            <View 
                                style = {{
                                height: Platform.OS == "android" ? '87%' : '86%',
                                backgroundColor: "#141414",
                                paddingBottom: Platform.OS == "android" ? 0 : 40
                            }}>
                                <Text
                                    style = {{
                                        marginTop: 20,
                                        color: "white",
                                        fontFamily: "Poppins-Bold",
                                        fontSize: 16,
                                        marginBottom: 10,
                                        textAlign: "center"
                                    }}
                                >
                                    Objective Tests
                                </Text>
                                <FlatList 
                                    data = {this.state.tests}
                                    renderItem = { ({item}) => (
                                        <View style = {{
                                            marginLeft: 20, 
                                            marginRight: 20,
                                            height: 70,
                                            width: Dimensions.get('screen').width - 40,
                                            borderRadius: 10,
                                            backgroundColor: "#1A1A1A",
                                            marginTop: 10,
                                            marginBottom: 10,
                                            alignItems: "center",
                                            paddingLeft: 15, 
                                            paddingRight: 15,
                                            flexDirection: 'row',
                                            justifyContent: "space-between"
                                        }}>
                                            <View style = {{
                                                flexDirection: 'column'
                                            }}>
                                                <Text
                                                    style = {{
                                                        fontSize: 14,
                                                        fontFamily: "Poppins-SemiBold",
                                                        color: "white",
                                                    }}
                                                >
                                                    {item.testName}
                                                </Text>
                                                <Text
                                                    style = {{
                                                        fontFamily: "Poppins-SemiBold",
                                                        fontSize: 10,
                                                        color: "#929292"
                                                    }}
                                                >
                                                    {item.questionNumber} questions | {item.time} mins
                                                </Text>
                                            </View>
                                            <View>
                                                    { !item.attempted ?
                                                        (
                                                            
                                                                <TouchableOpacity
                                                                    onPress = { () => {Actions.TestScreen({questions: item.questions})}}
                                                                >
                                                                    <View>
                                                                        <Text 
                                                                        style = {{
                                                                            paddingTop: 2.5,
                                                                            width: 100,
                                                                            height: 25,
                                                                            textAlign: "center",
                                                                            fontFamily: "Poppins-SemiBold",
                                                                            color: "white",
                                                                            fontSize: Platform.OS == "android" ? 12 : 14,
                                                                            backgroundColor: "#4ACDF4",
                                                                            borderRadius: 5,
                                                                            overflow: "hidden"
                                                                        }}
                                                                        >
                                                                            Take Test
                                                                        </Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                        ): 
                                                        <TouchableOpacity>
                                                            <View 
                                                                style = {{
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <Image 
                                                                    style = {{
                                                                        width: 25, 
                                                                        height: 25
                                                                    }}
                                                                    source = {require("../images/progress.png")}
                                                                />
                                                                <Text 
                                                                    style = {{
                                                                        color: "#4ACDF4",
                                                                        fontSize: Platform.OS == "android" ? 8 : 10,
                                                                        fontFamily: "Poppins-SemiBold"
                                                                    }}
                                                                >
                                                                    Results
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    }
                                            </View>
                                        </View>
                                    )}
                                />
                                <View 
                                    style = {{
                                        margin: Platform.OS == "android" ? 15 : 0,
                                    }}
                                >
                                </View>
                            </View>
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

export default Test;