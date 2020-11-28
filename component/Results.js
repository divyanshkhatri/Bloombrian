import React, {Component} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Results extends Component {
    render() {
        return (
            <SafeAreaView
                style = {{
                    backgroundColor: "black"
                }}
            >
                <TouchableOpacity 
                    onPress = {() => {
                        Actions.BottomNavigator()
                    }}
                >
                    <Text
                        style = {{
                            color: "#4ACDF4",
                            fontSize: 20,
                            fontFamily: "Poppins-Bold"
                        }}
                    >Results Page</Text>
                </TouchableOpacity>
                
            </SafeAreaView>
        )
    }
}

export default Results;