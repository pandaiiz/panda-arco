import React, { useCallback, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Message,
  Radio,
  InputNumber,
} from '@arco-design/web-react';
import { validateMessages } from '@/utils/common';
import { getDepartmentList } from '@/pages/setting/department/service';
import { useDebounce, useRequest } from 'ahooks';
import { cloneDeep, debounce } from 'lodash';

import { getEnum } from '@/utils/commonService';
import {
  addTransferDetail,
  getLastTransferDetailByTransferId,
  updateTransferDetail,
} from '@/pages/produce-hub/records/service';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function CustomerEdit({ data, onClose }) {
  const [form] = Form.useForm();
  const { data: departmentList } = useRequest(getDepartmentList);
  const { data: productTypeEnum } = useRequest(() => getEnum('PRODUCT_TYPE'));

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    // if (data.id) await updateTransferDetail(data.id, formData);
    // else await addTransferDetail(formData);
    delete formData.id
    const current = productTypeEnum.find(item => item.key === formData.productType)
    formData.productTypeName = current.title
    await addTransferDetail(formData);
    Message.success('提交成功 !');
    onClose();
  }

  useEffect(() => {
    if (data.id) {
      form.setFieldsValue({
        transferId: data.transferId,
        departmentId: data.departmentId,
        productType: data.productType,
        weight: data.weight,
        quantity: data.quantity,
        remark: data.remark,
      })
    }
  }, [])


  const debouncedFetchTransfer = useCallback(
    debounce((inputValue) => {
      getLastTransferDetailByTransferId(inputValue).then(res => {
        if (res.length > 0) {
          form.setFieldsValue({
            // transferId: res[0].transferId,
            departmentId: res[0].departmentId,
            productType: res[0].productType,
            weight: res[0].weight,
            quantity: res[0].quantity,
            remark: res[0].remark,
          })
        }
      })
    }, 1000),
    []
  );

  return (
    <div>
      <Modal
        title='新增'
        visible={true}
        onOk={onOk}
        autoFocus={false}
        focusLock={false}
        onCancel={onClose}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17 }}
          form={form}
          validateMessages={validateMessages}
        >
          <FormItem
            label="流程单"
            field="transferId"
            rules={[{ required: true }]}
          >
            <InputNumber placeholder="请输入流程单" onChange={debouncedFetchTransfer} />
          </FormItem>
          <FormItem
            label="部门"
            field="departmentId"
            rules={[{ required: true }]}
          >
            <RadioGroup type="button">
              {departmentList?.map((item) => (
                <Radio key={item.id} value={item.id}>
                  {item.name}
                </Radio>
              ))}
            </RadioGroup>
          </FormItem>
          <FormItem
            label="类型"
            field="productType"
            rules={[{ required: true }]}
          >
            <RadioGroup type="button">
              {productTypeEnum?.map((item) => (
                <Radio key={item.id} value={item.key}>
                  {item.title}
                </Radio>
              ))}
            </RadioGroup>
          </FormItem>
          <FormItem label="出入库" field="type" rules={[{ required: true }]}>
            <RadioGroup type="button" >
              <Radio value="IN">入库</Radio>
              <Radio value="OUT">出库</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="重量" field="weight" rules={[{ required: true }]}>
            <InputNumber placeholder="请输入重量" />
          </FormItem>
          <FormItem label="件数" field="quantity" rules={[{ required: true }]}>
            <InputNumber placeholder="请输入件数" />
          </FormItem>
          <FormItem label="备注" field="remark">
            <Input placeholder="请输入备注" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default CustomerEdit;
