import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions, TouchableOpacity, FlatList, Image, ImageBackground, Alert, Platform, AsyncStorage, Linking} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modal';
import moment from 'moment';
import Modal404 from './Modal404';
import Modal500 from './Modal500';
moment().format();

class DemoVideos extends Component {

    async componentDidMount() {
        var today = new Date();
        var tomorrow = new Date();
        var dayAfterTomorrow = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        tomorrow.setDate(today.getDate() + 1);
        dayAfterTomorrow.setDate(today.getDate() + 2);
        var ddy = String(tomorrow.getDate()).padStart(2, '0');
        var mmy = String(tomorrow.getMonth() + 1).padStart(2, '0');
        var yyyyy = tomorrow.getFullYear();

        var ddby = String(dayAfterTomorrow.getDate()).padStart(2, '0');
        var mmby = String(dayAfterTomorrow.getMonth() + 1).padStart(2, '0');
        var yyyyby = dayAfterTomorrow.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        tomorrow = yyyyy + "-" + mmy + "-" + ddy;
        dayAfterTomorrow = yyyyby + "-" + mmby + "-" + ddby;
        console.log(today);
        console.log(tomorrow);
        console.log(dayAfterTomorrow);

        let dateArray = [...this.state.dateArray];
        dateArray.push(today);
        dateArray.push(tomorrow);
        dateArray.push(dayAfterTomorrow);
        // dateArray.push(today);
        // console.log(dateArray);
        today = today.split("-").reverse().join("-");
        dayAfterTomorrow = dayAfterTomorrow.split("-").reverse().join("-");
        this.setState({dateArray});
        this.setState({today: today});
        this.setState({tomorrow: tomorrow});
        this.setState({dayAfterTomorrow: dayAfterTomorrow});

        AsyncStorage.getItem('id')
        .then((value) => {
            let url = "http://idirect.bloombraineducation.com/idirect/lms/demo?start_date=" +this.state.today+ "&end_date=" +this.state.dayAfterTomorrow+ "&id="+value;
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
                            this.setState({showLoader: false});
                            this.setState({classes: responseJson})
                            today = today.split("-").reverse().join("-");
                            dayAfterTomorrow = dayAfterTomorrow.split("-").reverse().join("-");
                            this.setState({today: today});
                            this.setState({dayAfterTomorrow: dayAfterTomorrow});
                        })
                    } else {
                        if(response.status == 404) {
                            this.setState({showLoader: false})
                            this.setState({status: 404});
                            console.log("404");
                        }
                        if(response.status == 500) {
                            this.setState({showLoader: false})
                            this.setState({status: 500});
                            console.log("500");
                        }
                    }
                })
                .catch((error) => {
                    this.setState({login: false})
            });
        })
    
        
    }

    getDaysArray = (start, end) => {
        for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt));
        }
        console.log("array" + arr);
        return arr;
    };
    
    onClickConfirm = () => {

        let dateArray = [...this.state.dateArray];
        dateArray.length = 0;
        console.log(dateArray);
        this.setState({dateArray})

        var arr = [];
        var startDate = this.state.dateFrom;
        var endDate = this.state.dateTo;
        var dateMove = new Date(startDate);
        var strDate = startDate;

        while (strDate < endDate){
            var strDate = dateMove.toISOString().slice(0,10);
            arr.push(strDate);
            dateMove.setDate(dateMove.getDate()+1);
        };

        if(!this.state.dateFrom || !this.state.dateTo){
            this.setState({
                chosen: false
            })
        }else {
            this.setState({showLoader: true})
            this.setState({showModal: false, chosen: true});

        }
        
        // console.log(arr);
        dateArray = [];
        // console.log(dateArray);
        arr.map((val) => {
            dateArray.push(val)
        })
        // dateArray.reverse();
        // console.log(dateArray);
        this.setState({dateArray});
        // console.log(this.state.dateFrom, this.state.dateTo)
        let dateFrom = this.state.dateFrom.split("-").reverse().join("-");
        let dateTo = this.state.dateTo.split("-").reverse().join("-");
        this.setState({dateFrom});
        this.setState({dateTo});
        // console.log(this.state.dateArray);
        AsyncStorage.getItem('id')
        .then((value) => {
            let url = "http://idirect.bloombraineducation.com/idirect/lms/demo?start_date=" +this.state.dateFrom+ "&end_date=" +this.state.dateTo+ "&id="+value;
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
                            this.setState({classes: responseJson})
                        })
                        
                    } else {
                        if(response.status == 404) {
                            this.setState({showLoader: false})
                            this.setState({status: 404});
                            console.log("404");
                        }
                        if(response.status == 500) {
                            this.setState({showLoader: false})
                            this.setState({status: 500});
                            console.log("500");
                        }
                    }
                })
                .catch((error) => {
                    this.setState({login: false})
                    console.error(error);
            });
        })

        
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
        today: "",
        tomorrow: "",
        dayAfterTomorrow: "",
        dayAfterSeven: "",
        dateArray: [],
        dateFrom:"",
        dateTo: "",
        chosen: true,
        showModal: false,
        classes: {},
        errorString: "",
        error: 200,
        status: 200,
    }

    onPressAttend = (class_time, url, date) => {
        Linking.openURL(url);
    }

    render() {
        if(this.state.error == 200){
        if(this.state.showLoader) {
            return (
                <View style = {{
                    height: "95%",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Image 
                        style = {{
                            width: 60,
                            height: 60,
                        }}
                        source = {require("../images/loader.gif")}
                    />
                </View>
            )
        } 
        else if(this.state.status == 404) 
        return (
            <View>
                <Modal404 />
            </View>
        )
        else if(this.state.status == 500)
        return (
            <View>
                <Modal500 />
            </View>
        )
        else if(this.state.status == 200)
        return (
            <ScrollView 
                style = {{paddingTop: 10, backgroundColor: '#101010', height: Platform.OS == 'ios' ? '84%' : '84%'}}
                showsHorizontalScrollIndicator = {false}
                showsVerticalScrollIndicator = {false}    
            >
                <TouchableOpacity onPress = { () => {this.setState({showModal: true})}} style = {{marginRight: 10, marginTop: 15, alignSelf: 'flex-end', justifyContent: "center", alignItems: 'center'}}>
                    <Text style = {{fontFamily: 'Poppins-Bold', color: '#4ACDF4', fontSize: Platform.OS == "android" ? 12 : 13,  width: 120, height: 20, textAlign: 'center'}}>Filter by Date</Text>
                </TouchableOpacity>
                <Modal 
                    onBackdropPress = {() => {this.setState({showModal: false})}}
                    isVisible = {this.state.showModal}
                >
                    <View
                        style = {{
                            // flex: 1,
                            // borderColor: 'white',
                            // borderWidth: 2,
                            margin: 20,
                            // marginTop: Dimensions.get('window').height/10,
                            backgroundColor: '#101010',
                            // opacity: 0.8,
                            borderRadius: 20,
                            padding: 25,
                            width: 250,
                            height: 250,
                            alignSelf: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                            width: 0,
                            height: 2,
                            },
                            shadowOpacity: 0.75,
                            shadowRadius: 3.84,
                            elevation: 5,
                            alignItems: 'center'
                        }}
                        >  
                        <Text style = {{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 12,
                            color: '#4ACDF4',
                            marginLeft: -125,
                            marginBottom: 10
                        }}>
                            Start Date
                        </Text>
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.dateFrom}
                            mode="date"
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
                            // minDate="2020-10-23"
                            // maxDate={this.state.yesterday}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{

                                dateInput: {
                                    // marginLeft: 36,
                                    borderRadius: 10,
                                    borderWidth: 0,
                                    backgroundColor: '#1A1A1A'
                                },
                                dateText: {
                                    color: 'white',
                                    fontFamily: 'Poppins-SemiBold'
                                },
                                placeholderText: {
                                    color: 'white',
                                    fontFamily: 'Poppins-SemiBold'
                                }
                            }}
                            showIcon = {false}
                            onDateChange={(date) => {this.setState({dateFrom: date})}}
                        />
                        <Text style = {{
                            marginTop: 10,
                            fontFamily: 'Poppins-Bold',
                            fontSize: 12,
                            color: '#4ACDF4',
                            marginLeft: -125,
                            marginBottom: 10
                        }}>
                            End Date
                        </Text>
                        <DatePicker
                            style={{
                                width: 200, 
                            }}
                            date={this.state.dateTo}
                            mode="date"
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
                            // minDate={this.state.today}
                            // maxDate={this.state.dayAfterSeven}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateInput: {
                                    // marginLeft: 36,
                                    borderRadius: 10,
                                    borderWidth: 0,
                                    backgroundColor: '#1A1A1A'
                                },
                                dateText: {
                                    color: 'white',
                                    fontFamily: 'Poppins-SemiBold'
                                },
                                placeholderText: {
                                    color: 'white',
                                    fontFamily: 'Poppins-SemiBold'
                                }
                            }}
                            showIcon = {false}
                             
                            onDateChange={(date) => {this.setState({dateTo: date})}}
                        />
                        <View>
                            {!this.state.chosen ? <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-SemiBold", marginTop: 5, fontSize: 10}}>Please select the dates!</Text> : null}
                            <TouchableOpacity onPress = {() => {this.onClickConfirm()}}>
                                <Text style = {{
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: 15, 
                                    color: '#4ACDF4',
                                    marginTop: !this.state.chosen ? 10 : 25,
                                    textAlign: 'center'
                                }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </Modal>
                <View style = {{marginBottom: 10}}>
                {   
                    this.state.dateArray.map((val) => {
                        console.log(this.state.classes[val])
                        // return (
                        // <Text style = {{color: "white", fontFamily: 'Poppins-Bold'}}>{val}</Text>
                        // )
                        if(this.state.classes[val] !== undefined && this.state.classes[val].length != 0){
                            return (
                                <View>
                                    {
                                    val == this.state.today ? <Text style = {{fontSize: 14, marginLeft: 16, width: 250, marginTop: Platform.OS == 'android' ? -25: -20, color: '#4ACDF4', fontFamily: 'Poppins-Bold'}}>Upcoming</Text> :
                                    val == this.state.tomorrow ? <Text style = {{fontSize: 14, marginLeft: 16, width: 250, marginTop:-25, color: '#4ACDF4', fontFamily: 'Poppins-Bold'}}>Tomorrow</Text> :
                                    <Text style = {{fontSize: 14, color: '#4ACDF4', marginLeft: 16, marginTop: -25, width: 250, fontFamily: 'Poppins-Bold'}}>{val.toString().split("-").reverse().join("-")}</Text>}
                                    <FlatList
                                        // contentContainerStyle = {{borderColor: "white", borderWidth: 2, }}
                                        ListHeaderComponent = {<View style = {{marginBottom: 15}}></View>}
                                        ListFooterComponent = {<View style = {{marginBottom: 40}}></View>}
                                        data = {this.state.classes[val]}
                                        keyExtractor = {(item) => item.id}
                                        renderItem = {({item}) => {
                                            if(item.length != 0) {
                                                let base64Icon = `data:image/png;base64,${item.thumbnail_url}`;
                                                return (
                                                    <View style = {{
                                                        flexDirection: 'row', 
                                                        // borderWidth: 2, 
                                                        // borderColor: 'white',
                                                        height: 100,
                                                        marginLeft: 16, 
                                                        marginRight: 16,
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
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 11, position: 'absolute', top: 10, left: 150}}>Subject</Text>
                                                            </View>
                                                            <View style = {{
                                                                flex: 1,
                                                                flexShrink: 1,
                                                                justifyContent: 'space-around', 
                                                            }}>
                        
                                                                <Text 
                                                                numberOfLines = {1}
                                                                style = {{
                                                                    color: 'white',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    paddingLeft: 10,
                                                                    paddingRight: 20,
                                                                    marginTop: 30,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 14,
                                                                    height: 35
                                                                    // paddingTop:10
                                                                }}>
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                                <View  
                                                                style = {{
                                                                    marginTop: -10, 
                                                                    flex: 1, 
                                                                    flexDirection: 'row', 
                                                                    justifyContent: 'space-between',
                                                                    // borderWidth: 1, 
                                                                    // borderColor: "white"
                                                                }}>
                                                                <Text style = {{
                                                                    color: 'gray',
                                                                    fontFamily: 'Poppins-SemiBold',
                                                                    paddingLeft: 12,
                                                                    paddingRight: 12,
                                                                    width: 110,
                                                                    // borderColor: 'white',
                                                                    // borderWidth: 2,
                                                                    flexShrink: 1,
                                                                    fontSize: 10,
                                                                    alignSelf: "center"
                                                                    // marginTop: 10
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
                                                                    alignSelf: "center"
                                                                    // marginTop: 10
                                                                    // paddingTop: 29
                                                                }}>
                                                                    {item.time} pm
                                                                </Text>
                                                                {
                                                                    item.lock == false ? 
                                                                    <TouchableOpacity 

                                                                        onPress = {() => {
                                                                            let time = item.time;
                                                                            let url = item.demo_link;
                                                                            this.onPressAttend(time, url, val);
                                                                        }}
                                                                        style = {{ 
                                                                            // borderWidth: 1, 
                                                                            // borderColor: 'white', 
                                                                            width: 70, 
                                                                            height: 25, 
                                                                            marginRight: 15,
                                                                            // marginTop: 5,
                                                                            alignSelf: "center",
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
                                                                    : 
                                                                    <Image 
                                                                        style = {{
                                                                            width: 15, 
                                                                            height: 15,
                                                                            marginRight: 15,
                                                                            // marginTop: 5,
                                                                            alignSelf: "center",
                                                                            justifyContent: 'center', 
                                                                        }}
                                                                        source = {require("../images/lock.png")} 
                                                                    />
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                                
                                            } else if(item.length == 0) {
                                                return (
                                                    <View>
                                                        <Text style = {{fontSize: 12, color: 'white', marginLeft: 16, marginBottom: 40, fontFamily: 'Poppins-SemiBold'}}>No Live Classes Found</Text>
                                                    </View>
                                                )
                                            }
                                        
                                        }
                                        }

                                    /> 
                                </View>
                            )
                        } else if(this.state.classes[val] !== undefined && this.state.classes[val].length === 0){

                            return(
                                <View>
                                    <Text style = {{fontSize: 14, color: '#4ACDF4', marginLeft: 16, marginBottom: 10, fontFamily: 'Poppins-Bold'}}>{val.toString().split("-").reverse().join("-")}</Text>
                                    <Text style = {{fontSize: 12, color: 'white', marginLeft: 16, marginBottom: 40, fontFamily: 'Poppins-SemiBold'}}>No Live Classes Found</Text>
                                </View>
                            )

                        }
                    })
                }
                </View>
                <View style = {{height: Platform.OS == "android" ? 40: -0}}></View>
                               
            </ScrollView>
        ) 
        } else if(this.state.error == 500){
            return (
                <ScrollView 
                style = {{paddingTop: 10, backgroundColor: '#101010', height: Platform.OS == 'ios' ? '100%' : '100%'}}
                showsHorizontalScrollIndicator = {false}
                showsVerticalScrollIndicator = {false}    
            >
                <TouchableOpacity onPress = { () => {this.setState({showModal: true})}} style = {{marginRight: 10, marginTop: 15, alignSelf: 'flex-end', justifyContent: "center", alignItems: 'center'}}>
                    <Text style = {{fontFamily: 'Poppins-Bold', color: '#4ACDF4', fontSize: 13,  width: 120, height: 20, textAlign: 'center'}}>Filter by Date</Text>
                </TouchableOpacity>
                <Modal 
                    onBackdropPress = {() => {this.setState({showModal: false})}}
                    isVisible = {this.state.showModal}
                >
                    <View
                        style = {{
                            // flex: 1,
                            // borderColor: 'white',
                            // borderWidth: 2,
                            margin: 20,
                            // marginTop: Dimensions.get('window').height/10,
                            backgroundColor: '#101010',
                            // opacity: 0.8,
                            borderRadius: 20,
                            padding: 25,
                            width: 250,
                            height: 250,
                            alignSelf: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                            width: 0,
                            height: 2,
                            },
                            shadowOpacity: 0.75,
                            shadowRadius: 3.84,
                            elevation: 5,
                            alignItems: 'center'
                        }}
                        >  
                        <Text style = {{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 12,
                            color: '#4ACDF4',
                            marginLeft: -125,
                            marginBottom: 10
                        }}>
                            Start Date
                        </Text>
                        <DatePicker
                            style={{width: 200}}
                            date={this.state.dateFrom}
                            mode="date"
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
                            // minDate="2020-10-23"
                            // maxDate={this.state.yesterday}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{

                                dateInput: {
                                    // marginLeft: 36,
                                    borderRadius: 10,
                                    borderWidth: 0,
                                    backgroundColor: '#1A1A1A'
                                },
                                dateText: {
                                    color: 'white',
                                    fontFamily: 'Poppins-SemiBold'
                                },
                                placeholderText: {
                                    color: 'white',
                                    fontFamily: 'Poppins-SemiBold'
                                }
                            }}
                            showIcon = {false}
                            onDateChange={(date) => {this.setState({dateFrom: date})}}
                        />
                        <Text style = {{
                            marginTop: 10,
                            fontFamily: 'Poppins-Bold',
                            fontSize: 12,
                            color: '#4ACDF4',
                            marginLeft: -125,
                            marginBottom: 10
                        }}>
                            End Date
                        </Text>
                        <DatePicker
                            style={{
                                width: 200, 
                            }}
                            date={this.state.dateTo}
                            mode="date"
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
                            // minDate={this.state.today}
                            // maxDate={this.state.dayAfterSeven}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateInput: {
                                    // marginLeft: 36,
                                    borderRadius: 10,
                                    borderWidth: 0,
                                    backgroundColor: '#1A1A1A'
                                },
                                dateText: {
                                    color: 'white',
                                    fontFamily: 'Poppins-SemiBold'
                                },
                                placeholderText: {
                                    color: 'white',
                                    fontFamily: 'Poppins-SemiBold'
                                }
                            }}
                            showIcon = {false}
                             
                            onDateChange={(date) => {this.setState({dateTo: date})}}
                        />
                        <View>
                            {!this.state.chosen ? <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-SemiBold", marginTop: 5, fontSize: 10}}>Please select the dates!</Text> : null}
                            <TouchableOpacity onPress = {() => {this.onClickConfirm()}}>
                                <Text style = {{
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: 15, 
                                    color: '#4ACDF4',
                                    marginTop: !this.state.chosen ? 10 : 25,
                                    textAlign: 'center'
                                }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </Modal>
                    <View>
                        <Text style = {{fontFamily: "Poppins-Bold", color: "#4ACDF4", fontSize: 16}}>
                            500 error
                        </Text>
                    </View>
                </ScrollView>
            )
        }
    }

}

export default DemoVideos;