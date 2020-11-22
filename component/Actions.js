import ActionButton from 'react-native-action-button';
import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Actions extends Component {
    render() {
        return (
            <View style = {{
                marginTop: -20
            }}>
                <ActionButton 
                    style = {{
                    }}          
                    offsetX = {30}
                    offsetY = {0}              
                    size = {50}
                    buttonColor="#1A1A1A"
                    verticalOrientation = "up"
                >
                    <ActionButton.Item 
                        style = {{
                            zIndex: 100
                        }}
                        buttonColor='rgb(0, 187, 197)' onPress={() => Linking.openURL("tel:+917303955737")}>
                        <Image 
                            style = {{
                                width: 25, 
                                height: 25,
                                tintColor: "white"
                            }}
                            source = {require("../images/phone1.png")}
                        />
                    </ActionButton.Item>
                    <ActionButton.Item 
                        style = {{
                            zIndex: 100
                        }}
                        buttonColor='rgb(19, 32 ,77)' onPress={() => Linking.openURL('mailto:info@bloombraineducation.com')}>
                        <Image 
                            style = {{
                                width: 25, 
                                height: 25,
                                tintColor: "white"
                            }}
                            source = {require("../images/email1.png")}
                        />
                    </ActionButton.Item>
                    <ActionButton.Item 
                        style = {{
                            zIndex: 100
                        }}
                        buttonColor='rgb(251, 136, 42)' onPress={() => {Linking.openURL("https://wa.me/+917303955737?text=Hey!%20%20I%20wanted%20to%20know%20more%20about%20the%20courses")}}>
                        <Image 
                            style = {{
                                width: 30, 
                                height: 30,
                                tintColor: "white"
                            }}
                            source = {require("../images/whatsapp.png")}
                        />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }
}

export default Actions;