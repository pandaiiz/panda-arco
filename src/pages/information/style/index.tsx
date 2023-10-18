import React, { useState, useMemo } from 'react';
import {
  Table,
  Card,
  Button,
  Space,
  Typography,
  List,
  Avatar,
  Image,
  Link,
  Upload,
} from '@arco-design/web-react';
import {
  IconCloseCircle,
  IconFilter,
  IconPlus,
} from '@arco-design/web-react/icon';

import SearchForm from './form';

import styles from './style/index.module.less';
import { getColumns } from './constants';
import { useAsyncEffect, useRequest } from 'ahooks';
import Edit from '@/pages/information/style/edit';
import {
  deleteStyleById,
  getStyleByPaging,
  updateStyle,
} from '@/pages/information/style/service';
import dayjs from 'dayjs';
import MobileFilter from '@/pages/information/style/mobileFilter';

const { Title } = Typography;

function StyleTable() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [mobileVisible, setMobileVisible] = useState(false);

  const [formParams, setFormParams] = useState({
    pageSize: 10,
    current: 1,
    unixTime: 0,
  });

  const {
    data: dataList,
    loading,
    run,
  } = useRequest(getStyleByPaging, { manual: true });

  const tableCallback = async (record: any, type: string) => {
    switch (type) {
      case 'delete':
        await deleteStyleById(record.id);
        setFormParams({ ...formParams, current: 1 });
        run(formParams);
        break;
      case 'detail':
        setData(record);
        setVisible(true);
        break;
    }
  };

  const columns = useMemo(() => getColumns(tableCallback), []);

  useAsyncEffect(async () => {
    run(formParams);
  }, [JSON.stringify(formParams)]);

  function onChangeTable({ current, pageSize }) {
    setFormParams({
      ...formParams,
      current,
      pageSize,
    });
  }

  function handleSearch(
    params: React.SetStateAction<{ pageSize: number; current: number }>
  ) {
    setFormParams({
      ...params,
      pageSize: formParams.pageSize,
      current: 1,
      unixTime: dayjs().unix(),
    });
  }
  const render = (item, index) => (
    <List.Item
      key={index}
      actions={[
        <Upload
          key="edit"
          accept="image/*"
          action="/api/picture/upload"
          showUploadList={false}
          onChange={(uploadList, currentFile) => {
            if (currentFile.status !== 'done') return;
            const realitySrc = [
              {
                name: currentFile?.name,
                uid: currentFile?.uid,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                url: currentFile?.response?.src,
              },
            ];
            updateStyle(item.id, { realitySrc }).then(() => run(formParams));
          }}
        >
          <Button>上传</Button>
        </Upload>,
      ]}
    >
      <List.Item.Meta
        avatar={
          item?.realitySrc.length > 0 ? (
            <Avatar shape="square">
              <Image width={200} src={item?.realitySrc[0]?.url} alt="lamp" />
            </Avatar>
          ) : (
            <Avatar shape="square">
              <IconCloseCircle />
            </Avatar>
          )
        }
        title={item.styleCode}
        description={item.techName}
      />
    </List.Item>
  );

  return window.innerWidth > 500 ? (
    <Card>
      <Title heading={6}>款式列表</Title>
      <SearchForm onSearch={handleSearch} />
      <div className={styles['button-group']}>
        <Space>
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={() => setVisible(true)}
          >
            新增
          </Button>
        </Space>
      </div>
      <Table
        rowKey="id"
        loading={loading}
        onChange={onChangeTable}
        pagination={{
          sizeCanChange: true,
          showTotal: true,
          pageSizeChangeResetCurrent: true,
          current: formParams.current,
          pageSize: formParams.pageSize,
          total: dataList?.pagination?.total,
        }}
        columns={columns}
        data={dataList?.data}
      />

      {visible && (
        <Edit
          data={data}
          onClose={() => {
            setVisible(false);
            setData({});
            run(formParams);
          }}
        />
      )}
    </Card>
  ) : (
    <>
      <List
        style={{ backgroundColor: '#ffffff' }}
        size="small"
        pagination={{
          sizeCanChange: true,
          showTotal: true,
          pageSizeChangeResetCurrent: true,
          current: formParams.current,
          pageSize: formParams.pageSize,
          total: dataList?.pagination?.total,
        }}
        header={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>款式列表</div>
            <Button
              type="primary"
              size="small"
              icon={<IconFilter />}
              onClick={() => setMobileVisible(true)}
            ></Button>
          </div>
        }
        dataSource={dataList?.data}
        render={render}
      />
      {mobileVisible && (
        <MobileFilter onSearch={handleSearch} setVisible={setMobileVisible} />
      )}
    </>
  );
}

export default StyleTable;
