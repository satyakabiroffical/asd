import {
   CONSENTS_LIST, CONSENT_DETAIL, EMPTY_CONSENTS
  } from '../types.js';
  
  const initialState = {
    consentsList: null,
    consentDetail: null
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case CONSENTS_LIST:
        return {
          ...state,
          consentsList: action.payload,
      };
      case CONSENT_DETAIL:
        return {
          ...state,
          consentDetail: action.payload,
      };
      case EMPTY_CONSENTS:
        return {
          ...state,
          consentsList: null,
          consentDetail: null
      };
      default:
        return state;
    }
  }
    