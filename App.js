import React, { Component } from 'react';
import Homepage from './component/Homepage';
import Subject from './component/Subject';
import {Tabs, Scene, Router} from 'react-native-router-flux';
import BottomNavigator from './component/BottomNavigator';
import Live1 from './component/Live1';
import Video from './component/Video';
import Test from './component/Test';
import Landing from './component/Landing';
import Signin from './component/Signin';
import Register from './component/Register';
import Favourite from './component/Favourite';
import Profile from './component/Profile';
import Payment from './component/Payment';
import Checkout from './component/Checkout';
import PaymentComplete from './component/PaymentComplete';
import PaymentInComplete from './component/PaymentInComplete';
import LandingMain from './component/LandingMain';
import VideoPlayer from './component/VideoPlayer';
import RecordedVideos from './component/RecordedVideos';
import OneSignal from 'react-native-onesignal';

export default class App extends Component {

  constructor(properties) {
    super(properties);
    //Remove this method to stop OneSignal Debugging 
    OneSignal.setLogLevel(6, 0);
    
    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init("2abdbd29-7d40-47da-bd87-e8c0e58de0a3");
  }

  render(){
    return (
      // <View>
        <Router>
          <Scene key = "root">

            <Scene type = "reset" key = "Landing" component = {Landing} title = "Landing" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null} />
            <Scene type = "reset" key = "Live1" component = {Live1} title = "Live1" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null}/>
            <Scene type = "reset" key = "LandingMain" component = {LandingMain} title = "LandingMain" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null} />
            <Scene type = "reset" key = "RecordedVideos" component = {RecordedVideos} title = "RecordedVideos" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null} />
            <Scene type = "reset" key = "VideoPlayer" component = {VideoPlayer} title = "VideoPlayer" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null} />
            <Scene type = "reset" key = "Signin" component = {Signin} title = "Signin" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null} />
            <Scene type = "reset" type = "reset" key = "Payment" component = {Payment} title = "Payment" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null} />
            <Scene type = "reset" key = "Checkout" component = {Checkout} title = "Checkout" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null} />
            <Scene type = "reset" key = "PaymentComplete" component = {PaymentComplete} title = "PaymentComplete" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null} />
            <Scene type = "reset" key = "PaymentInComplete" component = {PaymentInComplete} title = "PaymentInComplet" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null} />
            <Scene type = "reset" key = "Register" component = {Register} title = "Register" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null} />
            <Scene type = "reset" key = "Profile" component = {Profile} title = "Profile" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null} />
            <Scene type = "reset" key = "Favourite" component = {Favourite} title = "Favourite" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null} />
            <Scene type = "reset" key = "BottomNavigator" component = {BottomNavigator} title = "BottomNavigator" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null}/>
            <Scene type = "reset" key = "Homepage" component = {Homepage} title = "homepage" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null}/>
            <Scene type = "reset" key = "subject" component = {Subject} title = "subject" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null}/>
            <Scene type = "reset" key = "Video" component = {Video} title = "Video" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null}/>
            <Scene type = "reset" key = "Test" component = {Test} title = "Test" hideNavBar duration = {0} swipeEnabled={false} animationEnabled={false} panHandlers={null}/>
          </Scene>
        </Router>
      // </View>

    );
  }
}