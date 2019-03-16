import * as React from 'react'
import { autobind } from 'core-decorators'
import Page from '../../../components/Page'
import { Select,Input,Button, Checkbox } from 'antd'
// const Option = Select.Option;
const Search = Input.Search;

import './style.styl'

@autobind
export default class extends React.Component {
  handleChange(){

  }
  onSearch(){

  }
  onCheck(){

  }
  onCheckItem(){

  }
  render() {
    return (
      <Page className="admin-box flex-col">
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
        <section className="flex-g-1 article-cont">
          <div className="article-lists">
            <table>
              <thead>
                <tr>
                  <th width="8%"><Checkbox onChange={this.onCheck}>ID</Checkbox></th>
                  <th width="30%">标题</th>
                  <th width="30%">内容</th>
                  <th>发表日期</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Checkbox onChange={this.onCheckItem}>1</Checkbox></td>
                  <td>webpack优化</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <Button type="danger" className="article-btn">删除</Button>
                    <Button type="primary" className="article-btn">编辑</Button>
                  </td>
                </tr>
                <tr>
                  <td><Checkbox onChange={this.onCheckItem}>1</Checkbox></td>
                  <td>webpack优化</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <Button type="danger" className="article-btn">删除</Button>
                    <Button type="primary" className="article-btn">编辑</Button>
                  </td>
                </tr>
                <tr>
                  <td><Checkbox onChange={this.onCheckItem}>1</Checkbox></td>
                  <td>webpack优化</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <Button type="danger" className="article-btn">删除</Button>
                    <Button type="primary" className="article-btn">编辑</Button>
                  </td>
                </tr>
                <tr>
                  <td><Checkbox onChange={this.onCheckItem}>1</Checkbox></td>
                  <td>webpack优化</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <Button type="danger" className="article-btn">删除</Button>
                    <Button type="primary" className="article-btn">编辑</Button>
                  </td>
                </tr>
                <tr>
                  <td><Checkbox onChange={this.onCheckItem}>1</Checkbox></td>
                  <td>webpack优化</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <Button type="danger" className="article-btn">删除</Button>
                    <Button type="primary" className="article-btn">编辑</Button>
                  </td>
                </tr>
                <tr>
                  <td><Checkbox onChange={this.onCheckItem}>1</Checkbox></td>
                  <td>webpack优化</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <Button type="danger" className="article-btn">删除</Button>
                    <Button type="primary" className="article-btn">编辑</Button>
                  </td>
                </tr>
                <tr>
                  <td><Checkbox onChange={this.onCheckItem}>1</Checkbox></td>
                  <td>webpack优化</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <Button type="danger" className="article-btn">删除</Button>
                    <Button type="primary" className="article-btn">编辑</Button>
                  </td>
                </tr>
                <tr>
                  <td><Checkbox onChange={this.onCheckItem}>1</Checkbox></td>
                  <td>webpack优化</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <Button type="danger" className="article-btn">删除</Button>
                    <Button type="primary" className="article-btn">编辑</Button>
                  </td>
                </tr>
                <tr>
                  <td><Checkbox onChange={this.onCheckItem}>1</Checkbox></td>
                  <td>webpack优化</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <Button type="danger" className="article-btn">删除</Button>
                    <Button type="primary" className="article-btn">编辑</Button>
                  </td>
                </tr>
                <tr>
                  <td><Checkbox onChange={this.onCheckItem}>1</Checkbox></td>
                  <td>webpack优化</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <Button type="danger" className="article-btn">删除</Button>
                    <Button type="primary" className="article-btn">编辑</Button>
                  </td>
                </tr>
                <tr>
                  <td><Checkbox onChange={this.onCheckItem}>1</Checkbox></td>
                  <td>webpack优化</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <Button type="danger" className="article-btn">删除</Button>
                    <Button type="primary" className="article-btn">编辑</Button>
                  </td>
                </tr>
                <tr>
                  <td><Checkbox onChange={this.onCheckItem}>1</Checkbox></td>
                  <td>webpack优化</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <Button type="danger" className="article-btn">删除</Button>
                    <Button type="primary" className="article-btn">编辑</Button>
                  </td>
                </tr>
                <tr>
                  <td><Checkbox onChange={this.onCheckItem}>1</Checkbox></td>
                  <td>webpack优化</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <Button type="danger" className="article-btn">删除</Button>
                    <Button type="primary" className="article-btn">编辑</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="article-pagination">
          当前区域为分页
        </section>
      </Page>
    );
  }
}