import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import InfoForm from './InfoForm'
import './App.css';

const {Header, Content} = Layout;


class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header>
            <div className="logo"/>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{lineHeight: '64px'}}
            >
              <Menu.Item key="1">日报生成器</Menu.Item>
              {/*<Menu.Item key="2">关于我们</Menu.Item>*/}
              {/*<Menu.Item key="3">储存你的信息</Menu.Item>*/}
            </Menu>
          </Header>
          <Content
            style={{ padding: '50px' }}
          >
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>信息填写</Breadcrumb.Item>
            </Breadcrumb>
            <InfoForm/>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
