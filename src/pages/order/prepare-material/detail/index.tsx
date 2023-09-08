import React, { useEffect, useRef, useState } from 'react';
import { Message, Drawer, Table, Tabs, Button } from '@arco-design/web-react';
import { cloneDeep, groupBy, sortBy } from 'lodash';
import { nanoid } from 'nanoid';
import { useReactToPrint } from 'react-to-print';

function CustomerEdit({ data, onClose }) {
  const [columns, setColumns] = useState([]);
  const countColumns = [
    { title: '品名', dataIndex: 'categoryTitle' },
    { title: '件重', dataIndex: 'singleWeight' },
    { title: '圈号', dataIndex: 'circle' },
    { title: '合计', dataIndex: 'typeCount' },
  ];
  const [typeCountList, setTypeCountList] = useState([]);
  const [circleColumnsLength, setCircleColumnsLength] = useState([]);

  useEffect(() => {
    const categoryGroup = groupBy(data, 'categoryId');
    const countGroup = groupBy(
      data,
      (n) => `${n.categoryId}-${n.singleWeight}-${n.circle}`
    );
    const aa = Object.keys(countGroup).map((item) => {
      const currentRow = countGroup[item];
      let typeCount = 0;
      currentRow.forEach((crItem) => (typeCount += crItem.quantity));
      return {
        key: nanoid(),
        ...currentRow[0],
        typeCount,
      };
    });
    setTypeCountList(aa);
    const customerCategoryGroup = groupBy(
      data,
      (n) => n.categoryId + '-' + n.customerName
    );
    // 客户、品名分组合计
    Object.keys(customerCategoryGroup).forEach((item) => {
      data.forEach((catItem) => {
        const group = item.split('-');
        if (
          catItem.categoryId === group[0] &&
          catItem.customerName === group[1]
        ) {
          let ccgCount = 0;
          customerCategoryGroup[item].forEach(
            (ccgItem) => (ccgCount += ccgItem.quantity)
          );
          catItem.customerName = `${catItem.customerName} [${catItem.categoryTitle}]：${ccgCount}`;
        }
      });
    });
    // 品名分组合计
    Object.keys(categoryGroup).forEach((item) => {
      data.forEach((catItem) => {
        if (catItem.categoryId === item) {
          let cgCount = 0;
          categoryGroup[item].forEach((cgItem) => (cgCount += cgItem.quantity));
          catItem.categoryTitle = `${catItem.categoryTitle} [${cgCount}]`;
        }
      });
    });

    // 1. 根据品名分类，然后再根据件重分类，组合成多行
    // 2. 根据圈号生成列
    const circleColumnGroup = groupBy(data, 'circle');
    const circleColumnsLengthArray = [];
    const circleColumns: any = Object.keys(circleColumnGroup).map((item) => {
      circleColumnsLengthArray.push({
        dataIndex: `circle-${item}`,
        value: item,
      });
      return {
        title: item === 'null' ? '(空白)' : `${item}`,
        dataIndex: `circle-${item}`,
        value: item,
        render: (value, row) => {
          if (row.circle === item) {
            row[`circle-${item}`] = row.quantity;
            return row.quantity;
          } else if (!row.circle && item === 'null') {
            row[`circle-${item}`] = row.quantity;
            return row.quantity;
          } else {
            row[`circle-${item}`] = 0;
          }
        },
      };
    });
    setCircleColumnsLength(circleColumnsLengthArray);
    const newCircleColumns = cloneDeep(circleColumns);
    newCircleColumns.unshift(
      { title: '品名', dataIndex: 'categoryTitle' },
      { title: '客户', dataIndex: 'customerName' },
      { title: '件重', dataIndex: 'singleWeight' }
    );
    newCircleColumns.push({
      title: '合计',
      dataIndex: 'totalCount',
      render: (value, row) => {
        let count = 0;
        circleColumns.forEach((item) => {
          if (row.circle === item.value) {
            count += Number(row.quantity);
          }
          if (!row.circle && item.value === 'null') {
            count += Number(row.quantity);
          }
        });
        row.totalCount = count;
        return count;
      },
    });
    setColumns(newCircleColumns);
  }, []);

  async function onOk() {
    Message.success('提交成功 !');
    onClose();
  }
  function summary(currentData) {
    return (
      <Table.Summary.Row>
        <Table.Summary.Cell>总计</Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        {circleColumnsLength.map((item) => (
          <Table.Summary.Cell key={item.dataIndex}>
            {currentData.reduce((prev, next) => prev + next[item.dataIndex], 0)}
          </Table.Summary.Cell>
        ))}
        <Table.Summary.Cell>
          {currentData.reduce((prev, next) => prev + next.totalCount, 0)}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    );
  }
  function countSummary(currentData) {
    return (
      <Table.Summary.Row>
        <Table.Summary.Cell>总计</Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell>
          {currentData.reduce((prev, next) => prev + next.typeCount, 0)}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    );
  }

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  return (
    <Drawer
      height="100%"
      placement="bottom"
      title="开料"
      visible={true}
      onOk={onOk}
      autoFocus={false}
      focusLock={false}
      onCancel={onClose}
    >
      <Tabs defaultActiveTab="1">
        <Tabs.TabPane key="1" title="开料列表">
          {data?.length > 0 && (
            <Table
              summary={summary}
              rowKey="id"
              pagination={false}
              columns={columns}
              data={sortBy(data, ['categoryId', 'customerName'])}
              defaultExpandAllRows={true}
              border
              borderCell
            />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane key="2" title="开料统计">
          <Button
            type="primary"
            style={{ marginBottom: 10 }}
            onClick={handlePrint}
          >
            打印
          </Button>
          <div ref={printRef}>
            <Table
              summary={countSummary}
              rowKey="key"
              pagination={false}
              columns={countColumns}
              data={sortBy(typeCountList, ['categoryId', 'singleWeight'])}
              defaultExpandAllRows={true}
              border
              borderCell
            />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Drawer>
  );
}

export default CustomerEdit;
