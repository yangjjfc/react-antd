import React from 'react';
import { Row, Col, Button } from 'antd';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
@CSSModules(styles)
class Err404 extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        let size = {
            lg: 12,
            sm: 24
        };
        return (
            <div styleName="err">
                <Row>
                    <Col  sm={size.sm} lg={size.lg} >
                        <div styleName="bg"></div>
                    </Col>
                    <Col sm={size.sm} lg={size.lg} styleName="err-right">
                        <div styleName="name">404</div>
                        <div styleName="info">抱歉，你访问的页面不存在</div>
                        <div>
                            <Button type="primary">返回首页</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default Err404;
