import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Message,
  Select,
  Drawer,
  Grid,
  Button,
  InputNumber,
  Space,
} from '@arco-design/web-react';
import { addOrder, updateOrder } from '@/pages/order/list/service';
import { useRequest } from 'ahooks';
import { getCustomerList } from '@/pages/information/customer/service';
import EditableTable from '@/pages/order/list/edit/editableTable';
import styles from '@/pages/order/list/style/index.module.less';
import { IconDownload, IconPlus } from '@arco-design/web-react/icon';
import { cloneDeep } from 'lodash';
const FormItem = Form.Item;
const InputSearch = Input.Search;

const Row = Grid.Row;
const Col = Grid.Col;
function CustomerEdit({ data, onClose }) {
  const [form] = Form.useForm();
  const { data: customerList } = useRequest(getCustomerList);
  const [detailData, setDetailData] = useState(data.orderDetails || []);
  const [selectedRow, setSelectedRow] = useState([]);
  const [batchForm, setBatchForm] = useState({
    type: 'circle',
    number: null,
  });

  async function onOk() {
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
  }

  const batchAllocation = () => {
    const { type, number } = batchForm;
    const rowData = cloneDeep(detailData);
    rowData.forEach((item) => {
      if (selectedRow.find((srItem) => srItem.id === item.id)) {
        item[type] = number;
      }
    });

    setDetailData(rowData);
  };
  return (
    <div>
      <Drawer
        height="100%"
        placement="bottom"
        title={data.id ? '编辑' : '新增'}
        visible={true}
        onOk={onOk}
        autoFocus={false}
        focusLock={false}
        onCancel={onClose}
        // confirmLoading={isLoading}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={form}
          initialValues={data.id ? data : { enabled: true, breadcrumb: true }}
          validateMessages={{
            required: (_, { label }) => `必须填写${label}`,
            string: {
              length: `字符数必须是 #{length}`,
              match: `不匹配正则 #{pattern}`,
            },
            number: {
              min: `最小值为 #{min}`,
              max: `最大值为 #{max}`,
            },
          }}
        >
          <Row className="grid-demo" style={{ marginBottom: 16 }}>
            <Col span={8}>
              <FormItem
                label="客户名称"
                field="customerId"
                rules={[{ required: true }]}
              >
                <Select placeholder="请选择" allowClear>
                  {customerList?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>

            <Col span={8}>
              <FormItem label="订单号" field="orderNumber">
                <Input placeholder="请输入订单号" />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="字印" field="characters">
                <Input placeholder="请输入字印" />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="下单日期" field="orderDate">
                <Input placeholder="请选择下单日期" />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="备注" field="remark">
                <Input placeholder="请输入备注" />
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className={styles['button-group']}>
          <Space>
            <Button
              type="primary"
              onClick={() => setDetailData([...detailData, {}])}
            >
              新增
            </Button>
          </Space>
          <Space>
            <div style={{ display: 'flex' }}>
              <Select
                value={batchForm.type}
                showSearch
                placeholder="请选择列"
                style={{ marginRight: 10, width: 100 }}
                onChange={(e) =>
                  setBatchForm({ type: e, number: batchForm.number })
                }
              >
                <Select.Option value="circle">圈号</Select.Option>
                <Select.Option value="singleWeight">件重</Select.Option>
                <Select.Option value="quantity">数量</Select.Option>
              </Select>
              <InputNumber
                value={batchForm.number}
                placeholder="值"
                style={{ width: 100 }}
                hideControl
                onChange={(e) =>
                  setBatchForm({ type: batchForm.type, number: e })
                }
              />
              <Button type="primary" onClick={() => batchAllocation()}>
                分配
              </Button>
            </div>
          </Space>
        </div>
        <EditableTable
          detailData={detailData}
          setDetailData={setDetailData}
          setSelectedRow={setSelectedRow}
        />
      </Drawer>
    </div>
  );
}

export default CustomerEdit;
