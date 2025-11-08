import React from 'react';
import Wrapper from '../assets/wrappers/ConfirmForm';
import PrimaryButton from './PrimaryButton';
import { FaCheckDouble, FaTimes } from 'react-icons/fa';

interface ConfirmFormProps {
  message: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
}

const ConfirmForm: React.FC<ConfirmFormProps> = ({
  description,
  message,
  onCancel,
  onConfirm,
  disabled,
}) => {
  return (
    <Wrapper>
      <div className='form-container'>
        <p className='message'>{message}</p>
        <p className='description'>{description}</p>
        <div className='btn-container'>
          <PrimaryButton
            startIcon={FaCheckDouble}
            onClick={onConfirm}
            disabled={disabled}
          >
            Confirm
          </PrimaryButton>
          <PrimaryButton
            startIcon={FaTimes}
            className='btn-cancel'
            onClick={onCancel}
            disabled={disabled}
          >
            Cancel
          </PrimaryButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default ConfirmForm;
