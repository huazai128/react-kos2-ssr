import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'
import './style.styl'

interface NavProps {
  routes: RouteConfig[];
}

export default class extends React.Component<NavProps,any> {
  render() {
    const { routes } = this.props;
    return (
      <section className="nav-box">
        <h3 className="flex-center">华仔</h3>
        { routes.map((item, index) => (
          <div className="nav-item" key={ index }>
            <NavLink 
              to={ item.path }
              className="item"
              activeClassName="action">首页</NavLink>
          </div>
        )) }
        
      </section>
    );
  }
}
