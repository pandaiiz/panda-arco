import { Card, Modal, Progress, Upload } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import {
  IconDelete,
  IconEdit,
  IconEye,
  IconPlus,
} from '@arco-design/web-react/icon';

function PictureUpload({ url, onChange }) {
  const [fileList, setFileList] = useState<any>([]);
  useEffect(() => {
    if (url) setFileList([{ url, uid: nanoid() }]);
  }, []);
  const renderUploadList = (filesList, props) => (
    <div style={{ display: 'flex', marginTop: 20 }}>
      {filesList.map((file) => {
        const url = file.url || URL.createObjectURL(file.originFile);

        return (
          <img
            key="image"
            src={url}
            style={{ width: '100%' }}
            onClick={() => {
              Modal.success({
                title: '预览',
                style: { width: 800, textAlign: 'center' },
                content: <img src={url} alt="" style={{ maxWidth: 600 }} />,
              });
            }}
            alt=""
          />
        );
      })}
    </div>
  );
  return (
    <div>
      <Upload
        imagePreview
        action="/api/picture/upload"
        listType="picture-card"
        limit={1}
        fileList={fileList}
        showUploadList={{
          removeIcon: null,
        }}
        onChange={(uploadList, currentFile) => {
          if (currentFile.status !== 'done') return;
          setFileList(uploadList);
          onChange(uploadList);
        }}
        renderUploadList={renderUploadList}
      />
    </div>
  );
}

export default PictureUpload;
