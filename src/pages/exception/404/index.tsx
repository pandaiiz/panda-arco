import React from 'react';
import { Result, Button } from '@arco-design/web-react';
import styles from './style/index.module.less';

function Exception404() {
  return (
    <div className={styles.wrapper}>
      <Result
        className={styles.result}
        status="404"
        subTitle={['exception.result.404.description']}
        extra={[
          <Button key="again" style={{ marginRight: 16 }}>
            {['exception.result.404.retry']}
          </Button>,
          <Button key="back" type="primary">
            {['exception.result.404.back']}
          </Button>,
        ]}
      />
    </div>
  );
}

export default Exception404;
