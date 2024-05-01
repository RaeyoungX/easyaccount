import React from 'react';
import axios from 'axios';
import { Form, Input,message } from 'antd';
import { Link } from 'react-router-dom';

const Register = () => {
  //提交成功后获取表单数据
  const onFinish = async (values) => {
    try {
      await axios.post('/api/users/register',values);
      message.success('Success！');
    } catch (error) {
      message.error('Sorry, something went wrong！')
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div  >
        <div >
       
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
        <div >
          {/* form表单 */}
          <Form layout='vertical' onFinish={onFinish}>
            <h1>Register</h1>
            <br />
            <Form.Item label='Name' name='name'>
              <Input />
            </Form.Item>
            <Form.Item label='Email' name='email'>
              <Input />
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <Input type='password' autoComplete='off' />
            </Form.Item>

            <div className='d-flex justify-content-between align-items-center'>
              <Link to='/login'>Login here</Link>
              <button className='primary' type='submit'>
                Register
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;