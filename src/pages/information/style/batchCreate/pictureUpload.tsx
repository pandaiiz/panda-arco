import { Upload } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Big from '@/assets/big.svg';
import Small from '@/assets/small.svg';
import Rotate from '@/assets/rotate.svg';

function PictureUpload({ url, onChange }) {
  const [fileList, setFileList] = useState<any>([]);
  useEffect(() => {
    if (url) setFileList([{ url, uid: nanoid() }]);
  }, []);
  const renderUploadList = (filesList: any[]) => (
    <div style={{ display: 'flex', textAlign: 'center' }}>
      {filesList.map((file: any) => {
        const url = file.url || URL.createObjectURL(file.originFile);

        return (
          <PhotoProvider
            key={url}
            toolbarRender={({ onScale, scale, rotate, onRotate }) => {
              return (
                <>
                  <Big
                    className="PhotoView-Slider__toolbarIcon"
                    onClick={() => onScale(scale + 1)}
                  />
                  <Small
                    className="PhotoView-Slider__toolbarIcon"
                    onClick={() => onScale(scale - 1)}
                  />
                  <Rotate
                    className="PhotoView-Slider__toolbarIcon"
                    onClick={() => onRotate(rotate + 90)}
                  />
                </>
              );
            }}
          >
            <PhotoView src={url}>
              <img src={url} alt="" style={{ height: 100, margin: 'auto' }} />
            </PhotoView>
          </PhotoProvider>
          /*<img
            key="image"
            src={url}
            style={{ height: 100, margin: 'auto' }}
            onClick={() => {
              Modal.success({
                title: '预览',
                style: { width: 800, textAlign: 'center' },
                content: <img src={url} alt="" style={{ maxWidth: 600 }} />,
              });
            }}
            alt=""
          />*/
        );
      })}
    </div>
  );
  return (
    <div>
      <Upload
        imagePreview
        action="/api/upload/image"
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
