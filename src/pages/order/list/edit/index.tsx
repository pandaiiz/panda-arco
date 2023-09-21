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
  Spin,
  DatePicker,
} from '@arco-design/web-react';
import {
  addOrder,
  getOrderDetailsById,
  updateOrder,
} from '@/pages/order/list/service';
import { useRequest } from 'ahooks';
import { getCustomerList } from '@/pages/information/customer/service';
import EditableTable from '@/pages/order/list/edit/editableTable';
import styles from '@/pages/order/list/style/index.module.less';
import { cloneDeep } from 'lodash';
import { getEnum } from '@/utils/commonService';
import dayjs from 'dayjs';
import { filterOption, validateMessages } from '@/utils/common';
import { nanoid } from 'nanoid';
const FormItem = Form.Item;

const Row = Grid.Row;
const Col = Grid.Col;
function ListEdit({ data, onClose }) {
  const [form] = Form.useForm();
  const { data: customerList } = useRequest(getCustomerList);
  const { data: detailsData, loading } = useRequest(
    () => data.id && getOrderDetailsById(data.id)
  );
  const { data: fontPrintEnum } = useRequest(() => getEnum('FONT_PRINT'));

  const { data: categoryEnum } = useRequest(() => getEnum('CATEGORY'));
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [batchForm, setBatchForm] = useState({
    type: 'circle',
    value: '',
  });

  useEffect(() => {
    data.id && form.setFieldsValue({ orderDate: dayjs().format() });
  }, []);

  useEffect(() => {
    detailsData?.forEach((item) => (item.nanoid = nanoid()));
    if (detailsData) setDetailData(detailsData);
  }, [detailsData]);

  async function onOk() {
    try {
      await form.validate();
      const formData = form.getFieldsValue();
      if (formData.charactersId) {
        formData.charactersTitle = fontPrintEnum?.find(
          (item) => item.id === formData.charactersId
        ).title;
      }
      const submitData = {
        orderData: formData,
        orderDetailData: detailData,
      };
      detailData.forEach((item) => {
        item.orderId = data.id;
        delete item.nanoid;
      });
      setConfirmLoading(true);
      if (data.id) {
        await updateOrder(data.id, submitData);
      } else {
        await addOrder(submitData);
      }
      Message.success('提交成功 !');
      onClose();
    } catch (e) {
    } finally {
      setConfirmLoading(false);
    }
  }

  const batchAllocation = () => {
    const { type, value } = batchForm;
    const rowData = cloneDeep(detailData);
    rowData.forEach((item) => {
      if (selectedRow.find((srItem) => srItem.nanoid === item.nanoid)) {
        item[type] = value;
      }
    });
    setDetailData(rowData);
  };
  return (
    <Spin tip="加载中..." loading={loading}>
      <Drawer
        height="100%"
        placement="bottom"
        title={data.id ? '编辑' : '新增'}
        visible={true}
        onOk={onOk}
        autoFocus={false}
        focusLock={false}
        onCancel={onClose}
        confirmLoading={confirmLoading}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={form}
          initialValues={
            (data.id && data) || { orderDate: dayjs().toISOString() }
          }
          validateMessages={validateMessages}
        >
          <Row className="grid-demo" style={{ marginBottom: 16 }}>
            <Col span={8}>
              <FormItem
                label="客户名称"
                field="customerId"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="请选择"
                  allowClear
                  showSearch
                  filterOption={filterOption}
                >
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
              <FormItem label="字印" field="fontPrint">
                <Select
                  placeholder="请选择"
                  allowClear
                  showSearch
                  filterOption={filterOption}
                  onChange={(value, option) => {
                    form.setFieldValue(
                      'fontPrintName',
                      'children' in option ? option?.children : ''
                    );
                  }}
                >
                  {fontPrintEnum?.map((item) => (
                    <Select.Option key={item.id} value={item.key}>
                      {item.title}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
              <FormItem hidden label="字印" field="fontPrintName">
                <Input placeholder="请输入字印" disabled />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="下单日期" field="orderDate">
                <DatePicker
                  onChange={(dateString, date) =>
                    form.setFieldValue('orderDate', date.toISOString())
                  }
                  placeholder="请选择下单日期"
                  style={{ width: '100%' }}
                />
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
              onClick={() =>
                setDetailData([...detailData, { nanoid: nanoid() }])
              }
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
                onChange={(e) => setBatchForm({ type: e, value: '' })}
              >
                <Select.Option value="circle">圈号</Select.Option>
                <Select.Option value="singleWeight">件重</Select.Option>
                <Select.Option value="quantity">数量</Select.Option>
                <Select.Option value="category">品名</Select.Option>
              </Select>
              {batchForm.type === 'category' ? (
                <Select
                  placeholder="请选择品名"
                  style={{ width: 160 }}
                  value={batchForm.value}
                  onChange={(value) =>
                    setBatchForm({ type: batchForm.type, value })
                  }
                >
                  {categoryEnum?.map((item) => (
                    <Select.Option key={item.id} value={item.key}>
                      {item.title}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Input
                  value={batchForm.value}
                  placeholder="值"
                  style={{ width: 160 }}
                  onChange={(value) =>
                    setBatchForm({ type: batchForm.type, value })
                  }
                />
              )}
              <Button type="primary" onClick={() => batchAllocation()}>
                分配
              </Button>
            </div>
          </Space>
        </div>
        <EditableTable
          detailData={detailData}
          selectedRow={selectedRow}
          setDetailData={setDetailData}
          setSelectedRow={setSelectedRow}
        />
      </Drawer>
    </Spin>
  );
}

export default ListEdit;
