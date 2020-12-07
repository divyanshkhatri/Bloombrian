import React, {Component} from 'react';
import {View, StatusBar, Text, SafeAreaView, Image, TouchableOpacity, TextInput, Alert, Keyboard, Dimensions, Animated, BackHandler, AsyncStorage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Dash from 'react-native-dash';
import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';
import PayuMoney from 'react-native-payumoney';

class Checkout extends Component {

    state = {
        plans: {
            'All Subjects': 'beginner',
            'Spoken English Program': 'advance',
            'Coding 1:5': 'pro',
            'Coding 1:1': 'coding'
        },
        code: '',
        codeWork: true,
        padding: new Animated.Value(0),
    }

    backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => Actions.Payment() }
        ]);
        return true;
    };

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    onPressCheckout = () => {

        let amount = (this.props.discCost)*1.185;
        AsyncStorage.getItem('id')
        .then((value) => {
            let url = "http://idirect.bloombraineducation.com/idirect/lms/payu/payment?id="+ value+"&amount="+amount+"&product_name="+this.state.plans[this.props.category]
            console.log(url)
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                })
                .then((response) => {
                    if(response.ok){
                        response.json().then((responseJson) => {
                            const payData = {
                                amount: responseJson["amount"], //
                                txnId: responseJson["txnid"],
                                productName: responseJson["productinfo"], //also id of student
                                firstName: responseJson["firstname"], 
                                email: responseJson["email"], 
                                phone: responseJson["phone"], 
                                merchantId: "7133037",
                                key: responseJson["key"],
                                successUrl: responseJson["surl"],
                                failedUrl: responseJson["furl"],
                                isDebug: false,
                                hash: responseJson["hash"],
                            }
                            PayuMoney(payData).then((data) => {
                                // Payment Success
                                Actions.PaymentComplete();
                            }).catch((error) => {
                                Actions.PaymentInComplete();
                            })
                        })
                    }
                })
                
        }).catch((error) => {

        })
    }

    componentDidMount() {

        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
          );
          this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
          );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        Animated.timing( this.state.padding, { toValue: -210, duration: 100, useNativeDriver: false}).start();
        // this.setState({padding: 80})
    }
    
    _keyboardDidHide = () => {
        Animated.timing( this.state.padding, { toValue: 0, duration: 100, useNativeDriver: false}).start();
        // this.setState({padding: 120})
    }

    render() {
         
        return (
            <SafeAreaView
                style = {{
                    // flex: 1,
                    height: '100%',
                    // flexDirection: 'column',
                    backgroundColor: 'black',
                    paddingTop: Platform.OS === 'android' ? 0 : 0
                }}
            >
                <StatusBar 
                    backgroundColor = "black"
                />
                <ScrollView>
                <Animated.View style = {{marginTop: this.state.padding}}>
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
                    onPress = { () => {this.backAction()} }
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
                    >Checkout</Text>
                </View>
                <View style = {{
                    marginTop: 40,
                    height: 455, 
                    borderRadius: 15, 
                    width: 350,
                    backgroundColor: '#141414',
                    // borderBottomWidth: 60, 
                    borderBottomColor: '#1D1D1D',
                    // borderColor: 'white',
                    // borderWidth: 2,
                    overflow: "hidden",
                    alignSelf: 'center'
                }}>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={[ '#6EDFFF', '#14A1CC', '#0D78BF']}
                        style={{ 
                            // paddingTop: 25, 
                            justifyContent: 'center',
                            alignItems: 'center',
                            // borderRadius: 5,
                            // width: 100,
                            // marginLeft: 16,
                            height: 75,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15
                    }}>
                        <View style = {{flexDirection: 'row'}}>
                            <Text style = {{
                                color: 'white',
                                fontFamily: 'Poppins-Bold',
                                fontSize: 20,
                            }}>Billing Details</Text>
                        </View>
                    </LinearGradient>
                    <View 
                        style = {{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginLeft: 25, marginRight: 25}}
                    >
                        <Text style = {{
                            color: 'white',
                            fontFamily: 'Poppins-Bold'
                            }}
                        >Plan Name</Text>
                        <Text style = {{
                            color: '#4ACDF4',
                            fontFamily: 'Poppins-Bold'
                        }}
                        >{this.props.category}</Text>
                    </View>
                    <View 
                        style = {{marginLeft: 25, marginRight: 25, flexDirection: 'row', justifyContent: 'space-between', marginTop: 32}}
                    >
                        <Text style = {{
                            color: '#929292',
                            fontFamily: 'Poppins-Medium'
                            }}
                        >Actual Price</Text>
                        <Text style = {{
                            color: '#929292',
                            fontFamily: 'Poppins-Medium'
                        }}
                        >Rs. {this.props.cutCost}</Text>
                    </View>
                    <View 
                        style = {{marginLeft: 25, marginRight: 25, flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}
                    >
                        <Text style = {{
                            color: '#929292',
                            fontFamily: 'Poppins-Medium'
                            }}
                        >Discount</Text>
                        <Text style = {{
                            color: '#929292',
                            fontFamily: 'Poppins-Medium'
                        }}
                        >Rs. {this.props.cutCost-this.props.discCost}</Text>
                    </View>
                    <View 
                        style = {{marginLeft: 25, marginRight: 25, flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}
                    >
                        <Text style = {{
                            color: '#929292',
                            fontFamily: 'Poppins-Medium'
                            }}
                        >Plan Final Price</Text>
                        <Text style = {{
                            color: '#929292',
                            fontFamily: 'Poppins-Medium'
                        }}
                        >Rs. {this.props.discCost}</Text>
                    </View>
                    <View 
                        style = {{marginLeft: 25, marginRight: 25, flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}
                    >
                        <Text style = {{
                            color: '#929292',
                            fontFamily: 'Poppins-Medium'
                            }}
                        >GST(18.5%)</Text>
                        <Text style = {{
                            color: '#929292',
                            fontFamily: 'Poppins-Medium'
                        }}
                        >Rs. {(this.props.discCost)*0.185}</Text>
                    </View>
                    <View 
                        style = {{marginLeft: 25, marginRight: 25, flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}
                    >
                        <Text style = {{
                            color: '#929292',
                            fontFamily: 'Poppins-Medium'
                            }}
                        >Coupon Discount</Text>
                        <Text style = {{
                            color: '#929292',
                            fontFamily: 'Poppins-Medium'
                        }}
                        >Rs. 0</Text>
                    </View>
                    <View style = {{alignItems: 'center', marginTop: 23}}>
                        <Dash style={{width:300, height:1}} dashLength = {5} dashColor = '#929292' dashGap = {5} />
                    </View>
                    <View 
                        style = {{marginLeft: 25, marginRight: 25, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}
                    >
                        <Text style = {{
                            color: 'white',
                            fontFamily: 'Poppins-Bold',
                            fontSize: 20
                            }}
                        >Final Price</Text>
                        <Text style = {{
                            color: '#4ACDF4',
                            fontSize: 20,
                            fontFamily: 'Poppins-Bold'
                        }}
                        >Rs. {(this.props.discCost)*1.185}</Text>
                    </View>
                </View>
                <View style = {{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        // flex: 1,
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        backgroundColor: 'black',
                        // borderWidth: 0.5,
                        borderColor: '#4ACDF4',
                        borderWidth: 1,
                        height: 35,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        width: 250,
                        marginBottom: 7,
                        // marginLeft: 30,
                        marginTop: 28,
                        // marginRight: 100
                    }}>
                        <TextInput
                            style = {{ 
                                height: 38, 
                                fontFamily: 'Poppins-SemiBold', 
                                color: 'white', 
                                fontSize: 12, 
                                justifyContent: 'center', 
                                paddingLeft: 10,
                                paddingBottom: Platform.OS == "android" ? 0 : 5,
                                paddingTop: Platform.OS == "android" ? 0 : 0,
                            }}
                            value = {this.state.code}
                            onChangeText = {() => {}}
                            placeholder = "Have a promo Code?"
                            placeholderTextColor= '#707070'
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style = {{
                            height: 35,
                            width: 70,
                            backgroundColor: '#4ACDF4',
                            marginTop: 28,
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style = {{
                                fontFamily: 'Poppins-Bold',
                                fontSize: 13,
                                color: 'white'
                            }}>Apply</Text>
                    </View>
                </View>
                {this.state.codeWork ? null : <Text style = {{fontFamily: 'Poppins-Medium', fontSize: 9, marginLeft: (Dimensions.get('window').width-320)/2, color: 'white'}}>Alas! The given code does not exist.</Text>}
                <TouchableOpacity style = {{
                            width: 350,
                            height: 50,
                            backgroundColor: '#4ACDF4',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            marginTop: this.state.codeWork ? 44 : 28,
                            borderRadius: 10,
                        }}
                            onPress = { () => this.onPressCheckout() }
                        >
                        <Text style = {{
                            textAlign: 'center',
                            fontFamily: 'Poppins-Bold',
                            fontSize: 20,
                            color: 'white',
                            justifyContent: 'center'
                        }}>Proceed to Checkout</Text>
                </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </SafeAreaView>
        )
    }

}

export default Checkout;