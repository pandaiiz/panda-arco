import React from 'react';
import { Image } from '@arco-design/web-react';

import {
  Button,
  Popconfirm,
  Space,
  TableColumnProps,
  Tag,
} from '@arco-design/web-react';

export function getColumns(
  callback: (record: Record<string, any>, type: string) => Promise<void>
): TableColumnProps[] {
  return [
    {
      title: '款号',
      align: 'center',
      dataIndex: 'styleCode',
    },
    {
      title: '品名',
      align: 'center',
      dataIndex: 'categoryName',
    },
    {
      title: '规格',
      align: 'center',
      dataIndex: 'specName',
    },
    {
      title: '工艺',
      align: 'center',
      dataIndex: 'techName',
    },
    {
      title: '编程',
      align: 'center',
      dataIndex: 'programmer.name',
    },
    {
      title: '设计图',
      align: 'center',
      dataIndex: 'designSrc',
      render: (_, record: any) =>
        record.designSrc?.length > 0 && (
          <Image width={100} src={record.designSrc[0]?.url} alt="pic" />
        ),
    },
    {
      title: '编程图',
      align: 'center',
      dataIndex: 'programSrc',
      render: (_, record: any) =>
        record.programSrc?.length > 0 && (
          <Image width={100} src={record.programSrc[0]?.url} alt="pic" />
        ),
    },
    {
      title: '实拍图',
      dataIndex: 'realitySrc',
      align: 'center',
      render: (_, record: any) =>
        record.realitySrc?.length > 0 && (
          <Image width={100} src={record.realitySrc[0]?.url} alt="pic" />
        ),
    },
    {
      title: '标签',
      dataIndex: 'tags',
      align: 'center',
      render: (tags: string) => (
        <Space>
          {JSON.parse(tags)?.map((tag: string, index: number) => (
            <Tag key={tag + index}>{tag}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      render: (_, record) => [
        <Button
          type="text"
          size="small"
          key="view"
          onClick={() => callback(record, 'detail')}
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          focusLock
          title="确认删除吗？"
          onOk={async () => {
            await callback(record, 'delete');
          }}
        >
          <Button type="text" size="small">
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];
}
