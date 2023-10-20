import {
  Button,
  Input,
  InputNumber,
  Select,
  Spin,
  Table,
  TableColumnProps,
  Tag,
} from '@arco-design/web-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cloneDeep, debounce } from 'lodash';
import { useRequest } from 'ahooks';
import { getEnum } from '@/utils/commonService';
import { deleteOrderDetailById } from '@/pages/order/list/service';
import PictureUpload from '@/pages/order/list/edit/pictureUpload';
import { getListByFilter } from '@/pages/information/style/service';
import FindStyle from '@/pages/order/list/edit/findStyle';

const Editable = ({
  detailData,
  setDetailData,
  setSelectedRow,
  selectedRow,
}) => {
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [findStyle, setFindStyle] = useState<any>({});
  const [findStyleVisible, setFindStyleVisible] = useState(false);
  const refFetchId = useRef(null);
  const debouncedFetchUser = useCallback(
    debounce((inputValue) => {
      refFetchId.current = Date.now();
      const fetchId = refFetchId.current;
      setFetching(true);
      setOptions([]);
      getListByFilter(inputValue).then((list) => {
        if (refFetchId.current === fetchId && list) {
          setFetching(false);
          setOptions(list);
        }
      });
    }, 500),
    []
  );
  const { data: categoryEnum } = useRequest(() => getEnum('CATEGORY'));
  const columns: TableColumnProps[] = [
    {
      // 下拉框
      title: '品名',
      dataIndex: 'category',
      align: 'center',
      width: 160,
      render: (col, record, index) => (
        <Select
          disabled={record.status === 1}
          placeholder="请选择品名"
          allowClear
          value={record.category}
          onChange={(value, option) => {
            const newSelectedRowKeys = selectedRowKeys.filter(
              (item) => item !== record.nanoid
            );
            const newSelectedRow = selectedRow.filter(
              (item) => item.nanoid !== record.nanoid
            );
            setSelectedRowKeys(newSelectedRowKeys);
            setSelectedRow(newSelectedRow);
            const newData = cloneDeep(detailData);
            if (value) {
              newData[index].category = value;
              newData[index].categoryName =
                'children' in option ? option.children : '';
            } else {
              newData[index].category = '';
              newData[index].categoryName = '';
            }
            setDetailData(newData);
          }}
        >
          {categoryEnum?.map((item) => (
            <Select.Option key={item.id} value={item.key}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: '款号',
      dataIndex: 'styleId',
      align: 'center',
      width: 300,
      render: (col, record, index) =>
        record.styleId ? (
          <Input.Group compact>
            <Input
              disabled
              value={record?.style?.styleCode}
              style={{ width: '75%' }}
            />
            <Button
              style={{ width: '25%' }}
              status="danger"
              onClick={() => {
                const newData = cloneDeep(detailData);
                newData[index].styleId = '';
                setDetailData(newData);
              }}
            >
              修改
            </Button>
          </Input.Group>
        ) : (
          <Input.Group compact>
            <Select
              style={{ width: '75%' }}
              showSearch
              placeholder="根据款号/标签搜索"
              filterOption={false}
              renderFormat={(option) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return option.children.props.children[1];
              }}
              notFoundContent={
                fetching ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Spin style={{ margin: 12 }} />
                  </div>
                ) : null
              }
              onSearch={debouncedFetchUser}
              onChange={(value) => {
                const newData = cloneDeep(detailData);
                newData[index].styleId = value?.id || '';
                newData[index].style = value || '';
                newData[index].category = value?.category || '';
                newData[index].categoryName = value?.categoryName || '';
                setDetailData(newData);
              }}
            >
              {options.map((option) => (
                <Select.Option key={option.id} value={option}>
                  {option.styleCode}
                </Select.Option>
              ))}
            </Select>

            <Button
              style={{ width: '25%' }}
              type="primary"
              onClick={() => {
                setFindStyle(record);
                setFindStyleVisible(true);
              }}
            >
              检索
            </Button>
          </Input.Group>
        ),
    },
    {
      title: '图片',
      dataIndex: 'imgSrc',
      align: 'center',
      render: (col, record, index) => (
        <PictureUpload
          url={record.imgSrc}
          onChange={(file: { response: { src: any } }[]) => {
            const newData = cloneDeep(detailData);
            newData[index].imgSrc = file[0]?.response?.src;
            setDetailData(newData);
          }}
        />
      ),
    },
    {
      title: '圈号',
      dataIndex: 'circle',
      align: 'center',
      width: 100,
      render: (col, record, index) => (
        <Input
          disabled={record.status === 1}
          value={record.circle}
          onChange={(e) => {
            const newData = cloneDeep(detailData);
            newData[index].circle = e;
            setDetailData(newData);
          }}
        />
      ),
    },
    {
      title: '件重',
      dataIndex: 'singleWeight',
      align: 'center',
      width: 100,
      render: (col, record, index) => (
        <InputNumber
          disabled={record.status === 1}
          value={record.singleWeight}
          onChange={(e) => {
            const newData = cloneDeep(detailData);
            newData[index].singleWeight = e;
            newData[index].totalWeight =
              record.quantity &&
              e &&
              Number((Number(record.quantity) * Number(e)).toFixed(2));
            setDetailData(newData);
          }}
        />
      ),
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      align: 'center',
      width: 100,
      render: (col, record, index) => (
        <InputNumber
          disabled={record.status === 1}
          value={record.quantity}
          onChange={(e) => {
            const newData = cloneDeep(detailData);
            newData[index].quantity = e;
            newData[index].totalWeight =
              e &&
              record.singleWeight &&
              Number((Number(e) * Number(record.singleWeight)).toFixed(2));
            setDetailData(newData);
          }}
        />
      ),
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'status',
      width: 100,
      render: (status) => (
        <>
          {status === 0 && <Tag color="red">未排产</Tag>}
          {status === 1 && <Tag color="green">已排产</Tag>}
        </>
      ),
    },
    {
      title: '总重',
      align: 'center',
      dataIndex: 'totalWeight',
      width: 100,
    },
    {
      title: '操作',
      align: 'center',
      width: 120,
      render: (col, record, colIndex) => (
        <Button
          disabled={record.status === 1}
          type="text"
          onClick={() => deleteRow(record.id, colIndex)}
        >
          删除
        </Button>
      ),
    },
  ];

  const deleteRow = async (id, colIndex) => {
    if (id) await deleteOrderDetailById(id);
    setDetailData(detailData.filter((item, index) => index !== colIndex));
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    setSelectedRowKeys(selectedRow.map((item) => item.nanoid));
  }, [selectedRow]);

  return (
    <>
      {findStyleVisible && (
        <FindStyle
          visible={findStyleVisible}
          style={findStyle}
          onClose={(value) => {
            const current = cloneDeep(findStyle);
            current.styleId = value?.id || '';
            current.style = value || '';
            current.category = value?.category || '';
            current.categoryName = value?.categoryName || '';
            const newData = cloneDeep(detailData);
            const a = newData.find((item) => item.nanoid === current.nanoid);
            Object.assign(a, current);
            /*newData.forEach((item) => {
              if (item.nanoid === current.nanoid) {
                item = { ...current };
              }
            });*/
            setDetailData(newData);
            setFindStyleVisible(false);
            setFindStyle({});
          }}
        />
      )}
      <Table
        scroll={{ y: window.screen.height - 300 }}
        columns={columns}
        data={detailData}
        pagination={false}
        rowKey="nanoid"
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRow(selectedRows);
          },
          checkboxProps: (record) => {
            return {
              disabled: !record.category || record.status === 1,
            };
          },
        }}
      />
    </>
  );
};

export default Editable;
