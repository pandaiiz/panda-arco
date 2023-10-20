import { Button, Message, Modal } from '@arco-design/web-react';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { IconPrinter } from '@arco-design/web-react/icon';
import PrintTemplate from '@/pages/order/arrange/arrange/PrintTemplate';
import { batchPrintTransfer } from '@/pages/produce-hub/transfer/service';

const PrintModal = ({ list, onClose }) => {
  const [visible, setVisible] = React.useState(false);
  const popupContentRef = useRef(null);

  return (
    <div>
      <Button onClick={() => setVisible(true)} type="primary">
        打印
      </Button>
      <Modal
        title="打印预览"
        visible={visible}
        footer={
          <>
            <Button
              onClick={() => {
                onClose();
                setVisible(false);
              }}
            >
              取消
            </Button>

            <ReactToPrint
              trigger={() => <Button type="default">打印</Button>}
              content={() => popupContentRef.current}
            ></ReactToPrint>
            <Button
              type="primary"
              onClick={() => {
                batchPrintTransfer(list.map((item) => item.id)).then(() => {
                  Message.success('状态变更成功！');
                  setVisible(false);
                  onClose();
                });
              }}
            >
              打印完成
            </Button>
          </>
        }
        onOk={() => setVisible(false)}
        okText={
          <ReactToPrint
            trigger={() => <IconPrinter />}
            content={() => popupContentRef.current}
          ></ReactToPrint>
        }
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <div style={{ height: 600, overflowY: 'auto' }}>
          <div ref={popupContentRef} id="popupContentRef">
            {list?.length > 0 && <PrintTemplate list={list} />}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PrintModal;
