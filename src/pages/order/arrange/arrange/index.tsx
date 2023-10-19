import React, { useEffect, useState } from 'react';
import {
  Message,
  Drawer,
  Table,
  Button,
  Space,
  InputNumber,
  TableColumnProps,
  Image,
} from '@arco-design/web-react';
import { cloneDeep, groupBy, sortBy } from 'lodash';
import { nanoid } from 'nanoid';
import { batchCreateTransfer } from '@/pages/order/arrange/service';

function Arrange({ data, onClose }) {
  const countColumns: TableColumnProps[] = [
    { title: '客户', dataIndex: 'order.customer.name' },
    { title: '品名', dataIndex: 'categoryName' },
    { title: '款号', dataIndex: 'style.styleCode' },
    {
      title: '图片',
      render: (col, item) => <Image src={item?.style?.realitySrc[0]?.url} />,
    },
    { title: '件重', dataIndex: 'singleWeight' },
    { title: '圈号', dataIndex: 'circle' },
    { title: '合计', dataIndex: 'typeCount' },
    // { title: '单号', dataIndex: 'transferCode' },
  ];
  const [typeCountList, setTypeCountList] = useState([]);
  const [transferList, setTransferList] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [step, setStep] = useState(100);

  useEffect(() => {
    const countGroup = groupBy(
      data,
      (n) =>
        `${n.category}-${n.singleWeight}-${n.circle}-${n.order.customer.name}`
    );
    const tableData = Object.keys(countGroup).map((item) => {
      const currentRow = countGroup[item];
      let typeCount = 0;
      currentRow.forEach((crItem) => (typeCount += crItem.quantity));
      return {
        key: nanoid(),
        ...currentRow[0],
        typeCount,
      };
    });
    console.log(tableData);
    setTypeCountList(tableData);
  }, []);

  async function onOk() {
    saveTransfer();
    // Message.success('提交成功 !');
    // onClose();
  }
  function countSummary(currentData) {
    return (
      <Table.Summary.Row>
        <Table.Summary.Cell>总计</Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell>
          {currentData.reduce((prev, next) => prev + next.typeCount, 0)}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    );
  }

  const splitTransfer = () => {
    const countList = cloneDeep(typeCountList);
    countList.forEach((record) => {
      const rowLength = Math.floor(record.typeCount / step);
      const lastRowTypeCount = Math.floor(record.typeCount % step);
      const expandData = [];
      record.children = [];
      if (rowLength === 0) {
        expandData.push({ ...record, key: nanoid() });
      } else {
        for (let i = 0; i < rowLength; i++) {
          expandData.push({
            ...record,
            typeCount: step,
            key: nanoid(),
          });
        }
        if (lastRowTypeCount !== 0) {
          expandData.push({
            ...record,
            typeCount: lastRowTypeCount,
            key: nanoid(),
          });
        }
      }
      record.children = expandData;
    });

    const items = [];
    countList.forEach((item) =>
      item.children.forEach((childItem) => {
        items.push(childItem);
      })
    );
    setTransferList(items);
    setExpandedRowKeys(countList.map((item) => item.key));
    setTypeCountList(countList);
  };
  const saveTransfer = () => {
    const transfers = cloneDeep(transferList);
    transfers.forEach((item) => {
      delete item.id;
      delete item.key;
      delete item.order;
      delete item.unitPrice;
      delete item.totalPrice;
      delete item.totalWeight;
      delete item.typeCount;
      delete item.children;
      delete item.imgSrc;
      delete item.style;
      delete item.category;
      delete item.categoryName;
    });
    batchCreateTransfer({ orderDetails: data, transfers }).then(() => {
      Message.success('生成流程单成功！');
      onClose();
    });
  };
  return (
    <Drawer
      height="100%"
      placement="bottom"
      title="生产单"
      visible={true}
      onOk={onOk}
      autoFocus={false}
      focusLock={false}
      onCancel={onClose}
    >
      <Space style={{ marginBottom: 10 }}>
        <InputNumber
          min={0}
          value={step}
          onChange={(e) => {
            setStep(e);
          }}
          style={{ width: 160 }}
        />
        <Button type="primary" onClick={splitTransfer}>
          分单
        </Button>
        {/*<PrintModal list={transferList} />*/}
      </Space>
      {typeCountList.length > 0 && (
        <Table
          summary={countSummary}
          rowKey="key"
          pagination={false}
          expandedRowKeys={expandedRowKeys}
          columns={countColumns}
          data={sortBy(typeCountList, ['category', 'customerId'])}
          defaultExpandAllRows={true}
          indentSize={60}
          border
          borderCell
        />
      )}
    </Drawer>
  );
}

export default Arrange;
