import React, { useContext, useEffect } from 'react';
import {
  Tooltip,
  Avatar,
  Dropdown,
  Menu,
  Divider,
  Message,
  Button,
} from '@arco-design/web-react';
import {
  IconNotification,
  IconSunFill,
  IconMoonFill,
  IconUser,
  IconPoweroff,
  IconTag,
  IconLoading,
  IconSettings,
} from '@arco-design/web-react/icon';
import { commonState } from '@/store';
import Logo from '@/assets/logo.svg';
import MessageBox from '@/components/MessageBox';
import IconButton from './IconButton';
import Settings from '../Settings';
import styles from './style/index.module.less';
import useStorage from '@/utils/useStorage';
import { generatePermission } from '@/routes';
import { useRecoilState } from 'recoil';

function Navbar({ show }: { show: boolean }) {
  const [comState, setComState] = useRecoilState(commonState);

  const [_, setUserStatus] = useStorage('userStatus');
  const [role, setRole] = useStorage('userRole', 'admin');

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

  useEffect(() => {
    setComState({
      ...comState,
      userInfo: {
        ...comState.userInfo,
        permissions: generatePermission(role),
      },
    });
  }, [role]);

  if (!show) {
    return (
      <div className={styles['fixed-settings']}>
        <Settings
          trigger={
            <Button icon={<IconSettings />} type="primary" size="large" />
          }
        />
      </div>
    );
  }

  const handleChangeRole = () => {
    const newRole = role === 'admin' ? 'user' : 'admin';
    setRole(newRole);
  };

  const droplist = (
    <Menu onClickMenuItem={onMenuItemClick}>
      <Menu.SubMenu
        key="role"
        title={
          <>
            <IconUser className={styles['dropdown-icon']} />
            <span className={styles['user-role']}>
              {role === 'admin' ? '管理员' : '用户'}
            </span>
          </>
        }
      >
        <Menu.Item onClick={handleChangeRole} key="switch role">
          <IconTag className={styles['dropdown-icon']} />
          切换角色
        </Menu.Item>
      </Menu.SubMenu>
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
          <div className={styles['logo-name']}>Cyan</div>
        </div>
      </div>
      <ul className={styles.right}>
        <li>
          <MessageBox>
            <IconButton icon={<IconNotification />} />
          </MessageBox>
        </li>
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
