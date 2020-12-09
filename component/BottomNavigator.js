import React from 'react';
import { View, Image, TouchableOpacity, Alert, Dimensions, Text, AsyncStorage } from 'react-native';
import Video from './Video';
import Live from './Live';
import Test from './Test';
import Subject from './Subject';
import { Component } from 'react';

let deviceHeight = Dimensions.get('screen').height;
let windowHeight = Dimensions.get('window').height;
let bottomNavBarHeight = deviceHeight - windowHeight;

class BottomNavigator extends Component {

    state = {
        dashboardText: false,
        videoText: false,
        liveText: true,
        testText: false
    }
    componentDidMount() {
        console.log(this.props.chosen);
        if(this.props.chosen == "dashboard")
            this.setState({
                dashboardText: true,
                videoText: false,
                liveText: false,
                testText: false,
            })
    
        if(this.props.chosen == "video")
            this.setState({
                dashboardText: false,
                videoText: true,
                liveText: false,
                testText: false,
            })
        
        if(this.props.chosen == "test")
            this.setState({
                dashboardText: false,
                videoText: false,
                liveText: false,
                testText: true,
            })

        if(this.props.chosen == "live")
            this.setState({
                dashboardText: false,
                videoText: false,
                liveText: true,
                testText: false,
            })
    }

    render(){
    return (
        <View style={{
            flex: 1,
        }}>
            <View>{ this.state.liveText ? <Live /> : null}</View>
            <View>{ this.state.testText ? <Test /> : null}</View> 
            <View>{ this.state.dashboardText ? <Subject /> : null}</View>
            <View>{ this.state.videoText ? <Video /> : null}</View>
            <View style={{

                position: 'absolute',
                backgroundColor: '#2B2A29',
                border: 2,
                radius: 3,
                shadowOpacity: 1,
                shadowRadius: 3,
                shadowOffset: {
                    height: 3, width: 3
                },
                x: 0,
                y: 0,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                bottom: 0,
                width: '100%',
                height: bottomNavBarHeight > 0 ? 55 : 70,
                flexDirection: 'row',
                justifyContent: 'center',
                paddingVertical: 12,
                paddingHorizontal: 25


            }}>
                <View style = {{

                    flexDirection: 'row',
                    maxWidth: 375,
                    width: '100%',
                    // borderColor: 'white',
                    // borderWidth: 2,
                    justifyContent: 'space-around',
                    // alignSelf: 'center'
                }}>
                
                <View style={{
                        // alignItems: 'center',
                        // borderWidth: 2, 
                        // marginTop: 9,
                        alignItems: 'center',
                        // borderColor: 'white',
                        // position: 'absolute',
                        // right: margin.marginL,
                        justifyContent: "center",
                        height: 30,
                        width: 30
                        
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                dashboardText: false,
                                videoText: false,
                                liveText: true,
                                testText: false
                            })
                        }}
                        style = {{
                            width: 60, 
                            height: 50,
                            borderWidth: 2,
                            borderColor: "#2B2A29",
                            justifyContent: 'center',
                            alignItems: "center"
                        }}
                    >
                        <Image
                            source={require('../images/live.png')}

                            style={{
                                    // borderWidth: 2,
                                    // borderColor: 'white',
                                    // marginHorizontal: 16,
                                    width: 30, 
                                    height: 30,
                                    // marginTop: 12,
                                    tintColor: this.state.liveText ? "#32C6F3" : "#585858",
                                }}
                            // containerStyle={{ marginHorizontal: 20, marginTop: 20 }}
                        />
                
                    </TouchableOpacity>
                </View>
                <View style={{
                        // justifyContent: 'flex-start',
                        alignItems: 'center',
                        justifyContent: "center",
                        // borderWidth: 2, 
                        // borderColor: 'white',
                        // position: 'absolute',
                        // right: margin.marginT,
                        height: 30,
                        width: 30,

                    }}>

                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    dashboardText: false,
                                    videoText: false,
                                    liveText: false,
                                    testText: true
                                })
                            }}

                            style = {{
                                width: 60, 
                                height: 50,
                                borderWidth: 2,
                                borderColor: "#2B2A29",
                                // borderWidth: 2,
                                // borderColor: "white",
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Image
                                source={require('../images/test.png')}
                                style={{
                                    // borderWidth: 2,
                                    // borderColor: 'white',
                                    // marginHorizontal: 4,
                                    // marginTop: 3,
                                    width: 30, 
                                    height: 30,
                                    tintColor: this.state.testText ? "#32C6F3" : "#585858",
                                }}
                            />
                    
                        </TouchableOpacity>
                        
                    </View>
                <View style={{
                    alignItems: 'center',
                    // position: 'absolute',
                    // borderWidth: 2, 
                    // borderColor: "white",
                    // left: margin.marginD, 
                    height: 30, 
                    width: 30
                }}>
                    <TouchableOpacity 
                        onPress={() => {
                            this.setState({
                                dashboardText: true,
                                videoText: false,
                                liveText: false,
                                testText: false
                            })
                        }}
                        style = {{
                            width: 60, 
                            height: 50,
                            // borderWidth: 2,
                            // borderColor: "white",
                            // justifyContent: 'center',
                            borderWidth: 2,
                            borderColor: "#2B2A29",
                            alignItems: "center"
                        }}
                    >
                        <Image

                            style={{ 
                                width: 25, 
                                height: 25, 
                                tintColor: this.state.dashboardText? "#32C6F3" : "#585858",    
                            }}
                            source={require('../images/dashboard.png')}
                        >

                        </Image>
                        
                    </TouchableOpacity>
                </View>
                
                <View style={{
                    alignItems: 'center',
                    // position: 'absolute
                    // left: margin.marginV,
                    justifyContent: "center",
                    // borderWidth: 2, 
                    // borderColor: "white",
                    height: 30,
                    width: 30
                }}>

                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                dashboardText: false,
                                videoText: true,
                                liveText: false,
                                testText: false
                            })
                        }}

                        style = {{
                            width: 60, 
                            height: 50,
                            // borderWidth: 2,
                            // borderColor: "white",
                            borderWidth: 2,
                            borderColor: "#2B2A29",
                            justifyContent: 'center',
                            alignItems: "center"
                        }}
                    >
                        <Image
                            style={{ 
                                // marginHorizontal: 3, 
                                width: 25, 
                                height: 25,
                                tintColor: this.state.videoText ? "#32C6F3" : "#585858"
                            }}
                            source={require('../images/videos.png')}
                        />
                    
                    </TouchableOpacity>
                </View>
                </View>
                {/* </View> */}
            </View>
        </View>
    );
    }
    
}

export default BottomNavigator;