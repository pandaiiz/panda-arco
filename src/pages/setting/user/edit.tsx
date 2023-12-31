import React from 'react';
import { Modal, Form, Input, Message, Select } from '@arco-design/web-react';
import { addUser, updateUser } from '@/pages/setting/user/service';
import { getRoles } from '@/pages/setting/role/service';
import { useRequest } from 'ahooks';
import { validateMessages } from '@/utils/common';
import { getDepartmentList } from '@/pages/setting/department/service';
const FormItem = Form.Item;

function UserEdit({ data, onClose }) {
  const [form] = Form.useForm();
  const { data: roleList } = useRequest(getRoles);
  const { data: departmentList } = useRequest(getDepartmentList);

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    if (data.id) await updateUser(data.id, formData);
    else await addUser(formData);
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
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17 }}
          form={form}
          initialValues={data.id ? data : { enabled: true, breadcrumb: true }}
          validateMessages={validateMessages}
        >
          <FormItem label="姓名" field="name" rules={[{ required: true }]}>
            <Input placeholder="请输入用户姓名" />
          </FormItem>
          <FormItem label="账号" field="account" rules={[{ required: true }]}>
            <Input placeholder="请输入账号" />
          </FormItem>
          <FormItem label="编码" field="code">
            <Input placeholder="请输入员工编码" />
          </FormItem>
          <FormItem
            label="部门"
            field="departmentId"
            rules={[{ required: true }]}
          >
            <Select placeholder="请选择部门">
              {departmentList?.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="角色" field="roleId" rules={[{ required: true }]}>
            <Select placeholder="请选择角色">
              {roleList?.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default UserEdit;
