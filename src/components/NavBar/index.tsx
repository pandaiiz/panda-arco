import React from 'react';
import {
  Avatar,
  Dropdown,
  Menu,
  Divider,
  Message,
} from '@arco-design/web-react';
import {
  IconPoweroff,
  IconLoading,
  IconSettings,
} from '@arco-design/web-react/icon';
import { commonState } from '@/store';
import Logo from '@/assets/logo.svg';
import Settings from '../Settings';
import styles from './style/index.module.less';
import useStorage from '@/utils/useStorage';
import { useRecoilState } from 'recoil';
import MobileMenu from '@/components/MobileMenu';

function Navbar({ children }: React.PropsWithChildren) {
  const [comState] = useRecoilState(commonState);

  const [_, setUserStatus] = useStorage('userStatus');

  function logout() {
    setUserStatus('logout');
    window.location.href = '/login';
  }

  function onMenuItemClick(key) {
    if (key === 'logout') {
      logout();
    } else {
      Message.info(`You clicked ${key}`);
    }
  }

  const droplist = (
    <Menu onClickMenuItem={onMenuItemClick}>
      <Menu.Item key="setting">
        <IconSettings className={styles['dropdown-icon']} />
        用户设置
      </Menu.Item>

      <Divider style={{ margin: '4px 0' }} />
      <Menu.Item key="logout">
        <IconPoweroff className={styles['dropdown-icon']} />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles['logo-name']}>鸿泰</div>
        </div>
      </div>
      <div style={{ width: '100%' }}>{children}</div>
      <ul className={styles.right}>
        <MobileMenu />
        <Settings />
        {comState.userInfo && (
          <li>
            <Dropdown
              droplist={droplist}
              position="br"
              disabled={comState.userLoading}
            >
              <Avatar size={32} style={{ cursor: 'pointer' }}>
                {comState.userLoading ? (
                  <IconLoading />
                ) : (
                  <img alt="avatar" src={comState.userInfo.avatar} />
                )}
              </Avatar>
            </Dropdown>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
