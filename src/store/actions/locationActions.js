import axios from "axios";
import { RNToasty } from "react-native-toasty";
import http from "../../utils/api";
import { DISTRICTS, EMPTY_CONSENTS, HALKAS, LOADING, TEHSILS, TREE_DATA, VILLAGES, VISTARAK } from "../types";

export const GetDistrictsApi = () => dispatch => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  dispatch({
    type: EMPTY_CONSENTS
  })
  http.get("district")
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: DISTRICTS,
          payload: response.data.data,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
      } else {
        dispatch({
          type: LOADING,
          payload: false,
        });
        RNToasty.Info({
          title: response.data.message,
          duration: 2,
        });
      }
    })
    // .then(dispatch(GetSubmittedDocx2()))
    .catch(error => {
      dispatch({
        type: LOADING,
        payload: false,
      });
      console.log("err1", error.response)
      RNToasty.Info({
        title: error.response.data.message,
        duration: 2,
      });
    })
};


export const GetTehsilsApi = (dId) => dispatch => {
  dispatch({
    type: EMPTY_CONSENTS
  })
  // dispatch({ 
  //     type: LOADING,
  //     payload: true,
  // });
  http.get(`tehsil?d_id=${dId}`)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: TEHSILS,
          payload: response.data.data,
        });
        // dispatch({ 
        //     type: LOADING,
        //     payload: false,
        // });
      } else {
        //   dispatch({ 
        //       type: LOADING,
        //       payload: false,
        //   });
        RNToasty.Info({
          title: response.data.message,
          duration: 2,
        });
      }
    })
    // .then(dispatch(GetSubmittedDocx2()))
    .catch(error => {
      // dispatch({ 
      //     type: LOADING,
      //     payload: false,
      // });
      console.log("err1", error.response)
      RNToasty.Info({
        title: error.response.data.message,
        duration: 2,
      });
    })
};


export const GetVillagesApi = (tId) => dispatch => {
  dispatch({
    type: EMPTY_CONSENTS
  })
  http.get(`village?t_id=${tId}`)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: VILLAGES,
          payload: response.data.data,
        });
        // RNToasty.Success({
        //   title: response.data.message,
        //   duration: 2,
        // });

      } else {
        RNToasty.Info({
          title: response.data.message,
          duration: 2,
        });
      }
    })
    // .then(dispatch(GetSubmittedDocx2()))
    .catch(error => {
      console.log("err1", error.response)
      RNToasty.Info({
        title: error.response.data.message,
        duration: 2,
      });
    })
};


export const GetHalkasApi = (tId) => dispatch => {
  // alert(tId)
  dispatch({
    type: EMPTY_CONSENTS
  })
  http.get(`halka?v_id=${tId}`)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: HALKAS,
          payload: response.data.data,
        });
        // RNToasty.Success({
        //   title: response.data.message,
        //   duration: 2,
        // });

      } else {
        RNToasty.Info({
          title: response.data.message,
          duration: 2,
        });
      }
    })
    // .then(dispatch(GetSubmittedDocx2()))
    .catch(error => {
      console.log("err1", error.response)
      RNToasty.Info({
        title: error.response.data.message,
        duration: 2,
      });
    })
};

export const GetVistarakApi = (tId) => dispatch => {
  // alert(tId)
  dispatch({
    type: EMPTY_CONSENTS
  })
  http.get(`vistarak?t_id=${tId}`)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: VISTARAK,
          payload: response.data.data,
        });
        // RNToasty.Success({
        //   title: response.data.message,
        //   duration: 2,
        // });

      } else {
        RNToasty.Info({
          title: response.data.message,
          duration: 2,
        });
      }
    })
    // .then(dispatch(GetSubmittedDocx2()))
    .catch(error => {
      console.log("err1", error.response)
      RNToasty.Info({
        title: error.response.data.message,
        duration: 2,
      });
    })
};

export const GetAllTreeApi = () => dispatch => {
  // alert(tId)
  dispatch({
    type: EMPTY_CONSENTS
  })
  http.get(`tree`)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: TREE_DATA,
          payload: response.data.data,
        });
        // RNToasty.Normal({
        //   title: response.data.message,
        //   duration: 2,
        // });

      } else {
        RNToasty.Info({
          title: response.data.message,
          duration: 2,
        });
      }
    })
    // .then(dispatch(GetSubmittedDocx2()))
    .catch(error => {
      console.log("err1", error.response)
      RNToasty.Info({
        title: error.response.data.message,
        duration: 2,
      });
    })
};

export const AddConcentApi = (post,navigation=null) => async dispatch => {

  // dispatch({
  //     type: LOADING,
  //     payload: true
  // })
  console.log("possss", post)
  http.post(`add-consent-data`, post, {
    enctype: "multipart/form-data",
    headers: {
      "Content-Type": "multipart/form-data",
      "Content-Disposition": "form-data",
    },
  })
    .then(response => {
      if (response.data.success) {
       navigation&& navigation.goBack()
        RNToasty.Normal({
          title: response.data.message,
          duration: 2
        })
        // dispatch({
        //     type: LOADING,
        //     payload: false
        // })
      }
      else {
        // dispatch({
        //     type: LOADING,
        //     payload: false
        // })
        RNToasty.Info({
          title: response.data.message,
          duration: 2
        })
      }
    })
    .catch((error) => {
      console.log("err1", error.response)
      RNToasty.Info({
        title: error.response.data.message,
        duration: 2,
      });
    })
}

export const GetCurrentAddress = (latitude, longitude, cb) => dispatch => {

  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=AIzaSyAatarUnfCi0opdn9JPy6GNuwf0q3r6RBg`)
    .then(response => {
      let addressComp = response.data.results[0].formatted_address
      cb && cb(addressComp)
    })
    .catch(error => {
      console.log("err1", error.response)
      RNToasty.Info({
        title: error.response.data.message,
        duration: 2,
      });
    })
};
