import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions, TouchableOpacity, FlatList, Image, ImageBackground, Alert, Platform, TouchableWithoutFeedback, AsyncStorage, Linking} from 'react-native';
import moment from 'moment';
import ModalDropdown from 'react-native-modal-dropdown';
import {Actions} from 'react-native-router-flux';
import { DefaultTheme, List } from 'react-native-paper';


moment().format();

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
};

class RealSchedule extends Component {

    async componentDidMount() {
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
            .then((response) => {
                if(response.ok) {
                    response.json().then((responseJson) => {
                        this.setState({showLoader: false})
                        this.setState({schedules: responseJson[this.state.courses[this.state.course]]})
                        console.log(this.state.schedules)
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
        showLoader: true,
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
    }

    render() {
        return (
            <ScrollView 
                style = {{paddingTop: 20, backgroundColor: '#0F0F0F', height: Platform.OS == 'ios' ? '84%' : '84%'}}
                showsHorizontalScrollIndicator = {false}
                showsVerticalScrollIndicator = {false}
            >
                <View style = {{marginTop: 20, marginBottom: 40 }}>
                <View style = {{marginTop: -20}}>
                    <View style = {{flexDirection: "row", justifyContent: "space-between", marginBottom: 10}}>
                        <View style = {{flexDirection: "row", alignItems: "center"}}>
                            <Text 
                                style = {{
                                    marginLeft: 18,
                                    fontFamily: "Poppins-ExtraBold",
                                    fontSize: 18,
                                    color: "#4ACDFF"
                                }}
                            >
                                Course:  </Text>
                            <ModalDropdown 
                            style = {{
                                justifyContent: "center",

                                maxWidth: 140,
                            }}
                            textStyle = {{
                                color: 'white',
                                fontFamily: 'Poppins-ExtraBold',
                                fontSize: 16
                            }}
                            defaultValue = {"All Subjects"}
                            options={['All Subjects', 'Spoken English Program', 'Coding 1:5', 'Coding 1:1']}
                            dropdownStyle = {{
                                width: 200,
                                backgroundColor: "#1A1A1A",
                                borderWidth: 0,
                                borderRadius: 10,
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
                                this.setState({showLoader: true})
                                let url = "http://idirect.bloombraineducation.com/idirect/lms/live/class/schedule?class="+this.state.class+"&course="+this.state.courses[value];
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
                                            this.setState({schedules: responseJson[this.state.courses[this.state.course]]})
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
                                this.setState({
                                    course: value
                                })
                            } }
                            />
                        
                            <Image 
                                style = {{width: 15, height: 15, marginLeft: 5}}
                                source = {require("../images/icon.png")}
                            />
                        </View>
                        <View style = {{flexDirection: "row", justifyContent: "center", alignItems: 'center'}}>
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
                                options={['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th']}
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
                                    this.setState({showLoader: true})
                                    let url = "http://idirect.bloombraineducation.com/idirect/lms/live/class/schedule?class="+(parseInt(index)+1)+"&course="+this.state.courses[this.state.course];
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
                                                    this.setState({schedules: responseJson[this.state.courses[this.state.course]]})
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
                    this.state.schedules ? this.state.schedules.map((value, index) => {
                        let title = "Batch " + (index+1).toString();
                        return (
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
                                            left: 220,
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
                                                    timem = "0."+timem;
                                                    console.log(timem);
                                                    timem = timem*60;
                                                    timem = Math.round(timem);
                                                    timem = timem.toString();
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
                                                        borderRadius: 10
                                                    }}>
                                                        <View>
                                                            {
                                                                item.thumbnail_url != false ?
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 140, 
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
                                                                        width: 140, 
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
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 13, position: 'absolute', top: 10, left: 150}}>Subject</Text>
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
                                                                    marginLeft: 12,
                                                                    maxWidth: 125,
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
                                                                    maxWidth: 60,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
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
                                                                            width: 60, 
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
                                                    timem = "0."+timem;
                                                    console.log(timem);
                                                    timem = timem*60;
                                                    timem = Math.round(timem);
                                                    timem = timem.toString();
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
                                                        borderRadius: 10
                                                    }}>
                                                        <View>
                                                            {
                                                                item.thumbnail_url != false ?
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 140, 
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
                                                                        width: 140, 
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
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 13, position: 'absolute', top: 10, left: 150}}>Subject</Text>
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
                                                                    marginLeft: 12,
                                                                    maxWidth: 125,
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
                                                                    maxWidth: 60,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
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
                                                                            width: 60, 
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
                                                    timem = "0."+timem;
                                                    console.log(timem);
                                                    timem = timem*60;
                                                    timem = Math.round(timem);
                                                    timem = timem.toString();
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
                                                        borderRadius: 10
                                                    }}>
                                                        <View>
                                                            {
                                                                item.thumbnail_url != false ?
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 140, 
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
                                                                        width: 140, 
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
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 13, position: 'absolute', top: 10, left: 150}}>Subject</Text>
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
                                                                    marginLeft: 12,
                                                                    maxWidth: 125,
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
                                                                    maxWidth: 60,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
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
                                                                            width: 60, 
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
                                                    timem = "0."+timem;
                                                    console.log(timem);
                                                    timem = timem*60;
                                                    timem = Math.round(timem);
                                                    timem = timem.toString();
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
                                                        borderRadius: 10
                                                    }}>
                                                        <View>
                                                            {
                                                                item.thumbnail_url != false ?
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 140, 
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
                                                                        width: 140, 
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
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 13, position: 'absolute', top: 10, left: 150}}>Subject</Text>
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
                                                                    marginLeft: 12,
                                                                    maxWidth: 125,
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
                                                                    maxWidth: 60,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
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
                                                                            width: 60, 
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
                                                    timem = "0."+timem;
                                                    console.log(timem);
                                                    timem = timem*60;
                                                    timem = Math.round(timem);
                                                    timem = timem.toString();
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
                                                        borderRadius: 10
                                                    }}>
                                                        <View>
                                                            {
                                                                item.thumbnail_url != false ?
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 140, 
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
                                                                        width: 140, 
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
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 13, position: 'absolute', top: 10, left: 150}}>Subject</Text>
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
                                                                    marginLeft: 12,
                                                                    maxWidth: 125,
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
                                                                    maxWidth: 60,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
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
                                                                            width: 60, 
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
                                                    timem = "0."+timem;
                                                    console.log(timem);
                                                    timem = timem*60;
                                                    timem = Math.round(timem);
                                                    timem = timem.toString();
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
                                                        borderRadius: 10
                                                    }}>
                                                        <View>
                                                            {
                                                                item.thumbnail_url != false ?
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 140, 
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
                                                                        width: 140, 
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
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 13, position: 'absolute', top: 10, left: 150}}>Subject</Text>
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
                                                                    marginLeft: 12,
                                                                    maxWidth: 125,
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
                                                                    maxWidth: 60,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
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
                                                                            width: 60, 
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
                                                    timem = "0."+timem;
                                                    console.log(timem);
                                                    timem = timem*60;
                                                    timem = Math.round(timem);
                                                    timem = timem.toString();
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
                                                        borderRadius: 10
                                                    }}>
                                                        <View>
                                                            {
                                                                item.thumbnail_url != false ?
                                                                <Image
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 140, 
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
                                                                        width: 140, 
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
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 13, position: 'absolute', top: 10, left: 150}}>Subject</Text>
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
                                                                    marginLeft: 12,
                                                                    maxWidth: 125,
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
                                                                    maxWidth: 60,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
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
                                                                            width: 60, 
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
                        )
                    })
                    : <View></View>
                }  
                </View>   
                </View>  
                <View 
                    style = {{
                        height: 20
                    }}
                >
                </View>                 
            </ScrollView>
        ) 
    }

}

export default RealSchedule;