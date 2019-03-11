import * as mongoose from 'mongoose'
// import * as autoIncrement from 'mongoose-auto-increment's
import { domain } from './config'

export default class MongClient {
  private static connectNum: number = 0;
  public static connect(){
    return mongoose.connect(`${domain}/ssr`,{useNewUrlParser:true,useCreateIndex: true}).then(() => {
      this.initPlug();
      console.log("数据连接成功===");
    })
    .catch((err) => {
      if(this.connectNum > 3){
        return false
      }else {
        this.connectNum += 1;
        this.connect();
      }
    })
  }
  // 初始化插件
  private static initPlug(){
    // autoIncrement.initialize(mongoose.connection);
  }
}