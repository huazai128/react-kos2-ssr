import { Schema, model } from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked'
const ObjectId = Schema.Types.ObjectId;
MongooseAutoIncrementID.initialise("articleSchema") // 初始化

const articleSchema = new Schema({
  // 文章标题
  title: { type: String, required: true, validate: /\S+/ },
  // 关联用户ID
  userId: { type: ObjectId, ref: 'User' },
  // 内容
  content: { type: String, required: true, validate: /\S+/ },
  // 精选：0=默认 1=精选
  choice: { type: Number, default: 0 },
  // 推荐：0=默认 1=精选
  recommend: { type: Number, default: 0 },
  //创建时间
  create_at: { type: Date, default: Date.now },
  //更新时间
  update_at: { type: Date, default: Date.now },
  // 最新评论时间
  news_at: { type: Date, default: "" },
  // 文章状态 0=屏蔽 1=正常 -1=删除 
  state: { type: Number, default:1 },
  // 其他信息
  meta: {
    links: { type: Number, default: 0 },  //访问数量
    comments: { type: Number, default: 0 }, //评论数量
    collect: { type: Number, default: 0 }, // 收藏数量
  }
})

articleSchema.set("toObject",{ getters: true });
articleSchema.plugin(mongoosePaginate); // 分页
articleSchema.plugin(MongooseAutoIncrementID.plugin,{
  modelName: 'Article', //
  field: 'id', // 字段
  incrementBy: 1, // 每次增加1
  nextCount: false, // 
  resetCount: 'reset', // 是否重置
  startAt: 1000000, // 开始值
  unique: true // 是否添加唯一索引
})

articleSchema.pre("findByIdAndUpdate", (next) => {
  this.findByIdAndUpdate({}, { update_at: Date.now() });
  next();
})

const Article = model('Article', articleSchema);

export default Article;






