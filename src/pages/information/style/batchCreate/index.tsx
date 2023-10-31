import React, { useState } from 'react';
import {
  Input,
  Message,
  Select,
  Drawer,
  Button,
  InputNumber,
  Space,
  Upload,
} from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import EditableTable from '@/pages/information/style/batchCreate/editableTable';
import { cloneDeep } from 'lodash';
import { getEnum } from '@/utils/commonService';
import { filterLetters, filterNumbers, filterOption } from '@/utils/common';
import { nanoid } from 'nanoid';
import { getDepartmentByCode } from '@/pages/setting/department/service';
import { batchAddStyle } from '@/pages/information/style/service';
function BatchCreate({ onClose }) {
  const { data: categoryList } = useRequest(() => getEnum('CATEGORY'));
  const { data: specList } = useRequest(() => getEnum('SPEC'));
  const { data: techList } = useRequest(() => getEnum('TECH'));
  const { data: departmentData } = useRequest(() =>
    getDepartmentByCode('PROGRAM')
  );

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

  async function onOk() {
    try {
      const submitDetailData = cloneDeep(detailData);
      submitDetailData.forEach((item) => {
        item.realitySrc = [
          {
            name: item?.picName,
            uid: item?.picUid,
            url: item?.realitySrc,
          },
        ];
        delete item.picName;
        delete item.picUid;
        delete item.nanoid;
      });
      await batchAddStyle(submitDetailData);
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
          item.categoryName = categoryList.find(
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
      }
    });
    setDetailData(rowData);
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
          multiple
          fileList={fileList}
          action="/api/upload/image"
          showUploadList={false}
          onChange={(uploadList) => {
            const doneList = uploadList.filter(
              (item) => item.status === 'done'
            );
            if (doneList.length !== uploadList.length) return;
            const appendList = uploadList.map((item) => {
              const baseStyleCode = item?.name.split('-')[0];
              console.log(filterNumbers(baseStyleCode));
              /**
               图片名格式：A2312-1.png
               字母为品名，字母后面一位数字是编程师傅编号，-前面的2位数字是工艺，剩余一位是规格编码

               基础款号：A2312
               款号：A2312-1
               品名：A
               编程师傅编码：2
               规格：2
               款号：A1112-1.png
               工艺：12
               **/
              return {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                realitySrc: item?.response?.src,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                picUid: item?.response?.uid,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                picName: item?.response?.name,
                category: filterNumbers(baseStyleCode),
                categoryName: categoryList.find(
                  (cItem) =>
                    cItem.key === filterNumbers(baseStyleCode).toString()
                )?.title,
                programmerId: departmentData.users.find(
                  (cItem) =>
                    cItem.code === filterLetters(baseStyleCode)[0].toString()
                ).id,
                spec: filterLetters(baseStyleCode).slice(1, -2),
                specName: specList.find(
                  (cItem) =>
                    cItem.key ===
                    filterLetters(baseStyleCode).slice(1, -2).toString()
                )?.title,
                tech: baseStyleCode.slice(-2),
                techName: techList.find(
                  (cItem) => cItem.key === baseStyleCode.slice(-2).toString()
                )?.title,
                styleCode: item?.name.split('.')[0],
                baseStyleCode,
                nanoid: nanoid(),
              };
            });

            setSelectedRow(appendList);
            setDetailData([...detailData, ...appendList]);
            setFileList([]);
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
              {categoryList?.map((item) => (
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
    <Drawer
      height="100%"
      placement="bottom"
      title="批量新增款式"
      visible={true}
      footer={footer}
      autoFocus={false}
      focusLock={false}
      onCancel={onClose}
      confirmLoading={confirmLoading}
    >
      <EditableTable
        detailData={detailData}
        selectedRow={selectedRow}
        setDetailData={setDetailData}
        setSelectedRow={setSelectedRow}
      />
    </Drawer>
  );
}

export default BatchCreate;
