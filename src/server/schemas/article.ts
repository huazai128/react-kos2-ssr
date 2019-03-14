import { Schema, model } from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked'
MongooseAutoIncrementID.initialise("articleSchema") // 初始化

const articleSchema = new Schema({

})

// 分页插件
articleSchema.plugin(mongoosePaginate);
articleSchema.plugin(MongooseAutoIncrementID.plugin, { //自增ID插件配置
  modelName: 'Article', //model
  field: 'id', // 字段
  incrementBy: 1, // 每次增加1
  nextCount: false, // 
  resetCount: 'reset', // 是否重置
  startAt: 1000000, // 开始值
  unique: true // 是否添加唯一索引
})


// 更新时制动更新时间
articleSchema.pre("findOneAndUpdate", (next) => {
  this.findOneAndUpdate({}, { update_at: Date.now() });
  next();
})

const Article = model("Article", articleSchema);

export default Article;