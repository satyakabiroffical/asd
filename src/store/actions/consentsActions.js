import { RNToasty } from "react-native-toasty";
import http from "../../utils/api";
import { CONSENTS_LIST, CONSENT_DETAIL, EMPTY_CONSENTS } from "../types";


export const GetConsentsApi = (vId) => dispatch => {
  dispatch({
    type: EMPTY_CONSENTS
  })
  http.get(`consent?v_id=${vId}`)
    .then(response => {
      if (response.data.success) {
        dispatch({
          type: CONSENTS_LIST,
          payload: response.data.data,
        });
        //   RNToasty.Success({
        //     title: response.data.message,
        //     duration: 2,
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



export const GetConsentDetailApi = (cId) => dispatch => {
  http.get(`consent-detail?c_id=${cId}`)
    .then(response => {
      if (response.data.success) {
        console.log(response.data)
        dispatch({
          type: CONSENT_DETAIL,
          payload: response.data.data,
        });
        //   RNToasty.Normal({
        //     title: response.data.message,
        //     duration: 2,
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



export const AddPlantationDataApi = (postData, navigation) => dispatch => {
  http.post(`add-plantation-data`, postData, {
    enctype: "multipart/form-data",
    headers: {
      "Content-Type": "multipart/form-data",
      "Content-Disposition": "form-data"
    }
  })
    .then(response => {
      if (response.data.success) {
        console.log(response.data)
        navigation && navigation.goBack()
        RNToasty.Normal({
          title: response.data.message,
          duration: 2,
          position: 'center'
        });

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

