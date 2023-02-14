import AsyncStorage from "@react-native-async-storage/async-storage"
import { RNToasty } from "react-native-toasty"
import http from "../../utils/api"
import { AUTH_TOKEN, LOADING } from "../types"

export const checkToken =  () => dispatch => {
    AsyncStorage.getItem("@USER_TOKEN").then(userToken => {
        if(userToken){
            dispatch({
                type: AUTH_TOKEN,
                payload: userToken
            })
        }
    })
}

export const removeToken =  () => dispatch => {
    dispatch({
        type: AUTH_TOKEN,
        payload: null
    })
    AsyncStorage.removeItem("@USER_TOKEN")
}

      
export const SigninApi = (postData) => dispatch => {
    dispatch({
        type: LOADING,
        payload: true
    })
    http.post('login', postData)
    .then(async response => {
        if(response.data.success) {
            await AsyncStorage.setItem('@USER_TOKEN', "token")
            dispatch({ 
              type: AUTH_TOKEN,
              payload: "token",
            });
            dispatch({
                type: LOADING,
                payload: false
            })
            RNToasty.Success({
                title: response.data.message,
                duration: 2,
            });    
                    //    RootNavigation.navigate("Login")
        } else {
            dispatch({ 
                type: LOADING,
                payload: false,
            });
            RNToasty.Error({
                title: response.data.message,
                duration: 2,
            }); 
        }
    })
    .catch(error => {
    //   console.log("error", error.response)
      RNToasty.Error({
        title: error.response.data.msg,
        duration: 2,
    }); 
      dispatch({ 
        type: LOADING,
        payload: false,
        });
    })
}
