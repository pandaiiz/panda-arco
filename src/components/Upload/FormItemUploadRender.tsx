import { Button, Image, Space } from '@arco-design/web-react';
import React from 'react';
import { IconDelete } from '@arco-design/web-react/icon';

export const FormItemUploadRender = (filesList: any, props) => {
  if (filesList.length === 0) return;
  const file = filesList[0];
  const url = file?.url || URL.createObjectURL(file?.originFile);
  return (
    <Space>
      <Image src={url} width={300} />
      <Button
        iconOnly
        icon={<IconDelete />}
        status="danger"
        onClick={() => props.onRemove(file)}
      />
    </Space>
  );
};
