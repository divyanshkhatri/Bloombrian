import React, {Component} from 'react';
import { StatusBar, StyleSheet, Text, View, Button, Image } from 'react-native';
import Gif from './Gif';

class Landing extends Component {

    render() {
        return (
            <View style = {styles.root}>
                <StatusBar 
                    backgroundColor = "black"
                />
                <Gif />                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'black'
    //   width: '100%',
    //   height: '100%'
    },
});

export default Landing;