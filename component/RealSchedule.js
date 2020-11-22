import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions, TouchableOpacity, FlatList, Image, ImageBackground, Alert, Platform, TouchableWithoutFeedback, AsyncStorage, Linking} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modal';
import moment from 'moment';
import ModalDropdown from 'react-native-modal-dropdown';
import {Actions} from 'react-native-router-flux';
moment().format();

class RealSchedule extends Component {

    async componentDidMount() {
        setTimeout(() => {
            this.setState({showModal: true})
          }, 500);
        AsyncStorage.getItem('class')
        .then((value) => {
            let url = "http://idirect.bloombraineducation.com/idirect/lms/live/class/schedule?class="+value+"&course="+this.state.courses[this.state.course];
            console.log(url);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({schedules: responseJson[this.state.courses[this.state.course]]})
                console.log(this.state.schedules)
            })
            .catch((error) => {
                this.setState({login: false})
                console.error(error);
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    attend = () => {
        Actions.pop();
        Actions.Payment();
    }


    state = {
        subjects: {
            'english': 'English',
            'science': 'Science',
            'math': 'Mathematics',
            'evs':'EVS',
            'sst': 'SST',
            'coding': 'Coding',
            'hindi': 'Hindi',
            'pdp': 'Personality Development',
            'ps': 'Public Speaking',
            'grammar': 'English Core Grammar',
            'robotics': 'Robotics',
            'academics': 'Academics',
            'extra_curricular': 'Extra-curricular'
        },
        courses : {
            'All Subjects'           : 'beginner',
            'Spoken English Program' : 'advance',
            'Coding 1:5'             : 'pro',
            'Coding 1:1'             :'coding',
        },
        class: 1,
        course: "All Subjects",
        chosen: true,
        showModal: false,
        errorString: "",
        schedules: null
    }

    onPressAttend = (url) => {
        Linking.openURL(url);

    }

    onClickConfirm = () => {
        let url = "http://idirect.bloombraineducation.com/idirect/lms/live/class/schedule?class="+this.state.class+"&course="+this.state.courses[this.state.course];
        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({schedules: responseJson[this.state.courses[this.state.course]]})
                this.setState({showModal:false})
            })
            .catch((error) => {
                // this.setState({login: false})
                console.error(error);
        });
    }

    render() {
        return (
            <ScrollView 
                style = {{paddingTop: 20, backgroundColor: '#101010', height: Platform.OS == 'ios' ? '84%' : '80%'}}
                showsHorizontalScrollIndicator = {false}
                showsVerticalScrollIndicator = {false}
            >
                <Modal 
                    onBackdropPress = {() => {this.setState({showModal: false})}}
                    isVisible = {this.state.showModal}
                    animationIn = "pulse"

                >
                    <View
                        style = {{

                            backgroundColor: '#101010',
                            // opacity: 0.8,
                            borderRadius: 20,
                            padding: 25,
                            paddingTop: 25,
                            width: 250,
                            height: 225,
                            alignSelf: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                            width: 0,
                            height: 2,
                            },
                            shadowOpacity: 0.75,
                            shadowRadius: 3.84,
                            elevation: 5,

                        }}
                    >  
                        <Text
                            style = {{
                                fontFamily: 'Poppins-Bold',
                                fontSize: 14,
                                color: '#4ACDF4',
                                marginBottom: 10
                            }}
                        >
                            Choose a course
                        </Text>

                        <ModalDropdown 
                            style = {{
                                borderRadius: 10,
                                borderWidth: 0,
                                backgroundColor: '#1A1A1A',
                                width: 200,
                                height: 37,
                                justifyContent: "center",
                                marginBottom: 10
                            }}
                            textStyle = {{
                                color: 'white',
                                fontFamily: 'Poppins-SemiBold',
                                textAlign: "center",
                                fontSize: 14
                            }}
                            defaultValue = {"Course"}
                            options={['All Subjects', 'Spoken English Program', 'Coding 1:5', 'Coding 1:1']}
                            dropdownStyle = {{
                                width: 200,
                                backgroundColor: "#1A1A1A",
                                borderWidth: 0,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                            }}
                            dropdownTextStyle = {{
                                color: "white",
                                fontSize: 14,
                                fontFamily: "Poppins-SemiBold",
                                backgroundColor: "#1A1A1A",
                                borderWidth: 0,
                                textAlign: "center"
                            }}
                            dropdownTextHighlightStyle = {{
                                color: "#4ACDF4",
                                fontSize: 14,
                                fontFamily: "Poppins-SemiBold",
                                backgroundColor: "#1A1A1A",
                                borderWidth: 0,
                            }}
                            renderSeparator = {() => {return <View></View>}}
                            onSelect = {(index, value) => {
                                this.setState({
                                    course: value
                                })
                            } }
                            />

                        
                        <Text style = {{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 14,
                            color: '#4ACDF4',
                            marginBottom: 10
                        }}>
                            Class
                        </Text>
                        <ModalDropdown 
                            style = {{
                                borderRadius: 10,
                                borderWidth: 0,
                                backgroundColor: '#1A1A1A',
                                width: 200,
                                height: 37,
                                justifyContent: "center",
                                marginBottom: 10
                            }}
                            textStyle = {{
                                color: 'white',
                                fontFamily: 'Poppins-SemiBold',
                                textAlign: "center",
                                fontSize: 14
                            }}
                            defaultValue = {"Class"}
                            options={['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th']}
                            dropdownStyle = {{
                                width: 200,
                                backgroundColor: "#1A1A1A",
                                borderWidth: 0,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                overflow: "hidden"
                            }}
                            dropdownTextStyle = {{
                                color: "white",
                                fontSize: 14,
                                fontFamily: "Poppins-SemiBold",
                                backgroundColor: "#1A1A1A",
                                borderWidth: 0,
                                textAlign: "center"
                            }}
                            dropdownTextHighlightStyle = {{
                                color: "#4ACDF4",
                                fontSize: 14,
                                fontFamily: "Poppins-SemiBold",
                                backgroundColor: "#1A1A1A",
                                borderWidth: 0,
                            }}
                            renderSeparator = {() => {return <View></View>}}
                            onSelect = {(index, value) => {
                                this.setState({class: parseInt(index) + 1})
                            } }
                            />

                        <View>
                            {!this.state.chosen ? <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-SemiBold", marginTop: 5, fontSize: 10}}>Please select both course and class</Text> : null}
                            <TouchableOpacity onPress = {() => {this.onClickConfirm()}}>
                                <Text style = {{
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: 15, 
                                    color: '#4ACDF4',
                                    marginTop: !this.state.chosen ? 10 : 10,
                                    textAlign: 'center'
                                }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style = {{marginTop: -20, marginBottom: 40 }}>
                <TouchableOpacity 
                    onPress = { () => {
                        this.setState({showModal: true})
                    }}
                    style = {{
                        alignSelf: "flex-end"
                    }}
                >
                    <Text style = {{marginTop: 20,fontFamily: 'Poppins-Bold', color: '#4ACDF4', zIndex: 2, width: 60, fontSize: 13, marginRight: 20, textAlign: "right"}}>Filter by</Text>
                </TouchableOpacity>
                <View style = {{marginTop: -20}}>
                {
                    
                    this.state.schedules ? this.state.schedules.map((value, index) => {
                        return (
                            <View style = {{
                            }}>
                                <Text style = {{
                                    fontFamily: "Poppins-Bold",
                                    fontSize: 20,
                                    marginLeft: 20,
                                    marginBottom: 10,
                                    color: "#4ACDF4"
                                }}>Batch {index+1}</Text>
                                
                                {
                                    this.state.schedules[index][0]["Monday"] !== undefined ? 
                                        <View>
                                            <Text style = {{marginLeft: 25, marginBottom: 10, fontFamily: "Poppins-Bold", color: "white"}}>
                                                Monday
                                            </Text>
                                            <FlatList 
                                                showsHorizontalScrollIndicator = {false}
                                                showsVerticalScrollIndicator = {false}
                                                contentContainerStyle = {{marginRight: 20}}
                                                ListHeaderComponent = {<View style = {{width: 20}}></View>}
                                                horizontal = {true}
                                                data  = {this.state.schedules[index][0]["Monday"]}
                                                renderItem = {({item}) => (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        width: Dimensions.get("window").width - 40,
                                                        height: 100,
                                                        marginRight: 10,
                                                        backgroundColor: '#1C1C1C',
                                                        marginBottom: 20,
                                                        borderRadius: 10
                                                    }}>
                                                        <View>
                                                            <ImageBackground
                                                                style = {{
                                                                    // marginTop: 20,
                                                                    // marginRight: 20,
                                                                    width: 100, 
                                                                    height: 100, 
                                                                    borderRadius: 10,
                                                                    marginBottom: 0,
                                                                    overflow: 'hidden',
                                                                    position: 'relative',
                                                                }}
                                                                source = {require('../images/mathswork.png')}
                                                            >
                                                            </ImageBackground>
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 13, position: 'absolute', top: 10, left: 110}}>Subject</Text>
                                                            </View>
                                                            <View style = {{
                                                                flex: 1,
                                                                flexShrink: 1,
                                                                justifyContent: 'space-around', 
                                                            }}>
                        
                                                                <Text style = {{
                                                                    color: 'white',
                                                                    fontFamily: 'Poppins-Bold',
                                                                    paddingLeft: 15,
                                                                    paddingRight: 50,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 15,
                                                                    height: 40
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                            <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    paddingLeft: 12,
                                                                    paddingRight: 12,
                                                                    width: 125,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.teacher_name}
                                                                </Text>
                                                                
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                            // borderColor: 'white',
                                                                            // borderWidth: 2,
                                                                    width: 80,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.time} pm
                                                                </Text>
                                                                {
                                                                    <TouchableOpacity 

                                                                        onPress = {() => {
                                                                            let time = item.time;
                                                                            let url = item.demo_link;
                                                                            this.attend();
                                                                        }}
                                                                        style = {{ 
                                                                            // borderWidth: 1, 
                                                                            // borderColor: 'white', 
                                                                            width: 70, 
                                                                            height: 25, 
                                                                            marginRight: 15,
                                                                            marginTop: 5,
                                                                            justifyContent: 'center', 
                                                                            borderRadius: 5,
                                                                            backgroundColor: '#4ACDF4'
                                                                        }}
                                                                    >
                                                                        <Text style = {{
                                                                            textAlign: 'center', 
                                                                            alignItems: 'center',
                                                                            alignSelf: 'center', 
                                                                            fontSize: 12, 
                                                                            fontFamily: 'Poppins-Bold', 
                                                                            color: "white"
                                                                        }}>Attend</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    :
                                        <View>    
                                        </View>
                                }
                                {
                                    this.state.schedules[index][0]["Tuesday"] !== undefined ? 
                                        <View>
                                            <Text style = {{marginLeft: 23, marginBottom: 10, fontFamily: "Poppins-Bold", color: "white"}}>
                                                Tuesday
                                            </Text>
                                            <FlatList 
                                                showsHorizontalScrollIndicator = {false}
                                                showsVerticalScrollIndicator = {false}
                                                contentContainerStyle = {{marginRight: 20}}
                                                ListHeaderComponent = {<View style = {{width: 20}}></View>}
                                                horizontal = {true}
                                                data  = {this.state.schedules[index][0]["Tuesday"]}
                                                renderItem = {({item}) => (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        width: Dimensions.get("window").width - 40,
                                                        height: 100,
                                                        backgroundColor: '#1C1C1C',
                                                        marginBottom: 20,
                                                        marginRight: 10,
                                                        borderRadius: 10
                                                    }}>
                                                        <View>
                                                            <ImageBackground
                                                                style = {{
                                                                    // marginTop: 20,
                                                                    // marginRight: 20,
                                                                    width: 100, 
                                                                    height: 100, 
                                                                    borderRadius: 10,
                                                                    marginBottom: 0,
                                                                    overflow: 'hidden',
                                                                    position: 'relative',
                                                                }}
                                                                source = {require('../images/mathswork.png')}
                                                            >
                                                            </ImageBackground>
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 13, position: 'absolute', top: 10, left: 110}}>Subject</Text>
                                                            </View>
                                                            <View style = {{
                                                                flex: 1,
                                                                flexShrink: 1,
                                                                justifyContent: 'space-around', 
                                                            }}>
                        
                                                                <Text style = {{
                                                                    color: 'white',
                                                                    fontFamily: 'Poppins-Bold',
                                                                    paddingLeft: 15,
                                                                    paddingRight: 50,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 15,
                                                                    height: 40
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                            <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    paddingLeft: 12,
                                                                    paddingRight: 12,
                                                                    width: 125,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.teacher_name}
                                                                </Text>
                                                                
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                            // borderColor: 'white',
                                                                            // borderWidth: 2,
                                                                    width: 80,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.time} pm
                                                                </Text>
                                                                {
                                                                    <TouchableOpacity 

                                                                        onPress = {() => {
                                                                            this.attend();
                                                                        }}
                                                                        style = {{ 
                                                                            // borderWidth: 1, 
                                                                            // borderColor: 'white', 
                                                                            width: 70, 
                                                                            height: 25, 
                                                                            marginRight: 15,
                                                                            marginTop: 5,
                                                                            justifyContent: 'center', 
                                                                            borderRadius: 5,
                                                                            backgroundColor: '#4ACDF4'
                                                                        }}
                                                                    >
                                                                        <Text style = {{
                                                                            textAlign: 'center', 
                                                                            alignItems: 'center',
                                                                            alignSelf: 'center', 
                                                                            fontSize: 12, 
                                                                            fontFamily: 'Poppins-Bold', 
                                                                            color: "white"
                                                                        }}>Attend</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    :
                                        <View>    
                                        </View>
                                }
                                {
                                    this.state.schedules[index][0]["Wednesday"] !== undefined ? 
                                        <View>
                                            <Text style = {{marginLeft: 23, marginBottom: 10, fontFamily: "Poppins-Bold", color: "white"}}>
                                                Wednesday
                                            </Text>
                                            <FlatList 
                                                showsHorizontalScrollIndicator = {false}
                                                showsVerticalScrollIndicator = {false}
                                                contentContainerStyle = {{marginRight: 20}}
                                                ListHeaderComponent = {<View style = {{width: 20}}></View>}
                                                horizontal = {true}
                                                data  = {this.state.schedules[index][0]["Wednesday"]}
                                                renderItem = {({item}) => (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        width: Dimensions.get("window").width - 40,
                                                        height: 100,
                                                        backgroundColor: '#1C1C1C',
                                                        marginBottom: 20,
                                                        marginRight: 10,
                                                        borderRadius: 10
                                                    }}>
                                                        <View>
                                                            <ImageBackground
                                                                style = {{
                                                                    // marginTop: 20,
                                                                    // marginRight: 20,
                                                                    width: 100, 
                                                                    height: 100, 
                                                                    borderRadius: 10,
                                                                    marginBottom: 0,
                                                                    overflow: 'hidden',
                                                                    position: 'relative',
                                                                }}
                                                                source = {require('../images/mathswork.png')}
                                                            >
                                                            </ImageBackground>
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 13, position: 'absolute', top: 10, left: 110}}>Subject</Text>
                                                            </View>
                                                            <View style = {{
                                                                flex: 1,
                                                                flexShrink: 1,
                                                                justifyContent: 'space-around', 
                                                            }}>
                        
                                                                <Text style = {{
                                                                    color: 'white',
                                                                    fontFamily: 'Poppins-Bold',
                                                                    paddingLeft: 15,
                                                                    paddingRight: 50,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 15,
                                                                    height: 40
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                            <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    paddingLeft: 12,
                                                                    paddingRight: 12,
                                                                    width: 125,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.teacher_name}
                                                                </Text>
                                                                
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                            // borderColor: 'white',
                                                                            // borderWidth: 2,
                                                                    width: 80,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.time} pm
                                                                </Text>
                                                                {
                                                                    <TouchableOpacity 

                                                                        onPress = {() => {
                                                                            let time = item.time;
                                                                            let url = item.demo_link;
                                                                            this.attend();
                                                                        }}
                                                                        style = {{ 
                                                                            // borderWidth: 1, 
                                                                            // borderColor: 'white', 
                                                                            width: 70, 
                                                                            height: 25, 
                                                                            marginRight: 15,
                                                                            marginTop: 5,
                                                                            justifyContent: 'center', 
                                                                            borderRadius: 5,
                                                                            backgroundColor: '#4ACDF4'
                                                                        }}
                                                                    >
                                                                        <Text style = {{
                                                                            textAlign: 'center', 
                                                                            alignItems: 'center',
                                                                            alignSelf: 'center', 
                                                                            fontSize: 12, 
                                                                            fontFamily: 'Poppins-Bold', 
                                                                            color: "white"
                                                                        }}>Attend</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    :
                                        <View>    
                                        </View>
                                }
                                {
                                    this.state.schedules[index][0]["Thursday"] !== undefined ? 
                                        <View>
                                            <Text style = {{marginLeft: 23, marginBottom: 10, fontFamily: "Poppins-Bold", color: "white"}}>
                                                Thursday
                                            </Text>
                                            <FlatList 
                                                showsHorizontalScrollIndicator = {false}
                                                showsVerticalScrollIndicator = {false}
                                                contentContainerStyle = {{marginRight: 20}}
                                                ListHeaderComponent = {<View style = {{width: 20}}></View>}
                                                horizontal = {true}
                                                data  = {this.state.schedules[index][0]["Thursday"]}
                                                renderItem = {({item}) => (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        width: Dimensions.get("window").width - 40,
                                                        height: 100,
                                                        marginRight: 10,
                                                        backgroundColor: '#1C1C1C',
                                                        marginBottom: 20,
                                                        borderRadius: 10
                                                    }}>
                                                        <View>
                                                            <ImageBackground
                                                                style = {{
                                                                    // marginTop: 20,
                                                                    // marginRight: 20,
                                                                    width: 100, 
                                                                    height: 100, 
                                                                    borderRadius: 10,
                                                                    marginBottom: 0,
                                                                    overflow: 'hidden',
                                                                    position: 'relative',
                                                                }}
                                                                source = {require('../images/mathswork.png')}
                                                            >
                                                            </ImageBackground>
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 13, position: 'absolute', top: 10, left: 110}}>Subject</Text>
                                                            </View>
                                                            <View style = {{
                                                                flex: 1,
                                                                flexShrink: 1,
                                                                justifyContent: 'space-around', 
                                                            }}>
                        
                                                                <Text style = {{
                                                                    color: 'white',
                                                                    fontFamily: 'Poppins-Bold',
                                                                    paddingLeft: 15,
                                                                    paddingRight: 50,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 15,
                                                                    height: 40
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                            <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    paddingLeft: 12,
                                                                    paddingRight: 12,
                                                                    width: 125,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.teacher_name}
                                                                </Text>
                                                                
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                            // borderColor: 'white',
                                                                            // borderWidth: 2,
                                                                    width: 80,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.time} pm
                                                                </Text>
                                                                {
                                                                    <TouchableOpacity 

                                                                        onPress = {() => {
                                                                            let time = item.time;
                                                                            let url = item.demo_link;
                                                                            this.attend();
                                                                        }}
                                                                        style = {{ 
                                                                            // borderWidth: 1, 
                                                                            // borderColor: 'white', 
                                                                            width: 70, 
                                                                            height: 25, 
                                                                            marginRight: 15,
                                                                            marginTop: 5,
                                                                            justifyContent: 'center', 
                                                                            borderRadius: 5,
                                                                            backgroundColor: '#4ACDF4'
                                                                        }}
                                                                    >
                                                                        <Text style = {{
                                                                            textAlign: 'center', 
                                                                            alignItems: 'center',
                                                                            alignSelf: 'center', 
                                                                            fontSize: 12, 
                                                                            fontFamily: 'Poppins-Bold', 
                                                                            color: "white"
                                                                        }}>Attend</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    :
                                        <View>    
                                        </View>
                                }
                                {
                                    this.state.schedules[index][0]["Friday"] !== undefined ? 
                                        <View>
                                            <Text style = {{marginLeft: 23, marginBottom: 10, fontFamily: "Poppins-Bold", color: "white"}}>
                                                Friday
                                            </Text>
                                            <FlatList 
                                                showsHorizontalScrollIndicator = {false}
                                                showsVerticalScrollIndicator = {false}
                                                contentContainerStyle = {{marginRight: 20}}
                                                ListHeaderComponent = {<View style = {{width: 20}}></View>}
                                                horizontal = {true}
                                                data  = {this.state.schedules[index][0]["Friday"]}
                                                renderItem = {({item}) => (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        width: Dimensions.get("window").width - 40,
                                                        height: 100,
                                                        marginRight: 10,
                                                        backgroundColor: '#1C1C1C',
                                                        marginBottom: 20,
                                                        borderRadius: 10
                                                    }}>
                                                        <View>
                                                            <ImageBackground
                                                                style = {{
                                                                    // marginTop: 20,
                                                                    // marginRight: 20,
                                                                    width: 100, 
                                                                    height: 100, 
                                                                    borderRadius: 10,
                                                                    marginBottom: 0,
                                                                    overflow: 'hidden',
                                                                    position: 'relative',
                                                                }}
                                                                source = {require('../images/mathswork.png')}
                                                            >
                                                            </ImageBackground>
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 13, position: 'absolute', top: 10, left: 110}}>Subject</Text>
                                                            </View>
                                                            <View style = {{
                                                                flex: 1,
                                                                flexShrink: 1,
                                                                justifyContent: 'space-around', 
                                                            }}>
                        
                                                                <Text style = {{
                                                                    color: 'white',
                                                                    fontFamily: 'Poppins-Bold',
                                                                    paddingLeft: 15,
                                                                    paddingRight: 50,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 15,
                                                                    height: 40
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                            <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    paddingLeft: 12,
                                                                    paddingRight: 12,
                                                                    width: 125,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.teacher_name}
                                                                </Text>
                                                                
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                            // borderColor: 'white',
                                                                            // borderWidth: 2,
                                                                    width: 80,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.time} pm
                                                                </Text>
                                                                {
                                                                    <TouchableOpacity 

                                                                        onPress = {() => {
                                                                            let time = item.time;
                                                                            let url = item.demo_link;
                                                                            this.attend();
                                                                        }}
                                                                        style = {{ 
                                                                            // borderWidth: 1, 
                                                                            // borderColor: 'white', 
                                                                            width: 70, 
                                                                            height: 25, 
                                                                            marginRight: 15,
                                                                            marginTop: 5,
                                                                            justifyContent: 'center', 
                                                                            borderRadius: 5,
                                                                            backgroundColor: '#4ACDF4'
                                                                        }}
                                                                    >
                                                                        <Text style = {{
                                                                            textAlign: 'center', 
                                                                            alignItems: 'center',
                                                                            alignSelf: 'center', 
                                                                            fontSize: 12, 
                                                                            fontFamily: 'Poppins-Bold', 
                                                                            color: "white"
                                                                        }}>Attend</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    :
                                        <View>    
                                        </View>
                                }
                                {
                                    this.state.schedules[index][0]["Saturday"] !== undefined ? 
                                        <View>
                                            <Text style = {{marginLeft: 23, marginBottom: 10, fontFamily: "Poppins-Bold", color: "white"}}>
                                                Saturday
                                            </Text>
                                            <FlatList 
                                                showsHorizontalScrollIndicator = {false}
                                                showsVerticalScrollIndicator = {false}
                                                contentContainerStyle = {{marginRight: 20}}
                                                ListHeaderComponent = {<View style = {{width: 20}}></View>}
                                                horizontal = {true}
                                                data  = {this.state.schedules[index][0]["Saturday"]}
                                                renderItem = {({item}) => (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        width: Dimensions.get("window").width - 40,
                                                        height: 100,
                                                        marginRight: 10,
                                                        backgroundColor: '#1C1C1C',
                                                        marginBottom: 20,
                                                        borderRadius: 10
                                                    }}>
                                                        <View>
                                                            <ImageBackground
                                                                style = {{
                                                                    // marginTop: 20,
                                                                    // marginRight: 20,
                                                                    width: 100, 
                                                                    height: 100, 
                                                                    borderRadius: 10,
                                                                    marginBottom: 0,
                                                                    overflow: 'hidden',
                                                                    position: 'relative',
                                                                }}
                                                                source = {require('../images/mathswork.png')}
                                                            >
                                                            </ImageBackground>
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 13, position: 'absolute', top: 10, left: 110}}>Subject</Text>
                                                            </View>
                                                            <View style = {{
                                                                flex: 1,
                                                                flexShrink: 1,
                                                                justifyContent: 'space-around', 
                                                            }}>
                        
                                                                <Text style = {{
                                                                    color: 'white',
                                                                    fontFamily: 'Poppins-Bold',
                                                                    paddingLeft: 15,
                                                                    paddingRight: 50,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 15,
                                                                    height: 40
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                            <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    paddingLeft: 12,
                                                                    paddingRight: 12,
                                                                    width: 125,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.teacher_name}
                                                                </Text>
                                                                
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                            // borderColor: 'white',
                                                                            // borderWidth: 2,
                                                                    width: 80,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.time} pm
                                                                </Text>
                                                                {
                                                                    <TouchableOpacity 

                                                                        onPress = {() => {
                                                                            let time = item.time;
                                                                            let url = item.demo_link;
                                                                            this.attend();
                                                                        }}
                                                                        style = {{ 
                                                                            // borderWidth: 1, 
                                                                            // borderColor: 'white', 
                                                                            width: 70, 
                                                                            height: 25, 
                                                                            marginRight: 15,
                                                                            marginTop: 5,
                                                                            justifyContent: 'center', 
                                                                            borderRadius: 5,
                                                                            backgroundColor: '#4ACDF4'
                                                                        }}
                                                                    >
                                                                        <Text style = {{
                                                                            textAlign: 'center', 
                                                                            alignItems: 'center',
                                                                            alignSelf: 'center', 
                                                                            fontSize: 12, 
                                                                            fontFamily: 'Poppins-Bold', 
                                                                            color: "white"
                                                                        }}>Attend</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    :
                                        <View>    
                                        </View>
                                }
                                {
                                    this.state.schedules[index][0]["Sunday"] !== undefined ? 
                                        <View>
                                            <Text style = {{marginLeft: 23, marginBottom: 10, fontFamily: "Poppins-Bold", color: "white"}}>
                                                Sunday
                                            </Text>
                                            
                                            <FlatList 
                                                showsHorizontalScrollIndicator = {false}
                                                showsVerticalScrollIndicator = {false}
                                                ListHeaderComponent = {<View style = {{width: 20}}></View>}
                                                horizontal = {true}
                                                data  = {this.state.schedules[index][0]["Sunday"]}
                                                renderItem = {({item}) => (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        width: Dimensions.get("window").width - 40,
                                                        height: 100,
                                                        marginRight: 10,
                                                        backgroundColor: '#1C1C1C',
                                                        marginBottom: 20,
                                                        borderRadius: 10
                                                    }}>
                                                        <View>
                                                            <ImageBackground
                                                                style = {{
                                                                    // marginTop: 20,
                                                                    // marginRight: 20,
                                                                    width: 100, 
                                                                    height: 100, 
                                                                    borderRadius: 10,
                                                                    marginBottom: 0,
                                                                    overflow: 'hidden',
                                                                    position: 'relative',
                                                                }}
                                                                source = {require('../images/mathswork.png')}
                                                            >
                                                            </ImageBackground>
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 13, position: 'absolute', top: 10, left: 110}}>Subject</Text>
                                                            </View>
                                                            <View style = {{
                                                                flex: 1,
                                                                flexShrink: 1,
                                                                justifyContent: 'space-around', 
                                                            }}>
                        
                                                                <Text style = {{
                                                                    color: 'white',
                                                                    fontFamily: 'Poppins-Bold',
                                                                    paddingLeft: 15,
                                                                    paddingRight: 50,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 15,
                                                                    height: 40
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                            <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    paddingLeft: 12,
                                                                    paddingRight: 12,
                                                                    width: 125,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.teacher_name}
                                                                </Text>
                                                                
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                            // borderColor: 'white',
                                                                            // borderWidth: 2,
                                                                    width: 80,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.time} pm
                                                                </Text>
                                                                {
                                                                    <TouchableOpacity 

                                                                        onPress = {() => {
                                                                            let time = item.time;
                                                                            let url = item.demo_link;
                                                                            this.attend();
                                                                        }}
                                                                        style = {{ 
                                                                            // borderWidth: 1, 
                                                                            // borderColor: 'white', 
                                                                            width: 70, 
                                                                            height: 25, 
                                                                            marginRight: 15,
                                                                            marginTop: 5,
                                                                            justifyContent: 'center', 
                                                                            borderRadius: 5,
                                                                            backgroundColor: '#4ACDF4'
                                                                        }}
                                                                    >
                                                                        <Text style = {{
                                                                            textAlign: 'center', 
                                                                            alignItems: 'center',
                                                                            alignSelf: 'center', 
                                                                            fontSize: 12, 
                                                                            fontFamily: 'Poppins-Bold', 
                                                                            color: "white"
                                                                        }}>Attend</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    :
                                        <View>    
                                        </View>
                                }
                                
                            </View>
                        )
                    })
                    : <View></View>
                }  
                </View>   
                </View>                   
            </ScrollView>
        ) 
    }

}

export default RealSchedule;