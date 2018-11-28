import * as React from 'react';
import { connect } from 'react-redux';
import actions from '@/store/action/index';
import asyncComponents from '@/components/asyncComponents';
const Login = asyncComponents('login');
const Layout = asyncComponents('layout');
class Beforerouter extends React.PureComponent {
    constructor (props) {
        super(props);
    }
  url = '';
  getComponentName = () => {
      const { permission, dispatch, match } = this.props;
      const pathname = (this.url = match.url);
      let name = '';
      if (pathname === '/' || pathname === '/login') {
          name = Login;
      } else {
          if (!permission.menu.length) {
              dispatch(actions.getUser()).then(res => {
                  if (!res.enterpriseNo) {
                      window.location.href = '/login';
                      return;
                  } else {
                      dispatch(actions.getPermission()).then(() => {
                          name = Layout;
                      });
                  }
              });
          } else {
              name = Layout;
          }
      }
      return name;
  };
  render () {
      const Mycomponent = this.getComponentName();
      return <div>{Mycomponent ? <Mycomponent /> : null}</div>;
  }
}

const mapStateToProps = state => ({
    permission: state.permission
});

export default connect(mapStateToProps)(Beforerouter);
