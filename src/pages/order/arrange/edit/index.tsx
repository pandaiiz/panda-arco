import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Message,
  Select,
  Drawer,
  Table,
} from '@arco-design/web-react';
import { nanoid } from 'nanoid';
import { useRequest } from 'ahooks';
import { getCustomerList } from '@/pages/information/customer/service';
import groupBy from 'lodash/groupBy';
import { cloneDeep } from 'lodash';
const FormItem = Form.Item;

function CustomerEdit({ data, onClose }) {
  const [form] = Form.useForm();
  const { data: customerList } = useRequest(getCustomerList);
  const [columns, setColumns] = useState([]);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    // 1. 根据品名分类，然后再根据件重分类，组合成多行
    // 2. 根据圈号生成列
    const circleColumnGroup = groupBy(data, 'circle');
    const circleColumns: any = Object.keys(circleColumnGroup).map((item) => {
      return {
        title: item === 'null' ? '(空白)' : item,
        dataIndex: `circle-${item}`,
        value: item,
      };
    });
    const columns = cloneDeep(circleColumns);
    columns.unshift(
      { title: '品名', dataIndex: 'categoryTitle' },
      { title: '客户', dataIndex: 'customer' },
      { title: '件重', dataIndex: 'singleWeight' },
      { title: '数量', dataIndex: 'quantity' }
    );
    columns.push({
      title: '合计',
      render: (value, row) => {
        let count = 0;
        circleColumns.forEach((item) => {
          count += Number(row[item.dataIndex] || 0);
        });
        return count;
      },
    });
    setColumns(columns);
    // 品名 -> 客户 -> 件重
    const categoryList = groupBy(data, 'categoryTitle');
    const list = Object.keys(categoryList).map((item) => {
      const category = categoryList[item];
      const customerGroup = groupBy(category, (row) => row.order.customerId);
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
            customer: customerGroup[customerItem][0].order.customer.name,
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
    });
    setTreeData(list);
  }, []);

  async function onOk() {
    Message.success('提交成功 !');
    onClose();
  }
  /*async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    detailData.forEach((item) => delete item.orderId);
    if (data.id) {
      await updateOrder(data.id, { formData, detailData });
    } else {
      formData.orderDetails = { create: detailData };
      await addOrder(formData);
    }
    Message.success('提交成功 !');
    onClose();
  }*/
  return (
    <div>
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
        {treeData?.length > 0 && (
          <Table
            rowKey="id"
            pagination={false}
            columns={columns}
            data={treeData}
            defaultExpandAllRows={true}
          />
        )}
      </Drawer>
    </div>
  );
}

export default CustomerEdit;
