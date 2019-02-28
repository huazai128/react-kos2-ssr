import * as React from 'react'
import { inject, observer } from 'mobx-react'

interface HomeProps {
  appStore: any,
  match: any
}

@inject('appStore')
@observer
export default class Home extends React.Component<HomeProps, any> {
  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
  }

  render() {
    return (
      <section className='lt-main page-home'>
        <h3>首页----华仔</h3>
      </section>
    )
  }
}
