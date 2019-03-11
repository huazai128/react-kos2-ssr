import * as React from 'React'
import { autobind } from 'core-decorators'
import Page from '../../../components/Page'
import Input from '../../../components/Input'
import "./style.styl"
const { Component,Fragment } = React

@autobind
export default class extends Component {
  onChangeInput(txt:string){
    console.log("txt", txt);
  }
  componentDidMount(){
  }
  render() {
    return (
      <Page className="login-box flex-center">
        <section className="login-main">
          <h2 className="flex-center">技术文章管理后台</h2>
          <div className="from-group flex-vcenter">
            <Fragment>
              <label >用户名：</label>
              <Input onChange={ this.onChangeInput } placeholder="请输入用户名" />
            </Fragment>
          </div>
          <div className="from-group flex-vcenter">
            <Fragment>
              <label>密码：</label>
              <Input onChange={ this.onChangeInput } type="password" placeholder="请输入密码" />
            </Fragment>
          </div>
        </section>
      </Page>
    );
  }
}

