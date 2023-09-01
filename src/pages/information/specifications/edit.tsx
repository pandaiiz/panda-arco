import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Message,
  Select,
  Upload,
} from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { getEnum } from '@/utils/commonService';
import {
  addSpecifications,
  updateSpecifications,
} from '@/pages/information/specifications/service';
const FormItem = Form.Item;

function SpecificationsEdit({ data, onClose }) {
  const [form] = Form.useForm();
  const { data: circleEnum } = useRequest(() => getEnum('CIRCLE'));
  const { data: categoryEnum } = useRequest(() => getEnum('CATEGORY'));
  const { data: singleWeightEnum } = useRequest(() => getEnum('SINGLE_WEIGHT'));

  async function onOk() {
    await form.validate();
    const formData = form.getFieldsValue();
    const { pictures } = formData;

    const submitData: any = {
      styleCode: formData.styleCode,
      categoryId: formData.categoryId,
      category: categoryEnum.find((item) => item.id === formData.categoryId)
        .title,
    };
    if (pictures && pictures.length > 0) {
      submitData.pictures = pictures.map((item) => {
        if (item.status === 'done') {
          return {
            name: item.name,
            uid: item.uid,
            src: item.response.src,
          };
        } else {
          return item;
        }
      });
    }

    console.log(submitData);
    if (data.id) await updateSpecifications(data.id, submitData);
    else await addSpecifications(submitData);
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
          <FormItem label="款号" field="styleCode" rules={[{ required: true }]}>
            <Input placeholder="请输入款号" />
          </FormItem>
          <FormItem
            label="品名"
            field="categoryId"
            rules={[{ required: true }]}
          >
            <Select placeholder="请选择品名" allowClear>
              {categoryEnum?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="图片" field="pictures" triggerPropName="fileList">
            <Upload
              listType="picture-card"
              multiple
              name="file"
              action="/api/picture/upload"
              onPreview={(file) => {
                Modal.info({
                  title: 'Preview',
                  content: (
                    <img
                      src={file.url || URL.createObjectURL(file.originFile)}
                      style={{
                        maxWidth: '100%',
                      }}
                    ></img>
                  ),
                });
              }}
            />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

export default SpecificationsEdit;
