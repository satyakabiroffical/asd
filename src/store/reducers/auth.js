import {
  LOADING, AUTH_TOKEN, USER_DATA
  } from '../types.js';
  
  const initialState = {
    userData: {},
    token: null,
    loading: false,
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case AUTH_TOKEN:
        return {
          ...state,
          token: action.payload,
      };
      case LOADING:
        return {
          ...state,
          loading: action.payload,
      };
      default:
        return state;
    }
  }
    