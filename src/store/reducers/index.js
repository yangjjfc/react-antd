import { combineReducers } from 'redux';
import * as ActionType from '../action-types';

const currentUser = (state = {}, action) => {
    switch (action.type) {
    case ActionType.USER_INFO:
        return { ...action.msg };
    default:
        return state;
    }
};

const defaultState = {
    menu: [],
    button: []
};
const permission = (state = defaultState, action) => {
    switch (action.type) {
    case ActionType.USER_MENU:
    case ActionType.USER_BUTTON_PERMISSION:
        return { ...state, ...{ [action.datatype]: action.msg } };
    default:
        return state;
    }
};
const routers = (state = {}, action) => {
    switch (action.type) {
    case ActionType.USER_PATHNAME:
        return { ...state, ...action.msg };
    default:
        return state;
    }
};

const defaultState_app = {
    collapsed: false, // false,展开 true,缩起
    device: 'desktop'
};
const app = (state = defaultState_app, action) => {
    switch (action.type) {
    case ActionType.USER_EXPANSION:
    case  ActionType.USER_DEVICE:
        return { ...state, ...action.msg };
    default:
        return state;
    }
};
const rootReducer = combineReducers({
    currentUser,
    permission,
    routers,
    app
});

export default rootReducer;
