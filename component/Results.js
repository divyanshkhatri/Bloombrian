import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Results extends Component {

    componentDidMount() {

    }

    state = {
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
                    <TouchableOpacity onPress = {() => Actions.BottomNavigator()}>
                        <Image 
                            style = {{ 
                                width: 22, 
                                height: 22,
                                marginLeft: 20,
                            }}
                            source = {require("../images/back.png")} 
                        />
                    </TouchableOpacity>
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
                        <View>

                        </View>
                    : ((this.state.marks/this.state.total) <0.9 && (this.state.marks/this.state.total) > 0.75) ?
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
                                    Keep it up!
                                </Text>
                                <Text
                                    style = {{
                                        color: "#FF9131",
                                        fontFamily: "Poppins-ExtraBold",
                                        fontSize: 26,
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
                                        paddingBottom: 30,
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
                                        marginLeft: 10,
                                        width: 100,
                                        height: 100,
                                        borderRadius: 50,
                                        borderWidth: 5,
                                        borderColor: "white"
                                    }}
                                >
                                    <View
                                        style = {{
                                            borderBottomColor: "white",
                                            borderBottomWidth: 3,
                                            marginLeft: 5,
                                            marginRight: 5,
                                        }}
                                    >
                                        <Text 
                                            style = {{
                                                textAlign: "center",
                                                color: "white",
                                                fontFamily: "Poppins-Bold",
                                                fontSize: 30,
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
                                            fontSize: 30,
                                        }}
                                    >
                                        {this.state.total}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    :
                        <View>

                        </View>
                }
            </SafeAreaView>
        )
    }
}

export default Results;