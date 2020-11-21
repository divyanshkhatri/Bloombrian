import react from 'react';
import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions, TouchableOpacity, FlatList, Image, ImageBackground, Platform, AsyncStorage, Linking} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modal';
import {Actions} from 'react-native-router-flux';

class Recorded extends Component {

    async componentDidMount() {

        var today = new Date();
        var yesterday = new Date();
        var dayBeforeYesterday = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        yesterday.setDate(today.getDate() - 1);
        dayBeforeYesterday.setDate(today.getDate() - 2);
        var ddy = String(yesterday.getDate()).padStart(2, '0');
        var mmy = String(yesterday.getMonth() + 1).padStart(2, '0');
        var yyyyy = yesterday.getFullYear();

        var ddby = String(dayBeforeYesterday.getDate()).padStart(2, '0');
        var mmby = String(dayBeforeYesterday.getMonth() + 1).padStart(2, '0');
        var yyyyby = dayBeforeYesterday.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        yesterday = yyyyy + "-" + mmy + "-" + ddy;
        dayBeforeYesterday = yyyyby + "-" + mmby + "-" + ddby;
        console.log(today);
        console.log(yesterday);
        console.log(dayBeforeYesterday);

        let dateArray = [...this.state.dateArray];
        dateArray.push(today);
        dateArray.push(yesterday);
        dateArray.push(dayBeforeYesterday);

        this.setState({dateArray});

        this.setState({today: today});
        this.setState({yesterday: yesterday});
        this.setState({dayBeforeYesterday: dayBeforeYesterday})
        today = today.split("-").reverse().join("-");
        dayBeforeYesterday = dayBeforeYesterday.split("-").reverse().join("-");

        this.setState({dateArray});
        this.setState({today: today});
        this.setState({dayBeforeYesterday: dayBeforeYesterday});

        AsyncStorage.getItem('id')
        .then((value) => {
            let url = "http://idirect.bloombraineducation.com/idirect/lms/live/class/recordings?start_date=" +this.state.dayBeforeYesterday+ "&end_date=" +this.state.today+ "&id="+value;
            console.log(url);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({classes: responseJson})
                    today = today.split("-").reverse().join("-");
                    dayBeforeYesterday = dayBeforeYesterday.split("-").reverse().join("-");
                    this.setState({today: today});
                    this.setState({dayBeforeYesterday: dayBeforeYesterday});
                    // this.setState({urlVideos: responseJson["1"]});
                    // console.log(this.state.urlVideos)
                })
                .catch((error) => {
                    this.setState({login: false})
                    console.error(error);
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
            let url = "http://idirect.bloombraineducation.com/idirect/lms/live/class/recordings?start_date=" +this.state.dateFrom+ "&end_date="+this.state.dateTo+"&id="+value;
            console.log(url);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({classes: responseJson})   
                    dateFrom = this.state.dateFrom.split("-").reverse().join("-");
                    dateTo = this.state.dateTo.split("-").reverse().join("-");
                    this.setState({dateFrom});
                    this.setState({dateTo});
                    // this.setState({urlVideos: responseJson["1"]});
                    // console.log(this.state.urlVideos)
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
        today: "",
        yesterday: "",
        dayBeforeYesterday: "",
        dayAfterSeven: "",
        dateArray: [],
        dateFrom:"",
        dateTo: "",
        chosen: true,
        showModal: false,
        classes: {}
    }

    render() {
        return (
            <ScrollView 
                style = {{paddingTop: 10, backgroundColor: '#101010', height: Platform.OS == 'ios' ? '84%' : '80%'}}
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
                <View style = {{flexDirection: 'row'}}>
                <View>
                {   
                    this.state.dateArray.map((val) => {
                        console.log(this.state.classes[val])
                        // return (
                        // <Text style = {{color: "white", fontFamily: 'Poppins-Bold'}}>{val}</Text>
                        // )
                        if(this.state.classes[val] !== undefined && this.state.classes[val].length != 0){
                            return (
                                <View style = {{marginTop: 20}}>
                                    {
                                    val == this.state.today ? <Text style = {{fontSize: 14, marginLeft: 16, width: 250, marginTop: Platform.OS == 'android' ? 0: 0, color: '#4ACDF4', fontFamily: 'Poppins-Bold'}}>Upcoming</Text> :
                                    val == this.state.tomorrow ? <Text style = {{fontSize: 14, marginLeft: 16, width: 250, marginTop: 0, color: '#4ACDF4', fontFamily: 'Poppins-Bold'}}>Tomorrow</Text> :
                                    <Text style = {{fontSize: 14, color: '#4ACDF4', marginLeft: 16, marginTop: Platform.OS == 'android' ? 0: 0, width: 250, fontFamily: 'Poppins-Bold'}}>{val.toString().split("-").reverse().join("-")}</Text>}
                                    <FlatList 
                                        horizontal = {true}
                                        showsHorizontalScrollIndicator = {false}
                                        showsVerticalScrollIndicator = {false}
                                        ListFooterComponent={<View style={{width:30}}></View>}
                                        data = {this.state.classes[val]}
                                        keyExtractor = {(item) => item.id}
                                        renderItem = {({item}) => {
                                            
                                            if(item.length != 0) {
                                                return (
                                                    <TouchableOpacity 
                                                        style = {{marginTop: 20}}
                                                        onPress = {() => Actions.RecordedVideos({details: item})}>
                                                        <View style = {{
                                                            flexDirection: 'row', 
                                                            // borderWidth: 2, 
                                                            // borderColor: 'white',
                                                            height: 90,
                                                            width: 330,
                                                            marginLeft: 18, 
                                                            backgroundColor: '#1C1C1C',
                                                            marginBottom: 20,
                                                            borderRadius: 10
                                                        }}>
                                                            <View>
                                                                <ImageBackground
                                                                    style = {{
                                                                        // marginTop: 20,
                                                                        // marginRight: 20,
                                                                        width: 90, 
                                                                        height: 90, 
                                                                        borderRadius: 10,
                                                                        marginBottom: 0,
                                                                        overflow: 'hidden',
                                                                        position: 'relative',
                                                                    }}
                                                                    source = {require('../images/mathswork.png')}
                                                                >
                                                                </ImageBackground>
                                                                <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 10, position: 'absolute', top: 10, left: 105}}>{this.state.subjects[item.subject]}</Text>
                                                                </View>
                                                                <View style = {{
                                                                    flex: 1,
                                                                    flexShrink: 1,
                                                                    justifyContent: 'space-around', 
                                                                }}>
                            
                                                                    <Text style = {{
                                                                        color: 'white',
                                                                        fontFamily: 'Poppins-SemiBold',
                                                                        paddingLeft: 15,
                                                                        paddingRight: 50,
                                                                        marginTop: 30,
                                                                        // borderColor: 'white',
                                                                        // borderWidth: 2,
                                                                        flexShrink: 1,
                                                                        fontSize: 14,
                                                                        height: 40
                                                                        // paddingTop:10
                                                                    }}>
                                                                        {item.description}
                                                                    </Text>
                                                                <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                    <Text style = {{
                                                                        color: 'gray',
                                                                        fontFamily: 'Poppins-SemiBold',
                                                                        paddingLeft: 12,
                                                                        paddingRight: 12,
                                                                        // borderColor: 'white',
                                                                        // borderWidth: 2,
                                                                        flexShrink: 1,
                                                                        fontSize: 10,
                                                                        marginTop: 5
                                                                        // paddingTop: 29
                                                                    }}>
                                                                        {item.teacher_name}
                                                                    </Text>
                                                                    <Text style = {{
                                                                        fontFamily: 'Poppins-Bold',
                                                                        fontSize: 10, 
                                                                        color: 'gray',
                                                                        marginRight: 15,
                                                                        marginTop: 5,
                                                                        textAlign: 'center'
                                                                    }}>{val}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                                
                                            } else if(item.length == 0) {
                                                return (
                                                    <View>
                                                        <Text style = {{fontSize: 12, color: 'white', marginLeft: 16, marginBottom: 40, fontFamily: 'Poppins-SemiBold'}}>No Live Recordings Found</Text>
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
                                    <Text style = {{fontSize: 12, color: 'white', marginLeft: 16, marginBottom: 40, fontFamily: 'Poppins-SemiBold'}}>No Live Recordings Found {'\u2728'}</Text>
                                </View>
                            )

                        }
                    })
                }
                </View>
                </View> 
            </ScrollView>
        ) 
    }

}

export default Recorded;