import * as React from 'react';
import $http from '@/utils/axios/index';
import { withRouter } from 'react-router-dom';
import { Layout, Icon, Row, Col, message } from 'antd';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
const { Header } = Layout;

@withRouter
@CSSModules(styles,{'allowMultiple': true})
class Cuslayout extends React.Component {
    constructor (props) {
        super(props);
    }
  handleLogout = () => {
      $http('logout').then(() => {
          message.success('退出成功');
          window.location.href = '/login';
      });
  };
  render () {
      return (
          <Header styleName="layout-header">
              <Row>
                  <Col span={8}>
                      <Icon
                          styleName="icons"
                          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                          onClick={this.props.toggle}
                      />
                  </Col>
                  <Col span={8} offset={8} styleName="userinfo">
                      <Icon type="user" styleName="icons" />
                      <Icon
                          type="poweroff"
                          styleName="icons"
                          onClick={this.handleLogout}
                      />
                  </Col>
              </Row>
          </Header>
      );
  }
}

export default Cuslayout;
