import { Schema, model } from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import * as autoIncrement from 'mongoose-auto-increment'
//  User集合
const userSchema = new Schema({
  // 微信openid
  openid:{ type:String, required: true },
  // 微信名称
  nickName:{ type:String, required: true },
  // 微信头像
  avatarUrl:{ type:String, required: true },
  // 创建时间
  create_at: { type: Date, default: Date.now },
  // 更新时间
  update_at: { type: Date, default: Date.now },
  // 当前用户是否被禁用
  enable: { type: Boolean, default: false },
})

// 分页插件
userSchema.plugin(mongoosePaginate);
userSchema.plugin(autoIncrement.plugin, { //自增ID插件配置
  model: 'User', // 插入到User集合中
  field: 'id', // 字段为id
  startAt: 1000000, //开始值
  incrementBy: 1  //每次加
})

// 更新时制动更新时间
userSchema.pre("findOneAndUpdate", (next) => {
  this.findOneAndUpdate({}, { update_at: Date.now() });
  next();
})

const User = model("User", userSchema);

export default User;
