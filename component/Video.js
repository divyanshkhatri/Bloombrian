import React, {Component} from 'react';
import {SafeAreaView, StatusBar, View, Image, Text, Dimensions, AsyncStorage, FlatList, ImageBackground, Platform, BackHandler,TouchableOpacity} from 'react-native';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {Actions} from 'react-native-router-flux';

class Video extends Component {

    backAction = () => {
        Actions.Homepage();
        return true;
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
    }

    state = {
        category: "",
        subject: "",
        s: [
            {
                label: 'Sub:  ' + 'Science',
                value: 'Science',
            },
            {
                label: 'Sub:  ' + 'English',
                value: 'English',

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
        subject: "",
        topic: {
            "Coordinate Geometry": 
                {
                    _id: "5e12905eb10fe53808d1ca5a",
                    videos: {
                        videosNo: 6,    
                        videosLength: 4,
                        urlVideos: [{id: '1', urls: require('../images/mathswork.png'), desc: "Coordinate Geometry - Introduction to straight Lines. (Part I)", teacher: "Rohit Holani", lock: true, time: "3:48"}, {id: '2', urls: require('../images/mathswork.png'), desc: "Coordinate Geometry - Introduction to straight Lines. (Part I)", teacher: "Rohit Holani", lock: false, time: "3:48"}, {id: '3', urls: require('../images/mathswork.png'), desc: "Coordinate Geometry - Introduction to straight Lines. (Part I)", teacher: "Rohit Holani", lock: false, time: "3:48"}, {id: '4', urls: require('../images/mathswork.png'), desc: "Coordinate Geometry - Introduction to straight Lines. (Part I)", teacher: "Rohit Holani", lock: true, time: "3:48"}, {id: '5', urls: require('../images/mathswork.png'), desc: "Coordinate Geometry - Introduction to straight Lines. (Part I)", teacher: "Rohit Holani", lock: true, time: "3:48"}, {id: '6', urls: require('../images/mathswork.png'), desc: "Coordinate Geometry - Introduction to straight Lines. (Part I)", teacher: "Rohit Holani", lock: true, time: "3:48"}],   
                    }
            },
            "Algebra": 
                {
                _id: "5e12905eb10fe53808d1ca5b",
                videos: {
                    videosNo: 7,    
                    videosLength: 3,
                    urlVideos: [{id: '1', urls: require('../images/mathswork.png'), desc: "Algebra - Introduction to straight Lines. (Part I)", teacher: "Rohit Holani", lock: true, time: "3:48"}, {id: '2', urls: require('../images/mathswork.png'), desc: "Algebra - Introduction to straight Lines. (Part I)", teacher: "Rohit Holani", lock: true, time: "3:48"}, {id: '3', urls: require('../images/mathswork.png'), desc: "Algebra - Introduction to straight Lines. (Part I)", teacher: "Rohit Holani", lock: true, time: "3:48"}, {id: '4', urls: require('../images/mathswork.png'), desc: "Algebra - Introduction to straight Lines. (Part I)", teacher: "Rohit Holani", lock: true, time: "3:48"}],    
                }
            },
            "Fractions": 
                {
                _id: "5e12905eb10fe53808d1ca5c",
                videos: {
                    videosNo: 7,    
                    videosLength: 3,
                    urlVideos: [{id: '1', urls: require('../images/mathswork.png'), desc: "Fractions - Introduction to straight Lines. (Part I)", teacher: "Rohit Holani", lock: true, time: "3:48"}, {id: '2', urls: require('../images/mathswork.png'), desc: "Fractions - Introduction to straight Lines. (Part I)", teacher: "Rohit Holani", lock: true, time: "3:48"}, {id: '3', urls: require('../images/mathswork.png'), desc: "Fractions - Introduction to straight Lines. (Part I)", teacher: "Rohit Holani", lock: true, time: "3:48"}, {id: '4', urls: require('../images/mathswork.png'), desc: "Fractions - Introduction to straight Lines. (Part I)", teacher: "Rohit Holani", lock: true, time: "3:48"}],    
                }
            },
        },
        chosenTopic: "Coordinate Geometry",
        academics: false,
        invention: false,
        communication: false,
    }

    valueChange = (val) => {
        this.setState({chosenTopic: val});
    }

    render() {
        return (
            <SafeAreaView
                style = {{
                    // flex: 1,
                    height: '100%',
                    // flexDirection: 'column',
                    backgroundColor: 'black',
                    paddingTop: Platform.OS === 'android' ? 5 : 0
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
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // width: 200, 
                    // borderWidth: 2,
                    // borderColor: 'white'
                }}>
                    <View style = {{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
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
                            // height: 40,
                            // borderWidth: 2, 
                            // borderColor: 'white',
                            // flexDirection: 'row',
                            // flex: 1,
                            // alignItems: 'flex-end',
                            // justifyContent: 'flex-end'
                        }}
                        onPress = {() => {
                            this.state.category === "Academics" ? this.setState({academics: true}) :
                            this.state.category === "Invention" ? this.setState({invention: true}) : 
                            this.setState({communication: true})
                        }}>
                        <Text style = {{
                            paddingTop: Platform.OS == 'ios' ? 4 : 3,
                            justifyContent: 'center',
                            alignContent: 'center',
                            textAlign: 'center', 
                            alignSelf: 'center',
                            fontFamily: "Poppins-SemiBold", 
                            color: "white",
                            fontSize: Platform.OS == "android" ? 12 : 14,
                            // marginTop: 15, 
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
                
                <Modal 
                    isVisible = {this.state.invention}
                    animationIn = "pulse"
                    animationOut = "pulse"
                    transparent = {true}
                    onBackdropPress = {() => this.setState({invention: false})}
                >   
                    <View>
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
                        elevation: 5,
                    }}
                    >   
                        <Text 
                            style = {{
                                fontFamily: 'Poppins-ExtraBold',
                                color: 'white',
                                fontSize: 20,
                                marginBottom: 30,
                                // marginLeft: 20,
                                textAlign: "center"
                        }}>
                            Choose a Subject
                        </Text>
                        <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableOpacity
                                onPress = { () => {
                                    this.setState({
                                        invention: false
                                    })
                                    AsyncStorage.setItem('subject', 'Robotics');
                                    AsyncStorage.setItem('category', 'Invention');
                                    Actions.BottomNavigator();
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#6EDEFF', '#32C1ED', '#1285D1']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 120,
                                        marginRight: 10,
                                        alignSelf: 'center',
                                        marginBottom: 10,
                                        height: 120,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/robotics.png")}
                                        style = {{
                                            height: 50,
                                            width: 50
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-ExtraBold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5,
                                        textAlign: 'center'
                                    }}>
                                        Robotics
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress = { () => {
                                    this.setState({
                                        invention: false
                                    })
                                    AsyncStorage.setItem('subject', 'Coding');
                                    AsyncStorage.setItem('category', 'Invention');
                                    Actions.BottomNavigator({subject: "Coding"});
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#654FB6', '#24194C']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 120,
                                        marginBottom: 10,
                                        marginLeft: 10,
                                        alignSelf: 'center',
                                        height: 120,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/coding.png")}
                                        style = {{
                                            height: 50,
                                            width: 50,
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-ExtraBold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5,
                                        textAlign: 'center'
                                    }}>
                                        Coding
                                    </Text>

                                </LinearGradient>
                            </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress = { () => {
                                    this.setState({
                                        invention: false
                                    })
                                    AsyncStorage.setItem('subject', '3D-Printing');
                                    AsyncStorage.setItem('category', 'Invention');
                                    Actions.BottomNavigator({subject: "3D-Printing"});
                                }}>
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#EB68F3', '#6E25B6']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 120,
                                        marginTop: 10,
                                        alignSelf: 'center',
                                        height: 120,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/3d-printer.png")}
                                        style = {{
                                            height: 50,
                                            width: 50,
                                            tintColor: "white"
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-ExtraBold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        3D Printing
                                    </Text>

                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal 
                    isVisible = {this.state.communication}
                    animationIn = "pulse"
                    animationOut = "pulse"
                    transparent = {true}
                    onBackdropPress = {() => this.setState({communication: false})}
                >   
                <View>
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
                        elevation: 5,
                    }}
                    >   
                        <Text 
                            style = {{
                                fontFamily: 'Poppins-ExtraBold',
                                color: 'white',
                                fontSize: 20,
                                marginBottom: 30,
                                // marginLeft: 20,
                                textAlign: "center"
                        }}>
                            Choose a Subject
                        </Text>
                        <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableOpacity
                                onPress = { () => {
                                    this.setState({
                                        communication: false
                                    })
                                    AsyncStorage.setItem('subject', 'Personality Development');
                                    AsyncStorage.setItem('category', 'Communication');
                                    Actions.BottomNavigator();
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#6EDEFF', '#32C1ED', '#1285D1']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 120,
                                        marginRight: 10,
                                        alignSelf: 'center',
                                        marginBottom: 10,
                                        height: 120,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/development.png")}
                                        style = {{
                                            height: 50,
                                            width: 50
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5,
                                        textAlign: 'center'
                                    }}>
                                        Personality Development
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress = { () => {
                                    this.setState({
                                        communication: false
                                    })
                                    AsyncStorage.setItem('subject', 'English Core Grammar');
                                    AsyncStorage.setItem('category', 'Communication');
                                    Actions.BottomNavigator({subject: "English Core Grammar"});
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#654FB6', '#24194C']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 120,
                                        marginBottom: 10,
                                        marginLeft: 10,
                                        alignSelf: 'center',
                                        height: 120,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/grammar.png")}
                                        style = {{
                                            height: 50,
                                            width: 50,
                                            tintColor: "white"
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5,
                                        textAlign: 'center'
                                    }}>
                                        English Core Grammar
                                    </Text>

                                </LinearGradient>
                            </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                                onPress = { () => {
                                    this.setState({
                                        communication: false
                                    })
                                    AsyncStorage.setItem('subject', 'Public Speaking');
                                    AsyncStorage.setItem('category', 'Communication');
                                    Actions.BottomNavigator({subject: "Public Speaking"});
                                }}>
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#EB68F3', '#6E25B6']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 120,
                                        marginTop: 10,
                                        alignSelf: 'center',
                                        height: 120,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/speaking.png")}
                                        style = {{
                                            height: 50,
                                            width: 50,
                                            tintColor: "white"
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        Public Speaking
                                    </Text>

                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </Modal>

                <Modal
                    
                    isVisible = {this.state.academics}
                    animationIn = "pulse"
                    animationOut = "pulse"
                    onBackdropPress = {() => {this.setState({academics: false})}}
                    transparent = {true}
                    style = {{
                        // width: 320,
                        // height: 400,
                        // borderColor: 'white',
                        // borderWidth: 2
                    }}
                    // backdropOpacity = {0.8}
                    // backgroundColor = '#000'
                    // backdropOpacity= {1}
                    // backdropColor={'green'}
                >   
                <View>
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
                        width: 310,
                        height: 450,
                        // alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                        width: 0,
                        height: 2,
                        },
                        shadowOpacity: 0.75,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                    >   
                        <Text 
                            style = {{
                                fontFamily: 'Poppins-ExtraBold',
                                color: 'white',
                                fontSize: 20,
                                // marginBottom: 10,
                                // marginLeft: 20,
                                alignSelf: "center"
                        }}>
                            Choose a Subject
                        </Text>
                        <View 
                            style = {{
                                flexDirection: "row",
                                flex: 1,
                                marginTop: 20,
                                alignContent: "space-between",
                                justifyContent: 'space-evenly'
                                }}>
                            <TouchableOpacity
                                onPress = { () => {
                                    this.setState({
                                        academics: false
                                    })
                                    AsyncStorage.setItem('subject', 'Science');
                                    AsyncStorage.setItem('category', 'Academics');
                                    Actions.BottomNavigator();
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#6EDEFF', '#32C1ED', '#1285D1']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 100,
                                        // marginLeft: 16,
                                        height: 100,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/flask-with-liquid2.png")}
                                        style = {{
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        Science
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress = { () => {
                                    this.setState({
                                        academics: false
                                    })
                                    AsyncStorage.setItem('subject', 'Mathematics');
                                    AsyncStorage.setItem('category', 'Academics');
                                    Actions.BottomNavigator({subject: "Mathematics"});
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#654FB6', '#24194C']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 100,
                                        marginLeft: 16,

                                        height: 100,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/maths.png")}
                                        style = {{
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        Maths
                                    </Text>

                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View
                            style = {{
                                flex: 1,
                                flexDirection: "row",
                                marginTop: Platform.OS == "ios" ? 25 : 30,
                                alignSelf: 'center',
                                alignItems: 'center',
                                // justifyContent: 'center'
                            }}>
                            <TouchableOpacity
                                onPress = { () => {
                                    this.setState({
                                        academics: false
                                    })
                                    AsyncStorage.setItem('subject', 'SST');
                                    AsyncStorage.setItem('category', 'Academics');
                                    Actions.BottomNavigator();
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#EB68F3', '#6E25B6']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3,  
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 100,
                                        // marginLeft: 16,
                                        height: 100,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/sst.png")}
                                        style = {{
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        SST
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress = { () => {
                                    this.setState({
                                        academics: false
                                    })
                                    AsyncStorage.setItem('subject', 'English');
                                    AsyncStorage.setItem('category', 'Academics');
                                    Actions.BottomNavigator({subject: "English"});
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#4AD240', '#177710']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 100,
                                        marginLeft: 25,
                                        height: 100,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/eng.png")}
                                        style = {{
                                            height: 30,
                                            width: 43,
                                            tintColor: 'white'
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        English
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View
                            style = {{
                                    flex: 1,
                                    flexDirection: "row",
                                    marginTop: 20,
                                    alignSelf: 'flex-start'
                                }}>
                            <TouchableOpacity
                                onPress = { () => {
                                    this.setState({
                                        academics: false
                                    })
                                    AsyncStorage.setItem('subject', 'EVS');
                                    AsyncStorage.setItem('category', 'Academics');
                                    Actions.BottomNavigator();
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#FFC56E', '#D16B12']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 100,
                                        marginLeft: 8,
                                        height: 100,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/evs.png")}
                                        style = {{
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        EVS
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        {/* <View 
                            style = {{
                                flexDirection: "row",
                                flex: 1,
                                marginTop: 20
                                // justifyContent: 'space-evenly'
                                }}>
                                

                            <LinearGradient
                    // Button Linear Gradient
                                colors={[ '#654FB6', '#24194C']}
                                style={{ 
                                    paddingTop: 25, 
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    width: 100,
                                    marginLeft: 16,
                                    height: 100,
                                    borderRadius: 15
                            }}>
                                <Image 
                                    source = {require("../images/flask-with-liquid2.png")}
                                    style = {{
                                        height: 40,
                                        width: 40
                                    }}
                                />
                                <Text style = {{
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: 14,
                                    color: '#fff',
                                    marginTop: 5
                                }}>
                                    Maths
                                </Text>

                            </LinearGradient>
                            <LinearGradient
                    // Button Linear Gradient
                                colors={[ '#EB68F3', '#6E25B6']}
                                style={{ 
                                    paddingTop: 25, 
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    width: 100,
                                    marginLeft: 16,
                                    height: 100,
                                    borderRadius: 15
                            }}>
                                <Image 
                                    source = {require("../images/flask-with-liquid2.png")}
                                    style = {{
                                        height: 40,
                                        width: 40
                                    }}
                                />
                                <Text style = {{
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: 14,
                                    color: '#fff',
                                    marginTop: 5
                                }}>
                                    EVS
                                </Text>
                            </LinearGradient>
                            </View>
                            <View
                            style = {{
                                flex: 1, 
                                flexDirection: 'row',
                                marginTop: 20
                            }}>
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#4AD240', '#177710']}
                                    style={{ 
                                        paddingTop: 25, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 100,
                                        marginLeft: 16,
                                        height: 100,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/flask-with-liquid2.png")}
                                        style = {{
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        English
                                    </Text>
                                </LinearGradient>
                            </View> */}
                        </View>
                        </View>
                    </Modal>

                <RNPickerSelect

                    placeholder={{
                        label: 'Coordinate Geometry',
                        value: 'Coordinate Geometry',
                        color: '',
                        // fontFamily: 'Poppins-Medium'
                    }}
                    
                    style = {{
                        inputIOSContainer: {
                            margin: 16,
                            marginTop: 30,
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
                            margin: 16,
                            marginTop: 30,
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
                        this.valueChange(value);
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
                <View style = {{backgroundColor: '#090909', borderTopEndRadius: 10, paddingBottom: 50}}>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16, paddingTop: 20, paddingBottom: 20}}>
                        <View style ={{flexDirection: 'row'}}>
                        <Text style = {{
                            color: '#32C6F3',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 12
                        }}>
                            {this.state.topic[this.state.chosenTopic].videos.videosNo} Videos 
                        </Text>
                        <Text style = {{marginLeft: Dimensions.get('window').width/40, marginRight: Dimensions.get('window').width/40}}></Text>
                        <Text style = {{
                            color: '#32C6F3',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 12
                        }}>
                            {this.state.topic[this.state.chosenTopic].videos.videosLength} hours 
                        </Text>
                        </View>
                        <Text style = {{
                            color: '#32C6F3',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 12

                        }}>
                           Download All 
                        </Text>
                    </View>
                    <FlatList 
                    
                        showsHorizontalScrollIndicator = {false}
                        showsVerticalScrollIndicator = {false}
                        // ListFooterComponent={<View style={{width:100}}></View>}
                        contentContainerStyle={{ paddingBottom: Platform.OS == 'ios' ? 200: 220}} 
                        data = {this.state.topic[this.state.chosenTopic].videos.urlVideos}
                        renderItem = {({item}) => (
                            <View style = {{
                                flexDirection: 'row', 
                                // borderWidth: 2, 
                                // borderColor: 'white',
                                marginLeft: 16, 
                                marginRight: 16,
                                backgroundColor: '#1C1C1C',
                                marginBottom: 20,
                                borderRadius: 10
                            }}>
                                <View>
                                    <ImageBackground
                                        style = {{
                                            // marginTop: 20,
                                            // marginRight: 20,
                                            width: 170, 
                                            height: 100, 
                                            borderRadius: 10,
                                            marginBottom: 0,
                                            overflow: 'hidden',
                                            position: 'relative',
                                        }}
                                        source = {item.urls}
                                    >
                                        <Text 
                                            style = {{
                                                color: 'white', 
                                                backgroundColor: 'black',
                                                position: 'absolute',
                                                bottom: 10,
                                                fontFamily: 'Poppins-Regular',
                                                fontSize: 10,
                                                right: 10,
                                                // borderRadius: 3,
                                                overflow: 'hidden',
                                                paddingLeft: 2,
                                                paddingRight: 2,
                                        }}>
                                        {item.time}
                                        </Text>
                                    </ImageBackground>
                                    </View>
                                    <View style = {{
                                        flexShrink: 1,
                                        justifyContent: 'space-around', 
                                    }}>

                                        <Text style = {{
                                            color: 'white',
                                            fontFamily: 'Poppins-Regular',
                                            paddingLeft: 12,
                                            paddingRight: 12,
                                            // borderColor: 'white',
                                            // borderWidth: 2,
                                            flexShrink: 1,
                                            fontSize: 10,
                                            // paddingTop:10
                                        }}>
                                            {item.desc}
                                        </Text>
                                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style = {{
                                            color: '#828282',
                                            fontFamily: 'Poppins-SemiBold',
                                            paddingLeft: 12,
                                            paddingRight: 12,
                                                    // borderColor: 'white',
                                                    // borderWidth: 2,
                                            flexShrink: 1,
                                            fontSize: 10,
                                            // paddingTop: 29
                                        }}>
                                            {item.teacher}
                                        </Text>
                                        {item.lock == true ? <Image style = {{ width: 10, height: 10, marginRight: 15 }} source = {require('../images/lock.png')}/> : null}
                                        {/* <Text style = {{color: 'white'}}>{item.lock}</Text> */}
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor = {(item) => item._id}

                    />
                    
                    {/* <Text style = {{color: 'white'}}>{this.state.topic[this.state.chosenTopic].videos.urlVideos[0].id}</Text> */}

                </View>
            </SafeAreaView>
        )
    }

}

export default Video;