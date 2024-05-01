import express from 'express';
import OpenAI from 'openai';
import Transaction from '../models/transactionModel.js';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const router = express.Router();
 

// 设置OpenAI配置
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// 定义系统消息函数
function systemMessage() {
    const todayDate = new Date().toISOString().split('T')[0];
    return `
      You will receive messages detailing expenses. Each message will describe an expense with a date, category, and amount. The expense categories are limited to: Pet, Food & Beverages, Housing, Transportation, Shopping, Entertainment & Leisure, Medical Health, Education, Financial Expenses, Charitable Donations, Family & Personal, and Others. Convert descriptions of 'today' to the actual date, which is ${todayDate}. Please extract the date, category, and amount from each message and provide your output in JSON format with the keys: "date", "category", and "amount".
    `;
}

// 定义API端点
router.post('/classify', async (req, res) => {
    const { text } = req.body;
    const delimiter = "####";
    const messages = [
        { role: 'system', content: systemMessage() },
        { role: 'user', content: `${delimiter}${text}${delimiter}` }
    ];

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0,
            max_tokens: 500,
        });
        
        // 解析分类结果
        const classificationResult = JSON.parse(response.choices[0].message.content);

        // 创建交易记录对象
        const newTransaction = new Transaction({
            userid: '123', // 假设你的用户信息存储在 req.user 中，并且有一个名为 id 的字段来表示用户ID
            amount: classificationResult.amount,
            type: 'expense', // 假设这是一个支出记录
            category: classificationResult.category,
            reference: 'classified', // 假设这是一个已分类的记录
            description: ` ${text}`, // 使用类别作为描述
            date: new Date(classificationResult.date), // 将字符串日期转换为 Date 对象
            key: '123', // 生成一个唯一键值，可根据需要自定义
        });

        // 将新记录保存到数据库
        console.log('Saving transaction:', newTransaction);
        await newTransaction.save();
        console.log('Transaction saved.');
        

        // 返回成功的响应给前端
        res.json({ result: classificationResult });
    } catch (error) {
        console.error("Error in getting completion:", error);
        res.status(500).send("Error processing request");
    }
});

// 在 transactionRoute.js 中添加

// 获取所有交易记录的GET路由
 // 在 transactionRoute.js 文件中的路由处理函数中添加日志
 // 在 transactionRoute.js 文件中的路由处理函数中修改日期查询条件
 // 在 transactionRoute.js 文件中的路由处理函数中修改日期查询条件
 // 在 transactionRoute.js 文件中的路由处理函数中修改日期查询条件
 // 在 transactionRoute.js 文件中的路由处理函数中修改日期查询条件
router.get('/get', async (req, res) => {
    try {
        const { month } = req.query; // 从查询参数中获取月份
        let query = {};

        if (month && month !== 'all') {
            const [year, monthNum] = month.split('-');
            const startDate = new Date(`${year}-${monthNum}-01`); // 月份的第一天
            const endDate = new Date(year, monthNum, 0); // 使用指定月份的下一个月的第 0 天来计算，即当前月份的最后一天
            
            query.date = {
                $gte: startDate,
                $lte: endDate
            };
        }

        // 添加日志以确认查询条件
        console.log('Query:', query);

        const transactions = await Transaction.find(query).sort({ date: -1 }); // 按日期降序排序
        
        // 添加日志以确认检索到的交易记录
        console.log('Transactions:', transactions);

        res.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).send("Error getting transactions");
    }
});

// 删除指定ID的交易记录
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params; // 从请求参数中获取交易记录ID

    try {
        const transaction = await Transaction.findById(id); // 根据ID查找交易记录
        if (!transaction) {
            return res.status(404).send({ message: 'Transaction not found' }); // 如果没有找到记录，返回404错误
        }

        await transaction.remove(); // 如果找到了，删除这条记录
        res.status(200).send({ message: 'Transaction deleted successfully' }); // 返回成功的响应
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).send({ message: 'Error deleting transaction' }); // 处理可能出现的错误
    }
});



  
export default router;
