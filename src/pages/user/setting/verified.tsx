import React, { useEffect, useState } from 'react';
import {
  Descriptions,
  Table,
  Typography,
  Skeleton,
  Tag,
  Space,
  Button,
  Badge,
} from '@arco-design/web-react';

import axios from 'axios';
import styles from './style/index.module.less';

function Verified() {
  const [data, setData] = useState({
    accountType: '',
    isVerified: true,
    verifiedTime: '',
    legalPersonName: '',
    certificateType: '',
    certificationNumber: '',
    enterpriseName: '',
    enterpriseCertificateType: '',
    organizationCode: '',
  });

  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);

  const getData = async () => {
    const { data } = await axios
      .get('/api/user/verified/enterprise')
      .finally(() => setLoading(false));
    setData(data);

    const { data: tableData } = await axios
      .get('/api/user/verified/authList')
      .finally(() => setTableLoading(false));
    setTableData(tableData);
  };

  useEffect(() => {
    getData();
  }, []);

  const loadingNode = <Skeleton text={{ rows: 1 }} />;

  return (
    <div className={styles.verified}>
      <Typography.Title heading={6}>
        {['userSetting.verified.enterprise']}
      </Typography.Title>
      <Descriptions
        className={styles['verified-enterprise']}
        labelStyle={{ textAlign: 'right' }}
        layout="inline-horizontal"
        colon="："
        column={3}
        data={Object.entries(data).map(([key, value]) => ({
          label: t[`userSetting.verified.label.${key}`],
          value: loading ? (
            loadingNode
          ) : typeof value === 'boolean' ? (
            value ? (
              <Tag color="green">{['userSetting.value.verified']}</Tag>
            ) : (
              <Tag color="red">{['userSetting.value.notVerified']}</Tag>
            )
          ) : (
            value
          ),
        }))}
      />

      <Typography.Title heading={6}>
        {['userSetting.verified.records']}
      </Typography.Title>
      <Table
        columns={[
          { title: ['userSetting.verified.authType'], dataIndex: 'authType' },
          {
            title: ['userSetting.verified.authContent'],
            dataIndex: 'authContent',
          },
          {
            title: ['userSetting.verified.authStatus'],
            dataIndex: 'authStatus',
            render(x) {
              return x ? (
                <Badge
                  status="success"
                  text={['userSetting.verified.status.success']}
                ></Badge>
              ) : (
                <span>
                  <Badge
                    status="processing"
                    text={['userSetting.verified.status.waiting']}
                  ></Badge>
                </span>
              );
            },
          },
          {
            title: ['userSetting.verified.createdTime'],
            dataIndex: 'createdTime',
          },
          {
            title: ['userSetting.verified.operation'],
            headerCellStyle: { paddingLeft: '15px' },
            render: (_, x) => {
              if (x.authStatus) {
                return (
                  <Button type="text">
                    {['userSetting.verified.operation.view']}
                  </Button>
                );
              }
              return (
                <Space>
                  <Button type="text">
                    {['userSetting.verified.operation.view']}
                  </Button>
                  <Button type="text">
                    {['userSetting.verified.operation.revoke']}
                  </Button>
                </Space>
              );
            },
          },
        ]}
        data={tableData}
        loading={tableLoading}
      />
    </div>
  );
}

export default Verified;
