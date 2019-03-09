import * as React from 'react'
import classnames from 'classnames'
import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'

export interface InputProps{
  className?: string;
  placeholder?: string;
  onChange: (txt: string) => void;
}

export default class index extends React.Component<InputProps,any> {
  private input: HTMLInputElement;
  static defaultProps = {
    placeholder: '请输入...',
  }
  componentDidMount(){
    fromEvent(this.input,"input").pipe(
      map((e) => e.target)
    ).subscribe((txt) => {
      this.props.onChange("huazai");
    })
  }
  render() {
    const { className, placeholder,  } = this.props;
    const cls = classnames("input-box",className)
    return (
      <input 
        className={ cls } 
        ref={ (r) => this.input = r }
        placeholder={ placeholder } />
    );
  }
}