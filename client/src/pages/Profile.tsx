import React, { useState } from 'react';
import { Input, message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import Wrapper from '../assets/wrappers/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setAtvPath } from '../store/slices/authSlice';
import { FaAndroid } from 'react-icons/fa6';
import PrimaryButton from '../components/PrimaryButton';
import { getAuthClient } from '../api/client';
import { AxiosError } from 'axios';
import { AppDispatch } from '../store/store';

const Profile: React.FC = () => {
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangePassword = async () => {
    setLoading(true);
    const { confirmPassword, newPassword, oldPassword } = password;
    if (
      oldPassword.trim().length < 8 ||
      newPassword.trim().length < 8 ||
      confirmPassword.trim().length < 8
    ) {
      message.warning('length of password must be longer than 8 characters');
      setLoading(false);
      return;
    }
    if (password.newPassword === password.confirmPassword) {
      try {
        await getAuthClient().post('/auth/change-password', {
          password: password.oldPassword,
          newPassword: password.newPassword,
        });
        message.success('change password successfully');
        setPassword({
          confirmPassword: '',
          newPassword: '',
          oldPassword: '',
        });
      } catch (err) {
        const error = err as AxiosError;
        message.error((error.response!.data as any)?.msg || 'unknow error');
      }
    } else {
      message.warning('just be by yourself');
    }
    setLoading(false);
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        dispatch(setAtvPath({ avtPath: url }));
      });
    }
    if (info.file.status === 'error') {
      message.error('unknow error');
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <section className='top'>
        <section className='user-avatar'>
          <Upload
            name='image'
            listType='picture-circle'
            className='avatar-uploader'
            showUploadList={false}
            action='api/v1/auth/avatar'
            beforeUpload={beforeUpload}
            onChange={handleChange}
            headers={{
              Authorization: `Bearer ${localStorage.getItem('user_token')}`,
            }}
          >
            <img
              src={
                user?.avtPath || process.env.PUBLIC_URL + '/default_avatar.png'
              }
              alt='avatar'
            />
          </Upload>
          <p>{user?.name}</p>
        </section>
        <div className='ver-sep' />
        <section className='user-info'>
          <div className='form-row'>
            <label htmlFor='name'>Name</label>
            <Input type='text' id='name' className='input' value={user?.name} />
          </div>
          <div className='form-row'>
            <label htmlFor='email'>Email</label>
            <Input
              type='text'
              id='email'
              className='input'
              value={user?.email}
            />
          </div>
          <div className='form-row'>
            <label htmlFor='role'>Role</label>
            <Input type='text' id='role' className='input' value={user?.role} />
          </div>
        </section>
      </section>
      <div className='hor-sep' />
      <section className='user-password'>
        <div className='form-row'>
          <label htmlFor='oldPassword'>Password</label>
          <Input
            type='password'
            id='oldPassword'
            className='input'
            value={password.oldPassword}
            onChange={handleSetPassword}
            disabled={loading}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='newPassword'>New Password</label>
          <Input
            type='password'
            id='newPassword'
            className='input'
            value={password.newPassword}
            onChange={handleSetPassword}
            disabled={loading}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <Input
            type='password'
            id='confirmPassword'
            className='input'
            value={password.confirmPassword}
            onChange={handleSetPassword}
            disabled={loading}
          />
        </div>
        <PrimaryButton
          startIcon={FaAndroid}
          className='password-change'
          disabled={loading}
          onClick={handleChangePassword}
        >
          Change password
        </PrimaryButton>
      </section>
    </Wrapper>
  );
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 8;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export default Profile;
