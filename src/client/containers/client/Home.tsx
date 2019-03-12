import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { request } from '../../../server/utils/request'

interface HomeProps {
  appStore: any,
  match: any
}

@inject('appStore')
@observer
export default class Home extends React.Component<HomeProps, any> {
  componentWillReceiveProps(nextProps) {
  }

  async componentDidMount() {
    const res = request("/api/user/login");
    console.log(res);
    console.log("=====")
  }

  render() {
    return (
      <section className='lt-main page-home'>
        <h3>首页----华仔</h3>
      </section>
    )
  }
}
