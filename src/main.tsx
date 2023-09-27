import './style/global.less';
import 'react-photo-view/dist/react-photo-view.css';
import React from 'react';
import { ConfigProvider } from '@arco-design/web-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { commonState } from '@/store';

import PageLayout from './layout';
import Login from './pages/login';
import checkLogin from './utils/checkLogin';
import { RecoilRoot, useRecoilState } from 'recoil';
import { createRoot } from 'react-dom/client';
import { useAsyncEffect } from 'ahooks';
import { getUserInfo } from '@/utils/commonService';

function Main() {
  const [comState, setComState] = useRecoilState(commonState);

  useAsyncEffect(async () => {
    if (checkLogin()) {
      const userInfo = await getUserInfo();
      setComState({ ...comState, userInfo });
    } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      window.location.pathname = '/login';
    }
  }, []);

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
const root = (
  <RecoilRoot>
    <Main />
  </RecoilRoot>
);
createRoot(container).render(root);
