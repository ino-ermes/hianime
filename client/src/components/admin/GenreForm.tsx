import React, { useState } from 'react';
import Wrapper from '../../assets/wrappers/admin/GenreForm';
import { Input } from 'antd';
import PrimaryButton from '../../components/PrimaryButton';
import { FaCheckDouble } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Genre } from '../../pages/admin/Genres';

interface GenreProps {
  genre: Genre;
  onSubmit: (genre: Genre) => void;
  onCancel: () => void;
  disabled: boolean;
}

const TextArea = Input.TextArea;

const GenreFrom: React.FC<GenreProps> = ({
  genre,
  onSubmit,
  onCancel,
  disabled,
}) => {
  const [dumpGenre, setDumpGenre] = useState<Genre>(genre);
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDumpGenre({ ...dumpGenre, [e.target.id]: e.target.value });
  };
  return (
    <Wrapper>
      <div className='form-container'>
        <p className='for-what'>{dumpGenre._id ? 'Edit genre' : 'Add genre'}</p>
        <div className='form-row'>
          <label htmlFor='name'>Name</label>
          <Input
            type='text'
            id='name'
            className='input'
            value={dumpGenre.name}
            onChange={handleOnChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='description'>Description</label>
          <TextArea
            id='description'
            className='input'
            value={dumpGenre.description}
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
              onSubmit(dumpGenre);
            }}
            disabled={disabled}
          >
            {dumpGenre._id ? 'Update' : 'Create'}
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

export default GenreFrom;
