import React from 'react';
import { Typography, Result, Button, Steps } from '@arco-design/web-react';

import styles from './style/index.module.less';

const Step = Steps.Step;

function Success() {
  return (
    <div>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="success"
          title={['success.result.title']}
          subTitle={['success.result.subTitle']}
          extra={[
            <Button key="again" type="secondary" style={{ marginRight: 16 }}>
              {['success.result.printResult']}
            </Button>,
            <Button key="back" type="primary">
              {['success.result.projectList']}
            </Button>,
          ]}
        />
        <div className={styles['steps-wrapper']}>
          <Typography.Paragraph bold>
            {['success.result.progress']}
          </Typography.Paragraph>
          <Steps type="dot" current={2}>
            <Step
              title={['success.submitApplication']}
              description="2020/10/10 14:00:39"
            />
            <Step
              title={['success.leaderReview']}
              description={['success.processing']}
            />
            <Step
              title={['success.purchaseCertificate']}
              description={['success.waiting']}
            />
            <Step
              title={['success.safetyTest']}
              description={['success.waiting']}
            />
            <Step
              title={['success.launched']}
              description={['success.waiting']}
            />
          </Steps>
        </div>
      </div>
    </div>
  );
}

export default Success;
