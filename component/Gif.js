import React, {Component} from 'react';
import {View, Image, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Gif extends Component {

    state = {
        email: "",
        time: Platform.OS == "android" ? 2600 : 3500,
    }

    componentDidMount() {
        AsyncStorage.getItem('email')
        .then((value) => {
            if(value) {
                console.log("email" + value);
                setTimeout(() => {
                    AsyncStorage.getItem('id')
                    .then((value) => {
                        let interest_url = 'http://idirect.bloombraineducation.com/idirect/lms/interest_id?id=' + value;
                        fetch(interest_url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        .then((response) => response.json())
                        .then((a) => {
                            console.log(a);
                            if(a["interest"] === false) {
                                Actions.Favourite();
                            } else {
                                Actions.Homepage();
                            }
                        })
    
                    })
                    .catch((e) => console.log('key not found'));

                }, this.state.time);
            }
            else {
                setTimeout(() => {
                    Actions.LandingMain();
                }, this.state.time);
                
            }
        })
    }

    render() {
        return (
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require("../images/Bloom-Brain.gif")} style={{width: 300, height: 300}} />
            </View>
        )
    }
}

export default Gif;