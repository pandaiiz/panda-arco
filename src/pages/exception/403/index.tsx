import React from 'react';
import { Result, Button } from '@arco-design/web-react';

import styles from './style/index.module.less';

function Exception403() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="403"
          subTitle={['exception.result.403.description']}
          extra={
            <Button key="back" type="primary">
              {['exception.result.403.back']}
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default Exception403;
