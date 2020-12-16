import React, {Component} from 'react';
import {SafeAreaView, StatusBar, View, Image, Text, Dimensions, AsyncStorage, Platform, Linking,BackHandler,TouchableOpacity} from 'react-native';
import DemoLectures1 from './DemoLectures1';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {Actions} from 'react-native-router-flux';
import DemoVideos1 from './DemoVideos1';
import RealSchedule1 from './RealSchedule1';
import Recorded1 from './Recored1';
import ActionButton from 'react-native-action-button';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient';

class Live1 extends Component {

    state = {
        ds: true,
        rs: false,
        rl: false,
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
        subject: "",
        category: "",
        id: "",
        plan: false,
    }

    backAction = () => {
        Actions.Homepage();
        return true;
    };

    
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }
    
    componentDidMount() {

        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        AsyncStorage.getItem('id')
        .then((value) => {
            this.setState({id: value})
            let url = 'http://idirect.bloombraineducation.com/idirect/lms/profile?id='+this.state.id;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                if(response.ok) {
                    response.json().then((responseJson) => {
                        console.log(responseJson);
                        this.setState({plan: responseJson["plan"]});
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
                console.error(error);
            });
        })
        .catch((e) => console.log(e));

    }

    onDemoClicked = () => {
        this.setState({
            ds: true,
            rs: false,
            rl: false
        })
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
                <ActionButton 
                    style = {{
                        position: "absolute",
                        zIndex: 10,
                        top: Platform.OS == "android" ? -15 : 25,

                    }}         
                    offsetX = {25}      
                    size = {40}
                    renderIcon = {() => (
                        <View 
                            style = {{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                overflow: "hidden",
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <AnimatedLinearGradient
                                // Button Linear Gradient
                                customColors={[ '#6EDEFF', '#32C1ED', '#1281DD']}
                                speed = {600}
                                points = {{
                                    start: {x: 1, y: 0.6}, 
                                    end: {x: 0, y: 0.4}
                                }}
                            >
                            <Image 
                                style = {{
                                    width: 25, 
                                    height: 25,
                                    tintColor: "white",
                                    alignSelf: "center",
                                    marginTop: 7.5,
                                }}
                                source = {require("../images/phone1.png")}/>
                            </AnimatedLinearGradient>
                        </View>
                        )
                    }
                    degrees = {0}
                    // bgColor = "#101010"
                    verticalOrientation = "down"
                    // hideShadow
                >
                    <ActionButton.Item 
                        style = {{
                            zIndex: 100
                        }}
                        buttonColor='rgb(251, 136, 42)' onPress={() => Linking.openURL("tel:+917303955737")}>
                        <Image 
                            style = {{
                                width: 25, 
                                height: 25,
                                tintColor: "white"
                            }}
                            source = {require("../images/phone1.png")}
                        />
                    </ActionButton.Item>
                    <ActionButton.Item 
                        style = {{
                            zIndex: 100
                        }}
                        buttonColor='rgb(19, 32 ,77)' onPress={() => Linking.openURL('mailto:info@bloombraineducation.com')}>
                        <Image 
                            style = {{
                                width: 25, 
                                height: 25,
                                tintColor: "white"
                            }}
                            source = {require("../images/email1.png")}
                        />
                    </ActionButton.Item>
                    <ActionButton.Item 
                        style = {{
                            zIndex: 100
                        }}
                        buttonColor='#25D366' onPress={() => {Linking.openURL("https://wa.me/+917303955737?text=Hey!%20%20I%20wanted%20to%20know%20more%20about%20the%20courses")}}>
                        <Image 
                            style = {{
                                width: 30, 
                                height: 30,
                                tintColor: "white"
                            }}
                            source = {require("../images/whatsapp.png")}
                        />
                    </ActionButton.Item>
                </ActionButton>

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
                    alignItems: 'center'
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

                {
                    this.state.subject ?
                    
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
                : null
                }
                </View>
                <View style = {{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 30,
                    marginLeft: 10, 
                    marginRight: 10,
                }}>
                    <TouchableOpacity onPress = { () => {
                        this.onDemoClicked()
                    }}>
                    {this.state.plan == true ?
                        <Text style = {{
                            color: this.state.ds ? '#4ACDF4' : '#383838', 
                            fontSize: this.state.ds ? Platform.OS == "android" ? 12 : 14 : Platform.OS == "android" ? 11 : 13,
                            fontFamily: 'Poppins-Bold'    
                        }}> Class Schedule</Text> 
                        : 
                        <Text style = {{
                            color: this.state.ds ? '#4ACDF4' : '#383838', 
                            fontFamily: 'Poppins-Bold',
                            fontSize: this.state.ds ? Platform.OS == "android" ? 13 : 14 : Platform.OS == "android" ? 12 : 13,
                        }}> Demo Schedule</Text>
                    }
                    </TouchableOpacity>
                    <TouchableOpacity  onPress = { () => {
                        this.setState({
                            ds: false,
                            rs: true,
                            rl: false,
                        })
                    }}>
                    <Text style = {{
                        color: this.state.rs ? '#4ACDF4' : '#383838',  
                        fontFamily: 'Poppins-Bold',
                        fontSize: this.state.rs ? Platform.OS == "android" ? 13 : 14 : Platform.OS == "android" ? 12 : 13,
                    }}>Class Schedules</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress = { () => {
                        this.setState({
                            ds: false,
                            rl: true,
                            rs: false
                        })
                        console.log(this.state.ds, this.state.rl)
                    }}>
                    <Text style = {{
                        color: this.state.rl ? '#4ACDF4' : '#383838',  
                        fontFamily: 'Poppins-Bold',
                        fontSize: this.state.rl ? Platform.OS == "android" ? 13 : 14 : Platform.OS == "android" ? 12 : 13,
                    }}>Recorded Lectures</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{
                    flexDirection: 'row',
                    marginTop: 7,
                }}>
                    <View
                        style = {{
                            width: this.state.ds ? Platform.OS == "ios" ? '33.5%' : '34.0%' : Platform.OS == "ios" ? '31.4%' : '31.2%', 
                            height: 3,
                            backgroundColor: this.state.ds ? "#4ACDF4" : "#383838"
                        }}
                    >
                    </View>
                    <View
                        style = {{
                            width: this.state.rs ? Platform.OS == "ios" ? '32.7%' : '33.3%' : Platform.OS == "ios" ? '30.4%' : '30.4%', 
                            height: 3,
                            backgroundColor: this.state.rs ? "#4ACDF4" : "#383838"
                        }}
                    >
                    </View>
                    <View
                        style = {{
                            width: this.state.rl ? '38.6%' : '34.0%', 
                            height: 3,
                            backgroundColor: this.state.rl ? "#4ACDF4" : "#383838"
                        }}
                    >
                    </View>
                </View>
                    {/* <View>{this.state.ds ? <DemoLectures /> : <Recorded />}</View> */}
                    <View>{this.state.ds ? this.state.plan ? <DemoLectures1 /> : <DemoVideos1 /> : this.state.rs ? <RealSchedule1 /> : <Recorded1 />}</View>
            </SafeAreaView>
        )
    }

}

export default Live1;