import React from 'react';
import { Alert, Card, Link, Typography, Tag } from '@arco-design/web-react';
import { IconDoubleRight } from '@arco-design/web-react/icon';

import CodeBlock from './code-block';
import styles from './style/index.module.less';
import { useRecoilState } from 'recoil';
import { commonState } from '@/store';

export default function Welcome() {
  const [{ userInfo }] = useRecoilState(commonState);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          {['welcome.title.welcome']}
        </Typography.Title>
      </div>
      <div>
        <Alert
          type="success"
          content={'通过 Arco Cli 命令可以安装物料市场的物料，诚邀您体验。'}
        />
        <Card style={{ marginTop: 20 }} title={'使用方式'}>
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            1. 从物料市场选择物料
          </Typography.Title>
          <Typography.Text>
            例如您看中了 pro 的 workplace 页面，可以从物料详情中获得该物料的包名
            <Tag style={{ marginLeft: 8 }}>
              @arco-design/pro-pages-workplace
            </Tag>
          </Typography.Text>

          <Typography.Title heading={6}>2. 安装物料</Typography.Title>
          <Typography.Text>
            得到包名后，您就可以通过如下命令安装该物料
          </Typography.Text>
          <CodeBlock code="arco block use @arco-design/pro-pages-workplace" />

          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            3. 成果
          </Typography.Title>
          <Typography.Text>
            这样您就能轻松获得一个 workplace 页面
          </Typography.Text>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <Typography.Text>更多物料请查看以下链接</Typography.Text>
          <div style={{ marginTop: 8 }}>
            <Link
              target="_blank"
              href="https://arco.design/material?category=arco-design-pro"
            >
              {['welcome.link.material-pro']} <IconDoubleRight />
            </Link>
          </div>
          <div style={{ marginTop: 8 }}>
            <Link target="_blank" href="https://arco.design/material">
              {['welcome.link.material-all']} <IconDoubleRight />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
