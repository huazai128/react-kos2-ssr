import * as React from 'react'
import classnames from 'classnames'
const { Component } = React;

interface PageProps {
  className?: string;
}

export default class extends Component<PageProps,any> {
  constructor(props:PageProps){
    super(props);
  }
  // static defaultProps = {
  //   className: ""
  // }
  render() {
    const { className } = this.props;
    const cls = classnames("main-box",className)
    return (
      <main className={ cls }>{ this.props.children }
      </main>
    );
  }
}
