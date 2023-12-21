import React, { useEffect, useId, useState } from 'react';
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
import ProductTable from '@/pages/order/delivery/DeliveryNote/ProductTable';
import { cloneDeep } from 'lodash';
import { getEnum } from '@/utils/commonService';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
function ListEdit({ data, onClose }) {
  const [form] = Form.useForm();
  const { data: detailsData, loading } = useRequest(
    () => data.id && getOrderDetailsById(data.id)
  );
  const { data: fontPrintEnum } = useRequest(() => getEnum('FONT_PRINT'));

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);

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
  const footer = (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Space>
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
        title='出库'
        visible={true}
        footer={footer}
        autoFocus={false}
        focusLock={false}
        onCancel={onClose}
        confirmLoading={confirmLoading}
      >
        <ProductTable
          detailData={data}
        />
      </Drawer>
    </Spin>
  );
}

export default ListEdit;
