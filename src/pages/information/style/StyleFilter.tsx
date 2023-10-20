import React, { useState } from 'react';
import {
  Table,
  Card,
  Button,
  List,
  Avatar,
  Image,
  Upload,
} from '@arco-design/web-react';
import { IconCloseCircle, IconFilter } from '@arco-design/web-react/icon';

import SearchForm from './form';

import { getColumns } from './constants-filter';
import { useAsyncEffect, useRequest } from 'ahooks';
import Edit from '@/pages/information/style/edit';
import {
  getStyleByPaging,
  updateStyle,
} from '@/pages/information/style/service';
import dayjs from 'dayjs';
import MobileFilter from '@/pages/information/style/mobileFilter';

function StyleTable({ choose }) {
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
      case 'choose':
        choose(record);
        break;
    }
  };

  const columns = getColumns(tableCallback);

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
      <SearchForm onSearch={handleSearch} />
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
