import { Schema, model } from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked'
MongooseAutoIncrementID.initialise("tagSchema") // 初始化

const tagSchema = new Schema({
  // 名称
  name: { type: String, required: true },
  // 创建时间
  create_at: { type: Date, default: Date.now },
  // 更新时间
  update_at: { type: Date, default: Date.now },
})

// 分页插件
tagSchema.plugin(mongoosePaginate);
tagSchema.plugin(MongooseAutoIncrementID.plugin, { //自增ID插件配置
  modelName: 'Tag', //model
  field: 'id', // 字段
  incrementBy: 1, // 每次增加1
  nextCount: false, // 
  resetCount: 'reset', // 是否重置
  startAt: 1000000, // 开始值
  unique: true // 是否添加唯一索引
})


// 更新时制动更新时间
tagSchema.pre("findOneAndUpdate", (next) => {
  this.findOneAndUpdate({}, { update_at: Date.now() });
  next();
})

const Tag = model("Tag", tagSchema);

export default Tag;
