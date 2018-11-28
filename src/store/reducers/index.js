import { combineReducers } from 'redux';
import {default as user }  from '../action/user';
import {default as permission } from '../action/permission';
import {default as app } from '../action/app';


const rootReducer = combineReducers({
    user,
    permission,
    app
});

export default rootReducer;
