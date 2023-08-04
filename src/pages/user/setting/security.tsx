import React from 'react';
import cs from 'classnames';
import { Button } from '@arco-design/web-react';

import styles from './style/index.module.less';
import { useRecoilState } from 'recoil';
import { commonState } from '@/store';

function Security() {
  const [{ userInfo }] = useRecoilState(commonState);

  const data = [
    {
      title: ['userSetting.security.password'],
      value: ['userSetting.security.password.tips'],
    },
    {
      title: ['userSetting.security.question'],
      value: '',
      placeholder: ['userSetting.security.question.placeholder'],
    },
    {
      title: ['userSetting.security.phone'],
      value: userInfo.phoneNumber
        ? `${['userSetting.security.phone.tips']} ${userInfo.phoneNumber}`
        : '',
    },
    {
      title: ['userSetting.security.email'],
      value: '',
      placeholder: ['userSetting.security.email.placeholder'],
    },
  ];

  return (
    <div className={styles['security']}>
      {data.map((item, index) => (
        <div className={styles['security-item']} key={index}>
          <span className={styles['security-item-title']}>{item.title}</span>
          <div className={styles['security-item-content']}>
            <span
              className={cs({
                [`${styles['security-item-placeholder']}`]: !item.value,
              })}
            >
              {item.value || item.placeholder}
            </span>

            <span>
              <Button type="text">
                {item.value
                  ? ['userSetting.btn.edit']
                  : ['userSetting.btn.set']}
              </Button>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Security;
