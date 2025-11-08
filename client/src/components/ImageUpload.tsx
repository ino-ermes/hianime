import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';

interface ImgaeUploadProps {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
  className?: string;
  id?: string;
}

const ImageUpload: React.FC<ImgaeUploadProps> = ({
  imageUrl,
  setImageUrl,
  className,
  id,
}) => {
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.url);
    }
  };

  const uploadButton = (
    <button
      style={{ border: 0, background: 'none', color: 'white' }}
      type='button'
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Upload
      className={className}
      id={id}
      listType='picture-card'
      showUploadList={false}
      action='/api/v1/images'
      beforeUpload={beforeUpload}
      onChange={handleChange}
      name='image'
      style={{ overflow: 'hidden' }}
      headers={{
        Authorization: `Bearer ${localStorage.getItem('user_token')}`,
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt='avatar'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
            marginLeft: '-1px',
            marginTop: '-1px',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt10M;
};

export default ImageUpload;
