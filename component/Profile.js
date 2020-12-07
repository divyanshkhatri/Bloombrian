import React, {Component} from 'react';
import {StatusBar, View, Text, Image, SafeAreaView, ImageBackground, Dimensions, AsyncStorage, Alert, BackHandler, ActivityIndicator, Platform, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Actions} from 'react-native-router-flux';

class Profile extends Component {

    windowWidth = Dimensions.get('window').width;

    state = {
        id: null,
        totalProfile: 5,
        completedProfile: 0,
        profileData: {},
        superScript: "th",
        username: "",
        isLoading: true
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
                        this.setState({isLoading: false});
                        this.setState({username: responseJson.username})
                        this.setState({profileData: responseJson})
                        this.setState({totalProfile: Object.keys(this.state.profileData).length-1})
                        if(this.state.profileData["class_data"]) {
                            this.setState({completedProfile: this.state.completedProfile+1})
                        }
                        if(this.state.profileData["email"]) {
                            this.setState({completedProfile: this.state.completedProfile+1})
                        }
                        if(this.state.profileData["location"]) {
                            this.setState({completedProfile: this.state.completedProfile+1})
                        }
                        if(this.state.profileData["username"]) {
                            this.setState({completedProfile: this.state.completedProfile+1})
                        }
                        if(this.state.profileData["phone"]) {
                            this.setState({completedProfile: this.state.completedProfile+1})
                        }
                        if(this.state.profileData["class_data"] === "1") {
                        this.setState({superScript: "st"})
                        } else if(this.state.profileData["class_data"] === "2") {
                            this.setState({superScript: "nd"})
                        } else if(this.state.profileData["class_data"] === "3") {
                            this.setState({superScript: "rd"})
                        }
                        this.setState({username: this.state.username.replace(' ', '').toLowerCase()})
                        console.log(this.state.profileData);
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
            .catch((error) => {
                this.setState({login: false})
                console.error(error);
            });
        })
        .catch((e) => console.log(e));
    }

    render() {
        let ratio = this.state.completedProfile/this.state.totalProfile;
        return (
            <SafeAreaView
                style = {{
                    // flex: 1,
                    height: '100%',
                    // flexDirection: 'column',
                    backgroundColor: 'black',
                    paddingTop: Platform.OS === 'android' ? 10 : 0,
                    // marginTop: Platform.OS === 'android' ? 0 : 20,
                    // paddingBottom: 40
                }}
            >

                {this.state.isLoading ?  
                   ( 
                    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <StatusBar 
                            backgroundColor = "black"
                        />
                        <Image 
                            source={require("../images/loader.gif")} 
                            style = {{width: 50, height: 50}} 
                        />
                    </View>
                    )
                    : 
                (
                <ScrollView>
                <StatusBar 
                    backgroundColor = "black"
                />
                <View 
                    style = {{
                        marginTop: Platform.OS == "android" ? 10 : 0, 
                        backgroundColor: "black", 
                        flexDirection: 'row', 
                        justifyContent: 'space-around', 
                        alignContent: 'center', 
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity 

                        onPress = {() => {
                            Actions.Homepage()
                        }}
                    >
                        <Image style = {{width: 30, height: 30}} source = {require('../images/back.png')} />
                    </TouchableOpacity>
                    <Text
                        style = {{
                            color: '#383838',
                            fontFamily: 'Poppins-Bold',
                            fontSize: 18,
                            // borderColor: 'white',
                            // borderWidth: 1,
                            // textAlign: 'center',
                        }}
                    >
                        My Profile
                    </Text>
                    <TouchableOpacity
                        onPress = {() => {Actions.EditProfile()}}
                    >
                        <Image style = {{width: 22, height: 19, marginTop: Platform.OS == "android" ? -7: -5}} source = {require('../images/edit.png')} />
                    </TouchableOpacity>
                </View>
                <View style = {{height: '100%', backgroundColor: "black", height: Platform.OS == "android" ? '20%' : '20%', width: Dimensions.get('window').width, flexDirection: 'row', marginTop: 15, paddingTop: 20, marginRight: 30, height: Platform.OS == "android" ? 150 : 140}}>
                    <View style = {{
                        alignItems: 'center',
                        marginLeft: 50,
                    }}>
                        <ImageBackground 
                            style = {{
                                width: 110, 
                                height: 110,
                                // borderColor: 'white',
                                // borderWidth: 2,
                                justifyContent: 'center'
                            }}
                            source = {require("../images/c.png")}>
                            <Image 
                                source = {require("../images/dp.png")} 
                                style = {{ alignSelf: 'center', width: 80, height: 80, borderRadius: 40, borderWidth:2, borderColor: '#4ACDF4'}}
                            />
                        </ImageBackground>
                    </View>
                    <View style = {{marginLeft: 25, marginTop: 5, flexDirection: 'column'}}>
                        <Text
                            style = {{
                                color: '#4ACDF4',
                                fontFamily: 'Poppins-Bold',
                                fontSize: Platform.OS == "android" ? 20 : 22,
                                // lineHeight: 20
                            }}
                            >{this.state.profileData ? this.state.profileData["username"] : null}
                        </Text>
                        <View style = {{flexDirection: 'row', }}>
                            <Text 
                            style = {{
                                color: 'white',
                                fontFamily: 'Poppins-Bold',
                                fontSize: Platform.OS == "android" ? 10 : 12,
                                lineHeight: 15
                            }}>
                                Class {this.state.profileData ? this.state.profileData["class_data"] : null}
                            </Text>
                            <Text 
                                style={{
                                    color: 'white',
                                    fontFamily: 'Poppins-SemiBold',
                                    fontSize: Platform.OS == "android" ? 9 : 10, 
                                    lineHeight: 12
                                }}>{this.state.superScript}
                            </Text>
                        </View>
                        <View>
                            <Text style = {{
                                color: '#828282',
                                fontFamily: 'Poppins-SemiBold',
                                fontSize: Platform.OS == "android" ? 8 : 9,
                                marginTop: 15
                            }}>Active Plan</Text>
                            {this.state.profileData ? (
                            this.state.profileData.plan != false ? (
                            <View style = {{width: 210, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style = {{
                                    color: 'white',
                                    fontFamily: "Poppins-Bold",
                                    fontSize: Platform.OS == "android" ? 8.5 : 10,
                                }} >Personality Development </Text>
                                <Image 
                                    source = {require("../images/dot.png")}
                                    style = {{width: 5, height: 5}}/>
                                <Text style = {{
                                    color: '#4ACDF4',
                                    fontSize: Platform.OS == "android" ? 8.5 : 10,
                                    fontFamily: 'Poppins-Bold'
                                }}>  6 Months
                                </Text>
                            </View>
                            ): <Text style = {{
                                color: '#FF5252',
                                fontSize: Platform.OS == "android" ? 8.5 : 10,
                                marginTop: 2,
                                fontFamily: 'Poppins-Bold'
                                }}>Demo Plan</Text>
                            )
                            : null
                            }
                        </View>   
                    </View>
                </View>
                    <View style = {{
                        backgroundColor: '#0A0A0A',
                        height: '110%',
                        paddingBottom: 60
                        // borderWidth: 2, 
                        // borderColor: 'purple'
                    }}>
                        <TouchableOpacity onPress = { () => {Actions.Payment()} }>
                            <LinearGradient
                    // Button Linear Gradient
                            colors={['#1285D1', '#32C1ED', '#6EDEFF']}
                            start = {{x: 0, y: 1}} end = {{x: 1, y: 0}}
                            style = {{
                                
                                // alignSelf: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                // width: this.windowWidth-32,
                                // borderColor: 'white',
                                // borderWidth: 1,
                                marginTop: 18,
                                height: Platform.OS == "android" ? 75 : 70,
                                marginLeft: 28,
                                marginRight: 30,
                                paddingLeft: 15,
                                borderRadius: 10,
                                overflow: 'hidden',

                                // justifyContent: "center"
                            }}>
                            <Text
                                style = {{
                                    // marginLeft: 8,
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: Platform.OS == "android" ? 10 : 11,
                                    color: 'white',
                                    marginRight: 70,
                                    // borderWidth: 2, 
                                    // borderColor: 'purple'
                                }}
                            >Check out our exclusive plans to get access 
                            to all the content in our app!</Text>
                            <View
                                style = {{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    marginRight: 50,
                                    // borderWidth: 2, 
                                    // borderColor: 'purple'
                                }}
                            >
                            <Image 
                                style = {{
                                    // flexShrink: 1,
                                    // flex: 1,
                                    resizeMode: 'stretch',
                                    width: 14,
                                    height: 18,
                                    // borderWidth: 2, 
                                    // borderColor: 'purple',
                                    marginRight: 20
                                    // width: 20,
                                    // height: 20,
                                
                                    // justifyContent: 'flex-end'
                                    // borderWidth: 2,
                                    // borderColor: 'purple',
                                }}
                                source = {require("../images/arrow.png")} 
                            />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View
                        style = {{marginTop: 20, flexDirection: 'row', justifyContent: 'center'}}    
                    >
                        <Text 
                            style = {{
                                fontFamily: 'Poppins-Bold',
                                fontSize: 11,
                                // marginLeft: 30,
                                color: 'white'
                            }}>
                            Profile Completed
                        </Text>
                        <View style = {{flexDirection: 'row'}}>
                            <View 
                                style = {{
                                    alignSelf: 'center',
                                    backgroundColor: '#4ACDF4',
                                    borderBottomLeftRadius: 2,
                                    borderTopLeftRadius: 2,
                                    borderTopRightRadius: 2, 
                                    borderBottomRightRadius: 2,
                                    width: 180*ratio,
                                    height: 4,
                                    marginLeft: 20,
                                }}
            
                            />
                            <View
                                style = {{
                                    alignSelf: 'center',
                                    backgroundColor: '#2C2B2B',
                                    // borderWidth: 2,
                                    // borderColor: 'white',
                                    // borderBottomLeftRadius: 4,
                                    borderTopRightRadius: 2,
                                    borderBottomRightRadius: 2,
                                    // borderBottomEndRadius: '5',
                                    width: 180*(1-ratio),
                                    height: 4,
                                    // marginLeft: 20,
            
                                }}
                            />
                        </View>
                        <Text style = {{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 10,
                            marginLeft: 25,
                            // marginTop: 5,   
                            color: 'white'
                        }}>{Math.round(ratio*100)}%</Text>

                    </View>
                    {ratio == 1 ? null : <Text style = {{textAlign: 'center', color: '#4B4B4B', fontSize: 10, marginTop: 10}}>Complete your full profile to earn special rewards!</Text>}
                    <View
                        style = {{marginLeft: 30, marginTop: 30}}    
                    >
                        <Text style = {{
                            fontFamily: 'Poppins-Bold',
                            color: 'white',
                            fontSize: 14,
                            }}>
                            Account Details
                        </Text>
                        <View 
                            style = {{marginTop: 20, flexDirection: 'row'}}
                        >
                            <View
                                style = {{
                                    
                                    backgroundColor: "#212121", 
                                    // borderWidth: 2, 
                                    // borderColor: 'white',
                                    width: 38, 
                                    height: 38, 
                                    borderRadius: 19, 
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Image 
                                    source = {require('../images/user.png')}
                                    style = {{width: 18, height: 20, tintColor: '#4ACDF4'}}
                                />
                            </View>
                            <View style = {{justifyContent: 'center'}}>
                                <Text
                                    style = {{fontFamily: 'Poppins-Medium', fontSize: 10, marginLeft: 10, color: '#4B4B4B', lineHeight: 15}}
                                >
                                    Username
                                </Text>
                                <Text
                                    style = {{fontFamily: 'Poppins-Bold', fontSize: 12, marginLeft: 10, color: '#4ACDF4'}}
                                >
                                    {this.state.username != "" ? this.state.username: null}
                                </Text>

                            </View>
                        </View>
                        <View 
                            style = {{marginTop: 20, flexDirection: 'row'}}
                        >
                            <View
                                style = {{
                                    
                                    backgroundColor: "#212121", 
                                    // borderWidth: 2, 
                                    // borderColor: 'white',
                                    width: 38, 
                                    height: 38, 
                                    borderRadius: 19, 
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Image 
                                    source = {require('../images/phone.png')}
                                    style = {{width: 18, height: 20, tintColor: '#4ACDF4'}}
                                />
                            </View>
                            <View style = {{justifyContent: 'center'}}>
                                <Text
                                    style = {{fontFamily: 'Poppins-Medium', fontSize: 10, marginLeft: 10, color: '#4B4B4B', lineHeight: 15}}
                                >
                                    Phone Number
                                </Text>
                                <Text
                                    style = {{fontFamily: 'Poppins-Bold', fontSize: 12, marginLeft: 10, color: '#4ACDF4'}}
                                >
                                    {this.state.profileData ? this.state.profileData["phone"]: null}
                                </Text>
                            </View>
                        </View>
                        <View 
                            style = {{marginTop: 20, flexDirection: 'row'}}
                        >
                            <View
                                style = {{
                                    
                                    backgroundColor: "#212121", 
                                    // borderWidth: 2, 
                                    // borderColor: 'white',
                                    width: 38, 
                                    height: 38, 
                                    borderRadius: 19, 
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Image 
                                    source = {require('../images/email.png')}
                                    style = {{width: 21, height: 16, tintColor: '#4ACDF4'}}
                                />
                            </View>
                            <View style = {{justifyContent: 'center'}}>
                                <Text
                                    style = {{fontFamily: 'Poppins-Medium', fontSize: 10, marginLeft: 10, color: '#4B4B4B', lineHeight: 15}}
                                >
                                    E-mail ID
                                </Text>
                                <Text
                                    style = {{fontFamily: 'Poppins-Bold', fontSize: 12, marginLeft: 10, color: '#4ACDF4'}}
                                >
                                    {this.state.profileData ? this.state.profileData["email"]: null}
                                </Text>
                            </View>
                        </View>
                        <View style = {{marginTop: 20, flexDirection: 'row'}}>
                            <View
                                style = {{
                                    
                                    backgroundColor: "#212121", 
                                    // borderWidth: 2, 
                                    // borderColor: 'white',
                                    width: 38, 
                                    height: 38, 
                                    borderRadius: 19, 
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Image 
                                    source = {require('../images/location.png')}
                                    style = {{width: 22, height: 22, tintColor: '#4ACDF4'}}
                                />
                                </View>
                                <View style = {{justifyContent: 'center'}}>
                                    <Text
                                        style = {{fontFamily: 'Poppins-Medium', fontSize: 10, marginLeft: 10, color: '#4B4B4B', lineHeight: 15}}
                                    >
                                        City
                                    </Text>
                                    <Text
                                        style = {{fontFamily: 'Poppins-Bold', fontSize: 12, marginLeft: 10, color: '#4ACDF4'}}
                                    >
                                        {this.state.profileData ? this.state.profileData["location"]: null}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    <View>
                        <TouchableOpacity
                            style = {{
                                width: Dimensions.get("screen").width - 60,
                                height: 53,
                                // backgroundColor: '#4ACDF4',
                                alignSelf: 'center',
                                borderColor: "#4ACDF4",
                                borderWidth: 2,
                                justifyContent: 'center',
                                marginTop: Platform.OS == "android" ? 50 : 40,
                                borderRadius: 11,
                                // justifyContent: 'center'
                            }}

                            onPress = { () => {
                                AsyncStorage.getAllKeys()
                                .then((values) => {
                                    AsyncStorage.multiRemove(values)
                                    .then(() => {console.log("keys removed")});
                                    Actions.LandingMain();
                                })
                                .catch((e) => {console.log("error retrieving the keys")})

                            }}
                        >
                        <Text style = {{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 22,
                            textAlign: 'center',
                            color: 'white'
                        }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
                )}
            </SafeAreaView>
            
        )
    }

}

export default Profile;