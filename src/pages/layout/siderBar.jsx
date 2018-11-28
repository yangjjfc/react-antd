import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import actions from '@/store/action/index';
import { Scrollbars } from 'react-custom-scrollbars';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

@withRouter
@CSSModules(styles,{'allowMultiple': true})
class SiderBar extends React.Component {
    constructor (props) {
        super(props);
    }
  static defaultProps = {
      collapsed: false
  };
  state = {
      checked: this.props.match.url
  };

  // 菜单点击
  handleMenu = ({ key }) => {
      const { history, dispatch } = this.props;
      history.push(key);
      dispatch(actions.setPathName({ name: key }));
  };
  // 渲染菜单
  renderMenu = menu => {
      let defaultOpenKeys = []; // 默认展开SubMenu
      const $menu = menu.map((item, index) => {
          if (item.children && item.children.length) {
              const { keys, menus } = this.renderMenu(item.children);
              defaultOpenKeys = keys.length ? keys : defaultOpenKeys;
              return (
                  <SubMenu
                      key={item.no}
                      title={
                          <span>
                              <Icon type="appstore" />
                              <span>{item.label}</span>
                          </span>
                      }
                  >
                      {menus}
                  </SubMenu>
              );
          } else {
              if (item.funcUrl === this.props.match.url) {
                  // 获取默认展开,三级菜单TODO
                  defaultOpenKeys = [item.parentNo];
              }
              return (
                  <Menu.Item key={item.funcUrl}>
                      <Icon type="user" />
                      <span>{item.label}</span>
                  </Menu.Item>
              );
          }
      });
      return {
          keys: defaultOpenKeys,
          menus: $menu
      };
  }
    handleToggle = () => {
        if (this.props.app.device === 'mobile') {
            this.props.toggle();
        }
    }
    setSiderClass = () => {
        const {collapsed,device}=this.props.app;
        let className = '';
        if (collapsed) {
            if (device === 'mobile') {
                className = 'layout-sider is-collapsed isMobile';
            } else {
                className = 'layout-sider is-collapsed';
            }
        } else {
            className = 'layout-sider';
        }
        return className;
    }
    render () {
        const { menu } = this.props.permission;
        const {collapsed,device}=this.props.app;
        const { keys, menus } = this.renderMenu(menu);
        
     
        return (
            <div onClick={this.handleToggle}>
                {(device === 'mobile' && !collapsed) ? <div styleName="drawer-bg"></div> : null}
                <Scrollbars autoHide autoHideTimeout={500} styleName={this.setSiderClass()}>
                    <Sider
                        trigger={null}
                        collapsible={true}
                        collapsed={this.props.collapsed}
                    >
                        <div styleName="logo">REACT</div>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={[this.state.checked]}
                            defaultOpenKeys={keys}
                            onSelect={this.handleMenu}
                        >
                            {menus}
                        </Menu>
                    </Sider>
                </Scrollbars>
            </div>
        );
    }
}

export default SiderBar;
