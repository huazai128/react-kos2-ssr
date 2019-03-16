import * as React from 'react'

export interface CordProps {
  name: string;
  className?: string;
  children: React.ReactNode;
}

export default class extends React.Component<CordProps, any> {
  
  render() {
    const { name, children, className } = this.props;
    return (
      <div className={ `cord-box ${ className }` }>
        <div className="cord-head flex-vcenter jc-between">
          <p>{ name }</p>
          <div className="">操作</div>
        </div>
        <div className="cord-cont">
          { children }
        </div>
      </div>
    );
  }
}