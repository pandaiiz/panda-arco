import React from 'react';
import {
  Modal,
  Form,
  Input,
  Message,
  Upload,
  Space,
  Tag,
  Select,
} from '@arco-design/web-react';
import { addStyle, updateStyle } from '@/pages/information/style/service';
import { filterOption, validateMessages } from '@/utils/common';
import { useRequest } from 'ahooks';
import { getEnum } from '@/utils/commonService';
import { getDepartmentByCode } from '@/pages/setting/department/service';
import { cloneDeep } from 'lodash';
const FormItem = Form.Item;

function CustomerEdit({ data, onClose }) {
  const [form] = Form.useForm();

  const { data: categoryList } = useRequest(() => getEnum('CATEGORY'));
  const { data: specList } = useRequest(() => getEnum('SPEC'));
  const { data: techList } = useRequest(() => getEnum('TECH'));
  const { data: departmentData } = useRequest(() =>
    getDepartmentByCode('PROGRAM')
  );

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    if (data.id) await updateStyle(data.id, formData);
    else await addStyle(formData);
    Message.success('提交成功 !');
    onClose();
  }
  function generateStyleCode() {
    // programmerCode specName techName categoryName
    // await form.validate();
    const formData = form.getFieldsValue();
    if (!formData.programmerCode) return;
    if (!formData.specName) return;
    if (!formData.techName) return;
    if (!formData.categoryName) return;
    /*A——品名
    3——编程代号
    6——规格
    12——工艺要求
    -19——序号*/
    form.setFieldValue(
      'styleCode',
      formData.category +
        formData.programmerCode +
        formData.spec +
        formData.tech
    );
    console.log(formData);
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
          wrapperCol={{ span: 17 }}
          form={form}
          initialValues={data.id ? data : { enabled: true, breadcrumb: true }}
          validateMessages={validateMessages}
        >
          <FormItem label="品名" field="category" rules={[{ required: true }]}>
            <Select
              placeholder="请选择品名"
              showSearch
              filterOption={filterOption}
              onChange={(value, option) => {
                form.setFieldValue(
                  'categoryName',
                  'children' in option ? option.children : ''
                );
                generateStyleCode();
              }}
            >
              {categoryList?.map((item: any) => (
                <Select.Option key={item.id} value={item.key}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="品名" field="categoryName" hidden>
            <Input />
          </FormItem>
          <FormItem label="规格" field="spec" rules={[{ required: true }]}>
            <Select
              placeholder="请选择规格"
              showSearch
              filterOption={filterOption}
              onChange={(value, option) => {
                form.setFieldValue(
                  'specName',
                  'children' in option ? option.children : ''
                );
                generateStyleCode();
              }}
            >
              {specList?.map((item: any) => (
                <Select.Option key={item.id} value={item.key}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </FormItem>

          <FormItem label="规格" field="specName" hidden>
            <Input />
          </FormItem>
          <FormItem label="工艺" field="tech" rules={[{ required: true }]}>
            <Select
              placeholder="请选择工艺"
              showSearch
              filterOption={filterOption}
              onChange={(value, option) => {
                form.setFieldValue(
                  'techName',
                  'children' in option ? option.children : ''
                );
                generateStyleCode();
              }}
            >
              {techList?.map((item: any) => (
                <Select.Option key={item.id} value={item.key}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </FormItem>

          <FormItem label="工艺" field="techName" hidden>
            <Input />
          </FormItem>
          <FormItem label="编程" field="programId" rules={[{ required: true }]}>
            <Select
              placeholder="请选择编程"
              showSearch
              filterOption={filterOption}
              onChange={(value, option) => {
                form.setFieldValue(
                  'programmerCode',
                  '_key' in option ? option._key : ''
                );
                generateStyleCode();
              }}
            >
              {departmentData?.users?.map((item: any) => (
                <Select.Option key={item.code} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="编程" field="programmerCode" hidden>
            <Input />
          </FormItem>
          <FormItem label="款号" field="styleCode" rules={[{ required: true }]}>
            <Input placeholder="款号自动生成" />
          </FormItem>
          <FormItem label="设计图" field="contactsPhone">
            <Upload action="/" />
          </FormItem>
          <FormItem label="编程图" field="contactsPhone">
            <Upload action="/" />
          </FormItem>
          <FormItem label="实拍图" field="contactsPhone">
            <Upload action="/" />
          </FormItem>
          <FormItem label="标签" field="contactsPhone">
            <Space size="large">
              <Tag>圆</Tag>
              <Tag>星星</Tag>
              <Tag>客户觉得丑</Tag>
            </Space>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default CustomerEdit;
