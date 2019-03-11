import * as React from 'react'
import { withRouter, Link } from 'react-router-dom'

// @withRouter
export default class extends React.Component {
  state = {  }
  render() {
    // const {  } = this.props;
    // console.log(this.props);
    return (
      <div className="bread-box flex">
        <div className="bread-swiper">
          <div className="swipe-item">
            <Link to="/admin">首页 <span>X</span></Link>
          </div>
          <div className="swipe-item">
            <Link to="/admin">首页 <span>X</span></Link>
          </div>
          <div className="swipe-item">
            <Link to="/admin">首页 <span>X</span></Link>
          </div>
          <div className="swipe-item">
            <Link to="/admin">首页 <span>X</span></Link>
          </div>
          <div className="swipe-item">
            <Link to="/admin">首页 <span>X</span></Link>
          </div>
          <div className="swipe-item">
            <Link to="/admin">首页 <span>X</span></Link>
          </div>
          <div className="swipe-item">
            <Link to="/admin">首页 <span>X</span></Link>
          </div>
          <div className="swipe-item">
            <Link to="/admin">首页 <span>X</span></Link>
          </div>
          <div className="swipe-item">
            <Link to="/admin">首页 <span>X</span></Link>
          </div>
          <div className="swipe-item">
            <Link to="/admin">首页 <span>X</span></Link>
          </div>
        </div>
      </div>
    );
  }
}