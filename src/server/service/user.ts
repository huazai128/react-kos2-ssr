import User from '../schemas/user'
import { appId, appSecret, secret } from '../utils/config'

(async function init(){
  const user = {
    username: 'huazai',
    password: '123456',
  }
  new User(user).save({new:true}).then((res) => {
    console.log("保存成功",res)
  }).
  catch(() => {
    console.log("保存失败")
  })
})()

// 根据用户ID查询用户信息
export const getUserInfo = (id) => {
  return User.findById(id,{ select: '-password -creat_time -update_time' })
}


