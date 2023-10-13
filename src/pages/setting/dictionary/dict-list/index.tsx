import React, { useState } from 'react';
import {
  Button,
  Card,
  Link,
  Message,
  Modal,
  Space,
  Tag,
} from '@arco-design/web-react';
import Edit from '@/pages/setting/dictionary/dict-list/edit';
import { Menu } from '@arco-design/web-react';
import { useRecoilState } from 'recoil';
import { selectedDictState } from '@/pages/setting/dictionary';
import { useRequest } from 'ahooks';
import { deleteDictById, getDicts } from '@/pages/setting/dictionary/service';
const MenuItem = Menu.Item;
function DictList() {
  const [selectedDict, setSelectedDict] = useRecoilState(selectedDictState);
  const [visible, setVisible] = useState(false);
  const { data: dictionaryList, refresh } = useRequest(getDicts);
  function confirm(item: { id: any }) {
    Modal.confirm({
      title: '请确认是否要删除此数据！',
      onOk: async () => {
        await deleteDictById(item.id);
        refresh();
        Message.success('删除成功！');
      },
    });
  }
  const modalClose = async () => {
    setVisible(false);
    refresh();
  };
  return (
    <Card
      title="字典列表"
      style={{ width: '100%' }}
      extra={
        <Button
          type="text"
          onClick={() => {
            setSelectedDict({});
            setVisible(true);
          }}
        >
          新增
        </Button>
      }
    >
      <Menu style={{ height: '100%' }}>
        {dictionaryList?.map((item) => (
          <MenuItem
            onClick={() => {
              setSelectedDict(item);
            }}
            key={item.id}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Space>
              {item.enabled === 1 && <Tag color="green">启用</Tag>}
              {item.enabled === 0 && <Tag color="red">停用</Tag>}
              {item.title}
            </Space>
            <Space>
              <Link
                onClick={() => {
                  setSelectedDict(item);
                  setVisible(true);
                }}
              >
                编辑
              </Link>
              <Link status="error" onClick={() => confirm(item)}>
                删除
              </Link>
            </Space>
          </MenuItem>
        ))}
      </Menu>
      {visible && <Edit data={selectedDict} onClose={modalClose} />}
    </Card>
  );
}

export default DictList;
