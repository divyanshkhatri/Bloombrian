import React, {Component} from 'react';
import {StatusBar, View, Text, SafeAreaView, Dimensions, Image, ScrollView, TouchableOpacity, AsyncStorage} from 'react-native';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import { set } from 'react-native-reanimated';
class Favourite extends Component {

    state = {
        class: "1",
        science: false,
        maths: false,
        sst: false,
        eng: false,
        evs: false,
        robo: false,
        print: false,
        coding: false,
        pd: false,
        ecg: false,
        ps: false,
        classes: [
            {
                label: 'CLASS 2nd',
                value: '2',
            },
            {
                label: 'CLASS 3rd',
                value: '3',
            },
            {
                label: 'CLASS 4th',
                value: '4',
            },
            {
                label: 'CLASS 5th',
                value: '5',
            },
            {
                label: 'CLASS 6th',
                value: '6',
            },
            {
                label: 'CLASS 7th',
                value: '7',
            },
            {
                label: 'CLASS 8th',
                value: '8',
            },
            {
                label: 'CLASS 9th',
                value: '9',
            },
            {
                label: 'CLASS 10th',
                value: '10',
            },
            {
                label: 'CLASS 11th',
                value: '11',
            },
            {
                label: 'CLASS 12th',
                value: '12+',
            },
        ],

        email: "",

    }

    componentDidMount() {
        AsyncStorage.getItem('email')
        .then((value) => {this.setState({email: value})})
        .catch((e) => {console.log(e)})
    }

    onPressInterest = () => {
        console.log("pressed");
        let it = [];
        if(this.state.science) {
            it.push("Science");
        }
        if(this.state.maths) {
            it.push("Mathematics");
        }
        if(this.state.sst) {
            it.push("SST");
        }
        if(this.state.eng) {
            it.push("English");
        }
        if(this.state.evs) {
            it.push("EVS");
        }
        if(this.state.robo) {
            it.push("Robotics");
        }
        if(this.state.print) {
            it.push("3D-Printing");
        }
        if(this.state.coding) {
            it.push("Coding");
        }
        if(this.state.pd) {
            it.push("Personality Development");
        }
        if(this.state.ecg) {
            it.push("English Core Grammar");
        }
        if(this.state.ps) {
            it.push("Public Speaking");
        }
        if(it.length === 0) {
            AsyncStorage.setItem('interest', 'true') 
            let url = 'http://idirect.bloombraineducation.com/idirect/lms/interest?email='+this.state.email+'&interest=[]&class_data='+this.state.class
            console.log(url)
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    Actions.Homepage();
                    console.log(responseJson);
                })
                .catch((error) => {
                    this.setState({login: false})
                    console.error(error);
                }
            );
        }
        else {

            // it = ["mathematics", "science"]

            it = JSON.stringify(it);        // it = "[mathematics", "science"]"
            AsyncStorage.setItem('interest', 'true')
            let url = 'http://idirect.bloombraineducation.com/idirect/lms/interest?email='+this.state.email+'&interest='+it+'&class_data='+this.state.class
            console.log(url)
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                     Actions.Homepage();
                    console.log(responseJson);
                })
                .catch((error) => {
                    this.setState({login: false})
                    console.error(error);
            });
        }
    }

    render() {
        return (
            <SafeAreaView
                style = {{
                    // flex: 1,
                    height: '100%',
                    // flexDirection: 'column',
                    backgroundColor: 'black',
                    paddingTop: Platform.OS === 'android' ? 0 : 0,
                    paddingBottom: 20
                }}
            >
            <StatusBar 
                backgroundColor = "black"
            />
            <ScrollView>
                <View>
                    <LinearGradient
                            // Button Linear Gradient
                            colors={[ '#004BAD', '#4ACDF4']}
                            start={{x: 0, y: 1}} end={{x: 1, y: 0}}
                            style={{ 
                                paddingLeft: 20, 
                                
                                // borderRadius: 5,
                                width: Dimensions.get('window').width,
                                // marginLeft: 16,
                                height: 115,
                                justifyContent: 'center',
                                // alignContent: "center"
                                // borderRadius: 15
                        }}>
                            <TouchableOpacity
                                onPress = { () => Actions.pop()}
                            >
                            </TouchableOpacity>
                            <Text
                            style = {{
                                // marginTop: Platform.OS == 'android' ? 0 : 25,
                                // height: Platform.OS == 'android' ? 60: 50,
                                // borderColor: 'white',
                                // borderWidth: 2,
                                // paddingTop: 20,
                                fontFamily: 'Poppins-Bold',
                                color: 'white',
                                fontSize: 25,
                                paddingRight: 65
                            }}
                            >
                                Help Us to know you
                            </Text>
                            <Text
                            style = {{

                                // height: Platform.OS == 'android' ? 60: 50,
                                // borderColor: 'white',
                                // borderWidth: 2,
                                // marginTop: -2, 
                                // paddingTop: 25,
                                fontFamily: 'Poppins-Bold',
                                color: 'white',
                                fontSize: 25,
                                paddingRight: 65
                            }}
                            >
                                better!
                            </Text>
                        </LinearGradient>
                    </View>
                    <View style = {{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: 20,
                        paddingRight: 20
                    }}>
                    <View>
                        <Text style = {{
                            marginTop: 38,
                            fontFamily: 'Poppins-Medium',
                            color: 'white',
                            fontSize: 14,

                        }}>Which class are you in ?</Text>
                    </View>
                
                    {
                    this.state.classes ?
                <RNPickerSelect

                    placeholder={{
                        label: 'CLASS 1st',
                        value: 'Class1st',
                        color: '',
                        // fontFamily: 'Poppins-Medium'
                    }}

                    style = {{
                        inputIOSContainer: {
                            marginTop: 30,
                            height: 40,                             
                            borderRadius: 25,
                            backgroundColor: '#2C2B2B',
                            width: 130
                        },
                        placeholder: {
                            // paddingTop: Platform.OS === 'android' ? 15: 15,
                            paddingLeft: Platform.OS === 'android' ? 15: 15,
                            paddingTop: Platform.OS == "android" ? 5 : 10,
                            fontSize: 14,
                            fontFamily: 'Poppins-Bold',
                            color: 'white',
                            justifyContent: "center",
                            alignItems: 'center',
                        },
                        inputAndroid: {
                            paddingLeft: 15,
                            paddingTop: Platform.OS == "android" ? 5 : 10,
                            fontSize: 14,
                            fontFamily: 'Poppins-Bold',
                            color: 'white'
                        },
                        inputIOS: {
                            fontSize: 14,
                            paddingLeft: 15, 
                            paddingTop: Platform.OS == "android" ? 5 : 10,
                            fontFamily: 'Poppins-Bold',
                            color: 'white' 
                        },

                        inputAndroidContainer: {
                            marginTop: 30,
                            height: 40,                             
                            borderRadius: 25,
                            backgroundColor: '#2C2B2B',
                            width: 130
                        }
                        
                    }}
                    items = {this.state.classes}
                    
                    useNativeAndroidPickerStyle = {false}

                    onValueChange = { (value, index) => {
                        this.setState({class: value})
                        console.log(value);
                    }}

                    Icon = { () => {
                        return (
                            <View
                            style = {{
                                // borderWidth: 2,
                                // borderColor: 'white',
                                marginTop: 10,
                                marginRight: 15,
                            }}>
                            <Image 
                            style = {{
                                width: 20,
                                height: 20,
                                tintColor: '#828282'
                                
                            }}
                            source = {require('../images/icon.png')}/>

                            </View>
                        )
                    }}
                >
                </RNPickerSelect>
                : null
                }
                </View>
                <View>
                    <Text style = {{
                        marginTop: 40,
                        paddingLeft: 20,
                        fontFamily: 'Poppins-Medium',
                        color: 'white',
                        fontSize: 14,
                        
                    }}>Tell us about some of your interests.</Text>
                </View>
                <View 
                    style = {{
                        flex: 1,
                        flexDirection: "row",
                        marginTop: 20,
                        marginLeft: 17,
                        justifyContent: 'space-around',
                        marginRight: 17
                        }}>
                            <TouchableOpacity
                                 onPress = {() => {
                                    this.setState({science: !this.state.science})
                                }}
                            >
                            <View
                                style = {{
                                    borderWidth: this.state.science ? 4 : 0,
                                    borderColor: "white",
                                    borderRadius: Platform.OS == "android" ? 14 : 14,
                                }}
                            >
                            <LinearGradient
                // Button Linear Gradient
                            colors={[ '#6EDEFF', '#32C1ED', '#1285D1']}
                            style={{ 
                                paddingTop: 5, 
                                alignItems: 'center',
                                // borderRadius: 5,
                                width: Platform.OS == "android" ? ( this.state.science ?  162 : 170) : (this.state.science ? 142 : 150),
                                        // marginLeft: 16,
                                        // overflow: "hidden",
                                height: this.state.science ? 92 : 100,
                                borderRadius: 10,
                                justifyContent: 'center',
                                // borderWidth: this.state.science ? 4 : 0,
                                // borderColor: 'white',
                                borderRadius: 10,
                                // overflow: 'hidden'
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
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = { () => {
                                this.setState({maths: !this.state.maths})
                            }}
                        >
                            <View
                                style = {{
                                    borderWidth: this.state.maths ? 4 : 0,
                                    borderColor: "white",
                                    borderRadius: Platform.OS == "android" ? 14 : 14,
                                }}
                            >
                            <LinearGradient
                    // Button Linear Gradient
                                colors={[ '#654FB6', '#24194C']}
                                style={{ 
                                    paddingTop: 5, 
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    width: Platform.OS == "android" ? ( this.state.maths ?  162 : 170) : (this.state.maths ? 142 : 150),
                                        // marginLeft: 16,
                                        // overflow: "hidden",
                                    height: this.state.maths ? 92 : 100,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    // borderWidth: this.state.maths ? 4 : 0,
                                    // borderColor: 'white'
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
                            </View>
                            </TouchableOpacity>
                        </View>
                        <View
                            style = {{
                                flex: 1,
                                flexDirection: "row",
                                marginTop: 20,
                                marginLeft: 17,
                                justifyContent: 'space-around',
                                marginRight: 17,
                            }}>
                            <TouchableOpacity
                                 onPress = {() => {
                                    this.setState({sst: !this.state.sst})
                                }}
                            >
                            <View 
                                style = {{
                                    borderWidth: this.state.sst ? 4 : 0,
                                    borderColor: "white",
                                    borderRadius: Platform.OS == "android" ? 14 : 14,
                                }}
                            >
                            <LinearGradient
                    // Button Linear Gradient
                                colors={[ '#EB68F3', '#6E25B6']}
                                style={{ 
                                    paddingTop: 5, 
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    width: Platform.OS == "android" ? ( this.state.sst ?  162 : 170) : (this.state.sst ? 142 : 150),
                                        // marginLeft: 16,
                                        // overflow: "hidden",
                                    height: this.state.sst ? 92 : 100,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    // borderWidth: this.state.sst ? 4 : 0,
                                    // borderColor: 'white'
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
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress = {() => {
                                    this.setState({eng: !this.state.eng})
                                }}
                            >
                            <View 
                                style = {{
                                    borderWidth: this.state.eng ? 4 : 0,
                                    borderColor: "white",
                                    borderRadius: Platform.OS == "android" ? 14 : 14,
                                }}
                            >
                            <LinearGradient
                    // Button Linear Gradient
                                colors={[ '#4AD240', '#177710']}
                                style={{ 
                                    paddingTop: 5, 
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    width: Platform.OS == "android" ? ( this.state.eng ?  162 : 170) : (this.state.eng ? 142 : 150),
                                        // marginLeft: 16,
                                        // overflow: "hidden",
                                    height: this.state.eng ? 92 : 100,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    // borderWidth: this.state.eng ? 4 : 0,
                                    // borderColor: 'white'
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
                            </View>
                            </TouchableOpacity>
                        </View>
                        <View
                            style = {{
                                    flex: 1,
                                    flexDirection: "row",
                                    marginTop: 20,
                                    marginLeft: 17,
                                    justifyContent: 'space-around',
                                    marginRight: 17,
                                    // borderWidth: this.state.evs ? 4 : 0,
                                    // borderColor: 'white'
                                }}>
                            <TouchableOpacity
                                 onPress = {() => {
                                    this.setState({evs: !this.state.evs})
                                }}
                            >
                            <View>
                                <View 
                                style = {{
                                    borderWidth: this.state.evs ? 4 : 0,
                                    borderColor: "white",
                                    borderRadius: Platform.OS == "android" ? 14 : 14,
                                }}> 
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={['#FFC56E', '#D16B12']}
                                    style={{ 
                                        paddingTop: 5, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: Platform.OS == "android" ? ( this.state.evs ?  162 : 170) : (this.state.evs ? 142 : 150),
                                        // marginLeft: 16,
                                        // overflow: "hidden",
                                        height: this.state.evs ? 92 : 100,
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        borderColor: 'white'
                                }}>
                                    <Image 
                                        source = {require("../images/evs.png")}
                                        style = {{
                                            height: 40,
                                            width: 40,
                                            overflow: 'hidden'
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
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                 onPress = {() => {
                                    this.setState({robo: !this.state.robo})
                                }}
                            >
                            <View
                                style = {{
                                    borderWidth: this.state.robo ? 4 : 0,
                                    borderColor: "white",
                                    borderRadius: Platform.OS == "android" ? 14 : 14,
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#EB68F3', '#6E25B6']}
                                    style={{ 
                                        paddingTop: 5, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: Platform.OS == "android" ? ( this.state.robo ?  162 : 170) : (this.state.robo ? 142 : 150),
                                        // marginLeft: 16,
                                        // overflow: "hidden",
                                        height: this.state.robo ? 92 : 100,
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        // borderWidth: this.state.robo ? 4 : 0,
                                        // borderColor: 'white'
                                }}>
                                    <Image 
                                        source = {require("../images/robotics.png")}
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
                                        Robotics
                                    </Text>
                                </LinearGradient>
                            </View>
                            </TouchableOpacity>
                        </View>
                        <View 
                    style = {{
                        flex: 1,
                        flexDirection: "row",
                        marginTop: 20,
                        marginLeft: 17,
                        justifyContent: 'space-around',
                        marginRight: 17
                        }}>
                            <TouchableOpacity
                                    onPress = {() => {
                                        this.setState({print: !this.state.print})
                                    }}
                            >  
                            <View
                                style = {{
                                    borderWidth: this.state.print ? 4 : 0,
                                    borderColor: "white",
                                    borderRadius: Platform.OS == "android" ? 14 : 14,
                                }}
                            >
                                <LinearGradient
                    // Button Linear Gradient
                                colors={[ '#EB68F3', '#6E25B6']}
                                style={{ 
                                    paddingTop: 5, 
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    width: Platform.OS == "android" ? ( this.state.print ?  162 : 170) : (this.state.print ? 142 : 150),
                                        // marginLeft: 16,
                                        // overflow: "hidden",
                                    height: this.state.print ? 92 : 100,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    overflow: "hidden"
                                    // borderWidth: this.state.print ? 4 : 0,
                                    // borderColor: 'white'
                            }}>
                                <Image 
                                    source = {require("../images/3d-printer.png")}
                                    style = {{
                                        height: 40,
                                        width: 40,
                                        tintColor: 'white'
                                    }}
                                />
                                <Text style = {{
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: 14,
                                    color: '#fff',
                                    marginTop: 5
                                }}>
                                    3D-Printing
                                </Text>
                            </LinearGradient>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = { () => {
                                this.setState({
                                    coding: !this.state.coding
                                })
                                
                            }}
                        >
                            <View
                                style = {{
                                    borderWidth: this.state.coding ? 4 : 0,
                                    borderColor: "white",
                                    borderRadius: Platform.OS == "android" ? 14 : 14,
                                }}
                            >
                            <LinearGradient
                    // Button Linear Gradient
                                colors={[ '#4AD240', '#177710']}
                                style={{ 
                                    paddingTop: 5, 
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    width: Platform.OS == "android" ? ( this.state.coding ?  162 : 170) : (this.state.coding ? 142 : 150),
                                        // marginLeft: 16,
                                        // overflow: "hidden",
                                    height: this.state.coding ? 92 : 100,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    // borderWidth: this.state.coding ? 4 : 0,
                                    // borderColor: 'white'
                            }}>
                                <Image 
                                    source = {require("../images/coding.png")}
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
                                    Coding
                                </Text>

                            </LinearGradient>
                            </View>
                            </TouchableOpacity>
                        </View>
                        <View 
                            style = {{
                                flex: 1,
                                flexDirection: "row",
                                marginTop: 20,
                                marginLeft: 17,
                                justifyContent: 'space-around',
                                marginRight: 17
                        }}>
                        <TouchableOpacity 
                             onPress = {() => {
                                this.setState({pd: !this.state.pd})
                            }}
                        >
                        <View
                            style = {{
                                borderWidth: this.state.pd ? 4 : 0,
                                borderColor: "white",
                                borderRadius: Platform.OS == "android" ? 14 : 14,
                            }}
                        >
                            <LinearGradient
                    // Button Linear Gradient
                                colors={['#FFC56E', '#D16B12']}
                                style={{ 
                                    paddingTop: 5, 
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    width: Platform.OS == "android" ? ( this.state.pd ?  162 : 170) : (this.state.pd ? 142 : 150),
                                        // marginLeft: 16,
                                        // overflow: "hidden",
                                    height: this.state.pd ? 92 : 100,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    // borderWidth: this.state.pd ? 4 : 0,
                                    // borderColor: 'white'
                            }}>
                                <Image 
                                    source = {require("../images/development.png")}
                                    style = {{
                                        height: 40,
                                        width: 40
                                    }}
                                />
                                <Text style = {{
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: 14,
                                    color: '#fff',
                                    marginTop: 5,
                                    textAlign: 'center',
                                }}>
                                    Personality Development
                                </Text>
                            </LinearGradient>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = { () => {
                                this.setState({
                                    ecg: !this.state.ecg
                                })
                            }}
                        >
                            <View
                                style = {{
                                    borderWidth: this.state.ecg ? 4 : 0,
                                    borderColor: "white",
                                    borderRadius: Platform.OS == "android" ? 14 : 14,
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#EB68F3', '#6E25B6']}
                                    style={{ 
                                        paddingTop: 5, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: Platform.OS == "android" ? ( this.state.ecg ?  162 : 170) : (this.state.ecg ? 142 : 150),
                                        // marginLeft: 16,
                                        // overflow: "hidden",
                                        height: this.state.ecg ? 92 : 100,
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        // borderWidth: this.state.ecg ? 4 : 0,
                                        // borderColor: 'white'
                                }}>
                                    <Image 
                                        source = {require("../images/grammar.png")}
                                        style = {{
                                            height: 40,
                                            width: 40,
                                            tintColor: 'white'
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
                            </View>
                            </TouchableOpacity>
                        </View>
                        <View 
                            style = {{
                                flex: 1,
                                flexDirection: "row",
                                marginTop: 20,
                                marginLeft: 28,
                                justifyContent: 'space-between',
                                marginRight: 17
                        }}>

                            <TouchableOpacity
                                onPress = {() => {
                                    this.setState({ps: !this.state.ps})
                                }}
                            >
                            <View
                                style = {{
                                    borderWidth: this.state.ps ? 4 : 0,
                                    borderColor: "white",
                                    borderRadius: Platform.OS == "android" ? 14 : 14,
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#6EDEFF', '#32C1ED', '#1285D1']}
                                    style={{ 
                                        paddingTop: 5, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: Platform.OS == "android" ? ( this.state.ps ?  162 : 170) : (this.state.ps ? 142 : 150),
                                        // marginLeft: 16,
                                        // overflow: "hidden",
                                        height: this.state.ps ? 92 : 100,
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                }}>
                                    <Image 
                                        source = {require("../images/speaking.png")}
                                        style = {{
                                            height: 40,
                                            width: 40,
                                            tintColor: "white"
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5,
                                        textAlign: 'center',
                                    }}>
                                        Public Speaking
                                    </Text>
                                </LinearGradient>
                            </View>
                            </TouchableOpacity>
                        </View>
                        <View
                        style = {{
                            backgroundColor: '#4ACDF4',
                            width: 360,
                            alignSelf: 'center',
                            borderRadius: 15,
                            height: 50,
                            justifyContent: 'center',
                            marginTop: 40
                        }}
                    >
                            <TouchableOpacity
                                onPress = {() => this.onPressInterest()}
                            >
                                <Text 
                                    style = {{
                                        fontFamily: 'Poppins-SemiBold',
                                        fontSize: 22,
                                        textAlign: 'center',
                                        color: 'white',
                                        
                                        // backgroundColor: '#4ACDF4',
                                    }} 
                                >
                                    Start Learning
                                </Text>
                            </TouchableOpacity>
                        </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

}

export default Favourite;