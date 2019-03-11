import User from '../schemas/user'
import { appId, appSecret, secret } from '../utils/config'
import { sha256 } from '../utils/auth'

// 初次调用就可以了
// (async function init(){
//   console.log("保存用户信息========") 
//   const user = {
//     username: 'huazai',
//     password: sha256("123456"),
//   }
//   new User(user).save({new:true}).then((res) => {
//     console.log("保存成功",res)
//   }).
//   catch(() => {
//     console.log("保存失败")
//   })
// })()

// 根据用户ID查询用户信息
export const getUserInfo = async (id) => {
  // findById只能用_id字段；
  return await User.findOne({ id: id }).select("username password -_id")
  .then((user) => {
    console.log("===")
    return user
  })
  .catch((err) => {
  })
}


