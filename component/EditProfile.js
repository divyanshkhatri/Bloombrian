import React, {Component} from 'react';
import {StatusBar, View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Keyboard, TextInput, Image, StyleSheet,PermissionsAndroid, Platform, Animated, AsyncStorage, BackHandler,Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import Geolocation from '@react-native-community/geolocation';
import  Config from './config';

class EditProfile extends Component {

    state = {
        hidePassword: false,
        hideConfirmPassword: false,
        padding: new Animated.Value(0),
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mob: "",
        city: "",
        notEmpty: true,
        passSame: true,
        mail: true,
        name: true,
        pass: true,
        confirmPass: true,
        mobile: true,
        place: true,
        school: "",
        scl: true,

    }

    async componentDidMount() {

        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        console.log("config" + Config.GOOGLEMAP_KEY);
        if(Config.GOOGLEMAP_KEY) {
            let myApiKey = Config.GOOGLEMAP_KEY;
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position["coords"].latitude + ',' + position["coords"].longitude + '&key=' + myApiKey)
                    .then((response) => {
                        if(response.ok) {
                            response.json().then((responseJson) => {
                                console.log(responseJson.results[1].address_components[4])
                                this.setState({city: responseJson.results[1].address_components[3].long_name + ", " + responseJson.results[1].address_components[4].long_name});
                            })
                        } else {
                            if(response.status == 500) {
                                console.log("500");
                            }
                            if(response.status == 404) {
                                console.log("404");
                            }
                        }

                    })
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
            );
        }
        
        this.keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          this._keyboardDidHide,
        );
        
    }

    onPressRegister = () => {    
        Actions.Profile();
    }

    backAction = () => {
        Actions.Profile();
        return true;
    };

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        Animated.timing( this.state.padding, { toValue: -145, duration: 100, useNativeDriver: false}).start();
        // this.setState({padding: 80})
    }
    
    _keyboardDidHide = () => {
        Animated.timing( this.state.padding, { toValue: 0, duration: 100, useNativeDriver: false}).start();
        // this.setState({padding: 120})
    }

    onChangeFullName = (fullName) => {
        this.setState({
            fullName
        })
    }

    onChangeMob = (mob) => {
        this.setState({
            mob
        })
        
    }

    onChangeSchool = (school) => {
        this.setState({
            school
        })
        
    }

    onChangeCity = (city) => {
        this.setState({
            city
        })
    }


    render() {
        return (
            <SafeAreaView
                style = {{
                    // marginTop: -15,
                    // flex: 1,
                    height: '110%',
                    // flexDirection: 'column',
                    backgroundColor: 'black',
                    paddingTop: Platform.OS === 'android' ? 0 : 0
                }}
            >
                <StatusBar 
                    backgroundColor = "black"
                />
                <ScrollView
                    style = {{
                        // paddingBottom: 90,
                        // borderWidth: 2,
                        // borderColor: 'white',
                        marginBottom: 80
                }}>                
                    <Animated.View style = {{marginTop: this.state.padding}}>
                        <View style = {{}}>
                        <View 
                            style = {{
                                flexDirection: 'row',
                                width: '100%',
                                // borderColor: 'white',
                                // borderWidth: 2,
                                backgroundColor: "#101010",
                                alignItems: 'center',
                                height: 60,
                                borderBottomLeftRadius: 15,
                                borderBottomRightRadius: 15,
                            }}
                        >   
                        <TouchableOpacity
                            onPress = { () => {this.backAction()} }
                        >
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
                            >Edit Profile</Text>
                        </View>
                        <Animated.View
                            style = {{
                                flex: 1,
                                justifyContent: 'center',
                                // margin: 10,
                                paddingTop: Platform.OS == "android" ? 40 : 40,
                            }}
                        >
                            <View style = {{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginLeft: 30,
                                marginRight: 30,
                                marginBottom: 30,
                            }}>
                                <Image 
                                    style = {{
                                        width: 80, 
                                        height: 80,
                                        borderRadius: 40,
                                        borderWidth: 2,
                                        borderColor: "#4ACDF4",

                                    }}
                                    source = {require("../images/dp.png")}
                                />
                                <TouchableOpacity>
                                    <View
                                        style = {{
                                            width: 200,
                                            height: 38,
                                            borderWidth: 2,
                                            borderColor: "#4ACDF4",
                                            justifyContent: "center",
                                            borderRadius: 8,
                                        }}
                                    >
                                    <Text
                                        style = {{
                                            textAlign: "center",
                                            fontFamily: "Poppins-SemiBold",
                                            fontSize: 14,
                                            color: "white"
                                        }}
                                    >Change Profile Photo</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        {/* <View style = {{
                            flex: 1,
                            justifyContent: 'center',
                            // margin: 10,
                            marginTop: 30,
                        }}> */}
                            <Text style = {{
                                marginLeft: 30,
                                color: '#4ACDF4',
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 11,
                                // marginTop: 15,
                                marginBottom: Platform.OS == "android" ? 7 : 7,
                            }}
                            >Full Name</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput
                                    style = {{ flex: 1, fontFamily: 'Poppins-MediumItalic', fontSize: 15, marginLeft: 20, alignItems: 'center', paddingTop: 0, paddingBottom: 0, color: 'white'}}
                                    value = {this.state.fullName}
                                    keyboardAppearance = "dark"
                                    autoCapitalize = 'words'
                                    onChangeText = {(value) => {this.onChangeFullName(value)}}
                                    placeholder="Full Name"
                                    placeholderTextColor= '#707070'
                                    underlineColorAndroid="transparent"
                                    placeholderStyle = {{
                                        
                                    }}
                                />
                            </View>
                            <Text style = {{
                                marginLeft: 30,
                                color: '#4ACDF4',
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 11,
                                // marginTop: 15,
                                marginBottom: Platform.OS == "android" ? 7 : 7,
                            }}
                            >Alteranate Mobile Number</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput
                                    style={{flex: 1, fontFamily: 'Poppins-MediumItalic', fontSize: 15, paddingTop: 0,paddingBottom: 0, marginLeft: 20, alignItems: 'center', color: 'white'}}
                                    value = {this.state.mob}
                                    keyboardAppearance = "dark"
                                    keyboardType = 'numeric'
                                    onChangeText = {(value) => {this.onChangeMob(value)}}
                                    placeholder="Mobile Number"
                                    placeholderTextColor = '#707070'
                                    underlineColorAndroid = "transparent"    
                                />
                            </View>
                            <Text style = {{
                                marginLeft: 30,
                                color: '#4ACDF4',
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 11,
                                // marginTop: 15,
                                marginBottom: Platform.OS == "android" ? 7 : 7,
                            }}
                            >School</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput
                                    style={{flex: 1, fontFamily: 'Poppins-MediumItalic', fontSize: 15, paddingTop: 0,paddingBottom: 0, marginLeft: 20, alignItems: 'center', color: 'white'}}
                                    value = {this.state.school}
                                    keyboardAppearance = "dark"
                                    keyboardType = 'numeric'
                                    onChangeText = {(value) => {this.onChangeSchool(value)}}
                                    placeholder="School"
                                    placeholderTextColor = '#707070'
                                    underlineColorAndroid = "transparent"    
                                />
                            </View>
                            <Text style = {{
                                // marginTop: 10,
                                marginBottom: Platform.OS == "android" ? 7 : 7,
                                marginLeft: 30,
                                color: '#4ACDF4',
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 11,
                            }}
                            >City</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput
                                    style={{flex: 1, fontFamily: 'Poppins-MediumItalic', fontSize: 15, marginLeft: 20, paddingTop: 0,paddingBottom: 0, justifyContent: "center", color: 'white'}}
                                    value = {this.state.city}
                                    keyboardAppearance = "dark"

                                    onChangeText = {(value) => {this.onChangeCity(value)}}
                                    placeholder="City"
                                    editable = {false}
                                    placeholderTextColor = '#707070'
                                    underlineColorAndroid = "transparent"    
                                />
                            </View>
                            
                        </Animated.View>
                    </View>
                    <View
                        style = {{
                            backgroundColor: '#4ACDF4',
                            width: Dimensions.get("window").width - 50,
                            alignSelf: 'center',
                            borderRadius: 10,
                            height: 50,
                            // flex: 1,
                            justifyContent: 'center',
                            marginTop: Platform.OS == "android" ? 30: 30
                        }}
                    >
                        <TouchableOpacity
                            onPress = {() => this.onPressRegister()}
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
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </Animated.View>
                </ScrollView>

            </SafeAreaView>
        )
    }
}
export default EditProfile;

const styles = StyleSheet.create({
    
    sectionStyle: {
        flexDirection: 'row',
        backgroundColor: '#1C1C1C',
        borderWidth: 0.5,
        borderColor: '#1C1C1C',
        height: 40,
        borderRadius: 8,
        margin: 7,
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 10,
    },
    imageStyle: {
    //   padding: 10,
        margin: 5,
        marginLeft: 20,
        height: 17,
        width: 17,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
});