import React, { useState } from 'react';
import { Drawer, Alert, Message } from '@arco-design/web-react';
import { IconSettings } from '@arco-design/web-react/icon';
import copy from 'copy-to-clipboard';
import Block from './block';
import ColorPanel from './color';
import IconButton from '../NavBar/IconButton';

import { useRecoilState } from 'recoil';
import { commonState } from '@/store';

interface SettingProps {
  trigger?: React.ReactElement;
}

function Setting(props: SettingProps) {
  const { trigger } = props;
  const [visible, setVisible] = useState(false);
  const [{ settings }] = useRecoilState(commonState);

  function onCopySettings() {
    copy(JSON.stringify(settings, null, 2));
    Message.success('复制成功，请粘贴到 src/settings.json 文件中');
  }

  return (
    <>
      {trigger ? (
        React.cloneElement(trigger as React.ReactElement, {
          onClick: () => setVisible(true),
        })
      ) : (
        <IconButton icon={<IconSettings />} onClick={() => setVisible(true)} />
      )}
      <Drawer
        width={300}
        title={
          <>
            <IconSettings />
            {['settings.title']}
          </>
        }
        visible={visible}
        okText={['settings.copySettings']}
        cancelText={['settings.close']}
        onOk={onCopySettings}
        onCancel={() => setVisible(false)}
      >
        <Block title={['settings.themeColor']}>
          <ColorPanel />
        </Block>
        <Block
          title={['settings.content']}
          options={[
            { name: 'settings.navbar', value: 'navbar' },
            { name: 'settings.menu', value: 'menu' },
            { name: 'settings.footer', value: 'footer' },
            { name: 'settings.menuWidth', value: 'menuWidth', type: 'number' },
          ]}
        />
        <Block
          title={['settings.otherSettings']}
          options={[{ name: 'settings.colorWeek', value: 'colorWeek' }]}
        />
        <Alert content={['settings.alertContent']} />
      </Drawer>
    </>
  );
}

export default Setting;
