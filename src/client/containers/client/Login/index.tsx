import * as React from 'react'
import { observer, inject } from 'mobx-react'
import './style.less'

@inject((stores:any) => {
  login: stores.loginStore
})
export default class index extends React.Component {
  state = {  }
  componentDidMount(){
    console.log("")
  }
  render() {
    return (
      <div className="login-box">
        <div className="login-head flex-hcenter">登录</div>
        <main className="login-main flex-center">
          <div className="">
            
          </div>
        </main>
      </div>
    );
  }
}