import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorTextDescription: '#eee',
        },
        components: {
          Progress: {
            colorText: '#eee',
          },
          Tabs: {
            itemColor: '#eee',
            inkBarColor: 'var(--primary-500)',
            itemSelectedColor: 'var(--primary-500)',
          },
          Upload: {
            colorText: '#eee',
          },
        },
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
