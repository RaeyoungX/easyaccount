// 引入Mongoose
import mongoose from 'mongoose';

// 定义用户Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // 确保邮箱是唯一的
  },
  password: {
    type: String,
    required: true,
  }
});

// 创建用户模型
const  User = mongoose.model('User', userSchema);

// 导出模型
export default  User;
