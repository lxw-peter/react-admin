import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import '@/style/index.scss';
import '@/style/App.scss';
import Login from './pages/login';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/admin/*" element={<App />}></Route>
      </Routes>
    </ConfigProvider>
  </Router>
);
