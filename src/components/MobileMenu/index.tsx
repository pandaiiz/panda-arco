import React, { useEffect, useState } from 'react';
import { Divider, Drawer, Space } from '@arco-design/web-react';
import { IconMenu } from '@arco-design/web-react/icon';
import IconButton from '../NavBar/IconButton';

import { useHistory } from 'react-router-dom';
import { Link } from '@arco-design/web-react';

interface SettingProps {
  trigger?: React.ReactElement;
}

function MobileMenu(props: SettingProps) {
  const history = useHistory();
  const { trigger } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    history.listen(() => setVisible(false));
  }, [history]);
  return (
    window.innerWidth < 500 && (
      <>
        {trigger ? (
          React.cloneElement(trigger as React.ReactElement, {
            onClick: () => setVisible(true),
          })
        ) : (
          <IconButton icon={<IconMenu />} onClick={() => setVisible(true)} />
        )}
        <Drawer
          width={300}
          title={<>菜单</>}
          visible={visible}
          footer={null}
          onCancel={() => setVisible(false)}
        >
          <Space direction="vertical">
            <Link
              href={`/information/style`}
              style={{
                color:
                  history.location.pathname !== '/information/style' && 'black',
              }}
            >
              款式管理
            </Link>
            <Link
              href={`/information/customer`}
              style={{
                color:
                  history.location.pathname !== '/information/customer' &&
                  'black',
              }}
            >
              客户管理
            </Link>
          </Space>
        </Drawer>
      </>
    )
  );
}

export default MobileMenu;
