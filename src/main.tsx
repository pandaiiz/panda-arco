import './style/global.less';
import React, { useEffect } from 'react';
import { ConfigProvider } from '@arco-design/web-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { commonState } from '@/store';
import 'default-passive-events';

import PageLayout from './layout';
import Login from './pages/login';
import checkLogin from './utils/checkLogin';
import changeTheme from './utils/changeTheme';
import useStorage from './utils/useStorage';
import './mock';
import { RecoilRoot, useRecoilState } from 'recoil';
import { createRoot } from 'react-dom/client';

function Index() {
  const [lang, setLang] = useStorage('arco-lang', 'zh-CN');
  const [theme, setTheme] = useStorage('arco-theme', 'light');

  const [comState, setComState] = useRecoilState(commonState);

  function fetchUserInfo() {
    setComState({ ...comState, userLoading: true });
    axios.get('/api/user/userInfo').then((res) => {
      setComState({ ...comState, userInfo: res.data, userLoading: false });
    });
  }

  useEffect(() => {
    if (checkLogin()) {
      fetchUserInfo();
    } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      window.location.pathname = '/login';
    }
  }, []);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <ConfigProvider
        componentConfig={{
          Card: {
            bordered: false,
          },
          List: {
            bordered: false,
          },
          Table: {
            border: false,
          },
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={PageLayout} />
        </Switch>
      </ConfigProvider>
    </BrowserRouter>
  );
}

const container = document.getElementById('root');
createRoot(container).render(
  <RecoilRoot>
    <Index />
  </RecoilRoot>
);
