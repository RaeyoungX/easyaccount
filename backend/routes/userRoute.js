import express from 'express'
import User from '../models/userModel.js'
 


const router = express.Router();

//用户登录API
router.post('/login', async (req, res) => {
  try {
    const result = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (result) {
      res.send(result);
    } else {
      res.status(500).json('Error');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//注册用户API
router.post('/register', async (req, res) => {
  try {
    const newuser = new User(req.body);
    await newuser.save();
    res.send('新用户创建成功');
  } catch (error) {
    res.status(500).json(error);
  }
});
   
 
 

export default router;
