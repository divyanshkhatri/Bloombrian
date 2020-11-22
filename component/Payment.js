import React, {Component} from 'react';
import {View, Text, SafeAreaView, Dimensions, Image, TouchableOpacity, Platform, BackHandler, Linking} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import { Actions } from 'react-native-router-flux';

class Payment extends Component {

    backAction = () => {
        Actions.Profile();
        return true;
    };

    
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    state = {
        plan1: "12months",
        plan2: "12months",
        plan3: "12months",
        plan4: "12months",
        activeIndex: 0,
    }

    get pagination () {
        const { activeIndex } = this.state;
        return (
            <Pagination
                containerStyle = {{
                    marginTop: 10,
                    // borderColor: 'white',
                    // borderWidth: 3,
                    paddingBottom: 4,
                }}
                dotsLength={carouselItems.length}
                activeDotIndex={activeIndex}
                //   containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                dotStyle={{
                    width: 9,
                    height: 9,
                    borderRadius: 4.5,
                    marginHorizontal: -10,
                    backgroundColor: '#32C6F3'
                }}
                inactiveDotStyle={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    marginHorizontal: -10,
                    backgroundColor: 'grey'
                    // Define styles for inactive dots here
                }}
            //   inactiveDotOpacity={0.4}
            //   inactiveDotScale={0.6}
            />
        );
    }

    render() {

        let carouselItems = [
            {
                title: "Item 1",
                category: 'All Subjects',
                image: require("../images/payment-pd.png"),
                cutCost: this.state.plan1 == "12months" ? 36000 : this.state.plan1 == "6months" ? 18000 : this.state.plan1 == "3months" ? 9000 : this.state.plan1 == "1month" ? 3000 : -999,
                discCost: this.state.plan1 == "12months" ? 18000 : this.state.plan1 == "6months" ? 11700 : this.state.plan1 == "3months" ? 6750 : this.state.plan1 == "1month" ? 3000 : -999,
                feature1: "English",
                feature3: "Science, Mathematics",
                feature2: "Social Studies",
                feature4: this.state.plan1 == "12months" ? "288 Classes" : this.state.plan1 == "6months" ? "144 Classes" : this.state.plan1 == "3months" ? "72 Classes" : "24 Classes",
                num: [
                    {
                        label: '6 months',
                        value: '6months',
                    },
                    {
                        label: '3 months',
                        value: '3months',
        
                    },
                    {
                        label: '1 month',
                        value: '1month',
          
                    },
                ],
            },
            {
                title: "Item 2",
                category: 'Spoken English Program',
                cutCost: this.state.plan2 == "12months" ? 36000 : this.state.plan2 == "6months" ? 18000 : this.state.plan2 == "3months" ? 9000 : 0,
                discCost: this.state.plan2 == "12months" ? 18000 : this.state.plan2 == "6months" ? 11700 : this.state.plan2 == "3months" ? 6750 :  0,
                image: require("../images/payment-aca.png"),
                feature1: this.state.plan2 == "12months" ? "144 Classes" : this.state.plan2 == "6months" ? "72 Classes" : this.state.plan2 == "3months" ? "36 Classes" : "12 Classes",
                feature2: "Public Speaking",
                feature3: "English Core Grammar",
                feature4: "Personality Development",
                num: [
                    {
                        label: '6 months',
                        value: '6months',
                    },
                    {
                        label: '3 months',
                        value: '3months',
        
                    },
                ],
            },
            {
                title:"Item 3",
                category: "Coding 1:5",
                image: require("../images/payment-inv.png"),
                cutCost: this.state.plan3 == "12months" ? 36000 : this.state.plan3 == "6months" ? 18000 : this.state.plan3 == "3months" ? 9000 : 0,
                discCost: this.state.plan3 == "12months" ? 18000 : this.state.plan3 == "6months" ? 11700 : this.state.plan3 == "3months" ? 6750 :  0,
                feature3: "Scratch/MIT App Inventor",
                feature2: "Special Projects",
                feature4: "Publish your application on Play Store",
                feature1: this.state.plan3 == "12months" ? "96 Classes" : this.state.plan3 == "6months" ? "48 Classes" : this.state.plan3 == "3months" ? "24 Classes" : "8 Classes",
                num: [
                    {
                        label: '6 months',
                        value: '6months',
                    },
                    {
                        label: '3 months',
                        value: '3months',
        
                    },
                ],
            },
            {
                title:"Item 4",
                category: "Coding 1:1",
                image: require("../images/payment-inv.png"),
                cutCost: this.state.plan4 == "12months" ? 80000 : this.state.plan4 == "6months" ? 50000 : this.state.plan4 == "3months" ? 20000 : 0,
                discCost: this.state.plan4 == "12months" ? 56000 : this.state.plan4 == "6months" ? 40000 : this.state.plan4 == "3months" ? 18000 :  0,
                feature1: "Programming",
                feature2: "Development",
                feature3: "Programming Development",
                feature4: this.state.plan4 == "12months" ? "96 Classes" : this.state.plan4 == "6months" ? "48 Classes" : this.state.plan4 == "3months" ? "24 Classes" : "8 Classes",
                num: [
                    {
                        label: '6 months',
                        value: '6months',
                    },
                    {
                        label: '3 months',
                        value: '3months',
        
                    },
    
                ],
            },
        ]
    
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
                    <TouchableOpacity onPress = {() => Actions.Profile()}>
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
                    >
                        Membership Plans
                    </Text>
                    
                </View>
                <View style = {{
                    marginTop: Platform.OS == "android" ? -12 : 0,
                    alignItems: 'center',
                    }}>
                    <Carousel
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={carouselItems}

                        renderItem={
                            ({item}) => (
                                <View style = {{
                                    marginTop: 55,
                                    height: 540, 
                                    borderRadius: 15, 
                                    overflow: 'hidden',
                                    width: 290, 
                                    backgroundColor: '#141414',
                                    // borderBottomWidth: 60, 
                                    borderBottomColor: '#1D1D1D',
                                    // borderColor: 'white',
                                    // borderWidth: 2
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
                                            height: 85,
                                            borderTopLeftRadius: 15,
                                            borderTopRightRadius: 15
                                    }}>
                                        <View style = {{flexDirection: 'row', width: '90%'}}>
                                            <Image source = {item.image} style = {{width: 50, height: 50}} />
                                            <View style = {{
                                                marginLeft: 10,
                                                marginTop: 5
                                            }}>
                                                <Text style = {{
                                                    color: '#ffffff',
                                                    fontFamily: 'Poppins-Bold',
                                                    fontSize: 12,
                                                    textShadowColor:'#4ACDF4',
                                                    // textShadowOffset:{width: 5, height: 5},
                                                    textShadowRadius:10,
                                                    // borderWidth: 1,
                                                    // borderColor: "#77D2F0",
                                                    opacity: 0.4
                                                }}>Category</Text>
                                                <Text style = {{
                                                    marginLeft: 6,
                                                    color: 'white',
                                                    fontFamily: 'Poppins-ExtraBold',
                                                    fontSize: 14,
                                                    lineHeight: 17
                                                }}>{item.category}</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                    <View 
                                        style = {{
                                            // borderColor: 'white',
                                            // borderWidth: 2,
                                            marginLeft: 30,
                                            marginRight: 30,
                                            marginTop: 30
                                        }}>
                                        {
                                        item.discCost === item.cutCost ?

                                        <Text style = {{
                                            fontFamily: 'Poppins-Bold',
                                            color: '#4ACDF4',
                                            fontSize: 32,
                                            marginBottom: this.state.plan == "1month" ? 20 : 0,
                                            // borderColor: 'white',
                                            // borderWidth: 2,
                                        }}>Rs. {item.cutCost}</Text>
                                        :
                                        <Text style = {{
                                            fontFamily: 'Poppins-Medium',
                                            color: '#4A4A4A',
                                            fontSize: 14,
                                            // borderColor: 'white',
                                            // borderWidth: 2,
                                            textDecorationLine: 'line-through',
                                            textDecorationStyle: 'solid',
                                        }}>Rs. {item.cutCost}</Text>
                                        }
                                        <View style = {{
                                            flexDirection: 'row'
                                        }}>{   item.discCost === item.cutCost ? null :
                                                <Text style = {{
                                                    fontFamily: 'Poppins-Bold',
                                                    color: '#4ACDF4',
                                                    fontSize: 32,
                                                    marginBottom: this.state.plan == "1month" ? 20 : 0,
                                                    // borderColor: 'white',
                                                    // borderWidth: 2,
                                                }}>Rs. {item.discCost}</Text>
                                            }
                                        </View>
                                        <View style = {{flexDirection: 'row', marginTop: 10}}>
                                            <Image style = {{
                                                width: 25,
                                                height: 25,
                                            }} 
                                            source = {require('../images/feature.png')}/>
                                            <Text
                                                style = {{
                                                    fontFamily: 'Poppins-SemiBold',
                                                    fontSize: 14,
                                                    color: 'white',
                                                    marginLeft: 14,
                                                    paddingRight: 20
                                                }}
                                            >{item.feature1}</Text>
                                        </View>
                                        <View style = {{flexDirection: 'row', marginTop: 30}}>
                                            <Image style = {{
                                                width: 25,
                                                height: 25,
                                            }} 
                                            source = {require('../images/feature.png')}/>
                                            <Text
                                                style = {{
                                                    fontFamily: 'Poppins-SemiBold',
                                                    fontSize: 14,
                                                    color: 'white',
                                                    marginLeft: 14,
                                                    paddingRight: 20
                                                }}
                                            >{item.feature2}</Text>
                                        </View>
                                        <View style = {{flexDirection: 'row', marginTop: 30}}>
                                            <Image style = {{
                                                width: 25,
                                                height: 25,
                                            }} 
                                            source = {require('../images/feature.png')}/>
                                            <Text
                                                style = {{
                                                    fontFamily: 'Poppins-SemiBold',
                                                    fontSize: 14,
                                                    color: 'white',
                                                    marginLeft: 14,
                                                    paddingRight: 20
                                                }}
                                            >{item.feature3}</Text>
                                        </View>
                                        <View style = {{flexDirection: 'row', marginTop: 30}}>
                                            <Image style = {{
                                                width: 25,
                                                height: 25,
                                            }} 
                                            source = {require('../images/feature.png')}/>
                                            <Text
                                                style = {{
                                                    fontFamily: 'Poppins-SemiBold',
                                                    fontSize: 14,
                                                    color: 'white',
                                                    marginLeft: 14,
                                                    paddingRight: 20
                                                }}
                                            >{item.feature4}</Text>
                                        </View>
                                    </View>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: '12 months',
                                            value: '12months',
                                            color: '',
                                        }}
                    
                                        style = {{
                                            inputIOSContainer: {
                                                margin: 16,
                                                height: 40,                            
                                                borderRadius: 10,
                                                backgroundColor: '#141414',
                                                borderWidth: 2,
                                                borderColor: '#4ACDF4',
                                                width: 215,
                                                alignSelf: 'center',
                                                justifyContent: 'center',
                                                marginTop: 30
                                            },
                                            placeholder: {
                                                // paddingTop: 10,
                                                marginLeft: 20,
                                                lineHeight: 15,
                                                fontSize: 13,
                                                fontFamily: 'Poppins-Bold',
                                                color: 'white',
                                                // borderColor: 'white',
                                                // borderWidth: 1,
                                            },
                                            inputAndroidContainer: {
                                                margin: 16,
                                                height: 40,                            
                                                borderRadius: 10,
                                                backgroundColor: '#141414',
                                                borderWidth: 2,
                                                borderColor: '#4ACDF4',
                                                width: 215,
                                                alignSelf: 'center',
                                                // alignItems: 'center',
                                                justifyContent: 'center',
                                                marginTop: 30,
                                                // borderColor: 'white',
                                                // borderWidth: 1,
                                            },
                                            inputAndroid: {
                                                fontSize: 13,
                                                lineHeight: 10,
                                                fontFamily: 'Poppins-Bold',
                                                color: 'white',
                                                marginLeft: 20
                                            },
                                            inputIOS: {
                                                paddingLeft: 15,
                                                // paddingTop: 10,
                                                fontSize: 13,
                                                fontFamily: 'Poppins-Bold',
                                                color: 'white'
                                            }              
                                        }}
                                        items = {item.num}
                                        onValueChange = { async (value) => {
                                            if(item.category === "All Subjects") {
                                                await this.setState({plan1: value});
                                                console.log(this.state.plan1);
                                            } else if(item.category === "Coding 1:5") {
                                                await this.setState({plan3: value});
                                                console.log(this.state.plan3);
                                            } else if(item.category === "Coding 1:1") {
                                                await this.setState({plan4: value});
                                                console.log(this.state.plan4);
                                            } else if(item.category === "Spoken English Program") {
                                                await this.setState({plan2: value});
                                                console.log(this.state.plan2);
                                            } 
                                        }}
                                        useNativeAndroidPickerStyle={false}
                                        Icon = { () => {
                                            return (
                                                <View
                                                    style = {{
                                                        // borderWidth: 2,
                                                        // borderColor: 'white',
                                                        // marginTop: 12,
                                                        marginRight: 15
                                                    }}>
                                                    <Image 
                                                        style = {{
                                                            width: 20,
                                                            height: 20,
                                                            
                                                        }}
                                                        source = {require('../images/icon.png')}
                                                    />
                                                </View>
                                            )
                                        }}
                                    />
                                    <TouchableOpacity style = {{
                                            width: 215,
                                            height: 35,
                                            backgroundColor: '#4ACDF4',
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            marginTop: 10,
                                            borderRadius: 10
                                        }}
                                            onPress = { () => {Actions.Checkout({category: item.category, cutCost: item.cutCost, discCost: item.discCost})}}
                                        >
                                            <Text style = {{
                                                textAlign: 'center',
                                                fontFamily: 'Poppins-SemiBold',
                                                fontSize: 16,
                                                color: 'white',
                                                justifyContent: 'center'
                                            }}>Buy Now</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        sliderWidth= {Dimensions.get('window').width}
                        itemWidth={300}
                        enableMomentum={false}
                        lockScrollWhileSnapping
                        // autoplay
                        useScrollView
                        loop
                        autoplayInterval={3000}
                        onSnapToItem = { index => this.setState({activeIndex:index}) } />
                    
                    {
                        <Pagination
                            containerStyle = {{
                                marginTop: 10,
                                // borderColor: 'white',
                                // borderWidth: 3,
                                paddingBottom: 4,
                            }}
                            dotsLength={carouselItems.length}
                            activeDotIndex={this.state.activeIndex}
                            //   containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                            dotStyle={{
                                width: 9,
                                height: 9,
                                borderRadius: 4.5,
                                marginHorizontal: -10,
                                backgroundColor: '#32C6F3'
                            }}
                            inactiveDotStyle={{
                                width: 16,
                                height: 16,
                                borderRadius: 8,
                                marginHorizontal: -10,
                                backgroundColor: 'grey'
                                // Define styles for inactive dots here
                            }}
                        //   inactiveDotOpacity={0.4}
                        //   inactiveDotScale={0.6}
                        />
                }
                </View>
            </SafeAreaView>
        )
    }

}

export default Payment;