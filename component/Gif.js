import React, {Component} from 'react';
import {View, Text, StatusBar, Image, AsyncStorage, Platform, TouchableOpacity, BackHandler} from 'react-native';
import { Actions } from 'react-native-router-flux';
import NetInfo from "@react-native-community/netinfo";
import Modal from 'react-native-modal';

class Gif extends Component {

    state = {
        email: "",
        time: Platform.OS == "android" ? 2600 : 3400,
        showLoader: true,
        showModal: false,
    }
    

    componentDidMount() {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            this.setState({showModal: !state.isConnected});
            if(state.isConnected)
                setTimeout(() => {  
                    Actions.Gif1();
                }, this.state.time);
        });      
        setTimeout(() => {  
            this.setState({showLoader: false})
        }, this.state.time);

    }

    render() {
        return (
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Modal 
                    onBackdropPress = {() => {this.setState({showModal: false})}}
                    isVisible = {this.state.showModal}
                >
                    <View
                        style = {{
                            // flex: 1,
                            // borderColor: 'white',
                            // borderWidth: 2,
                            margin: 20,
                            // marginTop: Dimensions.get('window').height/10,
                            backgroundColor: '#101010',
                            // opacity: 0.8,
                            borderRadius: 20,
                            padding: 25,
                            width: 300,
                            height: Platform.OS == "android" ? 320 : 300,
                            alignSelf: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                            width: 0,
                            height: 2,
                            },
                            shadowOpacity: 0.75,
                            shadowRadius: 3.84,
                            elevation: 5,
                            alignItems: 'center'
                        }}
                        >  
                        <Image
                            style = {{
                                width: 50, 
                                height: 50,
                            }}
                            source = {require("../images/wifisignal.png")}
                        />
                        <Text
                            style = {{
                                marginTop: 10,
                                textAlign: "center",
                                fontFamily: "Poppins-Bold",
                                color: "white",
                                fontSize: 16,
                            }}
                        >You are Not Connected to the Internet!</Text>
                        <TouchableOpacity
                            onPress = {() => Actions.Landing()}
                            style = {{
                                marginTop: 30,
                                borderWidth: 3,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 8,
                                borderColor: "#4ACDF4",
                                width: 250,
                                height: 45,
                            }}
                        >
                            <Text
                                style = {{
                                    fontFamily: "Poppins-Bold",
                                    color: "white",
                                    fontSize: 17,
                                }}
                            >Retry</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {() => BackHandler.exitApp()}
                            style = {{
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 20,
                                borderRadius: 8,
                                borderWidth: 3,
                                borderColor: "#4ACDF4",
                                width: 250,
                                height: 45,
                            }}
                        >
                            <Text
                                style = {{
                                    fontFamily: "Poppins-Bold",
                                    color: "white",
                                    fontSize: 17,
                                }}  
                            >Exit</Text>
                        </TouchableOpacity>
                    </View>
                    
                </Modal>

                <StatusBar 
                    backgroundColor = "black"
                />   
                {   
                    this.state.showLoader ? (
                        Platform.OS == "android" ? 
                            <Image 
                                source ={require("../images/Bloom-Brain1.gif")} 
                                style = {{
                                    width: 300, 
                                    height: 300,
                                }}
                            />
                        :
                            <Image 
                                source ={require("../images/Bloom-Brain.gif")} 
                                style = {{
                                    width: 300,
                                    height: 300,
                                }}
                            />
                    ) : 
                    null
                }   
            </View>
        )
    }
}

export default Gif;