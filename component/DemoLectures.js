import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions, TouchableOpacity, FlatList, Image, ImageBackground, Platform, AsyncStorage, Linking} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Modal from 'react-native-modal';

class DemoLectures extends Component {

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
            let url = "http://idirect.bloombraineducation.com/idirect/lms/live/class?start_date=" +this.state.today+ "&end_date=" +this.state.dayAfterTomorrow+ "&id="+value;
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
                            this.setState({classes: responseJson})
                            today = today.split("-").reverse().join("-");
                            dayAfterTomorrow = dayAfterTomorrow.split("-").reverse().join("-");
                            this.setState({today: today});
                            this.setState({dayAfterTomorrow: dayAfterTomorrow});
                        })
                    } else {
                        if(response.status == 500) {
                            "Internal Server Error";
                        }
                        if(response.status == 404) {
                            console.log("Page not found");
                        }
                    }
                
                })
                
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
            let url = "http://idirect.bloombraineducation.com/idirect/lms/live/class?start_date=" +this.state.dateFrom+ "&end_date=" +this.state.dateTo+ "&id="+value;
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
                            this.setState({classes: responseJson})   
                            dateFrom = this.state.dateFrom.split("-").reverse().join("-");
                            dateTo = this.state.dateTo.split("-").reverse().join("-");
                            this.setState({dateFrom});
                            this.setState({dateTo});
                        })
                        
                    } else {
                        if(response.status == 500) {
                            console.log("Internal Server Error");
                        }
                        if(response.status == 404) {
                            console.log("404 not found");
                        }
                    }
                })
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
        tomorrow: "",
        dayAfterTomorrow: "",
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
                showsHorizontalScrollIndicator = {false}
                showsVerticalScrollIndicator = {false}
                style = {{paddingTop: 10, backgroundColor: '#101010', height: Platform.OS == 'ios' ? '84%' : '80%'}}
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
                                        showsHorizontalScrollIndicator = {false}
                                        showsVerticalScrollIndicator = {false}
                                        ListHeaderComponent = {<View style = {{marginBottom: 15}}></View>}
                                        ListFooterComponent = {<View style = {{marginBottom: 40}}></View>}
                                        data = {this.state.classes[val]}
                                        keyExtractor = {(item) => item.id}
                                        renderItem = {({item}) => {
                                            
                                            if(item.length != 0) {
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
                                                            <Text style = {{color: "#4ACDF4", fontFamily: "Poppins-Bold", fontSize: 11, position: 'absolute', top: 10, left: 110}}>Subject</Text>
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
                                                                    {this.state.subjects[item.subject]}
                                                                </Text>
                                                                <View style = {{marginTop: -10, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
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
                                                                <TouchableOpacity 

                                                                    onPress = {() => {
                                                                        Linking.openURL(item.demo_link)
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
                {/* <View style = {{marginBottom: 100}}></View> */}
                               
            </ScrollView>
        ) 
    }

}

export default DemoLectures;