import * as React from 'react'
import { Input, Button } from 'antd'
import { autobind } from 'core-decorators'
import Page from '../../../components/Page'
import Cord from '../../../components/Cord'
import './style.styl'

@autobind
export default class  extends React.Component {

  changeInput(){

  }
  render() {
    return (
      <Page className="tag-box flex jc-between">
        <div className="flex-g-1 tag-input">
          <Cord name="添加标签">
            <div className="flex">
              <Input className="flex-g-1" onChange={ this.changeInput } placeholder="请输入标签名称" />
              <Button className="tag-btn" type="primary">提交</Button>
            </div>
            <p className="tap-dec">添加文章所需的标签，方便检索</p>
          </Cord>
        </div>
        <div className="flex-col-7 tag-show">
          <Cord name="所有标签">
            <div className="flex wrap tag-list">
              <div className="tag-item">webpack</div>
              <div className="tag-item">webpack</div>
              <div className="tag-item">webpack</div>
              <div className="tag-item">webpack</div>
              <div className="tag-item">webpack</div>
              <div className="tag-item">webpack</div>
            </div>
          </Cord>
        </div>
      </Page>
    );
  }
}