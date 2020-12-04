import React, {Component} from 'react';
import {View, StatusBar, Text, SafeAreaView, BackHandle, Image, Dimensions, TouchableOpacity, FlatList, ImageBackground, Platform, BackHandler} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Actions} from 'react-native-router-flux';
import { Video } from 'expo-av';

class RecordedVideos extends Component {


    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.back);
        // this.setState({currId: this.props.titlePage.id})
    }

    state = {
        currId: "",
    }

    _videoRef;

    back = () => {
        Actions.BottomNavigator();
        return true;
    };

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.back);
    }

    onFullscreenUpdate = async ({fullscreenUpdate}) => {
        switch (fullscreenUpdate) {
            case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
                await ScreenOrientation.unlockAsync(); // only on Android required
                break;
            case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT) // only on Android required
                break;
        }
    }

    showVideoInFullscreen = async () => { await videoRef.current.presentFullscreenPlayer() }

    render() {
        return (
            <SafeAreaView
                style = {{
                    // flex: 1,
                    height: '100%',
                    // flexDirection: 'column',
                    backgroundColor: 'black',
                    // alignItems: "center",
                    paddingTop: Platform.OS === 'android' ? 0 : 0
                }}
            >
                <StatusBar 
                    backgroundColor = "black"
                />
                <View style = {{marginBottom: 40}}>
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
                    onPress = { () => {Actions.BottomNavigator()} }
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
                    >Video</Text>
                </View>
            
                <Video
                    source={{ uri: this.props.details["recorded_class_link"] }}
                    rate={1.0}
                    onFullscreenUpdate={Platform.OS == "android" ? this.onFullscreenUpdate : () => {}}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="contain"
                    shouldPlay = {true}
                    usePoster = {true}
                    ref={(ref) => (this._videoRef = ref)}
                    style={{ marginTop: 20, width: Dimensions.get('window').width, height: 9*Dimensions.get('window').width/16, borderRadius: 10 }}
                    useNativeControls = {true}
                    // onFullscreenUpdate={async () => {
                    //     await ScreenOrientation.lockAsync(
                    //         ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
                    //     );
                    // }}
                />

                <Text style = {{marginTop: 20, marginLeft: 20, color: "white", fontFamily: "Poppins-Bold", fontSize: 18, alignItems: 'center'}}>{this.props.details["title"] == false ? <Text>{this.props.details["subject"]} Class</Text> : this.props.details["title"]}</Text>    
                    <View style = {{borderBottomColor: '#242424', bordeRadius: 10, borderBottomWidth: 2, marginBottom: 0, marginLeft: 20, marginRight: 20, marginTop: 0}}>
                        <View style = {{justifyContent: "space-around", flexDirection: 'row', margin: 20, marginLeft: 0, marginRight: 0, maginBottom: 0}}>
                            <View style = {{flexDirection: 'row'}}>
                                <Image source = {require('../images/faculty.png')} style = {{width: 28.95, height: 23.16, marginRight: 8}}/>
                                <View>    
                                    <Text style = {{color: "white", fontFamily: "Poppins-Medium", fontSize: 9}}>Faculty</Text> 
                                    <Text style = {{color: "white", fontFamily: "Poppins-Bold", fontSize: 10}}>{this.props.details["teacher_name"]}</Text> 
                                </View>
                            </View>
                            <View style = {{flexDirection: 'row'}}>
                                <Image source = {require('../images/subject.png')} style = {{width: 16.87, height: 24,  marginRight: 8}}/>
                                <View>
                                    <Text style = {{color: "white", fontFamily: "Poppins-Medium", fontSize: 9}}>Subject</Text> 
                                    <Text style = {{color: "white", fontFamily: "Poppins-Bold", fontSize: 10}}>{this.props.details["subject"]}</Text> 
                                </View>
                            </View>
                        </View>  
                    </View>
                </View>
            </SafeAreaView>
        )
    }

}

export default RecordedVideos;