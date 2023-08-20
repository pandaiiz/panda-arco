import React from 'react';
import { Avatar, Space, Skeleton } from '@arco-design/web-react';
import {
  IconCamera,
  IconLocation,
  IconUser,
  IconHome,
} from '@arco-design/web-react/icon';
import styles from './style/index.module.less';

interface HeaderProps {
  userInfo?: {
    name?: string;
    avatar?: string;
  };
  loading?: boolean;
}

function UserInfoHeader(props: HeaderProps) {
  const { userInfo = {}, loading } = props;

  const loadingNode = (
    <Skeleton
      text={{
        rows: 1,
        style: { width: '100px', height: '20px', marginBottom: '-4px' },
        width: ['100%'],
      }}
      animation
    />
  );
  const loadingImgNode = (
    <Skeleton
      text={{ rows: 0 }}
      image={{ style: { width: '64px', height: '64px' }, shape: 'circle' }}
      animation
    />
  );
  return (
    <div className={styles.header}>
      <Space
        size={8}
        direction="vertical"
        align="center"
        className={styles['header-content']}
      >
        {loading ? (
          loadingImgNode
        ) : (
          <Avatar size={64} triggerIcon={<IconCamera />}>
            <img src={userInfo.avatar} />
          </Avatar>
        )}
        <div className={styles.username}>
          {loading ? loadingNode : userInfo.name}
        </div>
      </Space>
    </div>
  );
}

export default UserInfoHeader;
