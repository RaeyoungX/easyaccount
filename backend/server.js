import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoute from './routes/userRoute.js'
import transactionRoute from './routes/transactionRoute.js';
import OpenAI from 'openai';
import cors from 'cors';



dotenv.config()
connectDB()
const app = express();

app.use(cors());

app.use(express.json());
//配置路由
app.use('/api/users/', userRoute);
app.use('/api/transactions/', transactionRoute); // 添加 transaction 路由配置
 
 

 
app.get('/', (req, res) => {
    res.send('服务器已经运行...')
  })

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`服务器正在${PORT}端口号运行！`));