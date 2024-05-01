import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  patterns: [String],  // 用于NLP分类的关键词或模式数组
  description: String,
});

const category = mongoose.model('category', categorySchema);

export default category;
