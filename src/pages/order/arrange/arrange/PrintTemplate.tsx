import React, { useEffect, useState } from 'react';
import { Descriptions, Table, TableColumnProps } from '@arco-design/web-react';
import dayjs from 'dayjs';
import Barcode from 'react-barcode';
import { sortBy } from 'lodash';
const columns: TableColumnProps[] = [
  {
    title: '部门',
    width: 90,
    headerCellStyle: {
      backgroundColor: 'transparent',
      fontSize: 12,
      fontWeight: 300,
      textAlign: 'center',
      padding: 0,
    },
    bodyCellStyle: {
      height: 30,
    },
  },
  {
    title: '发料重',
    width: 140,
    headerCellStyle: {
      backgroundColor: 'transparent',
      fontSize: 12,
      fontWeight: 300,
      textAlign: 'center',
      padding: 0,
    },
  },
  {
    title: '数量',
    width: 90,
    headerCellStyle: {
      backgroundColor: 'transparent',
      fontSize: 12,
      fontWeight: 300,
      textAlign: 'center',
      padding: 0,
    },
  },
  {
    title: '回收重',
    width: 130,
    headerCellStyle: {
      backgroundColor: 'transparent',
      fontSize: 12,
      fontWeight: 300,
      textAlign: 'center',
      padding: 0,
    },
  },
  {
    title: '数量',
    width: 90,
    headerCellStyle: {
      backgroundColor: 'transparent',
      fontSize: 12,
      fontWeight: 300,
      textAlign: 'center',
      padding: 0,
    },
  },
  {
    title: '备注',
    width: 90,
    headerCellStyle: {
      backgroundColor: 'transparent',
      fontSize: 12,
      fontWeight: 300,
      textAlign: 'center',
      padding: 0,
    },
  },
];
const data1 = [
  { department: 1 },
  { department: 2 },
  { department: 3 },
  { department: 4 },
  { department: 5 },
  { department: 6 },
];
const PrintTemplate = ({ list }) => {
  function summary() {
    return (
      <Table.Summary.Row>
        <Table.Summary.Cell
          colSpan={2}
          style={{
            backgroundColor: 'transparent',
            fontSize: 12,
          }}
        >
          打印日期
        </Table.Summary.Cell>
        <Table.Summary.Cell
          colSpan={4}
          style={{
            backgroundColor: 'transparent',
            fontSize: 12,
          }}
        >
          {dayjs().format('YYYY-MM-DD HH:mm:ss')}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    );
  }
  const [data, setData] = useState([]);
  useEffect(() => {
    const handleList = sortBy(list, 'id').map((item) => ({
      item,
      transfer: [
        {
          label: '品名',
          value: item.style.specName + item.style.categoryName,
        },
        {
          label: '订单日期',
          value: dayjs(item.order.orderDate).format('YYYY-MM-DD'),
        },
        {
          label: '客户',
          value: item.order.customer.customerCode,
        },
        {
          label: '字印',
          value: item.order.fontPrintName,
        },
        {
          label: '单号',
          value: item.order.orderNumber,
        },
        {
          label: '款号',
          value: item.style.styleCode,
        },
        {
          label: '件重',
          value: item.singleWeight,
        },
        {
          label: '圈号',
          value: item.circle,
        },
        {
          label: '件数',
          value: item.quantity,
        },
        {
          label: '备注',
          value: item.remark,
        },
      ],
    }));
    setData(handleList);
  }, [list]);
  return (
    <>
      {data?.map((item, index) => (
        <div
          key={index}
          style={{ marginTop: 10, pageBreakAfter: 'always', padding: 10 }}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ width: '40%' }}>
              <Barcode value={item.item.id.toString()} height={60} width={2} />
            </div>
            <div style={{ width: '60%', paddingTop: 10 }}>
              <img
                src={item.item.style.realitySrc[0].url}
                alt=""
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <Descriptions
            size="small"
            labelStyle={{
              width: 75,
              padding: 4,
              backgroundColor: 'transparent',
              fontSize: 12,
            }}
            valueStyle={{ fontSize: 12, padding: '0 6px' }}
            data={item.transfer}
            border
            column={2}
            tableLayout="fixed"
            colon=":"
          />
          <Table
            style={{ fontSize: 12, fontWeight: 300, marginTop: -1 }}
            size="small"
            border
            borderCell
            rowKey="department"
            columns={columns}
            pagination={false}
            data={data1}
            summary={summary}
          />
        </div>
      ))}
    </>
  );
};

export default PrintTemplate;
