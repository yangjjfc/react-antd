import $http from '@/utils/axios/index';
import * as ActionType from '../action-types';
// 存储当前用户信息 action
export const setUser = msg => ({
    msg,
    type: ActionType.USER_INFO
});
export const setMenu = msg => ({
    msg,
    datatype: 'menu',
    type: ActionType.USER_MENU
});
export const setButton = msg => ({
    msg,
    datatype: 'button',
    type: ActionType.USER_BUTTON_PERMISSION
});
export const setPathName = msg => ({
    msg,
    type: ActionType.USER_PATHNAME
});

// 设备
export const toggleDevice = msg => ({
    msg: {
        device: msg
    },
    type: ActionType.USER_DEVICE
});
// 菜单
export const toggleExpansion = () => (dispatch, getState) => {
    let collapsed = getState().app.collapsed;
    dispatch({
        msg: { 
            collapsed: !collapsed
        },
        type: ActionType.USER_EXPANSION
    });
};

export const closeSideBar = () => ({
    msg: { 
        collapsed: true
    },
    type: ActionType.USER_EXPANSION
});

/**
 * action函数
 */
export const getUser = () => async (dispatch, getState) => {
    const { currentUser } = getState();
    if (!currentUser.enterpriseNo) {
        const res = await $http('currentUser', {});
        dispatch(setUser(res.data));
        return res.data;
    } else {
        return currentUser;
    }
};

const filterMenu = meun =>
    meun.filter(item => {
        if (item.children && item.children.length) {
            item.children = filterMenu(item.children);
        }
        return item.funcType === 'MENU';
    });
// 获取权限
export const getPermission = () => async (dispatch, getState) => {
    const { permission } = getState();
    if (permission.menu.length) {
        return permission;
    } else {
        const res = await $http('brp.user.getCurrentUserMenuRights');
        if (res.data) {
            dispatch(setMenu(filterMenu(res.data.menuTree)));
            dispatch(setButton(res.data.permissionList));
            return res.data;
        }
    }
};
