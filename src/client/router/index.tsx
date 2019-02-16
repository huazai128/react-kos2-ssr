import * as React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Home from '../containers/client/Home'
import routes from './routes'

interface RouterProps {
  location: any
}

class Routes extends React.Component<RouterProps, any> {
  constructor(props) {
    super(props)
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }
  routerWillLeave() {
    console.log("======")
  }

  render() {
  
    const { location } = this.props
    return (
      <Switch location={location}>
        { routes.map((item, index) => (
          <Route exact={ item.exact } path={ item.path } component={item.component} />
        )) }
      </Switch>
    )
  }
}

export default withRouter(Routes)
