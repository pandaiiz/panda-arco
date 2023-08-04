import React, { useEffect, useState } from 'react';
import {
  Button,
  Avatar,
  Upload,
  Descriptions,
  Tag,
  Skeleton,
  Link,
} from '@arco-design/web-react';
import { IconCamera, IconPlus } from '@arco-design/web-react/icon';

import styles from './style/header.module.less';

export default function Info({
  userInfo = {},
  loading,
}: {
  userInfo: any;
  loading: boolean;
}) {
  const [avatar, setAvatar] = useState('');

  function onAvatarChange(_, file) {
    setAvatar(file.originFile ? URL.createObjectURL(file.originFile) : '');
  }

  useEffect(() => {
    setAvatar(userInfo.avatar);
  }, [userInfo]);

  const loadingImg = (
    <Skeleton
      text={{ rows: 0 }}
      style={{ width: '100px', height: '100px' }}
      animation
    />
  );

  const loadingNode = <Skeleton text={{ rows: 1 }} animation />;
  return (
    <div className={styles['info-wrapper']}>
      <Upload showUploadList={false} onChange={onAvatarChange}>
        {loading ? (
          loadingImg
        ) : (
          <Avatar
            size={100}
            triggerIcon={<IconCamera />}
            className={styles['info-avatar']}
          >
            {avatar ? <img src={avatar} /> : <IconPlus />}
          </Avatar>
        )}
      </Upload>
      <Descriptions
        className={styles['info-content']}
        column={2}
        colon="："
        labelStyle={{ textAlign: 'right' }}
        data={[
          {
            label: ['userSetting.label.name'],
            value: loading ? loadingNode : userInfo.name,
          },
          {
            label: ['userSetting.label.verified'],
            value: loading ? (
              loadingNode
            ) : (
              <span>
                {userInfo.verified ? (
                  <Tag color="green" className={styles['verified-tag']}>
                    {['userSetting.value.verified']}
                  </Tag>
                ) : (
                  <Tag color="red" className={styles['verified-tag']}>
                    {['userSetting.value.notVerified']}
                  </Tag>
                )}
                <Link role="button" className={styles['edit-btn']}>
                  {['userSetting.btn.edit']}
                </Link>
              </span>
            ),
          },
          {
            label: ['userSetting.label.accountId'],
            value: loading ? loadingNode : userInfo.accountId,
          },
          {
            label: ['userSetting.label.phoneNumber'],
            value: loading ? (
              loadingNode
            ) : (
              <span>
                {userInfo.phoneNumber}
                <Link role="button" className={styles['edit-btn']}>
                  {['userSetting.btn.edit']}
                </Link>
              </span>
            ),
          },
          {
            label: ['userSetting.label.registrationTime'],
            value: loading ? loadingNode : userInfo.registrationTime,
          },
        ]}
      ></Descriptions>
    </div>
  );
}
