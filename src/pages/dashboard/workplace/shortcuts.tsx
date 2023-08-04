import React from 'react';
import {
  Link,
  Card,
  Divider,
  Message,
  Typography,
} from '@arco-design/web-react';
import {
  IconFile,
  IconStorage,
  IconSettings,
  IconMobile,
  IconFire,
} from '@arco-design/web-react/icon';

import styles from './style/shortcuts.module.less';

function Shortcuts() {
  const shortcuts = [
    {
      title: ['workplace.contentMgmt'],
      key: 'Content Management',
      icon: <IconFile />,
    },
    {
      title: ['workplace.contentStatistic'],
      key: 'Content Statistic',
      icon: <IconStorage />,
    },
    {
      title: ['workplace.advancedMgmt'],
      key: 'Advanced Management',
      icon: <IconSettings />,
    },
    {
      title: ['workplace.onlinePromotion'],
      key: 'Online Promotion',
      icon: <IconMobile />,
    },
    {
      title: ['workplace.marketing'],
      key: 'Marketing',
      icon: <IconFire />,
    },
  ];

  const recentShortcuts = [
    {
      title: ['workplace.contentStatistic'],
      key: 'Content Statistic',
      icon: <IconStorage />,
    },
    {
      title: ['workplace.contentMgmt'],
      key: 'Content Management',
      icon: <IconFile />,
    },
    {
      title: ['workplace.advancedMgmt'],
      key: 'Advanced Management',
      icon: <IconSettings />,
    },
  ];

  function onClickShortcut(key) {
    Message.info({
      content: (
        <span>
          You clicked <b>{key}</b>
        </span>
      ),
    });
  }

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title heading={6}>
          {['workplace.shortcuts']}
        </Typography.Title>
        <Link>{['workplace.seeMore']}</Link>
      </div>
      <div className={styles.shortcuts}>
        {shortcuts.map((shortcut) => (
          <div
            className={styles.item}
            key={shortcut.key}
            onClick={() => onClickShortcut(shortcut.key)}
          >
            <div className={styles.icon}>{shortcut.icon}</div>
            <div className={styles.title}>{shortcut.title}</div>
          </div>
        ))}
      </div>
      <Divider />
      <div className={styles.recent}>{['workplace.recent']}</div>
      <div className={styles.shortcuts}>
        {recentShortcuts.map((shortcut) => (
          <div
            className={styles.item}
            key={shortcut.key}
            onClick={() => onClickShortcut(shortcut.key)}
          >
            <div className={styles.icon}>{shortcut.icon}</div>
            <div className={styles.title}>{shortcut.title}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default Shortcuts;
