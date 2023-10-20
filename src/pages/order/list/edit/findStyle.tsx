import React from 'react';
import { Drawer } from '@arco-design/web-react';
import StyleFilter from '@/pages/information/style/StyleFilter';
import { Image } from '@arco-design/web-react';

function FindStyle({ visible, onClose, style }) {
  return (
    <div>
      <Drawer
        width="100%"
        title="查找款式"
        visible={visible}
        onOk={() => {
          onClose();
        }}
        onCancel={onClose}
      >
        客户图： <Image src={style.imgSrc} height={120} />
        <StyleFilter choose={(data: any) => onClose(data)} />
      </Drawer>
    </div>
  );
}

export default FindStyle;
