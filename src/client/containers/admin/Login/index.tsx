import * as React from 'React'
import { autobind } from 'core-decorators'
import Page from '../../../components/Page'
import Input from '../../../components/Input'
import "./style.styl"

@autobind
export default class extends React.Component {
  state = {  }

  onChangeInput(txt:string){

  }

  render() {
    return (
      <Page className="login-box flex-center">
        <section className="flex">
          <h2>技术文章管理后台</h2>
          <div className="">
            <Input onChange={ this.onChangeInput } />
          </div>
        </section>
      </Page>
    );
  }
}

