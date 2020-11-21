import React, {Component} from 'react';
import {SafeAreaView, View, Image, Text, Dimensions, AsyncStorage, Platform, BackHandler,TouchableOpacity} from 'react-native';
import DemoLectures1 from './DemoLectures1';
import LinearGradient from 'react-native-linear-gradient';
import Recorded1 from './Recored1';
import Modal from 'react-native-modal';
import {Actions} from 'react-native-router-flux';
import DemoVideos1 from './DemoVideos1';

class Live1 extends Component {

    state = {
        ds: true,
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
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({plan: responseJson["plan"]});
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
            rl: false
        })
        console.log(this.state.ds, this.state.rl)
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
                </View>
                <View style = {{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 40,
                    marginTop: 30,
                    marginRight: 40
                }}>
                    <TouchableOpacity onPress = { () => {
                        this.onDemoClicked()
                    }}>
                    {this.state.plan == true ?
                        <Text style = {{
                            color: this.state.ds ? '#4ACDF4' : '#383838', 
                            fontFamily: 'Poppins-SemiBold'    
                        }}> Class Schedule</Text> 
                        : 
                        <Text style = {{
                            color: this.state.ds ? '#4ACDF4' : '#383838', 
                            fontFamily: 'Poppins-SemiBold'    
                        }}> Demo Schedule</Text>
                    }
                    </TouchableOpacity>
                    <TouchableOpacity  onPress = { () => {
                        this.setState({
                            ds: false,
                            rl: true
                        })
                        console.log(this.state.ds, this.state.rl)
                    }}>
                    <Text style = {{
                        color: this.state.rl ? '#4ACDF4' : '#383838',  
                        fontFamily: 'Poppins-SemiBold'
                    }}>Recorded Lectures</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{
                    flexDirection: 'row',
                    marginTop: 7
                }}>
                    <View
                        style = {{
                            width: '50%', 
                            height: 3,
                            backgroundColor: this.state.ds ? "#4ACDF4" : "#383838"
                        }}
                    >
                    </View>
                    <View
                        style = {{
                            width: '50%', 
                            height: 3,
                            backgroundColor: this.state.rl ? "#4ACDF4" : "#383838"
                        }}
                    >
                    </View>
                </View>
                    {/* <View>{this.state.ds ? <DemoLectures /> : <Recorded />}</View> */}
                    <View>{this.state.ds ? this.state.plan ? <DemoLectures1 /> : <DemoVideos1 /> : <Recorded1 />}</View>
            </SafeAreaView>
        )
    }

}

export default Live1;