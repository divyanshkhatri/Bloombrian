import React, {Component} from 'react';
import 
    {
        View, 
        Text, 
        Image,
        Dimensions, 
        SafeAreaView, 
        ScrollView, 
        FlatList, 
        TouchableWithoutFeedback, 
        BackHandler, 
        Alert, 
        ActivityIndicator, 
        AsyncStorage, 
        Platform,
        ImageBackground
    } from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modal';

class Hompage extends Component {

    windowWidth = Dimensions.get('window').width;

    backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to Exit?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        AsyncStorage.getItem('id')
        .then((value) => {
            this.setState({id: value})
            let url = 'http://idirect.bloombraineducation.com/idirect/lms/profile?id='+this.state.id;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                this.setState({profileData: responseJson})
                this.setState({isLoading: false})
                console.log(this.state.profileData);
                AsyncStorage.setItem('class', responseJson.class_data);
            })
            .catch((error) => {
                this.setState({login: false})
                console.error(error);
            });

            let picks_url = "http://idirect.bloombraineducation.com/idirect/lms/homepage?id=" + value;
            fetch(picks_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson["1"]);
                this.setState({carouselItems: responseJson["1"]})
                // console.log(this.state.data["1"]);
            })
            .catch((error) => {
                this.setState({login: false})
                console.error(error);
            });


        })
        .catch((e) => console.log(e));
    }
    

    state = {
        isLoading: true,
        data: {},
        profileData: {},
        showModalCong: false,
        showModal: false,
        activeIndex:0,
        academics: false,
        invention: false,
        communication: false,
        imageData: "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",
        carouselItems: 
        [
            {
                "id": 1,

                "teacher_name": "Bhavika Chopra", 
                "video_duration": 32.833333333333336, 
                "course": "science", 
                "is_lock": false,
                "class_data": "2", 
                "title": "Introduction to Straight Lines", 
                "description": "science class desc", 
                "thumbnail_url": "https://www.bloombraineducation.com/assets/images/youtube_logo/2.jpg",
                "video_url": "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
            },
            {
                "id": 2,

                "teacher_name": "Bhavika Chopra", 
                "video_duration": 32.833333333333336, 
                "course": "science", 
                "is_lock": false,
                "class_data": "2", 
                "title": "Introduction to Straight Lines", 
                "description": "science class desc", 
                "thumbnail_url": "https://www.bloombraineducation.com/assets/images/youtube_logo/2.jpg",
                "video_url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            },
            {
                "id": 3,

                "teacher_name": "Bhavika Chopra", 
                "video_duration": 32.833333333333336, 
                "course": "science", 
                "is_lock": false,
                "class_data": "2", 
                "title":  "Introduction to Straight Lines", 
                "description": "science class desc", 
                "thumbnail_url": "https://www.bloombraineducation.com/assets/images/youtube_logo/2.jpg",
                "video_url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            },
            {
                "id": 4,

                "teacher_name": "Bhavika Chopra", 
                "video_duration": 32.833333333333336, 
                "course": "science", 
                "is_lock": false,
                "class_data": "2", 
                "title": "Introduction to Straight Lines", 
                "description": "science class desc", 
                "thumbnail_url": "https://www.bloombraineducation.com/assets/images/youtube_logo/2.jpg",
                "video_url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
            },
            {
                "id": 5,

                "teacher_name": "Bhavika Chopra", 
                "video_duration": 32.633333333333336, 
                "course": "science", 
                "is_lock": false,
                "class_data": "2", 
                "title": "Video 5", 
                "description": "science class desc", 
                "thumbnail_url": "https://www.bloombraineducation.com/assets/images/youtube_logo/2.jpg",
                "video_url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
            },
          ],
        categories: [
            {
                title: "Academics",
                id: '1',
                imageUrl: require('../images/academics.png'),
                backgroundColor: '#173F14',
                gradient1: '#4AD240',
                gradient2: '#177710',

            },

            {   
                title: "Invention",
                id: '2',
                imageUrl: require('../images/invention.png'),
                backgroundColor: '#1A0F43',
                gradient1: '#654FB6',
                gradient2: '#24194C'
            },
                
            {
                title: "Communication",
                id: '3',
                imageUrl: require('../images/comm.png'),
                backgroundColor: '#470C6F',
                gradient1: '#EB68F3',
                gradient2: '#6E25B6'
            }
        ]
    }
        
    renderCategories = ({item}) => {
        return (
            <TouchableWithoutFeedback
                onPress = {() => {
                        item.title == "Academics" ? this.setState({academics: true}) : 
                        item.title == "Invention" ? this.setState({invention: true}) :
                        this.setState({communication: true})
                    }
                }
            >
                <LinearGradient
                    // Button Linear Gradient
                    colors={[ item.gradient1, item.gradient2]}
                    style={{ 
                        paddingTop: 25, 
                        alignItems: 'center',
                        borderRadius: 5,
                        width: Dimensions.get('window').width/2.5,
                        marginLeft: 16,
                        height: Platform.OS == 'android' ? 220 : 210,
                        borderRadius: 15
                    }}>
                    <Image 
                        source = {item.imageUrl}
                        style = {{
                            height: 22,
                            width: 25
                        }}
                    />
                    <Text
                        style={{
                            marginTop: 5,
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 15,
                            color: '#fff',
                        }}>
                        {item.title}
                    </Text>
                    <Text 
                    style = {{
                        paddingLeft: 4,
                        paddingRight: 4,
                        textAlign: 'center',
                        marginTop: 5,
                        fontFamily: 'Poppins-Regular',
                        fontSize: 10,
                        color: '#fff',
                    }}>
                    Get a head start for your school curriculum by our thorough videos.
                    </Text>
                    <Text
                    style = {{
                        paddingLeft: 4,
                        paddingRight: 4,
                        marginTop: 5,
                        textAlign: 'center',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 8,
                        // alignSelf: "flex-start",
                        paddingTop: 5,
                        // paddingLeft: 13,
                        color: '#fff',
                    }}>
                        Total Chapters: 12
                    </Text>
                    <Text
                    style = {{
                        marginTop: 5,
                        fontFamily: 'Poppins-Regular',
                        fontSize: 8,
                        // alignSelf: "flex-start",
                        textAlign: 'center',
                        paddingTop: -2,
                        // paddingLeft: 13,
                        color: '#fff',
                    }}>
                        Total Videos: 140
                    </Text>
                    <Text
                    style = {{
                        backgroundColor: item.backgroundColor,
                        borderColor: 'white',
                        borderRadius: 10,
                        paddingTop: 2.5,
                        width: Platform.OS == "android" ? 80: 80,
                        height: 21,
                        marginTop: 12,
                        // marginLeft: 13,
                        textAlign: 'center',
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 11,
                        alignSelf: "center",
                        overflow: 'hidden',
                        color: '#fff',
                    }}>
                        Explore Now
                    </Text>
                </LinearGradient>
            </TouchableWithoutFeedback>

        )
    }

    _renderItem({item}){
        // let a = this.state.carouselItems;
        return (
            <TouchableWithoutFeedback onPress = {() => { 
                    Actions.push('VideoPlayer',{titlePage: item} );
                }}>
                <View style = {{
                    height: 200, 
                    borderRadius: 15, 
                    width: 300, 
                    borderBottomWidth: 60, 
                    borderBottomColor: '#151515',

                    }}>
                    <Image
                        source = {item.image} 
                        style = {{
                            borderRadius: 15,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 0,
                            width: 300,
                            height: 140,
                            // opacity: 0.9,
                            // borderBottomWidth: 20,
                            borderColor: '#ffffff'
                        }}
                    />
                    <Text
                    style = {{
                        margin: 10,
                        marginBottom: 0,
                        fontFamily: "Poppins-SemiBold",
                        fontSize: 16,
                        // borderWidth: 2,
                        // borderColor: 'white',
                        color: 'white'
                    }}>
                        Vowels and Consonants</Text>

                    <Text
                    style = {{marginLeft: 10,
                        fontFamily: "Poppins-Regular",
                        fontSize: 10,
                        // borderWidth: 2,
                        // borderColor: 'white',
                        color: '#707070',
                    }}>
                        English{">"}Class 4</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    get pagination () {
        const { carouselItems, activeIndex } = this.state;
        return (
            <Pagination
                containerStyle = {{
                    alignItems: 'center',
                    // borderColor: 'white',
                    // borderWidth: 3,
                    marginVertical: 0,
                    paddingVertical: 0
                }}
                dotsLength={carouselItems ? carouselItems.length : 0}
                activeDotIndex={activeIndex}
                //   containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                dotStyle={{
                    width: 9,
                    height: 9,
                    borderRadius: 4.5,
                    //   marginTop: -20,
                    marginHorizontal: -20,
                    backgroundColor: '#32C6F3'
                }}
                inactiveDotStyle={{
                    width: 15,
                    height: 15,
                    alignSelf: 'center',
                    borderRadius: 7.5,
                    // marginTop: -20,
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
        return(
            <SafeAreaView 
            style = {{
                // borderWidth: 2,
                // borderColor: 'white',
                flex: 1, 
                flexDirection: "column",
                backgroundColor: 'black',
                paddingTop: Platform.OS === 'android' ? 0 : 0,
                // alignItems: 'center'
                }}>
                
                {this.state.isLoading ?  
                   ( 
                     <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require("../images/loader.gif")} style = {{width: 50, height: 50}} />
                    </View>
                    
                    ) : (
                <ScrollView>
                <Modal 
                    isVisible = {this.state.invention}
                    animationIn = "pulse"
                    // animationOut = "pulse"
                    transparent = {true}
                    onBackdropPress = {() => this.setState({invention: false})}
                >   
                    <View>
                    <View
                    style = {{
                        // flex: 1,
                        // borderColor: 'blue',
                        // borderWidth: 2,
                        margin: 20,
                        // marginTop: Dimensions.get('window').height/5,
                        backgroundColor: '#232323',
                        borderRadius: 20,
                        padding: 35,
                        width: 310,
                        height: 390,
                        // alignItems: 'center',
                        // justifyContent: 'center',
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
                                fontFamily: 'Poppins-ExtraBold',
                                color: 'white',
                                fontSize: 20,
                                marginBottom: 30,
                                // marginLeft: 20,
                                textAlign: "center"
                        }}>
                            Choose a Subject
                        </Text>
                        <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableWithoutFeedback
                                onPress = { () => {
                                    this.setState({
                                        invention: false
                                    })
                                    AsyncStorage.setItem('subject', 'Robotics');
                                    AsyncStorage.setItem('category', 'Invention');
                                    Actions.BottomNavigator();
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#6EDEFF', '#32C1ED', '#1285D1']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 120,
                                        marginRight: 10,
                                        alignSelf: 'center',
                                        marginBottom: 10,
                                        height: 120,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/robotics.png")}
                                        style = {{
                                            height: 50,
                                            width: 50
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-ExtraBold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5,
                                        textAlign: 'center'
                                    }}>
                                        Robotics
                                    </Text>
                                </LinearGradient>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress = { () => {
                                    this.setState({
                                        invention: false
                                    })
                                    AsyncStorage.setItem('subject', 'Coding');
                                    AsyncStorage.setItem('category', 'Invention');
                                    Actions.BottomNavigator({subject: "Coding"});
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#654FB6', '#24194C']}
                                    style={{ 
                                        // alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 120,
                                        marginBottom: 10,
                                        marginLeft: 10,
                                        alignSelf: 'flex-start',
                                        height: 120,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/coding.png")}
                                        style = {{
                                            height: 50,
                                            width: 50,
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-ExtraBold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5,
                                        textAlign: 'center'
                                    }}>
                                        Coding
                                    </Text>

                                </LinearGradient>
                            </TouchableWithoutFeedback>
                            </View>
                            <TouchableWithoutFeedback 
                                onPress = { () => {
                                    this.setState({
                                        invention: false
                                    })
                                    AsyncStorage.setItem('subject', '3D-Printing');
                                    AsyncStorage.setItem('category', 'Invention');
                                    Actions.BottomNavigator({subject: "3D-Printing"});
                                }}>
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#EB68F3', '#6E25B6']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 120,
                                        marginTop: 10,
                                        alignSelf: 'flex-start',
                                        height: 120,
                                        borderRadius: 15,
                                        marginLeft: -10,
                                }}>
                                    <Image 
                                        source = {require("../images/3d-printer.png")}
                                        style = {{
                                            height: 50,
                                            width: 50,
                                            tintColor: "white"
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-ExtraBold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        3D Printing
                                    </Text>

                                </LinearGradient>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Modal>

                <Modal 
                    isVisible = {this.state.communication}
                    animationIn = "pulse"
                    // animationOut = "pulse"
                    transparent = {true}
                    onBackdropPress = {() => this.setState({communication: false})}
                >   
                <View>
                    <View
                    style = {{
                        // flex: 1,
                        // borderColor: 'blue',
                        // borderWidth: 2,
                        margin: 20,
                        // marginTop: Dimensions.get('window').height/5,
                        backgroundColor: '#232323',
                        borderRadius: 20,
                        padding: 35,
                        width: Platform.OS == "ios" ? 310: 340,
                        height: Platform.OS == "ios" ? 390: 420,
                        alignSelf: 'center',
                        // alignItems: 'center',
                        justifyContent: 'center',
                        // alignSelf: 'center',
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
                                fontFamily: 'Poppins-ExtraBold',
                                color: 'white',
                                fontSize: 20,
                                marginBottom: 30,
                                // marginLeft: 20,
                                textAlign: "center"
                        }}>
                            Choose a Subject
                        </Text>
                        <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableWithoutFeedback
                                onPress = { () => {
                                    this.setState({
                                        communication: false
                                    })
                                    AsyncStorage.setItem('subject', 'Personality Development');
                                    AsyncStorage.setItem('category', 'Communication');
                                    Actions.BottomNavigator();
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#6EDEFF', '#32C1ED', '#1285D1']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: Platform.OS == "ios" ? 120 : 125,
                                        marginRight: 10,
                                        alignSelf: 'center',
                                        marginBottom: 10,
                                        height: Platform.OS == "ios" ? 120 : 125,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/development.png")}
                                        style = {{
                                            height: 50,
                                            width: 50
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5,
                                        textAlign: 'center'
                                    }}>
                                        Personality Development
                                    </Text>
                                </LinearGradient>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress = { () => {
                                    this.setState({
                                        communication: false
                                    })
                                    AsyncStorage.setItem('subject', 'English Core Grammar');
                                    AsyncStorage.setItem('category', 'Communication');
                                    Actions.BottomNavigator({subject: "English Core Grammar"});
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#654FB6', '#24194C']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: Platform.OS == "ios" ? 120 : 125,
                                        marginBottom: 10,
                                        marginLeft: 10,
                                        alignSelf: 'center',
                                        height: Platform.OS == "ios" ? 120 : 125,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/grammar.png")}
                                        style = {{
                                            height: 50,
                                            width: 50,
                                            tintColor: "white"
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5,
                                        textAlign: 'center'
                                    }}>
                                        English Core Grammar
                                    </Text>

                                </LinearGradient>
                            </TouchableWithoutFeedback>
                            </View>
                            <TouchableWithoutFeedback 
                                onPress = { () => {
                                    this.setState({
                                        communication: false
                                    })
                                    AsyncStorage.setItem('subject', 'Public Speaking');
                                    AsyncStorage.setItem('category', 'Communication');
                                    Actions.BottomNavigator({subject: "Public Speaking"});
                                }}>
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#EB68F3', '#6E25B6']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: Platform.OS == "ios" ? 120 : 125,
                                        marginTop: 10,
                                        alignSelf: 'flex-start',
                                        height: Platform.OS == "ios" ? 120 : 125,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/speaking.png")}
                                        style = {{
                                            height: 50,
                                            width: 50,
                                            tintColor: "white"
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        Public Speaking
                                    </Text>

                                </LinearGradient>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Modal>

                {/* <Modal 
                    visible = {this.state.showModalCong}
                    animationType = "fade"
                    transparent = {true}
                >   
                    <TouchableWithoutFeedback 
                        style = {{
                            height: '100%'
                        }}
                        onPress={() => {
                        this.setState({showModalCong: !this.state.showModalCong})
                    }}>
                    <View>
                        <TouchableWithoutFeedback onPress={() => { }}>
                        <View
                        style = {{
                            // flex: 1,
                            // borderColor: 'white',
                            // borderWidth: 2,
                            margin: 20,
                            marginTop: Dimensions.get('window').height/4 - 10,
                            backgroundColor: '#232323',
                            borderRadius: 20,
                            padding: 35,
                            width: 335,
                            height: 420,
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
                                textAlign: 'center',
                                fontFamily: 'Poppins-Bold',
                                fontSize: 24,
                                color: 'white',
                                marginBottom: 20
                            }}
                        >Hurray!</Text>
                        <Image 

                            source = {require("../images/party.png")}
                            style = {{
                                width: 228, 
                                height: 160,
                                // borderColor: 'white',
                                // borderWidth: 2,
                                alignSelf: 'center'
                            }}
                        />
                        <Text
                            style = {{
                            textAlign: 'center',
                            fontFamily: 'Poppins-Bold',
                            fontSize: 15,
                            color: 'white',
                            marginTop: 20
                        }}
                        >Conratulations! You just earned</Text>
                        <Text
                            style = {{
                            textAlign: 'center',
                            fontFamily: 'Poppins-Bold',
                            fontSize: 15,
                            color: '#67F2F6',
                            marginTop: 10
                        }}
                        >50 Bloombrain credits !</Text>
                        <Text
                            style = {{
                            textAlign: 'center',
                            fontFamily: 'Poppins-Bold',
                            fontSize: 15,
                            color: '#585858',
                            marginTop: 30
                        }}
                        >Current Balance: 680BB</Text>
                    </View>
                    </TouchableWithoutFeedback>
                    </View>
                    </TouchableWithoutFeedback>
                </Modal> */}

                <Modal
                    
                    isVisible = {this.state.academics}
                    animationIn = "pulse"
                    // animationOut = "pulse"
                    onBackdropPress = {() => {this.setState({academics: false})}}
                    transparent = {true}
                    style = {{
                        // width: 320,
                        // height: 400,
                        // borderColor: 'white',
                        // borderWidth: 2
                    }}
                    // backdropOpacity = {0.8}
                    // backgroundColor = '#000'
                    // backdropOpacity= {1}
                    // backdropColor={'green'}
                >   
                <View>
                    <View
                    style = {{
                        // flex: 1,
                        // borderColor: 'blue',
                        // borderWidth: 2,
                        margin: 20,
                        // marginTop: Dimensions.get('window').height/5,
                        backgroundColor: '#232323',
                        borderRadius: 20,
                        padding: 35,
                        width: 310,
                        height: 450,
                        // alignItems: 'center',
                        justifyContent: 'center',
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
                                fontFamily: 'Poppins-ExtraBold',
                                color: 'white',
                                fontSize: 20,
                                // marginBottom: 10,
                                // marginLeft: 20,
                                alignSelf: "center"
                        }}>
                            Choose a Subject
                        </Text>
                        <View 
                            style = {{
                                flexDirection: "row",
                                flex: 1,
                                marginTop: 20,
                                alignContent: "space-between",
                                justifyContent: 'space-evenly'
                                }}>
                            <TouchableWithoutFeedback
                                onPress = { () => {
                                    this.setState({
                                        academics: false
                                    })
                                    AsyncStorage.setItem('subject', 'Science');
                                    AsyncStorage.setItem('category', 'Academics');
                                    Actions.BottomNavigator();
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#6EDEFF', '#32C1ED', '#1285D1']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 100,
                                        // marginLeft: 16,
                                        height: 100,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/flask-with-liquid2.png")}
                                        style = {{
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        Science
                                    </Text>
                                </LinearGradient>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress = { () => {
                                    this.setState({
                                        academics: false
                                    })
                                    AsyncStorage.setItem('subject', 'Mathematics');
                                    AsyncStorage.setItem('category', 'Academics');
                                    Actions.BottomNavigator({subject: "Mathematics"});
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#654FB6', '#24194C']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 100,
                                        marginLeft: 16,

                                        height: 100,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/maths.png")}
                                        style = {{
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        Maths
                                    </Text>

                                </LinearGradient>
                            </TouchableWithoutFeedback>
                        </View>
                        <View
                            style = {{
                                flex: 1,
                                flexDirection: "row",
                                marginTop: Platform.OS == "ios" ? 30 : 30,
                                alignSelf: 'center',
                                alignItems: 'center',
                                // justifyContent: 'center'
                            }}>
                            <TouchableWithoutFeedback
                                onPress = { () => {
                                    this.setState({
                                        academics: false
                                    })
                                    AsyncStorage.setItem('subject', 'SST');
                                    AsyncStorage.setItem('category', 'Academics');
                                    Actions.BottomNavigator();
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#EB68F3', '#6E25B6']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3,  
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 100,
                                        // marginLeft: 16,
                                        height: 100,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/sst.png")}
                                        style = {{
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        SST
                                    </Text>
                                </LinearGradient>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress = { () => {
                                    this.setState({
                                        academics: false
                                    })
                                    AsyncStorage.setItem('subject', 'English');
                                    AsyncStorage.setItem('category', 'Academics');
                                    Actions.BottomNavigator({subject: "English"});
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#4AD240', '#177710']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 100,
                                        marginLeft: 25,
                                        height: 100,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/eng.png")}
                                        style = {{
                                            height: 30,
                                            width: 43,
                                            tintColor: 'white'
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        English
                                    </Text>
                                </LinearGradient>
                            </TouchableWithoutFeedback>
                        </View>
                        <View
                            style = {{
                                    flex: 1,
                                    flexDirection: "row",
                                    marginTop: 20,
                                    alignSelf: 'flex-start'
                                }}>
                            <TouchableWithoutFeedback
                                onPress = { () => {
                                    this.setState({
                                        academics: false
                                    })
                                    AsyncStorage.setItem('subject', 'EVS');
                                    AsyncStorage.setItem('category', 'Academics');
                                    Actions.BottomNavigator();
                                }}
                            >
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#FFC56E', '#D16B12']}
                                    style={{ 
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 3, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 100,
                                        marginLeft: 8,
                                        height: 100,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/evs.png")}
                                        style = {{
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        EVS
                                    </Text>
                                </LinearGradient>
                            </TouchableWithoutFeedback>
                        </View>
                        {/* <View 
                            style = {{
                                flexDirection: "row",
                                flex: 1,
                                marginTop: 20
                                // justifyContent: 'space-evenly'
                                }}>
                                

                            <LinearGradient
                    // Button Linear Gradient
                                colors={[ '#654FB6', '#24194C']}
                                style={{ 
                                    paddingTop: 25, 
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    width: 100,
                                    marginLeft: 16,
                                    height: 100,
                                    borderRadius: 15
                            }}>
                                <Image 
                                    source = {require("../images/flask-with-liquid2.png")}
                                    style = {{
                                        height: 40,
                                        width: 40
                                    }}
                                />
                                <Text style = {{
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: 14,
                                    color: '#fff',
                                    marginTop: 5
                                }}>
                                    Maths
                                </Text>

                            </LinearGradient>
                            <LinearGradient
                    // Button Linear Gradient
                                colors={[ '#EB68F3', '#6E25B6']}
                                style={{ 
                                    paddingTop: 25, 
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    width: 100,
                                    marginLeft: 16,
                                    height: 100,
                                    borderRadius: 15
                            }}>
                                <Image 
                                    source = {require("../images/flask-with-liquid2.png")}
                                    style = {{
                                        height: 40,
                                        width: 40
                                    }}
                                />
                                <Text style = {{
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: 14,
                                    color: '#fff',
                                    marginTop: 5
                                }}>
                                    EVS
                                </Text>
                            </LinearGradient>
                            </View>
                            <View
                            style = {{
                                flex: 1, 
                                flexDirection: 'row',
                                marginTop: 20
                            }}>
                                <LinearGradient
                        // Button Linear Gradient
                                    colors={[ '#4AD240', '#177710']}
                                    style={{ 
                                        paddingTop: 25, 
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        width: 100,
                                        marginLeft: 16,
                                        height: 100,
                                        borderRadius: 15
                                }}>
                                    <Image 
                                        source = {require("../images/flask-with-liquid2.png")}
                                        style = {{
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                    <Text style = {{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 14,
                                        color: '#fff',
                                        marginTop: 5
                                    }}>
                                        English
                                    </Text>
                                </LinearGradient>
                            </View> */}
                        </View>
                        </View>
                    </Modal>
                
                <TouchableWithoutFeedback onPress = {() => {
                    Actions.pop();
                    Actions.Profile();
                    }}>
                    <View 
                        style = {{
                        // flex: 1,
                            marginTop: 10, 
                            marginLeft: 16, 
                            flexDirection: 'row',
                            // width: 200, 
                            // borderWidth: 2,
                            // borderColor: 'white'
                        }}>
                        <Image 
                        source = {require("../images/dp.png")}
                        style = {{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            borderColor: '#32C6F3',
                            borderWidth: 1

                        }}
                        />
                        <View 
                        style = {{
                            marginLeft: 6
                        }}
                        >
                        <Text 
                        style = {{
                            fontFamily : "Poppins-Bold",
                            fontSize: 14,
                            color: 'white',
                            height: 18,
                            // borderColor: 'white',
                            // borderWidth: 3
                        }}>
                            Hi {this.state.profileData["username"]}
                        </Text>
                        <Text
                        style = {{
                            fontFamily : "Poppins-SemiBold",
                            fontSize: 11,
                            color: '#707070',
                            height: 40,
                        }}
                        >What will you like to learn today?</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                {Platform.isPad ? 
                    <TouchableWithoutFeedback onPress = {() => {Actions.push('Live1')}}>
                        <LinearGradient
                    // Button Linear Gradient
                            colors={['#1285D1', '#32C1ED', '#6EDEFF']}
                            start={[0, 1]} end={[1, 0]}
                            style = {{
                                marginTop: Platform.OS == "android" ? 0 : 0,
                                alignSelf: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: this.windowWidth-32,
                                // borderColor: 'white',
                                // borderWidth: 1,
                                height: Platform.OS == "android" ? 70 : 80,
                                paddingLeft: 20,
                                borderRadius: 16,
                                overflow: 'hidden',

                                // justifyContent: "center"
                            }}>
                        <Image 
                            style = {{
                                width: 20,
                                height: 20
                            }}
                            source = {require("../images/wifi.png")} 
                        />
                        {/* <TouchableWithoutFeedback 
                            style = {{
                                boderWidth: 2,
                                borderColor: 'white'
                            }}
                            onPress = {() => {
                                this.setState({showModalCong: true})
                                console.log(this.state.showModalCong);
                            }}> */}
                            <Text
                                style = {{
                                    marginLeft: 8,
                                    fontFamily: 'Poppins-SemiBold',
                                    fontSize: 16,
                                    color: 'white'
                                }}
                            >Your Class is Live Now!</Text>
                        {/* </TouchableWithoutFeedback> */}
                        <View
                            style = {{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                paddingRight: 20,
                            }}
                        >
                        <Image 
                            style = {{
                                // flexShrink: 1,
                                // flex: 1,
                                width: 12,
                                height: 20,
                            
                                // justifyContent: 'flex-end'
                                // borderWidth: 2,
                                // borderColor: 'purple',
                            }}
                            source = {require("../images/arrow.png")} 
                        />
                        </View>
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                : 
                        
                    <TouchableWithoutFeedback style = {{borderRadius: 16}} onPress = {() => {Actions.push('Live1')}}>
                        <ImageBackground
                    // Button Linear Gradient
                            source = {require("../images/live1.png")}
                            style = {{
                                marginTop: Platform.OS == "android" ? 10 : 0,
                                alignSelf: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                width: Dimensions.get("window").width - 32,
                                // borderColor: 'white',
                                // borderWidth: 1,
                                height: Platform.OS == "android" ? 70 : 80,
                                paddingLeft: 20,
                                borderRadius: 16,
                                overflow: 'hidden',
                            }}    
                            // resizeMode = {"contain"}
                        >
                        <Image 
                            style = {{
                                width: 20,
                                height: 20
                            }}
                            source = {require("../images/wifi.png")} 
                        />
                        {/* <TouchableWithoutFeedback 
                            style = {{
                                boderWidth: 2,
                                borderColor: 'white'
                            }}
                            onPress = {() => {
                                this.setState({showModalCong: true})
                                console.log(this.state.showModalCong);
                            }}> */}
                            <Text
                                style = {{
                                    marginLeft: 8,
                                    fontFamily: 'Poppins-SemiBold',
                                    fontSize: 16,
                                    color: 'white'
                                }}
                            >Your Class is Live Now!</Text>
                        {/* </TouchableWithoutFeedback> */}
                        <View
                            style = {{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                paddingRight: 20,
                            }}
                        >
                        <Image 
                            style = {{
                                // flexShrink: 1,
                                // flex: 1,
                                width: 12,
                                height: 20,
                            
                                // justifyContent: 'flex-end'
                                // borderWidth: 2,
                                // borderColor: 'purple',
                            }}
                            source = {require("../images/arrow.png")} 
                        />
                        </View>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                }
                <Text
                    style = {{
                        marginTop: Platform.OS == "android" ? 20 : 15, 
                        marginLeft: 16,
                        fontFamily : "Poppins-Bold",
                        fontSize: 18,
                        color: 'white'
                    }}>
                        Top picks for you</Text>
                <View style = {{
                    marginTop: 20,
                    height: 270,
                    alignItems: 'center',
                    // borderWidth: 2,
                    // borderColor: "white"
                    }}>
                    <Carousel
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={this.state.carouselItems}
                        renderItem={({item}) => 
                        (
                            <TouchableWithoutFeedback onPress = {() => { 
                                    Actions.push('VideoPlayer',{titlePage: item, videos: this.state.carouselItems} );
                                }}>
                                <View style = {{
                                    height: 230, 
                                    borderRadius: 15, 
                                    width: 300, 
                                    borderBottomWidth: 60, 
                                    borderBottomColor: '#151515',
                                    // borderColor: 'white',
                                    }}>
                                    <Image
                                        // source = {(/^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(item["thumbnail_url"] )== false) ? require("../images/picks1.png") : {uri: item["thumbnail_url"]}}
                                        source = {require("../images/picks1.jpeg")}
                                        style = {{
                                            borderRadius: 15,
                                            borderBottomRightRadius: 0,
                                            borderBottomLeftRadius: 0,
                                            width: 300,
                                            height: 170,
                                            resizeMode: "stretch",
                                            // opacity: 0.9,
                                            // borderBottomWidth: 20,
                                            borderColor: '#ffffff'
                                        }}
                                    />
                                    <Text
                                    style = {{
                                        margin: 10,
                                        marginBottom: 0,
                                        fontFamily: "Poppins-SemiBold",
                                        fontSize: 16,
                                        // borderWidth: 2,
                                        // borderColor: 'white',
                                        color: 'white'
                                    }}>
                                        {item["title"] == false ? <Text>{item.course} Class</Text> : item["title"]}</Text>
                
                                    <Text
                                    style = {{
                                        marginTop: 2, 
                                        marginLeft: 10,
                                        fontFamily: "Poppins-Regular",
                                        fontSize: 11,
                                        // borderWidth: 2,
                                        // borderColor: 'white',
                                        color: '#707070',
                                    }}>
                                        Class {item.class_data} {">"} {item.course}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }
                        sliderWidth= {Dimensions.get('window').width}
                        itemWidth={300}
                        enableMomentum={false}
                        lockScrollWhileSnapping
                        autoplay
                        useScrollView
                        loop
                        showsHorizontalScrollIndicator = {false}
                        showsVerticalScrollIndicator = {false}
                        autoplayInterval={2500}
                        onSnapToItem = { index => this.setState({activeIndex:index}) } />
                    
                    {this.pagination}
                </View>
                <Text
                style = {{
                    marginLeft: 16,
                    fontFamily : "Poppins-Bold",
                    fontSize: 18,
                    color: 'white',
                    marginBottom: 20,
                    marginTop: Platform.OS == "android" ? 0 : 0
                }}>
                    Categories
                </Text>
                <FlatList
                    style = {{
                        alignSelf: 'center'
                    }}
                    ListFooterComponent = {<View style = {{marginRight: Platform.OS == "android" ? 20 : 0}}></View>}
                    horizontal = {true}
                    data={this.state.categories}
                    renderItem={this.renderCategories}
                    keyExtractor={(item) => item.id}
                    contentInset={{ right: 16, top: 0, left: 0, bottom: 0 }}
                    showsHorizontalScrollIndicator = {false}
                    showsVerticalScrollIndicator = {false}
                />
            </ScrollView>
            )}
            </SafeAreaView>

        )
    }
}

export default Hompage;