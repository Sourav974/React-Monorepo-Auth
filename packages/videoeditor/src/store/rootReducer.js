import {combineReducers} from "redux";
import authSlice from '../app/authmodules/redux/authSlice';
export const rootReducer = combineReducers({
    auth:authSlice.reducer //auth
})