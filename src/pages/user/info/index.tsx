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
                {['userInfo.title.project']}
              </Title>
              <Link>{['userInfo.btn.more']}</Link>
            </div>
            <MyProject />
          </Card>
        </Col>
        <Col span={8}>
          <Card className={styles.wrapper}>
            <div className={styles['card-title-wrapper']}>
              <Title heading={6} style={{ marginBottom: '12px' }}>
                {['userInfo.title.team']}
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
                {['userInfo.title.news']}
              </Title>
              <Link>{['userInfo.btn.all']}</Link>
            </div>
            <LatestNews />
          </Card>
        </Col>
        <Col span={8}>
          <Card className={styles.wrapper}>
            <div className={styles['card-title-wrapper']}>
              <Title heading={6}>{['userInfo.title.notice']}</Title>
            </div>
            {noticeLoading ? (
              <Skeleton text={{ rows: 10 }} animation />
            ) : (
              <Result
                status="404"
                subTitle={['userInfo.notice.empty']}
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
