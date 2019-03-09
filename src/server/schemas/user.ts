import { Schema, model } from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked'
MongooseAutoIncrementID.initialise("userSchema") // 初始化

//  User集合
const userSchema = new Schema({
  // 微信openid
  openid: String,
  // 微信名称
  nickName: String,
  // 微信头像
  avatarUrl: String,
  // 用户名
  username: { type: String, required: true },
  //
  password: { type: String, required: true },
  // 创建时间
  create_at: { type: Date, default: Date.now },
  // 更新时间
  update_at: { type: Date, default: Date.now },
  // 当前用户是否被禁用
  enable: { type: Boolean, default: false },
})

// 分页插件
userSchema.plugin(mongoosePaginate);
userSchema.plugin(MongooseAutoIncrementID.plugin, { //自增ID插件配置
  modelName: 'User', //model
  field: 'id', // 字段
  incrementBy: 1, // 每次增加1
  nextCount: false, // 
  resetCount: 'reset', // 是否重置
  startAt: 1000000, // 开始值
  unique: true // 是否添加唯一索引
})

// 更新时制动更新时间
userSchema.pre("findOneAndUpdate", (next) => {
  this.findOneAndUpdate({}, { update_at: Date.now() });
  next();
})

const User = model("User", userSchema);

export default User;
