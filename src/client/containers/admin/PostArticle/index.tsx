import * as React from 'react'
import { Input, Select, Upload, Icon, message } from 'antd'
import { autobind } from 'core-decorators'
import Page from '../../../components/Page'
import Cord from '../../../components/Cord'
import './style.styl'

const { TextArea } = Input;


@autobind
export default class extends React.Component {
  state = { 
    loading: false,
    imageUrl :""
  }
  handleChange(){

  }
  beforeUpload(file){
    const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJPG && isLt2M;
  }
  
  render() {
    const { imageUrl, loading } = this.state;
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Page className="post-box">
        <Cord name="新增文章">
          <div className="post-cont flex">
            <p className="flex-col-2 flex-vcenter">标题：</p>
            <Input className="flex-col-6" placeholder="请输入标题"/>
          </div>
          <div className="post-cont flex">
            <p className="flex-col-2 flex-vcenter">标签：</p>
            <Select 
              className="flex-col-6"
              mode="multiple"
              placeholder="请选择标签"
              defaultValue={['a10', 'c12']}
              onChange={this.handleChange} >
              </Select>
          </div>
          <div className="post-cont flex">
            <p className="flex-col-2 flex-vcenter">封面：</p>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="//jsonplaceholder.typicode.com/posts/"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
          </div>
          <div className="post-cont flex">
            <p className="flex-col-2 flex-vcenter">描述：</p>
            <TextArea className="flex-col-8" placeholder="请输入文章描述"/>
          </div>
          <div className="post-cont flex">
            <p className="flex-col-2 flex-vcenter">内容：</p>
            <TextArea className="flex-col-8" placeholder="请输入内容"/>
          </div>
        </Cord>
      </Page>
    );
  }
}