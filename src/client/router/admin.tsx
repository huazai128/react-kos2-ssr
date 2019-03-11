import * as React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Nav from '../components/Navs'
import Tabs from '../components/Tab'
import Bread from '../components/Breadcrumb'
import routes from './routesAdmin'

interface RouterProps {
    location: any
}

class Routes extends React.Component<RouterProps, any> {
  constructor(props) {
      super(props)
  }
  routerWillLeave() {
      console.log(121212)
  }
  render() {
    const { location:{ pathname },location} = this.props;
    return (
      <div className="flex admin-box">
        { !Object.is(pathname,'/admin/login') && <Nav routes={ routes.filter(item => !!item.name) } /> }
        <div className="flex-g-1 flex-col">
          { !Object.is(pathname,'/admin/login') && <>
            <Tabs />  
            <Bread />
          </>}
          <div className="flex-g-1 main-content">
            <Switch location={location}>
              { routes.map((item,index) => (
                <Route key={ index } exact={ item.exact } path={ item.path } component={ item.component }  />
              )) }
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Routes)   