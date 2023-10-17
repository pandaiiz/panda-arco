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
    <div style={{ marginLeft: 8 }}>
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
            页面配置
          </>
        }
        visible={visible}
        okText={'复制配置'}
        cancelText={'关闭'}
        onOk={onCopySettings}
        onCancel={() => setVisible(false)}
      >
        <Block title={'主题色'}>
          <ColorPanel />
        </Block>
        <Block
          title={'内容区域'}
          options={[
            { name: '导航栏', value: 'navbar' },
            { name: '菜单栏', value: 'menu' },
            { name: '底部', value: 'footer' },
            { name: '菜单宽度 (px)', value: 'menuWidth', type: 'number' },
          ]}
        />
        <Block
          title={'其他设置'}
          options={[{ name: '色弱模式', value: 'colorWeek' }]}
        />
        <Alert
          content={
            '配置之后仅是临时生效，要想真正作用于项目，点击下方的 "复制配置" 按钮，将配置替换到 settings.json 中即可。'
          }
        />
      </Drawer>
    </div>
  );
}

export default Setting;
