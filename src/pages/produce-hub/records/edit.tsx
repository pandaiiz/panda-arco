import React from 'react';
import {
  Modal,
  Form,
  Input,
  Message,
  Radio,
  InputNumber,
} from '@arco-design/web-react';
import { validateMessages } from '@/utils/common';
import { getDepartmentList } from '@/pages/information/department/service';
import { useRequest } from 'ahooks';
import { getEnum } from '@/utils/commonService';
import {
  addTransferDetail,
  updateTransferDetail,
} from '@/pages/produce-hub/records/service';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function CustomerEdit({ data, onClose }) {
  const [form] = Form.useForm();
  const { data: departmentList } = useRequest(getDepartmentList);
  const { data: productTypeEnum } = useRequest(() => getEnum('PRODUCT_TYPE'));
  console.log(departmentList);

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    if (data.id) await updateTransferDetail(data.id, formData);
    else await addTransferDetail(formData);
    Message.success('提交成功 !');
    onClose();
  }
  return (
    <div>
      <Modal
        title={data.id ? '编辑' : '新增'}
        visible={true}
        onOk={onOk}
        autoFocus={false}
        focusLock={false}
        onCancel={onClose}
        // confirmLoading={isLoading}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          form={form}
          validateMessages={validateMessages}
        >
          <FormItem
            label="流程单"
            field="transferCode"
            rules={[{ required: true }]}
          >
            <InputNumber placeholder="请输入流程单" />
          </FormItem>
          <FormItem
            label="部门"
            field="departmentId"
            rules={[{ required: true }]}
          >
            <RadioGroup type="button" name="lang" defaultValue="Guangzhou">
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
            <RadioGroup type="button" name="lang" defaultValue="Guangzhou">
              {productTypeEnum?.map((item) => (
                <Radio key={item.id} value={item.key}>
                  {item.title}
                </Radio>
              ))}
            </RadioGroup>
          </FormItem>
          <FormItem label="出入库" field="type" rules={[{ required: true }]}>
            <RadioGroup type="button">
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
