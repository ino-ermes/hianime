import React, { useState } from 'react';
import Wrapper from '../../assets/wrappers/admin/StudioForm';
import { Input } from 'antd';
import PrimaryButton from '../../components/PrimaryButton';
import { FaCheckDouble } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Studio } from '../../pages/admin/Studios';

interface StudioProps {
  studio: Studio;
  onSubmit: (studio: Studio) => void;
  onCancel: () => void;
  disabled: boolean;
}

const TextArea = Input.TextArea;

const StudioFrom: React.FC<StudioProps> = ({
  studio,
  onSubmit,
  onCancel,
  disabled,
}) => {
  const [dumpStudio, setDumpStudio] = useState<Studio>(studio);
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDumpStudio({ ...dumpStudio, [e.target.id]: e.target.value });
  };
  return (
    <Wrapper>
      <div className='form-container'>
        <p className='for-what'>{dumpStudio._id ? 'Edit studio' : 'Add studio'}</p>
        <div className='form-row'>
          <label htmlFor='name'>Name</label>
          <Input
            type='text'
            id='name'
            className='input'
            value={dumpStudio.name}
            onChange={handleOnChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='description'>Description</label>
          <TextArea
            id='description'
            className='input'
            value={dumpStudio.description}
            autoSize={{ minRows: 2 }}
            maxLength={200}
            onChange={handleOnChange}
          />
        </div>
        <div className='btn-container'>
          <PrimaryButton
            startIcon={FaCheckDouble}
            onClick={(e) => {
              e.preventDefault();
              onSubmit(dumpStudio);
            }}
            disabled={disabled}
          >
            {dumpStudio._id ? 'Update' : 'Create'}
          </PrimaryButton>
          <PrimaryButton
            startIcon={FaTimes}
            className='btn-cancel'
            onClick={() => onCancel()}
            disabled={disabled}
          >
            Cancel
          </PrimaryButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default StudioFrom;
