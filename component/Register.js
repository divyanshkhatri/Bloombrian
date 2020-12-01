import React, {Component} from 'react';
import {View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Keyboard, TextInput, Image, StyleSheet,PermissionsAndroid, Platform, Animated, AsyncStorage, BackHandler,Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import Geolocation from '@react-native-community/geolocation';
import  Config from './config';

// import * as Location from 'expo-location';

class Register extends Component {

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
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson.results[1].address_components[4])
                        this.setState({city: responseJson.results[1].address_components[3].long_name + ", " + responseJson.results[1].address_components[4].long_name});
                    })
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
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

        this.setState({mail: true, name: true, pass: true, confirmPass: true, mobile: true})

        console.log("Presses");
        if(this.state.fullName == "") {
            this.setState({name: false});
        }

        if(this.state.email == "") {
            this.setState({mail: false});
        }

        if(this.state.password == "") {
            this.setState({pass: false});
        }

        if(this.state.confirmPassword == "") {
            this.setState({confirmPass: false});
        }

        if(this.state.mob == "") {
            this.setState({mobile: false});
        }

        if(this.state.password != "" && this.state.confirmPassword != "" && this.state.password != this.state.confirmPassword) {
            this.setState({passSame: false})
        }

        else if(this.state.fullName != ""&& this.state.email != "" && this.state.password != "" && this.state.confirmPassword != "" && this.state.mob != "" && this.state.password == this.state.confirmPassword){
            let url = 'http://idirect.bloombraineducation.com/idirect/lms/register?username='+this.state.fullName+'&password='+this.state.password+'&email='+this.state.email+'&phone='+this.state.mob+'&location='+this.state.city
            console.log(url);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    AsyncStorage.setItem('email', this.state.email);
                    // console.log(responseJson.ID);
                    AsyncStorage.setItem('id', JSON.stringify(responseJson.ID));
                    Actions.Favourite();
                })
                .catch((error) => {
                    this.setState({login: false})
                    console.error(error);
            });
       }
        
    }

    backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to Exit?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
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

    onChangeEmail = (email) => {
        this.setState({
            email
        })
    }

    onChangePassword = (password) => {

        this.setState({hidePassword: true})

        this.setState({
            password
        })
    }

    onChangeConfirmPassword = (confirmPassword) => {

        this.setState({hideConfirmPassword: true})

        this.setState({
            confirmPassword
        })
    }

    onChangeMob = (mob) => {
        this.setState({
            mob
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
                <ScrollView
                    style = {{
                        // paddingBottom: 90,
                        // borderWidth: 2,
                        // borderColor: 'white',
                        marginBottom: 80
                }}>                
                    <Animated.View style = {{marginTop: this.state.padding}}>
                    <View style = {{}}>
                    <LinearGradient
                            // Button Linear Gradient
                            colors={[ '#004BAD', '#4ACDF4']}
                            start={{x: 0, y: 1}} end={{x: 1, y: 0}}
                            style={{ 
                                paddingLeft: 20, 
                                // marginTop: -10,
                                // borderRadius: 5,
                                width: Dimensions.get('window').width,
                                // marginLeft: 16,
                                height: 115,
                                // borderRadius: 15
                        }}>
                            <TouchableOpacity
                                onPress = { () => Actions.pop()}
                            >
                            </TouchableOpacity>
                            <Text
                            style = {{
                                marginTop: Platform.OS == 'android' ? 0 : 8,
                                height: Platform.OS == 'android' ? 60: 50,
                                // borderColor: 'white',
                                // borderWidth: 2,
                                paddingTop: 15,
                                fontFamily: 'Poppins-Bold',
                                color: 'white',
                                fontSize: 25
                            }}
                            >
                                Register
                            </Text>
                            <Text
                                style = {{
                                    fontFamily: 'Poppins-Medium',
                                    color: 'white',
                                    fontSize: 14,
                                    paddingTop: Platform.OS == "android" ? 0 : 8,
                                    paddingRight: 80,
                                }}
                            >
                                Become a part of the Bloom Brain family,
                                India's No. 1 Education app!
                            </Text>
                        </LinearGradient>
                        <Animated.View
                            style = {{
                                flex: 1,
                                justifyContent: 'center',
                                // margin: 10,
                                paddingTop: Platform.OS == "android" ? 40 : 40,
                            }}
                        >
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
                            {this.state.name ? null : <Text style = {{color: '#FF5252', marginLeft: 30, marginBottom: 5, fontFamily: "Poppins-Medium", fontSize: 10}}>Please enter the Name!</Text>}
                            <Text style = {{
                                marginLeft: 30,
                                color: '#4ACDF4',
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 11,
                                // marginTop: 15,
                                marginBottom: Platform.OS == "android" ? 7 : 7,
                            }}
                            >Email</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput
                                    style={{flex: 1, fontFamily: 'Poppins-MediumItalic', fontSize: 15, marginLeft: 20, paddingTop: 0,paddingBottom: 0, alignItems: 'center', color: 'white'}}
                                    value = {this.state.email}
                                    keyboardAppearance = "dark"
                                    keyboardType = 'email-address'
                                    autoCapitalize = 'none'
                                    onChangeText = {(value) => {this.onChangeEmail(value)}}
                                    placeholder="Email"
                                    placeholderTextColor = '#707070'
                                    underlineColorAndroid = "transparent"    
                                />
                            </View>
                            {this.state.mail ? null : <Text style = {{color: '#FF5252', marginLeft: 30, marginBottom: 5, fontFamily: "Poppins-Medium", fontSize: 10}}>Please enter the Email!</Text>}
                            <Text style = {{
                                marginLeft: 30,
                                color: '#4ACDF4',
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 11,
                                // marginTop: 15,
                                marginBottom: Platform.OS == "android" ? 7 : 7,
                            }}
                            >Password</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput
                                    style={{flex: 1, fontFamily: 'Poppins-MediumItalic', fontSize: 15, paddingTop: 0,paddingBottom: 0, marginLeft: 20, alignItems: 'center', color: 'white'}}
                                    value = {this.state.password}
                                    autoCapitalize = 'none'
                                    keyboardAppearance = "dark"
                                    onChangeText = {(value) => {this.onChangePassword(value)}}
                                    placeholder="Password"
                                    placeholderTextColor = '#707070'
                                    underlineColorAndroid = "transparent"    
                                    secureTextEntry = {this.state.hidePassword}
                                />
                            </View>
                            {this.state.pass ? null : <Text style = {{color: '#FF5252', marginLeft: 30, marginBottom: 5, fontFamily: "Poppins-Medium", fontSize: 10}}>Please enter the Password!</Text>}
                            <Text style = {{
                                marginLeft: 30,
                                color: '#4ACDF4',
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 11,
                                // marginTop: 15,
                                marginBottom: Platform.OS == "android" ? 7 : 7,
                            }}
                            >Confirm Password</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput
                                    style={{flex: 1, fontFamily: 'Poppins-MediumItalic', fontSize: 15, paddingTop: 0,paddingBottom: 0, marginLeft: 20, alignItems: 'center', color: 'white'}}
                                    value = {this.state.confirmPassword}
                                    autoCapitalize = 'none'
                                    keyboardAppearance = "dark"
                                    onChangeText = {(value) => {this.onChangeConfirmPassword(value)}}
                                    placeholder="Confirm Password"
                                    placeholderTextColor = '#707070'
                                    underlineColorAndroid = "transparent"   
                                    secureTextEntry = {this.state.hideConfirmPassword} 
                                />
                            </View>
                            {this.state.passSame ? null : <Text style = {{color: '#FF5252', marginLeft: 30, marginBottom: 5, fontFamily: "Poppins-Medium", fontSize: 10}}>Passwords did not match!</Text>}
                            {this.state.confirmPass ? null : <Text style = {{color: '#FF5252', marginLeft: 30, marginBottom: 5, fontFamily: "Poppins-Medium", fontSize: 10}}>Please enter the Password again!</Text>}
                            <Text style = {{
                                marginLeft: 30,
                                color: '#4ACDF4',
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: 11,
                                // marginTop: 15,
                                marginBottom: Platform.OS == "android" ? 7 : 7,
                            }}
                            >Mobile Number</Text>
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
                            {this.state.mobile ? null : <Text style = {{color: '#FF5252', marginLeft: 30, marginBottom: 5, fontFamily: "Poppins-Medium", fontSize: 10}}>Please enter the mobile number!</Text>}
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
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress = {() => {Actions.Signin()}}>
                        <Text
                            style = {{
                                fontFamily: "Poppins-Bold",
                                // color: 'white',
                                textAlign: 'center',
                                fontSize: 16,
                                marginTop: 15,
                                // textDecorationLine: 'underline',
                                // textDecorationStyle: "solid",
                                color: "#4acdf4"
                            }}  
                        >Want to Sign In ?
                        </Text>
                    </TouchableOpacity>
                    </Animated.View>
                </ScrollView>

            </SafeAreaView>
        )
    }

}

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


export default Register;