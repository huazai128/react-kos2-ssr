import * as React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { autobind } from 'core-decorators'

// @withRouter
@autobind
export default class extends React.Component {
  private cont: HTMLDivElement;
  componentDidMount() {
    // this.initTouch();
    this.initMouse();
  }
  close(){
  }
  // initTouch(){
  //   const mouseDown = fromEvent(this.cont, 'mousedown');
  //   const mouseMove = fromEvent(document, 'mousemove');
  //   const mouseUp = fromEvent(document, 'mouseup');
  //   mouseDown.pipe(
  //     map(e => mouseMove.pipe(
  //       takeUntil(mouseUp)
  //     )),
  //     concatAll(),
  //     withLatestFrom(mouseDown,(down,move) => {
  //       return {
  //       }
  //     }),
  //   ).subscribe((res) => {
  //   })
  // }
  initMouse(){
    
  }
  render() {
    return (
      <div className="bread-box flex">
        <div className="swiper-com flex-center">{ "<" }</div>
        <div className="bread-swiper flex-g-1">
          <div className="flex">
            <div className="swipe-item">
              <Link to="/admin">首页</Link>
            </div>
          </div>
        </div>
        <div className="nav-right flex">
          <div className="swiper-com flex-center">></div>
          <div className="nav-close flex-center">关闭操作</div>
          <div className="logout flex-center">退出</div>
        </div>
      </div>
    );
  }
}