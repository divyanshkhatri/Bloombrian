import React, {Component} from 'react';
import {View, StatusBar, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback, Platform} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';

class Results extends Component {

    componentDidMount() {
        console.log(this.props.unattempted);
        setTimeout(() => {
            this.setState({show: false})
        }, 3200);
    }

    state = {
        show: true,
        marks: this.props.marks,
        total: this.props.total
    }

    render() {
        return (
            <SafeAreaView
                style = {{
                    backgroundColor: "black",
                    height: '100%'
                }}
            >
                <StatusBar 
                    backgroundColor = "black"
                />
                <View 
                    style = {{
                        flexDirection: 'row',
                        width: '100%',
                        // borderColor: 'white',
                        // borderWidth: 2,
                        backgroundColor: "#101010",
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 60,
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                    }}
                >   
                    <Text
                        style = {{
                            color: 'white',
                            fontFamily: 'Poppins-Medium',
                            fontSize: 14,
                            textAlign: 'center',
                            width: '78%'
                        }}
                    >Results</Text>
                </View>
                {
                    (this.state.marks/this.state.total) > 0.9 ? 
                    <View style = {{
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 60,
                    }}>
                        {
                            this.state.show ? 
                        <Image 
                            style = {{
                                position: "absolute",
                                height: Dimensions.get("window").height,
                                left: -150,
                                top: -80
                            }}
                            source = {require("../images/complete.gif")}
                        />
                        : null}
                        <View>
                            <Text
                                style = {{
                                    color: "white",
                                    fontFamily: "Poppins-Bold",
                                    fontSize: 16,
                                    marginBottom: 5,
                                }}
                            >
                                Amazing!
                            </Text>
                            <Text
                                style = {{
                                    color: "#F7CE00",
                                    fontFamily: "Poppins-ExtraBold",
                                    fontSize: 28,
                                    paddingBottom: 20,
                                }}
                            >
                                You did a great job!
                            </Text>
                            <Text
                                style = {{
                                    color: "gray",
                                    fontFamily: "Poppins-Bold",
                                    fontSize: 14,
                                    paddingRight: 60,
                                    paddingBottom: 35,
                                }}
                            >
                                A little more practice and even the sky isn't the limit.
                            </Text>
                            <Text 
                                style = {{
                                    color: "white",
                                    fontFamily: "Poppins-Bold",
                                    marginBottom: 20,
                                }}
                            >
                                Score and Analysis
                            </Text>
                            <View 
                                style = {{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <View
                                    style = {{
                                        marginLeft: 10,
                                        width: Platform.OS == "android" ? 110 : 100,
                                        height: Platform.OS == "android" ? 110 : 100,
                                        borderRadius: Platform.OS == "android" ? 55 : 50,
                                        borderWidth: 5,
                                        borderColor: "white"
                                    }}
                                >
                                    <View
                                        style = {{
                                            borderBottomColor: "white",
                                            borderBottomWidth: 2,
                                            marginLeft: 5,
                                            marginRight: 5,
                                            paddingTop: 5,
                                        }}
                                    >
                                        <Text 
                                            style = {{
                                                textAlign: "center",
                                                color: "white",
                                                fontFamily: "Poppins-Bold",
                                                fontSize: Platform.OS == "android" ? 28 : 30,
                                                paddingTop: Platform.OS == "android" ? 0 : 4,
                                            }}
                                        >
                                            {this.state.marks}
                                        </Text>
                                    </View>
                                    <Text
                                        style = {{
                                            textAlign: "center",
                                            color: "white",
                                            fontFamily: "Poppins-Bold",
                                            fontSize: Platform.OS == "android" ? 28 : 30,
                                        }}
                                    >
                                        {this.state.total}
                                    </Text>
                                </View>
                                <View 
                                    style = {{
                                        // borderColor: "white",
                                        // borderWidth: 2,
                                    }}
                                >
                                    <View
                                        style = {{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderBottomWidth: 1,
                                            borderBottomColor: "#202020",
                                            paddingBottom: 5,
                                            paddingTop: 5,
                                        }}
                                    >
                                        <View
                                            style = {{
                                                width: 40,
                                                paddingRight: 10,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Image 
                                                style = {{
                                                    width: 25, 
                                                    height: 25,
                                                    tintColor: "#1DD348",
                                                    marginRight: 20,
                                                }}
                                                source = {require("../images/tick.png")}
                                            />
                                        </View>
                                        <Text 
                                            style = {{
                                                color: "#A0A0A0",
                                                fontFamily: "Poppins-Medium",
                                                fontSize: 15,
                                            }}
                                        >
                                            {this.state.marks} Correct
                                        </Text>
                                    </View>
                                    <View
                                        style = {{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderBottomWidth: 1,
                                            borderBottomColor: "#202020",
                                            paddingBottom: 5,
                                            paddingTop: 5,
                                        }}
                                    >   
                                        <View
                                            style = {{
                                                width: 40, 
                                                paddingRight: 10,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Image 
                                                style = {{
                                                    width: 17, 
                                                    height: 17,
                                                    tintColor: "#F74C4C",
                                                    marginRight: 20,
                                                }}
                                                source = {require("../images/cross.png")}
                                            />
                                        </View>
                                        <Text 
                                            style = {{
                                                color: "#A0A0A0",
                                                fontFamily: "Poppins-Medium",
                                                fontSize: 15,
                                            }}
                                        >
                                            {this.state.total - this.state.marks - this.props.unattempted} Incorrect
                                        </Text>
                                    </View>
                                    <View
                                        style = {{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderBottomWidth: 1,
                                            borderBottomColor: "#202020",
                                            paddingBottom: 5,
                                            paddingTop: 5,
                                        }}
                                    >
                                        <View
                                            style = {{
                                                width: 40,
                                                paddingRight: 10,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Image 
                                                style = {{
                                                    width: 23, 
                                                    height: 23,
                                                    tintColor: "#767676",
                                                    marginRight: 20,
                                                    
                                                }}
                                                source = {require("../images/question.png")}
                                            />
                                        </View>
                                        <Text 
                                            style = {{
                                                color: "#A0A0A0",
                                                fontFamily: "Poppins-Medium",
                                                fontSize: 15,
                                            }}
                                        >
                                            {this.props.unattempted} Unattempted
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style = {{
                                        color: "white",
                                        fontFamily: "Poppins-Bold",
                                        marginBottom: 20,
                                        marginTop: 50,
                                    }}
                                >
                                    Solutions
                                </Text>
                                <View
                                    style = {{
                                        width: '100%',
                                        height: 110,
                                        backgroundColor: "#101010",
                                        borderRadius: 10,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 10
                                    }}
                                >
                                    <FlatList 
                                        data = {this.props.questions}
                                        renderItem = { ({item, index}) => {
                                            return (
                                                <View style = {{flexDirection: "row", alignItems: "center"}}>
                                                    <Text style = {{
                                                        color: "#404040",
                                                        fontFamily: "Poppins-Bold",
                                                        textAlign: "center",
                                                    }}>
                                                    Ans {index+1} - 
                                                    </Text>
                                                    <FlatList 
                                                        data = {item.answerOption}
                                                        renderItem = { ({item, index}) => (
                                                            <View>
                                                                {item.isCorrect === true ? 

                                                                    <View>
                                                                        <Text 
                                                                            style = {{
                                                                                fontFamily: "Poppins-Bold",
                                                                                color: "#404040",
                                                                                textAlign: "left"
                                                                            }}
                                                                        > {item.answerText}
                                                                        </Text>
                                                                    </View>
                                                                    : 
                                                                    <View>
                                                                    </View>
                                                                }
                                                            </View>
                                                        )}
                                                    />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        
                            <TouchableWithoutFeedback
                                style = {{
                                    alignItems: "center"
                                }}

                                onPress = {() => {Actions.BottomNavigator()}}
                            >
                                <View
                                    style = {{
                                        marginTop: Platform.OS == "android" ? 50 : 50,
                                        justifyContent: "center",
                                        height: 55,
                                        borderWidth: 2,
                                        borderColor: "#4ACDF4",
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text
                                    style = {{
                                        color: "white",
                                        fontFamily: "Poppins-Bold",
                                        fontSize: 20,
                                        textAlign: "center",
                                        width: Dimensions.get("window").width - 50
                                    }}
                                    >
                                        Back to Tests Menu
                                    </Text>
                                </View> 
                            </TouchableWithoutFeedback>
                    </View>
                    : ((this.state.marks/this.state.total) <0.9 && (this.state.marks/this.state.total) > 0.75) ?
                    <View style = {{
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 60,
                    }}>
                        <View>
                            {
                                this.state.show ? 
                            <Image 
                                style = {{
                                    position: "absolute",
                                    height: Dimensions.get("window").height,
                                    left: -150,
                                    top: -80
                                }}
                                source = {require("../images/complete.gif")}
                            />
                            : null}
                            <Text
                                style = {{
                                    color: "white",
                                    fontFamily: "Poppins-Bold",
                                    fontSize: 16,
                                    marginBottom: 5,
                                }}
                            >
                                Keep it up!
                            </Text>
                            <Text
                                style = {{
                                    color: "#FF9131",
                                    fontFamily: "Poppins-ExtraBold",
                                    fontSize: 28,
                                    paddingBottom: 20,
                                }}
                            >
                                You did well!
                            </Text>
                            <Text
                                style = {{
                                    color: "gray",
                                    fontFamily: "Poppins-Bold",
                                    fontSize: 14,
                                    paddingRight: 60,
                                    paddingBottom: 35,
                                }}
                            >
                                A little more practice and even the sky isn't the limit.
                            </Text>
                            <Text 
                                style = {{
                                    color: "white",
                                    fontFamily: "Poppins-Bold",
                                    marginBottom: 20,
                                }}
                            >
                                Score and Analysis
                            </Text>
                            <View 
                                style = {{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <View
                                    style = {{
                                        marginLeft: 10,
                                        width: Platform.OS == "android" ? 110 : 100,
                                        height: Platform.OS == "android" ? 110 : 100,
                                        borderRadius: Platform.OS == "android" ? 55 : 50,
                                        borderWidth: 5,
                                        borderColor: "white"
                                    }}
                                >
                                    <View
                                        style = {{
                                            borderBottomColor: "white",
                                            borderBottomWidth: 2,
                                            marginLeft: 5,
                                            marginRight: 5,
                                        }}
                                    >
                                        <Text 
                                            style = {{
                                                textAlign: "center",
                                                color: "white",
                                                fontFamily: "Poppins-Bold",
                                                fontSize: Platform.OS == "android" ? 28 : 30,
                                                paddingTop: 4,
                                            }}
                                        >
                                            {this.state.marks}
                                        </Text>
                                    </View>
                                    <Text
                                        style = {{
                                            textAlign: "center",
                                            color: "white",
                                            fontFamily: "Poppins-Bold",
                                            fontSize: Platform.OS == "android" ? 28 : 30,
                                        }}
                                    >
                                        {this.state.total}
                                    </Text>
                                </View>
                                <View 
                                    style = {{
                                        // borderColor: "white",
                                        // borderWidth: 2,
                                    }}
                                >
                                    <View
                                        style = {{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderBottomWidth: 1,
                                            borderBottomColor: "#202020",
                                            paddingBottom: 5,
                                            paddingTop: 5,
                                        }}
                                    >
                                        <View
                                            style = {{
                                                width: 40,
                                                paddingRight: 10,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Image 
                                                style = {{
                                                    width: 25, 
                                                    height: 25,
                                                    tintColor: "#1DD348",
                                                    marginRight: 20,
                                                }}
                                                source = {require("../images/tick.png")}
                                            />
                                        </View>
                                        <Text 
                                            style = {{
                                                color: "#A0A0A0",
                                                fontFamily: "Poppins-Medium",
                                                fontSize: 15,
                                            }}
                                        >
                                            {this.state.marks} Correct
                                        </Text>
                                    </View>
                                    <View
                                        style = {{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderBottomWidth: 1,
                                            borderBottomColor: "#202020",
                                            paddingBottom: 5,
                                            paddingTop: 5,
                                        }}
                                    >   
                                        <View
                                            style = {{
                                                width: 40, 
                                                paddingRight: 10,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Image 
                                                style = {{
                                                    width: 17, 
                                                    height: 17,
                                                    tintColor: "#F74C4C",
                                                    marginRight: 20,
                                                }}
                                                source = {require("../images/cross.png")}
                                            />
                                        </View>
                                        <Text 
                                            style = {{
                                                color: "#A0A0A0",
                                                fontFamily: "Poppins-Medium",
                                                fontSize: 15,
                                            }}
                                        >
                                            {this.state.total - this.state.marks - this.props.unattempted} Incorrect
                                        </Text>
                                    </View>
                                    <View
                                        style = {{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderBottomWidth: 1,
                                            borderBottomColor: "#202020",
                                            paddingBottom: 5,
                                            paddingTop: 5,
                                        }}
                                    >
                                        <View
                                            style = {{
                                                width: 40,
                                                paddingRight: 10,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Image 
                                                style = {{
                                                    width: 23, 
                                                    height: 23,
                                                    tintColor: "#767676",
                                                    marginRight: 20,
                                                    
                                                }}
                                                source = {require("../images/question.png")}
                                            />
                                        </View>
                                        <Text 
                                            style = {{
                                                color: "#A0A0A0",
                                                fontFamily: "Poppins-Medium",
                                                fontSize: 15,
                                            }}
                                        >
                                            {this.props.unattempted} Unattempted
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style = {{
                                        color: "white",
                                        fontFamily: "Poppins-Bold",
                                        marginBottom: 20,
                                        marginTop: 50,
                                    }}
                                >
                                    Solutions
                                </Text>
                                <View
                                    style = {{
                                        width: '100%',
                                        height: 110,
                                        backgroundColor: "#101010",
                                        borderRadius: 10,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 10
                                    }}
                                >
                                    <FlatList 
                                        data = {this.props.questions}
                                        renderItem = { ({item, index}) => {
                                            return (
                                                <View style = {{flexDirection: "row", alignItems: "center"}}>
                                                    <Text style = {{
                                                        color: "#404040",
                                                        fontFamily: "Poppins-Bold",
                                                        textAlign: "center",
                                                    }}>
                                                    Ans {index+1} - 
                                                    </Text>
                                                    <FlatList 
                                                        data = {item.answerOption}
                                                        renderItem = { ({item, index}) => (
                                                            <View>
                                                                {item.isCorrect === true ? 

                                                                    <View>
                                                                        <Text 
                                                                            style = {{
                                                                                fontFamily: "Poppins-Bold",
                                                                                color: "#404040",
                                                                                textAlign: "left"
                                                                            }}
                                                                        > {item.answerText}
                                                                        </Text>
                                                                    </View>
                                                                    : 
                                                                    <View>
                                                                    </View>
                                                                }
                                                            </View>
                                                        )}
                                                    />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <TouchableWithoutFeedback
                                onPress = {() => {Actions.BottomNavigator()}}
                            >
                                <View
                                    style = {{
                                        marginTop: Platform.OS == "android" ? 50 : 50,
                                        justifyContent: "center",
                                        height: 55,
                                        borderWidth: 2,
                                        borderColor: "#4ACDF4",
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text
                                    style = {{
                                        color: "white",
                                        fontFamily: "Poppins-Bold",
                                        fontSize: 20,
                                        textAlign: "center",
                                        width: Dimensions.get("window").width - 50
                                    }}
                                    >
                                        Back to Tests Menu
                                    </Text>
                                </View> 
                            </TouchableWithoutFeedback>
                    </View>
                    :
                    <View style = {{
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 60,
                    }}>
                        <View>
                            <Text
                                style = {{
                                    color: "white",
                                    fontFamily: "Poppins-Bold",
                                    fontSize: 16,
                                    marginBottom: 5,
                                }}
                            >
                                You can do better!
                            </Text>
                            <Text
                                style = {{
                                    color: "#4C0FF6",
                                    fontFamily: "Poppins-ExtraBold",
                                    fontSize: 28,
                                    paddingBottom: 20,
                                }}
                            >
                                Practice More!
                            </Text>
                            <Text
                                style = {{
                                    color: "gray",
                                    fontFamily: "Poppins-Bold",
                                    fontSize: 14,
                                    paddingRight: 60,
                                    paddingBottom: 35,
                                }}
                            >
                                A little more practice and even the sky isn't the limit.
                            </Text>
                            <Text 
                                style = {{
                                    color: "white",
                                    fontFamily: "Poppins-Bold",
                                    marginBottom: 20,
                                }}
                            >
                                Score and Analysis
                            </Text>
                            <View 
                                style = {{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <View
                                    style = {{
                                        marginLeft: 10,
                                        width: Platform.OS == "android" ? 110 : 100,
                                        height: Platform.OS == "android" ? 110 : 100,
                                        borderRadius: Platform.OS == "android" ? 55 : 50,
                                        borderWidth: 5,
                                        borderColor: "white"
                                    }}
                                >
                                    <View
                                        style = {{
                                            borderBottomColor: "white",
                                            borderBottomWidth: 2,
                                            marginLeft: 5,
                                            marginRight: 5,
                                        }}
                                    >
                                        <Text 
                                            style = {{
                                                textAlign: "center",
                                                color: "white",
                                                fontFamily: "Poppins-Bold",
                                                fontSize: Platform.OS == "android" ? 26 : 30,
                                                paddingTop: Platform.OS == "android" ? 0 : 4,
                                            }}
                                        >
                                            {this.state.marks}
                                        </Text>
                                    </View>
                                    <Text
                                        style = {{
                                            textAlign: "center",
                                            color: "white",
                                            fontFamily: "Poppins-Bold",
                                            fontSize: Platform.OS == "android" ? 26 : 30,
                                        }}
                                    >
                                        {this.state.total}
                                    </Text>
                                </View>
                                <View 
                                    style = {{
                                        // borderColor: "white",
                                        // borderWidth: 2,
                                    }}
                                >
                                    <View
                                        style = {{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderBottomWidth: 1,
                                            borderBottomColor: "#202020",
                                            paddingBottom: 5,
                                            paddingTop: 5,
                                        }}
                                    >
                                        <View
                                            style = {{
                                                width: 40,
                                                paddingRight: 10,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Image 
                                                style = {{
                                                    width: 25, 
                                                    height: 25,
                                                    tintColor: "#1DD348",
                                                    marginRight: 20,
                                                }}
                                                source = {require("../images/tick.png")}
                                            />
                                        </View>
                                        <Text 
                                            style = {{
                                                color: "#A0A0A0",
                                                fontFamily: "Poppins-Medium",
                                                fontSize: 15,
                                            }}
                                        >
                                            {this.state.marks} Correct
                                        </Text>
                                    </View>
                                    <View
                                        style = {{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderBottomWidth: 1,
                                            borderBottomColor: "#202020",
                                            paddingBottom: 5,
                                            paddingTop: 5,
                                        }}
                                    >   
                                        <View
                                            style = {{
                                                width: 40, 
                                                paddingRight: 10,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Image 
                                                style = {{
                                                    width: 17, 
                                                    height: 17,
                                                    tintColor: "#F74C4C",
                                                    marginRight: 20,
                                                }}
                                                source = {require("../images/cross.png")}
                                            />
                                        </View>
                                        <Text 
                                            style = {{
                                                color: "#A0A0A0",
                                                fontFamily: "Poppins-Medium",
                                                fontSize: 15,
                                            }}
                                        >
                                            {this.state.total - this.state.marks - this.props.unattempted} Incorrect
                                        </Text>
                                    </View>
                                    <View
                                        style = {{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderBottomWidth: 1,
                                            borderBottomColor: "#202020",
                                            paddingBottom: 5,
                                            paddingTop: 5,
                                        }}
                                    >
                                        <View
                                            style = {{
                                                width: 40,
                                                paddingRight: 10,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Image 
                                                style = {{
                                                    width: 23, 
                                                    height: 23,
                                                    tintColor: "#767676",
                                                    marginRight: 20,
                                                    
                                                }}
                                                source = {require("../images/question.png")}
                                            />
                                        </View>
                                        <Text 
                                            style = {{
                                                color: "#A0A0A0",
                                                fontFamily: "Poppins-Medium",
                                                fontSize: 15,
                                            }}
                                        >
                                            {this.props.unattempted} Unattempted
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style = {{
                                        color: "white",
                                        fontFamily: "Poppins-Bold",
                                        marginBottom: 20,
                                        marginTop: 50,
                                    }}
                                >
                                    Solutions
                                </Text>
                                <View
                                    style = {{
                                        width: '100%',
                                        height: 110,
                                        backgroundColor: "#101010",
                                        borderRadius: 10,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 10
                                    }}
                                >
                                    <FlatList 
                                        data = {this.props.questions}
                                        renderItem = { ({item, index}) => {
                                            return (
                                                <View style = {{flexDirection: "row", alignItems: "center"}}>
                                                    <Text style = {{
                                                        color: "#404040",
                                                        fontFamily: "Poppins-Bold",
                                                        textAlign: "center",
                                                    }}>
                                                    Ans {index+1} - 
                                                    </Text>
                                                    <FlatList 
                                                        data = {item.answerOption}
                                                        renderItem = { ({item, index}) => (
                                                            <View>
                                                                {item.isCorrect === true ? 

                                                                    <View>
                                                                        <Text 
                                                                            style = {{
                                                                                fontFamily: "Poppins-Bold",
                                                                                color: "#404040",
                                                                                textAlign: "left"
                                                                            }}
                                                                        > {item.answerText}
                                                                        </Text>
                                                                    </View>
                                                                    : 
                                                                    <View>
                                                                    </View>
                                                                }
                                                            </View>
                                                        )}
                                                    />
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <TouchableWithoutFeedback
                                onPress = {() => {Actions.BottomNavigator({chosen: "test"})}}
                            >
                                <View
                                    style = {{
                                        marginTop: Platform.OS == "android" ? 50 : 50,
                                        justifyContent: "center",
                                        height: 55,
                                        borderWidth: 2,
                                        borderColor: "#4ACDF4",
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text
                                    style = {{
                                        color: "white",
                                        fontFamily: "Poppins-Bold",
                                        fontSize: 20,
                                        textAlign: "center",
                                        width: Dimensions.get("window").width - 50
                                    }}
                                    >
                                        Back to Tests Menu
                                    </Text>
                                </View> 
                            </TouchableWithoutFeedback>
                    </View>
                }
            </SafeAreaView>
        )
    }
}

export default Results;