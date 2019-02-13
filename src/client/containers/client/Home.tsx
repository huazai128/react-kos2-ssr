import * as React from 'react'
import { Link } from 'react-router-dom'
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
        <h3>1发vfv  adada====</h3>
      </section>
    )
  }
}
