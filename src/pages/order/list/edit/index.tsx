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
  Upload,
} from '@arco-design/web-react';
import {
  addOrder,
  getOrderDetailsById,
  updateOrder,
} from '@/pages/order/list/service';
import { useRequest } from 'ahooks';
import { getCustomerList } from '@/pages/information/customer/service';
import EditableTable from '@/pages/order/list/edit/editableTable';
import { cloneDeep } from 'lodash';
import { getEnum } from '@/utils/commonService';
import dayjs from 'dayjs';
import { filterOption, validateMessages } from '@/utils/common';
import { nanoid } from 'nanoid';
import { IconArrowUp } from '@arco-design/web-react/icon';
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
  const [batchForm, setBatchForm] = useState<{
    type: string;
    value: any;
  }>({
    type: 'category',
    value: '',
  });

  const countTotalWeight = () => {
    let orderTotalWeight = 0;
    let orderTotalQuantity = 0;
    detailData.forEach((item) => {
      orderTotalWeight += Number(item?.totalWeight);
      orderTotalQuantity += Number(item?.quantity);
    });
    form.setFieldValue('orderTotalWeight', Number(orderTotalWeight.toFixed(2)));
    form.setFieldValue(
      'orderTotalQuantity',
      Number(orderTotalQuantity.toFixed(2))
    );
  };

  useEffect(() => {
    data.id && form.setFieldsValue({ orderDate: dayjs().format() });
  }, []);

  useEffect(() => {
    detailsData?.forEach((item) => (item.nanoid = nanoid()));
    if (detailsData) setDetailData(detailsData);
  }, [detailsData]);

  useEffect(() => {
    countTotalWeight();
  }, [detailData]);

  async function onOk() {
    try {
      await form.validate();
      const formData = form.getFieldsValue();
      if (formData.charactersId) {
        formData.charactersTitle = fontPrintEnum?.find(
          (item: { id: any }) => item.id === formData.charactersId
        ).title;
      }
      const submitDetailData = cloneDeep(detailData);
      submitDetailData.forEach((item) => {
        item.orderId = data.id;
        delete item.nanoid;
        delete item.style;
      });
      const submitData = {
        orderData: formData,
        orderDetailData: submitDetailData,
      };
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

  const [fileList, setFileList] = useState<any>([]);
  const batchChange = () => {
    const { type, value } = batchForm;
    const rowData = cloneDeep(detailData);
    rowData.forEach((item) => {
      if (selectedRow.find((srItem) => srItem.nanoid === item.nanoid)) {
        item[type] = value;
        if (type === 'category') {
          item.categoryName = categoryEnum.find(
            (item) => item.key === value
          ).title;
        }
        if (type === 'quantity' || type === 'singleWeight') {
          item.totalWeight =
            item.quantity &&
            item.singleWeight &&
            Number(
              (Number(item.quantity) * Number(item.singleWeight)).toFixed(2)
            );
        }

        countTotalWeight();
      }
    });
    setDetailData(rowData);
  };

  const appendToDetailData = (list: any[]) => {
    const appendList = list.map((item) => ({
      imgSrc: item?.response?.src || item?.src,
      nanoid: nanoid(),
      category: 'DEFAULT',
    }));
    setSelectedRow(appendList);
    setDetailData([...detailData, ...appendList]);
    setFileList([]);
  };
  const footer = (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Space>
        <Button
          type="primary"
          onClick={() => setDetailData([...detailData, { nanoid: nanoid() }])}
        >
          新增
        </Button>
        <Upload
          action="/api/upload/excel"
          showUploadList={false}
          onChange={(fileList, file) => {
            if (file.status === 'done') {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              appendToDetailData(file.response.children);
            }
          }}
        >
          <Button icon={<IconArrowUp />}>上传EXCEL</Button>
        </Upload>

        <Upload
          multiple
          fileList={fileList}
          action="/api/upload/order"
          showUploadList={false}
          onChange={(uploadList) => {
            const doneList = uploadList.filter(
              (item) => item.status === 'done'
            );
            if (doneList.length !== uploadList.length) return;
            appendToDetailData(uploadList);
          }}
        />

        <div style={{ display: 'flex' }}>
          <Select
            value={batchForm.type}
            showSearch
            placeholder="请选择列"
            style={{ marginRight: 10, width: 100 }}
            onChange={(e) => setBatchForm({ type: e, value: '' })}
          >
            <Select.Option value="category">品名</Select.Option>
            <Select.Option value="circle">圈号</Select.Option>
            <Select.Option value="singleWeight">件重</Select.Option>
            <Select.Option value="quantity">数量</Select.Option>
          </Select>
          {batchForm.type === 'category' && (
            <Select
              placeholder="请选择品名"
              style={{ width: 160 }}
              value={batchForm.value}
              showSearch
              filterOption={filterOption}
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
          )}
          {batchForm.type === 'circle' && (
            <Input
              value={batchForm.value}
              placeholder="值"
              style={{ width: 160 }}
              onChange={(value) =>
                setBatchForm({ type: batchForm.type, value })
              }
            />
          )}
          {batchForm.type !== 'circle' && batchForm.type !== 'category' && (
            <InputNumber
              value={batchForm.value}
              placeholder="值"
              style={{ width: 160 }}
              onChange={(value) =>
                setBatchForm({ type: batchForm.type, value })
              }
            />
          )}
          <Button type="primary" onClick={() => batchChange()}>
            分配
          </Button>
        </div>
      </Space>
      <Space>
        <Button onClick={onClose}>取消</Button>
        <Button type="primary" onClick={onOk}>
          确定
        </Button>
      </Space>
    </div>
  );

  return (
    <Spin tip="加载中..." loading={loading}>
      <Drawer
        height="100%"
        placement="bottom"
        title={data.id ? '编辑' : '新增'}
        visible={true}
        footer={footer}
        autoFocus={false}
        focusLock={false}
        onCancel={onClose}
        confirmLoading={confirmLoading}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 17 }}
          form={form}
          initialValues={
            (data.id && data) || { orderDate: dayjs().toISOString() }
          }
          validateMessages={validateMessages}
        >
          <Row className="grid-demo" style={{ marginBottom: 16 }}>
            <Col span={6}>
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

            <Col span={6}>
              <FormItem label="订单号" field="orderNumber">
                <Input placeholder="请输入订单号" />
              </FormItem>
            </Col>
            <Col span={6}>
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
            <Col span={6}>
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
            <Col span={6}>
              <FormItem label="备注" field="remark">
                <Input placeholder="请输入备注" />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="总件数" field="orderTotalQuantity" disabled>
                <InputNumber placeholder="总件数" />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="总重" field="orderTotalWeight" disabled>
                <InputNumber placeholder="总重" />
              </FormItem>
            </Col>
          </Row>
        </Form>
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
