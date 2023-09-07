import React, { useEffect, useState } from 'react';
import { Message, Drawer, Table } from '@arco-design/web-react';
import { cloneDeep, groupBy, sortBy } from 'lodash';

function CustomerEdit({ data, onClose }) {
  const [columns, setColumns] = useState([]);
  const [circleColumnsLength, setCircleColumnsLength] = useState([]);

  useEffect(() => {
    const categoryGroup = groupBy(data, 'categoryId');
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
          row[`circle-${item}`] = row.circle === item ? row.quantity : 0;
          return row.circle === item ? row.quantity : 0;
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
            count += Number(row.quantity || 0);
          }
        });
        row.totalCount = count;
        return count;
      },
    });
    setColumns(newCircleColumns);
    // 品名 -> 客户 -> 件重
    /*const categoryList = groupBy(data, 'categoryTitle');
    const list = Object.keys(categoryList).map((item) => {
      const category = categoryList[item];
      const customerGroup = groupBy(category, (row) => row.customerId);
      return {
        id: nanoid(),
        categoryTitle: item,
        children: Object.keys(customerGroup).map((customerItem) => {
          const singleWeightGroup = groupBy(
            customerGroup[customerItem],
            (row) => row.singleWeight
          );
          return {
            id: nanoid(),
            customer: customerGroup[customerItem][0].customerName,
            children: Object.keys(singleWeightGroup).map((swItem) => {
              console.log(singleWeightGroup[swItem]);
              // circleColumns.find(ccItem => ccItem.circle === )
              return {
                id: nanoid(),
                singleWeight: singleWeightGroup[swItem][0].singleWeight,
                // [`circle-${item}`]:
              };
            }),
          };
        }),
      };
    });*/
    // setTreeData(list);
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
  return (
    <Drawer
      height="100%"
      placement="bottom"
      title="排单"
      visible={true}
      onOk={onOk}
      autoFocus={false}
      focusLock={false}
      onCancel={onClose}
    >
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
    </Drawer>
  );
}

export default CustomerEdit;
