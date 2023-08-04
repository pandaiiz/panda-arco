import React from 'react';
import { Result, Button } from '@arco-design/web-react';
import styles from './style/index.module.less';

function Exception500() {
  return (
    <div className={styles.wrapper}>
      <Result
        className={styles.result}
        status="500"
        subTitle={['exception.result.500.description']}
        extra={
          <Button key="back" type="primary">
            {['exception.result.500.back']}
          </Button>
        }
      />
    </div>
  );
}

export default Exception500;
