import * as React from 'react'
import { autobind } from 'core-decorators'
import Page from '../../../components/Page'
import { Select,Input,Button } from 'antd'
// const Option = Select.Option;
const Search = Input.Search;

import './style.styl'

@autobind
export default class extends React.Component {
  handleChange(){

  }
  onSearch(){

  }
  render() {
    return (
      <Page className="admin-box">
        <section className="admin-head flex wrap">
          <div className="search-group">
            <span className="search-lable">标签</span>
            <Select 
              className="select"
              mode="multiple"
              placeholder="请选择标签"
              defaultValue={['a10', 'c12']}
              onChange={this.handleChange} >
              </Select>
          </div>
          <div className="flex-hcenter search-group">
            <Search  
              placeholder="请输入搜索关键字..."
              onSearch={this.onSearch}/>
          </div>
          <div className="search-group">
            <Button type="primary">新增文章啊</Button>
          </div>
        </section>
        <section className="">
        
        </section>
      </Page>
    );
  }
}