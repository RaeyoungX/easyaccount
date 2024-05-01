import React, { useState } from 'react';
import axios from 'axios'; // 导入 Axios 库
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './HomeScreen.css';
import {   message } from 'antd';
import myImage from '../assets/home.png';

const HomeScreen = () => {
  const [textInput, setTextInput] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/transactions/classify/', { text: textInput }); // 使用 Axios 发送 POST 请求
      message.success('Success！');
      console.log("分类结果: ", response.data.result)
      
    } catch (error) {
      console.error("Error submitting text for classification:", error);
      if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vertical-center">
      <div>
        <img src={myImage} alt="loading error" style={{ maxWidth: '100%', height: 'auto' }} />
        <h1 className="text-center">Enter your bills</h1>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter bills’ details"
              value={textInput}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-primary w-100"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomeScreen;
