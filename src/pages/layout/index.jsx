import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import asyncComponents from '@/components/asyncComponents';
import actions from '@/store/action/index';
import SiderBar from './siderBar';
import Header from './header';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
const { Content } = Layout;

const { body } = document;
const WIDTH = 1024;
const RATIO = 3;
const mapStateToProps = state => ({
    permission: state.permission,
    app: state.app
});

@withRouter
@connect(mapStateToProps)
@CSSModules(styles, { allowMultiple: true })
class Cuslayout extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            collapsed: false
        };
        window.addEventListener('resize', this.resizeHandler); // todu 节流
        this.dispatch = this.props.dispatch;
    }
    isMobile () {
        const rect = body.getBoundingClientRect();
        return rect.width - RATIO < WIDTH;
    }
    resizeHandler = () => {
        if (!document.hidden) {
            const isMobile = this.isMobile();
            this.dispatch(actions.toggleDevice(isMobile ? 'mobile' : 'desktop'));
            if (isMobile) {
                this.dispatch(actions.closeSideBar());
            }
        }
    }
    // 展开
    toggleExpansion = () => {
        this.dispatch(actions.toggleExpansion());
    };
    // 获取href
    getLocationHref = () => {
        const $url = this.props.match.url.replace('/', '');
        return asyncComponents($url);
    };
    // 设置右边contant样式
    setRightContantClass = () => {
        const { collapsed, device } = this.props.app;
        let className = '';
        if (device === 'mobile') {
            className='layout-container-right isMobile';
        } else if (collapsed) {
            className='layout-container-right retraction';
        } else {
            className='layout-container-right';
        }
        return className;
    }
    componentWillMount () {
        this.resizeHandler();
    }
    render () {
        const { collapsed } = this.props.app;
        const MyComponents = this.getLocationHref();
        return (
            <Layout styleName="layout-container">
                <SiderBar {...this.props} collapsed={collapsed} toggle={this.toggleExpansion}/>
                <Layout
                    styleName={
                        this.setRightContantClass()
                    }
                >
                    <Header toggle={this.toggleExpansion}  collapsed={collapsed} />
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280
                        }}
                    >
                        {MyComponents ? <MyComponents /> : null}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Cuslayout;
