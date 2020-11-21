import React, {Component} from 'react';
import {View, Text, SafeAreaView, BackHandler} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Test extends Component {

    backAction = () => {
        Actions.Homepage();
        return true;
    };

    
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }
    
    render() {
        return (
            <SafeAreaView
                style = {{
                    // flex: 1,
                    height: '100%',
                    // flexDirection: 'column',
                    backgroundColor: 'black',
                    alignItems: "center",
                    paddingTop: Platform.OS === 'android' ? 25 : 0
                }}
            >
                <Text
                    style = {{
                        textAlign: 'center',
                        color: 'white',
                        fontFamily: 'Poppins-Medium'
                    }}
                >
                    Test Screen
                </Text>

            </SafeAreaView>
        )
    }

}

export default Test;