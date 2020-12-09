import React, {Component} from 'react';
import {Text, StatusBar, View, SafeAreaView, Image, Button, Dimensions, ImageBackground, AsyncStorage, BackHandler, Alert, TouchableOpacity, Linking, Platform } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';

export default class LandingMain extends Component {

    clicked = () => {
        Actions.Homepage();
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
    
    componentDidMount() {

        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        AsyncStorage.getItem('email')
        .then((value) => console.log(value))
        .catch((e) => console.log(e) )
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    render() {
        return (
            <SafeAreaView style = {{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#0a0a0a',
                paddingTop: Platform.OS == "android" ? 0 : 0
            
            }}>
                <StatusBar 
                    backgroundColor = "black"
                />               
                {/* <View style = {{position: 'absolute', width: '100%', height: '100%',}}>
                <Image style = {{ alignSelf: 'flex-end',width: '100%', height: '70%' }} source = {require('../images/circles.png')}/>
                </View> */}
                {/* <View style = {{ position: 'absolute', right: -200, top: -300, width: '100%', height: '100%', transform: [{ rotate: '45deg'}], borderColor: 'white',}}>
                    <View style = {{
                        position: 'absolute',
                        height: 500, 
                        width: 500,
                        borderRadius: 250,
                        // top: 50,
                        right: 50,
                        backgroundColor: '#172123',
                        opacity: 0.1
                    }}></View>
                    <View style = {{
                        position: 'absolute',
                        height: 600, 
                        width: 600,
                        right: 25,
                        borderRadius: 300,
                        // top: 40,
                        backgroundColor: '#161C1D',
                        opacity: 0.3
                    }}></View>
                    <View style = {{
                        position: 'absolute',
                        height: 700, 
                        width: 700,
                        right: 0,
                        // top: 22,
                        borderRadius: 350,
                        backgroundColor: '#4ACDF4',
                        opacity: 0.09
                    }}></View>
                </View> */}
                <View style = {{marginTop: Platform.OS == "android" ? 40 : Dimensions.get("screen").height/25}}>
                    <Image source = {require("../images/logo.png")} style = {{width: Platform.isPad ? 320 : 160, height: Platform.isPad ? 260 : 130, alignSelf: 'center'}}/>
                    <Image source = {require('../images/logo1.png')} style = {{marginTop: 35, width: Platform.isPad ? 450 : Dimensions.get("screen").width/1.5, height: Platform.isPad ? 340 : Dimensions.get("screen").height/4, resizeMode: "stretch",alignSelf: 'center'}}>
                    </Image>
                    <Text 
                        style = {{
                                fontFamily: 'Poppins-SemiBold', 
                                color: 'white', 
                                fontSize: Platform.isPad ? 30 : 18, 
                                textAlign: 'center',
                                marginTop: 40,
                                zIndex: 1
                            }} >
                            Welcome to BloomBrain!
                    </Text>
                    <Text 
                        style = {{
                            fontFamily: 'Poppins-Medium', 
                            color: 'white', 
                            fontSize: Platform.isPad ? 26 : 15, 
                            textAlign: 'center', 
                            // marginTop: 15
                        }}>A one - stop learning platform for your kids
                    </Text>
                    <TouchableOpacity style = {{
                        width: Platform.isPad ? 600 : Dimensions.get('window').width-50,
                        height: Platform.isPad ? 60 : 53,
                        backgroundColor: '#4ACDF4',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: Platform.OS == "android" ? 50 : Dimensions.get("window").height/15,
                        borderRadius: 11
                    }}
                        onPress = { () => Actions.Signin() }
                    >
                        <Text style = {{
                            textAlign: 'center',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: Platform.isPad ? 30 : 21,
                            color: 'white',
                            justifyContent: 'center'
                        }}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{
                        width: Platform.isPad ? 600 : Dimensions.get('window').width-50,
                        height: Platform.isPad ? 60 : 53,
                        borderRadius: 11,
                        borderWidth: 2, 
                        borderColor: '#4ACDF4',
                        alignSelf: 'center',
                        marginTop: 13,
                        justifyContent: 'center'
                    }}
                    onPress = { () => Actions.Register() }
                    >
                        <Text style = {{
                             textAlign: 'center',
                             fontFamily: 'Poppins-SemiBold',
                             fontSize: Platform.isPad ? 30 : 22,
                             color: 'white',
                        }}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {{
                            alignSelf: 'center',
                            marginTop: 45,
                            justifyContent: 'center'
                        }}
                        onPress = {() => {Linking.openURL("https://www.bloombraineducation.com/privacy-policy")}}
                    >
                        <Text style = {{
                            textAlign: 'center',
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: Platform.isPad ? 20 : 14,
                            color: 'white',
                            // borderBottomWidth: 1,
                            // borderBottomColor: 'white',
                            // paddingBottom: 5,
                            // borderWidth: 1,
                            textDecorationLine: 'underline',
                            textDecorationStyle: "solid",
                            marginVertical: 0
                            // marginBottom: -1,
                        }}>Learn More</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}