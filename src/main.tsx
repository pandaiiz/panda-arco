import './style/global.less';
import React, { useEffect } from 'react';
import { ConfigProvider } from '@arco-design/web-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { commonState } from '@/store';

import PageLayout from './layout';
import Login from './pages/login';
import checkLogin from './utils/checkLogin';
import { RecoilRoot, useRecoilState } from 'recoil';
import { createRoot } from 'react-dom/client';
import { getFetcher } from '@/utils/request';
import useSWRImmutable from 'swr/immutable';

function Index() {
  const [comState, setComState] = useRecoilState(commonState);
  const {
    data: userInfo,
    mutate: fetchUserInfo,
    isLoading,
  } = useSWRImmutable('/api/user/info', getFetcher);

  useEffect(() => {
    if (checkLogin()) {
      fetchUserInfo().then(() =>
        setComState({ ...comState, userInfo, userLoading: isLoading })
      );
    } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      window.location.pathname = '/login';
    }
  }, [userInfo]);

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
    <Index />
  </RecoilRoot>
);
createRoot(container).render(root);
