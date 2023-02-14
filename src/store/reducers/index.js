import { combineReducers } from "redux";
import auth from "./auth";
import consents from "./consents";
import location from "./location";

export default combineReducers ({
    auth,
    location,
    consents
})
