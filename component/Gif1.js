import React, {Component} from 'react';
import {View, Text, StatusBar, Image, AsyncStorage, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Gif1 extends Component {
    state = {
        time: Platform.OS == "android" ? 2600 : 3000,
        showLoader: true,
    }

    componentDidMount () {
        setTimeout(() => {  
            this.setState({showLoader: false});
            AsyncStorage.getItem('email')
            .then((value) => {
                if(value) {
                    this.setState({showLoader: false});
                    Actions.Homepage();
                }
                else {
                    this.setState({showLoader: false});
                    Actions.LandingMain();
                }
            })
        }, this.state.time);
    }

    render() {
        return (
            <View style = {{backgroundColor: "black", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <StatusBar backgroundColor = "black"/>
                {
                    this.state.showLoader ? 
                    <Image 
                        style = {{
                            width: 60,
                            height: 60,
                        }}
                        source = {require("../images/loader.gif")}
                    />
                    : null
                }
            </View>
        )
    }
}

export default Gif1;