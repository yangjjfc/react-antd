import React from 'react';
import Loadable from 'react-loadable'; // 懒加载
import Errpages from '../errpages';
const MyLoadingComponent = ({ isLoading, error }) => {
    if (error) {
        return <Errpages/>;
    } else {
        return null;
    }
};
export default path =>Loadable({
    loader: () => import(`@/pages/${path}`),
    loading: MyLoadingComponent
});