import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Modal500 extends Component {
    render() {
        return (
            <View
                style = {{
                    height: Dimensions.get("window").height - 100,
                    justifyContent: "center",
                }}
            >
            <View
                style = {{
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                }}
            >
                <Image 
                    source = {
                        require("../images/500.png")
                    }
                    style = {{
                        width: 271,
                        height: 108,
                    }}
                />
                <Text
                    style = {{
                        fontFamily: "Poppins-Bold",
                        fontSize: 14,
                        color: "white",
                        marginTop: 30,
                    }}
                >
                    OOPS! This page isn't working.
                </Text>
                <TouchableOpacity
                    onPress = {() => {Actions.Homepage()}}
                    style = {{
                        marginTop: 50,
                    }}
                >
                    <View
                        style = {{
                            width: Dimensions.get("window").width - 50,
                            height: 50,
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
                            fontSize: 20,
                            color: "white"
                        }}
                    >Go to Homepage</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}

export default Modal500;