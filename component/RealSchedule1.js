import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions, TouchableOpacity, FlatList, Image, ImageBackground, Alert, Platform, TouchableWithoutFeedback, AsyncStorage, Linking} from 'react-native';
import moment from 'moment';
import ModalDropdown from 'react-native-modal-dropdown';
import {Actions} from 'react-native-router-flux';
import { List } from 'react-native-paper';
import Modal500 from './Modal500';
import Modal404 from './Modal404';
import Fade from 'react-native-fade';


moment().format();

class RealSchedule1 extends Component {

    async componentDidMount() {
        let url = "http://idirect.bloombraineducation.com/idirect/lms/live/class/schedule/courses"; 
        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            if(response.ok) {
                response.json().then((responseJson) => {
                    this.setState({showLoader: false})
                    this.setState({courses: responseJson["courses"]});
                    this.setState({course: responseJson["courses"][0]})
                    console.log(responseJson["courses"][0]);
                    console.log(responseJson)
                    AsyncStorage.getItem('class')
                    .then((value) => {
                        let url = "http://idirect.bloombraineducation.com/idirect/lms/live/class/schedule?class="+value+"&course="+this.state.course;
                        console.log(url);
                        fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        })
                        .then((response) => {
                            if(response.ok) {
                                response.json().then((responseJson) => {
                                    this.setState({showLoader: false})
                                    this.setState({schedules: responseJson[this.state.course]})
                                    console.log(this.state.schedules)
                                })
                            } else {
                                if(response.status == 500) {
                                    this.setState({showLoader: false})
                                    this.setState({status: 500});
                                    console.log("500");
                                }
                                if(response.status == 404) {
                                    this.setState({showLoader: false})
                                    this.setState({status: 404});
                                    console.log("404");
                                }
                            }
                        })
                        .catch((error) => {
                            this.setState({login: false})
                            console.error(error);
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    })

                })
            } else {
                if(response.status == 500) {
                    this.setState({showLoader: false})
                    this.setState({status: 500});
                    console.log("500");
                }
                if(response.status == 404) {
                    this.setState({showLoader: false})
                    this.setState({status: 404});
                    console.log("404");
                }
            }
        })
    }

    attend = () => {
        Actions.pop();
        Actions.Payment();
    }


    state = {
        visible: true,
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
        status: 200,
        showLoader: true,
        courses : undefined,
        class: 1,
        course: undefined,
        chosen: true,
        showModal: false,
        errorString: "",
        schedules: null,
        number: 0,
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
            .then((response) => {
                if(response.ok){
                    response.json().then((responseJson) => {
                        this.setState({showLoader: false})
                        this.setState({schedules: responseJson[this.state.courses[this.state.course]]})
                    })
                } else {
                    if(response.status == 500) {
                        this.setState({showLoader: false})
                        this.setState({status: 500});
                        console.log("500");
                    }
                    if(response.status == 404) {
                        this.setState({showLoader: false})
                        this.setState({status: 404});
                        console.log("404");
                    }
                }
            })
            
            .catch((error) => {
                // this.setState({login: false})
                console.error(error);
        });
    }

    render() {
        return (
            <ScrollView 
                style = {{paddingTop: 20, backgroundColor: '#0F0F0F', height: Platform.OS == 'ios' ? '100%' : '100%'}}
                showsHorizontalScrollIndicator = {false}
                showsVerticalScrollIndicator = {false}
            >
                <View style = {{marginTop: 20, marginBottom: 40 }}>
                <View style = {{marginTop: -20}}>
                    <View 
                        style = {{
                            flexDirection: "row", 
                            justifyContent: "space-around", 
                            marginBottom: 10,
                            }}
                        >
                        <View 
                            style = {{
                                flexDirection: "row", 
                                alignItems: "center",
                                // borderWidth: 2,
                                // borderColor: "white"
                            }}
                        >
                            <Text 
                                style = {{
                                    marginLeft: 18,
                                    fontFamily: "Poppins-ExtraBold",
                                    fontSize: 14,
                                    color: "#4ACDFF"
                                }}
                            >
                                Course:  </Text>
                            {   
                                this.state.courses != undefined ?
                                <ModalDropdown 

                                style = {{
                                    justifyContent: "center",
                                    maxWidth: 100,
                                    overflow: "hidden"
                                }}
                                textStyle = {{
                                    color: 'white',
                                    fontFamily: 'Poppins-ExtraBold',
                                    fontSize: 14
                                }}
                                
                                showsVerticalScrollIndicator
                                options={this.state.courses}
                                dropdownStyle = {{
                                    width: Dimensions.get("screen").width - 30,
                                    backgroundColor: "#1A1A1A",
                                    borderWidth: 0,
                                    borderRadius: 10,
                                    marginLeft: Platform.OS == "android" ? -Dimensions.get("screen").width/5 : -Dimensions.get("screen").width/5.5,
                                    opacity: 1,
                                    overflow: "hidden"
                                }}
                                dropdownTextStyle = {{
                                    color: "white",
                                    fontSize: Platform.OS == "android" ? 12 : 14,
                                    fontFamily: "Poppins-SemiBold",
                                    backgroundColor: "#1A1A1A",
                                    borderWidth: 0,
                                    textAlign: "center"
                                }}
                                onDropdownWillShow = {() => {this.setState({visible: false})}}
                                onDropdownWillHide = {() => {this.setState({visible: true})}}
                                dropdownTextHighlightStyle = {{
                                    color: "#4ACDF4",
                                    fontSize: Platform.OS == "android" ? 12 : 14,
                                    fontFamily: "Poppins-Bold",
                                    backgroundColor: "#1A1A1A",
                                    borderWidth: 0,
                                }}
                                defaultValue = {this.state.course}
                                renderSeparator = {() => {return <View></View>}}
                                onSelect = {(index, value) => {
                                    this.setState({showLoader: true})
                                    this.setState({
                                        course: value
                                    })
                                    let url = "http://idirect.bloombraineducation.com/idirect/lms/live/class/schedule?class="+this.state.class+"&course="+value;
                                    console.log(url);
                                    fetch(url, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                        },
                                        })
                                        .then((response) => {
                                            if(response.ok) {
                                            response.json().then((responseJson) => {
                                                this.setState({showLoader: false})
                                                this.setState({schedules: responseJson[value]})
                                                this.setState({showModal:false})
                                            })
                                            } else {
                                                if(response.status == 500) {
                                                    console.log("500");
                                                }
                                                if(response.status == 404) {
                                                    console.log("404");
                                                }
                                            }
                                        })
                                        
                                        .catch((error) => {
                                            // this.setState({login: false})
                                            console.error(error);
                                    });
                                } }
                                />
                                : null
                            }
                            <Image 
                                style = {{width: 15, height: 15, marginLeft: 5}}
                                source = {require("../images/icon.png")}
                            />
                        </View>
                        <View 
                            style = {{
                                flexDirection: "row", 
                                justifyContent: "center", 
                                alignItems: 'center',
                                // borderWidth: 2,
                                // borderColor: "white"
                            }}
                        >
                        <Text style = {{
                            color: "#4ACDF4",
                            fontFamily: "Poppins-Bold"
                        }}>
                            Class :  </Text>
                            <ModalDropdown 
                              
                                textStyle = {{
                                    color: 'white',
                                    fontFamily: 'Poppins-SemiBold',
                                    fontSize: 14
                                }}
                                defaultValue = {
                                    this.state.class == 1 
                                    ? '1st' : this.state.class == 2 ? '2nd' : 
                                    this.state.class == 3 ? '3rd' : this.state.class == 4 ? '4th' : 
                                    this.state.class == 5 ? '5th' : this.state.class == 6 ? '6th' :
                                    this.state.class == 7 ? '7th' : this.state.class == 8 ? '8th' : 
                                    this.state.class == 9 ? '9th' : this.state.class == 10 ? '10th' : 
                                    this.state.class == 11 ? '11th' : '12th' 
                                }
                                options={['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']}
                                dropdownStyle = {{
                                    width: 60,
                                    height: 170,
                                    backgroundColor: "#1A1A1A",
                                    borderWidth: 0,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    overflow: "hidden",
                                    marginBottom: 0,
                                }}
                                onDropdownWillShow = {() => {this.setState({visible: false})}}
                                onDropdownWillHide = {() => {this.setState({visible: true})}}
                                dropdownTextStyle = {{
                                    color: "white",
                                    fontSize: Platform.OS == "android" ? 12 : 14,
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
                                    this.setState({showLoader: true})
                                    let url = "http://idirect.bloombraineducation.com/idirect/lms/live/class/schedule?class="+(parseInt(index)+1)+"&course="+this.state.course;
                                    console.log(url);
                                    fetch(url, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                        },
                                        })
                                        .then((response) => {
                                            if(response.ok) {
                                                response.json().then((responseJson) => {
                                                    this.setState({showLoader: false})
                                                    this.setState({schedules: responseJson[this.state.course]})
                                                    this.setState({showModal:false})
                                                })
                                            } else {
                                                if(response.status == 500) {
                                                    console.log("500");
                                                }
                                                if(response.status == 404) {
                                                    console.log("404");
                                                }
                                            }
                                        
                                        })
                                        .catch((error) => {
                                            // this.setState({login: false})
                                            console.error(error);
                                    });
                                    this.setState({class: parseInt(index) + 1})
                                }}
                            />
                            <Image 
                                style = {{width: 12, height: 12, marginLeft: 5, marginRight: 20}}
                                source = {require("../images/icon.png")}
                            />
                        </View>
                    </View>
                    
                {
                    this.state.showLoader ? 
                    (
                        <View
                            style = {{
                                height: '95%',
                                alignItems: "center",
                                justifyContent: "center",

                            }}
                        >
                            <Image 
                                style = {{
                                    marginTop: 200,
                                    width  : 60,
                                    height : 60,
                                    
                                }}
                                source = {require("../images/loader.gif")}
                            />
                        </View>
                    )
                    :
                    !this.state.showLoader && this.state.status == 500 ?
                    (
                        <View
                            style = {{
                                marginTop: -100,
                            }}
                        >
                            <Modal500 />
                        </View>
                    ) : 
                    !this.state.showLoader && this.state.status == 404 ? 
                    (
                        <View
                            style = {{
                                marginTop: -100,
                            }}
                        >
                            <Modal404 />
                        </View>
                    ):
                    this.state.schedules ? this.state.schedules.map((value, index) => {
                        let title = "Batch " + (index+1).toString();
                        return (
                            <Fade visible={this.state.visible} direction="up">
                            <View>
                                <List.Accordion
                                    title = {title}
                                    style = {{
                                        backgroundColor: "#161616",
                                        borderRadius: 7,
                                        marginBottom: 10
                                    }}
                                    left = {props => 
                                        <View style = {{
                                            position: 'absolute',
                                            zIndex: 10,
                                            left: Platform.OS == "android" ? Dimensions.get("screen").width/1.9 : Dimensions.get("screen").width/1.8,
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            alignContent: "center",
                                            alignSelf: 'center',
                                            width: 250,
                                        }}>
                                            <Text
                                                style = {{
                                                    fontFamily: "Poppins-Bold",
                                                    color: "white",
                                                    fontSize: 10,
                                                    backgroundColor: "#161616",
                                                    // textAlignVertical: "center"
                                                }}    
                                            >
                                                Click to View Schedule
                                            </Text>
                                            <View 
                                                style = {{
                                                    width: 50, 
                                                    height: 20,
                                                    backgroundColor: "#161616"
                                                }}
                                            >
                                                <Image 
                                                    style = {{
                                                        marginLeft: 10,
                                                        width: 15, 
                                                        height: 15,
                                                        tintColor: "white"
                                                    }}
                                                    source = {require("../images/icon.png")}
                                                />
                                            </View>
                                        </View>
                                    }
                                    titleStyle = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontWeight: '800',
                                        fontSize: 20,
                                        marginLeft: 10,
                                        marginBottom: 5,
                                        marginTop: 10,
                                        color: "#4ACDF4"
                                    }}
                                    
                                >                               
                                <View style = {{
                                    marginLeft: -60,
                                }}>
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
                                                renderItem = {({item}) =>
                                                {
                                                    let base64Icon = `data:image/png;base64,${item.thumbnail_url}`;
                                                    let time = item.time;
                                                    time = time.toString();
                                                    let timeh = time.split(".")[0];
                                                    let timem = time.split(".")[1];
                                                    if(timem == undefined) {
                                                        timem = "00";
                                                    } else {
                                                        timem = "0."+timem;
                                                        console.log(timem);
                                                        timem = timem*60; 
                                                        timem = Math.round(timem);
                                                        timem = timem.toString();
                                                    }
                                                   
                                                    return (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        width: Dimensions.get("window").width - 40,
                                                        height: 100,
                                                        marginRight: 10,
                                                        backgroundColor: '#1C1C1C',
                                                        marginBottom: 20,
                                                        borderRadius: 10,
                                                        overflow: "hidden",
                                                    }}>
                                                        <View>
                                                            {
                                                                item.thumbnail_url != false ?
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 160, 
                                                                        height: 100, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                        resizeMode: "stretch"
                                                                    }}
                                                                    source = {{uri: item.thumbnail_url}}
                                                                >
                                                                </Image>
                                                                :
                                                                
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 160, 
                                                                        height: 100, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                        resizeMode: "stretch"

                                                                    }}
                                                                    source = {require("../images/mathswork.png")}
                                                                >
                                                                </Image>
                                                            }
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: Platform.OS == "android" ? 10.5 : 12, position: 'absolute', top: 10, left: 170}}>Subject</Text>
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
                                                                    paddingRight: 20,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: Platform.OS == "android" ? 11.5 : 13,
                                                                    height: 40
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                            <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    marginLeft: 12,
                                                                    maxWidth: 60,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: Platform.OS == "android" ? 8 : 10,
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
                                                                    width: 50,
                                                                    flexShrink: 1,
                                                                    textAlign: "center",
                                                                    fontSize: Platform.OS == "android" ? 8 : 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {timeh + ":" + timem} pm
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
                                                                            width: 50, 
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
                                                                            fontSize: Platform.OS == "android" ? 10 : 11,  
                                                                            fontFamily: 'Poppins-Bold', 
                                                                            color: "white"
                                                                        }}>Attend</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                                }
                                            />
                                        </View>
                                    :
                                        <View>    
                                        </View>
                                }
                                {
                                    this.state.schedules[index][0]["Tuesday"] !== undefined ? 
                                        <View>
                                            <View style = {{flexDirection: "row"}}>
                                            <Text style = {{marginLeft: 23, marginBottom: 10, fontFamily: "Poppins-Bold", color: "white"}}>
                                                Tuesday
                                            </Text>
                                            
                                            </View>
                                            <View>
                                            <FlatList 
                                                showsHorizontalScrollIndicator = {false}
                                                showsVerticalScrollIndicator = {false}
                                                contentContainerStyle = {{marginRight: 20}}
                                                ListHeaderComponent = {<View style = {{width: 20}}></View>}
                                                horizontal = {true}
                                                data  = {this.state.schedules[index][0]["Tuesday"]}
                                                renderItem = {({item}) =>
                                                {
                                                    let base64Icon = `data:image/png;base64,${item.thumbnail_url}`;
                                                    let time = item.time;
                                                    time = time.toString();
                                                    let timeh = time.split(".")[0];
                                                    let timem = time.split(".")[1];
                                                    if(timem == undefined) {
                                                        timem = "00";
                                                    } else {
                                                        timem = "0."+timem;
                                                        console.log(timem);
                                                        timem = timem*60; 
                                                        timem = Math.round(timem);
                                                        timem = timem.toString();
                                                    }
                                                    return (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        width: Dimensions.get("window").width - 40,
                                                        height: 100,
                                                        marginRight: 10,
                                                        backgroundColor: '#1C1C1C',
                                                        marginBottom: 20,
                                                        borderRadius: 10,
                                                        overflow: "hidden"
                                                    }}>
                                                        <View>
                                                        {
                                                                item.thumbnail_url != false ?
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 160, 
                                                                        height: 100, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                        resizeMode: "stretch"
                                                                    }}
                                                                    source = {{uri: item.thumbnail_url}}
                                                                >
                                                                </Image>
                                                                :
                                                                
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 160, 
                                                                        height: 100, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                        resizeMode: "stretch"

                                                                    }}
                                                                    source = {require("../images/mathswork.png")}
                                                                >
                                                                </Image>
                                                            }
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: Platform.OS == "android" ? 10.5 : 12, position: 'absolute', top: 10, left: 170}}>Subject</Text>
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
                                                                    paddingRight: 20,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: Platform.OS == "android" ? 11.5 : 13,
                                                                    height: 40
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                            <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    marginLeft: 12,
                                                                    maxWidth: 60,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: Platform.OS == "android" ? 8 : 10,
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
                                                                    width: 50,
                                                                    flexShrink: 1,
                                                                    textAlign: "center",
                                                                    fontSize: Platform.OS == "android" ? 8 : 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {timeh + ":" + timem} pm
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
                                                                            width: 50, 
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
                                                                            fontSize: Platform.OS == "android" ? 10 : 11,  
                                                                            fontFamily: 'Poppins-Bold', 
                                                                            color: "white"
                                                                        }}>Attend</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                                }
                                            />
                                            </View>
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
                                                renderItem = {({item}) =>
                                                {
                                                    let base64Icon = `data:image/png;base64,${item.thumbnail_url}`;
                                                    let time = item.time;
                                                    time = time.toString();
                                                    let timeh = time.split(".")[0];
                                                    let timem = time.split(".")[1];
                                                    if(timem == undefined) {
                                                        timem = "00";
                                                    } else {
                                                        timem = "0."+timem;
                                                        console.log(timem);
                                                        timem = timem*60; 
                                                        timem = Math.round(timem);
                                                        timem = timem.toString();
                                                    }
                                                    return (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        width: Dimensions.get("window").width - 40,
                                                        height: 100,
                                                        marginRight: 10,
                                                        backgroundColor: '#1C1C1C',
                                                        marginBottom: 20,
                                                        borderRadius: 10,
                                                        overflow: "hidden"
                                                    }}>
                                                        <View>
                                                        {
                                                                item.thumbnail_url != false ?
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 160, 
                                                                        height: 100, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                        resizeMode: "stretch"
                                                                    }}
                                                                    source = {{uri: item.thumbnail_url}}
                                                                >
                                                                </Image>
                                                                :
                                                                
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 160, 
                                                                        height: 100, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                        resizeMode: "stretch"

                                                                    }}
                                                                    source = {require("../images/mathswork.png")}
                                                                >
                                                                </Image>
                                                            }
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: Platform.OS == "android" ? 10.5 : 12, position: 'absolute', top: 10, left: 170}}>Subject</Text>
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
                                                                    paddingRight: 20,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: Platform.OS == "android" ? 11.5 : 13,
                                                                    height: 40
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                            <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    marginLeft: 12,
                                                                    maxWidth: 60,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: Platform.OS == "android" ? 8 : 10,
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
                                                                    width: 50,
                                                                    flexShrink: 1,
                                                                    textAlign: "center",
                                                                    fontSize: Platform.OS == "android" ? 8 : 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {timeh + ":" + timem} pm
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
                                                                            width: 50, 
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
                                                                            fontSize: Platform.OS == "android" ? 10 : 11,  
                                                                            fontFamily: 'Poppins-Bold', 
                                                                            color: "white"
                                                                        }}>Attend</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                                }
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
                                                renderItem = {({item}) =>
                                                {
                                                    let base64Icon = `data:image/png;base64,${item.thumbnail_url}`;
                                                    let time = item.time;
                                                    time = time.toString();
                                                    let timeh = time.split(".")[0];
                                                    let timem = time.split(".")[1];
                                                    if(timem == undefined) {
                                                        timem = "00";
                                                    } else {
                                                        timem = "0."+timem;
                                                        console.log(timem);
                                                        timem = timem*60; 
                                                        timem = Math.round(timem);
                                                        timem = timem.toString();
                                                    }
                                                    return (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        width: Dimensions.get("window").width - 40,
                                                        height: 100,
                                                        marginRight: 10,
                                                        backgroundColor: '#1C1C1C',
                                                        marginBottom: 20,
                                                        borderRadius: 10,
                                                        overflow: "hidden"
                                                    }}>
                                                        <View>
                                                        {
                                                                item.thumbnail_url != false ?
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 160, 
                                                                        height: 100, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                        resizeMode: "stretch"
                                                                    }}
                                                                    source = {{uri: item.thumbnail_url}}
                                                                >
                                                                </Image>
                                                                :
                                                                
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 160, 
                                                                        height: 100, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                        resizeMode: "stretch"

                                                                    }}
                                                                    source = {require("../images/mathswork.png")}
                                                                >
                                                                </Image>
                                                            }
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: Platform.OS == "android" ? 10.5 : 12, position: 'absolute', top: 10, left: 170}}>Subject</Text>
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
                                                                    paddingRight: 20,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: Platform.OS == "android" ? 11.5 : 13,
                                                                    height: 40
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                            <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    marginLeft: 12,
                                                                    maxWidth: 60,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: Platform.OS == "android" ? 8 : 10,
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
                                                                    width: 50,
                                                                    flexShrink: 1,
                                                                    textAlign: "center",
                                                                    fontSize: Platform.OS == "android" ? 8 : 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {timeh + ":" + timem} pm
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
                                                                            width: 50, 
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
                                                                            fontSize: Platform.OS == "android" ? 10 : 11,  
                                                                            fontFamily: 'Poppins-Bold', 
                                                                            color: "white"
                                                                        }}>Attend</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                                }
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
                                                renderItem = {({item}) =>
                                                {
                                                    let base64Icon = `data:image/png;base64,${item.thumbnail_url}`;
                                                    let time = item.time;
                                                    time = time.toString();
                                                    let timeh = time.split(".")[0];
                                                    let timem = time.split(".")[1];
                                                    if(timem == undefined) {
                                                        timem = "00";
                                                    } else {
                                                        timem = "0."+timem;
                                                        console.log(timem);
                                                        timem = timem*60; 
                                                        timem = Math.round(timem);
                                                        timem = timem.toString();
                                                    }
                                                    return (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        width: Dimensions.get("window").width - 40,
                                                        height: 100,
                                                        marginRight: 10,
                                                        backgroundColor: '#1C1C1C',
                                                        marginBottom: 20,
                                                        borderRadius: 10,
                                                        overflow: "hidden"
                                                    }}>
                                                        <View>
                                                        {
                                                                item.thumbnail_url != false ?
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 160, 
                                                                        height: 100, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                        resizeMode: "stretch"
                                                                    }}
                                                                    source = {{uri: item.thumbnail_url}}
                                                                >
                                                                </Image>
                                                                :
                                                                
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 160, 
                                                                        height: 100, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                        resizeMode: "stretch"

                                                                    }}
                                                                    source = {require("../images/mathswork.png")}
                                                                >
                                                                </Image>
                                                            }
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: Platform.OS == "android" ? 10.5 : 12, position: 'absolute', top: 10, left: 170}}>Subject</Text>
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
                                                                    paddingRight: 20,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: Platform.OS == "android" ? 11.5 : 13,
                                                                    height: 40
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                            <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    marginLeft: 12,
                                                                    maxWidth: 60,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: Platform.OS == "android" ? 8 : 10,
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
                                                                    width: 50,
                                                                    flexShrink: 1,
                                                                    textAlign: "center",
                                                                    fontSize: Platform.OS == "android" ? 8 : 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {timeh + ":" + timem} pm
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
                                                                            width: 50, 
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
                                                                            fontSize: Platform.OS == "android" ? 10 : 11,  
                                                                            fontFamily: 'Poppins-Bold', 
                                                                            color: "white"
                                                                        }}>Attend</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                                }
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
                                                renderItem = {({item}) =>
                                                {
                                                    let base64Icon = `data:image/png;base64,${item.thumbnail_url}`;
                                                    let time = item.time;
                                                    time = time.toString();
                                                    let timeh = time.split(".")[0];
                                                    let timem = time.split(".")[1];
                                                    if(timem == undefined) {
                                                        timem = "00";
                                                    } else {
                                                        timem = "0."+timem;
                                                        console.log(timem);
                                                        timem = timem*60; 
                                                        timem = Math.round(timem);
                                                        timem = timem.toString();
                                                    }
                                                    return (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        width: Dimensions.get("window").width - 40,
                                                        height: 100,
                                                        marginRight: 10,
                                                        backgroundColor: '#1C1C1C',
                                                        marginBottom: 20,
                                                        borderRadius: 10,
                                                        overflow: "hidden"
                                                    }}>
                                                        <View>
                                                        {
                                                                item.thumbnail_url != false ?
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 160, 
                                                                        height: 100, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                        resizeMode: "stretch"
                                                                    }}
                                                                    source = {{uri: item.thumbnail_url}}
                                                                >
                                                                </Image>
                                                                :
                                                                
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 160, 
                                                                        height: 100, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                        resizeMode: "stretch"

                                                                    }}
                                                                    source = {require("../images/mathswork.png")}
                                                                >
                                                                </Image>
                                                            }
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: Platform.OS == "android" ? 10.5 : 12, position: 'absolute', top: 10, left: 170}}>Subject</Text>
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
                                                                    paddingRight: 20,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: Platform.OS == "android" ? 11.5 : 13,
                                                                    height: 40
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                            <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    marginLeft: 12,
                                                                    maxWidth: 60,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: Platform.OS == "android" ? 8 : 10,
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
                                                                    width: 50,
                                                                    flexShrink: 1,
                                                                    textAlign: "center",
                                                                    fontSize: Platform.OS == "android" ? 8 : 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {timeh + ":" + timem} pm
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
                                                                            width: 50, 
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
                                                                            fontSize: Platform.OS == "android" ? 10 : 11,  
                                                                            fontFamily: 'Poppins-Bold', 
                                                                            color: "white"
                                                                        }}>Attend</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                                }
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
                                                contentContainerStyle = {{marginRight: 20}}
                                                ListHeaderComponent = {<View style = {{width: 20}}></View>}
                                                horizontal = {true}
                                                data  = {this.state.schedules[index][0]["Sunday"]}
                                                renderItem = {({item}) =>
                                                {
                                                    let base64Icon = `data:image/png;base64,${item.thumbnail_url}`;
                                                    let time = item.time;
                                                    time = time.toString();
                                                    let timeh = time.split(".")[0];
                                                    let timem = time.split(".")[1];
                                                    if(timem == undefined) {
                                                        timem = "00";
                                                    } else {
                                                        timem = "0."+timem;
                                                        console.log(timem);
                                                        timem = timem*60; 
                                                        timem = Math.round(timem);
                                                        timem = timem.toString();
                                                    }
                                                    return (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        width: Dimensions.get("window").width - 40,
                                                        height: 100,
                                                        marginRight: 10,
                                                        backgroundColor: '#1C1C1C',
                                                        marginBottom: 20,
                                                        borderRadius: 10,
                                                        overflow: "hidden"
                                                    }}>
                                                        <View>
                                                        {
                                                                item.thumbnail_url != false ?
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 160, 
                                                                        height: 100, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                        resizeMode: "stretch"
                                                                    }}
                                                                    source = {{uri: item.thumbnail_url}}
                                                                >
                                                                </Image>
                                                                :
                                                                
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 160, 
                                                                        height: 100, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                        resizeMode: "stretch"

                                                                    }}
                                                                    source = {require("../images/mathswork.png")}
                                                                >
                                                                </Image>
                                                            }
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: Platform.OS == "android" ? 10.5 : 12, position: 'absolute', top: 10, left: 170}}>Subject</Text>
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
                                                                    paddingRight: 20,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: Platform.OS == "android" ? 11.5 : 13,
                                                                    height: 40
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                            <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    marginLeft: 12,
                                                                    maxWidth: 60,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: Platform.OS == "android" ? 8 : 10,
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
                                                                    width: 50,
                                                                    flexShrink: 1,
                                                                    textAlign: "center",
                                                                    fontSize: Platform.OS == "android" ? 8 : 10,
                                                                    marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {timeh + ":" + timem} pm
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
                                                                            width: 50, 
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
                                                                            fontSize: Platform.OS == "android" ? 10 : 11,  
                                                                            fontFamily: 'Poppins-Bold', 
                                                                            color: "white"
                                                                        }}>Attend</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )}
                                                }
                                            />
                                        </View>
                                    :
                                        <View>    
                                        </View>
                                }
                                </View>
                                </List.Accordion>
                            </View>
                            </Fade>
                        )
                    })
                    : <View></View>
                }  
                </View>   
                </View>  
                <View 
                    style = {{
                        height: Platform.OS == "android" ? 110 : 60
                    }}
                >
                </View>                 
            </ScrollView>
        ) 
    }

}

export default RealSchedule1;