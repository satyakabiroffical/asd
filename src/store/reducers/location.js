import {
   DISTRICTS, HALKAS, TEHSILS, TREE_DATA, VILLAGES, VISTARAK
  } from '../types.js';
  
  const initialState = {
    districts: null,
    tehsils: null,
    halkas: null,
    villages: null,
    vistarak:null,
    treedata:[]
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case DISTRICTS:
        return {
          ...state,
          districts: action.payload,
          tehsils: null,
          halkas: null,
          villages: null
      };
      case TEHSILS:
        return {
          ...state,
          tehsils: action.payload,
          halkas: null,
          villages: null
      };
      case HALKAS:
        return {
          ...state,
          halkas: action.payload,
      };
      case VISTARAK:
        return {
          ...state,
          vistarak: action.payload,
      };
      case VILLAGES:
        return {
          ...state,
          villages: action.payload,
      };
      case TREE_DATA:
        return {
          ...state,
          treedata: action.payload,
      };
      default:
        return state;
    }
  }
    