import React, { useEffect, useRef, useState } from 'react';
import {
  Message,
  Drawer,
  Table,
  Button,
  Space,
  InputNumber,
  TableColumnProps,
} from '@arco-design/web-react';
import { cloneDeep, groupBy, sortBy } from 'lodash';
import { nanoid } from 'nanoid';
import { useReactToPrint } from 'react-to-print';

function Arrange({ data, onClose }) {
  const countColumns: TableColumnProps[] = [
    { title: '客户', dataIndex: 'customerName' },
    { title: '品名', dataIndex: 'categoryTitle' },
    { title: '件重', dataIndex: 'singleWeight' },
    { title: '圈号', dataIndex: 'circle' },
    { title: '合计', dataIndex: 'typeCount' },
    { title: '单号', dataIndex: 'transferCode' },
  ];
  const [typeCountList, setTypeCountList] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [transferList, setTransferList] = useState([]);
  const [step, setStep] = useState(100);

  useEffect(() => {
    const countGroup = groupBy(
      data,
      (n) => `${n.categoryId}-${n.singleWeight}-${n.circle}-${n.customerName}`
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
    setTypeCountList(tableData);
  }, []);

  async function onOk() {
    Message.success('提交成功 !');
    onClose();
  }
  function countSummary(currentData) {
    return (
      <Table.Summary.Row>
        <Table.Summary.Cell>总计</Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell>
          {currentData.reduce((prev, next) => prev + next.typeCount, 0)}
        </Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
      </Table.Summary.Row>
    );
  }
  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const splitTransfer = () => {
    const countList = cloneDeep(typeCountList);
    countList.forEach((record) => {
      const rowLength = Math.floor(record.typeCount / step);
      const lastRowTypeCount = Math.floor(record.typeCount % step);
      const expandData = [];
      record.children = [];
      if (rowLength === 0) {
        expandData.push({ ...record, key: nanoid(), rowType: 'leaf' });
      } else {
        for (let i = 0; i < rowLength; i++) {
          expandData.push({
            ...record,
            typeCount: step,
            key: nanoid(),
            rowType: 'leaf',
          });
        }
        if (lastRowTypeCount !== 0) {
          expandData.push({
            ...record,
            typeCount: lastRowTypeCount,
            key: nanoid(),
            rowType: 'leaf',
          });
        }
      }
      record.children = expandData;
    });
    setExpandedRowKeys(countList.map((item) => item.key));
    setTypeCountList(countList);
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
      <Space>
        <InputNumber
          min={0}
          value={step}
          onChange={(e) => {
            setStep(e);
          }}
          style={{ width: 160 }}
        />
        <Button
          type="primary"
          style={{ marginBottom: 10 }}
          onClick={splitTransfer}
        >
          分单
        </Button>
        <Button
          type="primary"
          style={{ marginBottom: 10 }}
          onClick={handlePrint}
        >
          保存流程单
        </Button>
      </Space>
      {typeCountList.length > 0 && (
        <Table
          summary={countSummary}
          rowKey="key"
          pagination={false}
          expandedRowKeys={expandedRowKeys}
          columns={countColumns}
          data={sortBy(typeCountList, ['categoryId', 'customerId'])}
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
