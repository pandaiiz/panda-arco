import React from 'react';
import { Typography, Result, Button, Link } from '@arco-design/web-react';
import { IconLink } from '@arco-design/web-react/icon';

import styles from './style/index.module.less';

function Success() {
  return (
    <div>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="error"
          title={['error.result.title']}
          subTitle={['error.result.subTitle']}
          extra={[
            <Button key="again" type="secondary" style={{ marginRight: 16 }}>
              {['error.result.goBack']}
            </Button>,
            <Button key="back" type="primary">
              {['error.result.retry']}
            </Button>,
          ]}
        />
        <div className={styles['details-wrapper']}>
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            {['error.detailTitle']}
          </Typography.Title>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            <ol>
              <li>
                {['error.detailLine.record']}
                <Link>
                  <IconLink />
                  {['error.detailLine.record.link']}
                </Link>
              </li>
              <li>
                {['error.detailLine.auth']}
                <Link>{['error.detailLine.auth.link']}</Link>
              </li>
            </ol>
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
}

export default Success;
