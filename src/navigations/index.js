import 'react-native-gesture-handler';
import React, { Component, useRef,useEffect } from 'react';
import { View, Text, Animated, Dimensions, StatusBar, TouchableOpacity } from "react-native"
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { connect, useDispatch } from 'react-redux';
import * as RootNavigation from '../navigations/rootNavigation';
import Loader from '../components/loader.js';
import { checkToken, removeToken } from '../store/actions/authActions';
import Login from '../screens/Login';
import Home from '../screens/Home';
import { COLORS } from '../constants';
import CameraView from '../screens/CameraView';
import Icons from '../components/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddConcernt from '../screens/AddConcernt';
import { useNavigation } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

const { width, height } = Dimensions.get('window')

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode={'none'}>
    <AuthStack.Screen name="Login" component={Login} />
  </AuthStack.Navigator>
);
const Stack = createStackNavigator();
const StackScreen = (props,) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, [])
  return (
    <Stack.Navigator
      headerMode="none">
      <Stack.Screen name="Home" component={Home} options={{
        headerShown: true,
        headerStyle: { backgroundColor: "#4f46e5" },
        headerTitleStyle: { color: COLORS.white },
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ backgroundColor: COLORS.white, height: height * .045, width: width * .27, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginRight: width * .035 }}
              onPress={() => navigation.navigate("AddConcernt")}
            >
              <Text style={{ color: COLORS.black, fontWeight: '500' }}>Add Concent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 20 }}
              onPress={() => dispatch(removeToken())}
            >
              <Icons name={"poweroff"} size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        )
      }}
      />
      <Stack.Screen name="AddConcernt" component={AddConcernt} options={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: true,
        headerStyle: { backgroundColor: "#4f46e5" },
        headerTitleStyle: { color: COLORS.white },
        headerTintColor: COLORS.white,
        title: "Add Concent"
      }}
      />
      <Stack.Screen name="CameraView" component={CameraView} />
    </Stack.Navigator>
  );
}


class mainStack extends Component {
  async componentDidMount() {
    this.props.checkToken()
    SplashScreen.hide();
  }
  render() {
    // console.log("00000",this.props.onboard_token)
    return (
      <>
        <StatusBar barStyle={'light-content'} backgroundColor={COLORS.primary} />
        {this.props.loading ? (
          <Loader />
        ) : this.props.token ? (
          <StackScreen />
        ) : (
          <AuthStackScreen />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  token: state.auth.token,
});
const mapDispatchToProps = {
  checkToken,
};
export default connect(mapStateToProps, mapDispatchToProps)(mainStack);