import * as mongoose from 'mongoose'
import * as bluebird from 'bluebird'
import { domain } from './config'

export default class MongClient {
  private static connectNum: number = 0;
  public static connect(){
    console.log(domain, 'domain=======')
    return mongoose.connect(`${domain}/ssr`,{useNewUrlParser:true}).then(() => {
      console.log("数据连接成功===");
    })
    .catch((err) => {
      if(this.connectNum > 3){
        console.log("连接失败=", err)
        return false
      }else {
        this.connectNum += 1;
        this.connect();
      }
    })
  }
  public static mongoose (){
    mongoose.Promise = bluebird;
    return mongoose;
  }
}