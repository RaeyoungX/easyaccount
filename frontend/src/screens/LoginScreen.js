import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //提交成功后获取表单数据
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', values);
      //本地存储
      localStorage.setItem(
        'expense-tracker-user',
        JSON.stringify({
          ...response.data,
          password: '',
        })
      );
      setLoading(false);
      message.success('login！');
      navigate('/');
    } catch (error) {
      setLoading(false);
      message.error('failed！');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
   
      <div  >
        <div >
          {/* form表单 */}
          <Form layout='vertical' onFinish={onFinish}>
            <h1>Login </h1>
            <br />
            <Form.Item label='Email' name='email'>
              <Input />
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <Input type='password' autoComplete='off' />
            </Form.Item>

            <div className='d-flex justify-content-between align-items-center'>
              <Link to='/register'>Register here</Link>
              <button className='primary' type='submit'>
                login
              </button>
            </div>
          </Form>
        </div>

        <div className='col-md-5'>
          {/* 左侧图片 */}
          <div className='lottie'>
            <lottie-player
              src='https://assets4.lottiefiles.com/packages/lf20_06a6pf9i.json'
              background='transparent'
              speed='1'
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;