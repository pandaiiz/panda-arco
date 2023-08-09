import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Grid,
  Link,
  Result,
  Skeleton,
} from '@arco-design/web-react';

import UserInfoHeader from './header';
import styles from './style/index.module.less';
import './mock';
import { Card } from '@arco-design/web-react';
import MyProject from './my-projects';
import MyTeam from './my-team';
import LatestNews from './latest-news';
import { useRecoilState } from 'recoil';
import { commonState } from '@/store';

const { Title } = Typography;
const { Row, Col } = Grid;
function UserInfo() {
  const [{ userInfo, userLoading }] = useRecoilState(commonState);

  const [noticeLoading, setNoticeLoading] = useState(false);

  const getNotice = async () => {
    setNoticeLoading(true);
    await axios.get('/api/user/notice').finally(() => setNoticeLoading(false));
  };

  useEffect(() => {
    getNotice();
  }, []);

  return (
    <div>
      <UserInfoHeader userInfo={userInfo} loading={userLoading} />
      <Row gutter={16}>
        <Col span={16}>
          <Card className={styles.wrapper}>
            <div className={styles['card-title-wrapper']}>
              <Title heading={6} style={{ marginBottom: '20px' }}>
                我的项目
              </Title>
              <Link>查看更多</Link>
            </div>
            <MyProject />
          </Card>
        </Col>
        <Col span={8}>
          <Card className={styles.wrapper}>
            <div className={styles['card-title-wrapper']}>
              <Title heading={6} style={{ marginBottom: '12px' }}>
                我的团队
              </Title>
            </div>
            <MyTeam />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Card className={styles.wrapper}>
            <div className={styles['card-title-wrapper']}>
              <Title heading={6} style={{ marginBottom: '8px' }}>
                最新动态
              </Title>
              <Link>查看全部</Link>
            </div>
            <LatestNews />
          </Card>
        </Col>
        <Col span={8}>
          <Card className={styles.wrapper}>
            <div className={styles['card-title-wrapper']}>
              <Title heading={6}>站内通知</Title>
            </div>
            {noticeLoading ? (
              <Skeleton text={{ rows: 10 }} animation />
            ) : (
              <Result
                status="404"
                subTitle={'暂无数据'}
                style={{ paddingTop: '60px', paddingBottom: '130px' }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default UserInfo;
