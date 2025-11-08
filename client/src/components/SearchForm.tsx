import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/SearchForm';
import PrimaryButton from './PrimaryButton';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Input, Select } from 'antd';
import { FaFilter } from 'react-icons/fa';
dayjs.extend(customParseFormat);

interface SearchFormProps {
  onFilter: (query: string) => void;
  disabled: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ disabled, onFilter }) => {
  const [type, setType] = useState('all');
  const [status, setStatus] = useState('all');
  const [season, setSeason] = useState('all');
  const [year, setYear] = useState<string>();
  const [sort, setSort] = useState('updated');
  const [title, setTitle] = useState('');

  const onFilterClicked = () => {
    let query = `type=${type}&status=${status}&season=${season}&sort=${sort}`;

    if (title && title.trim().length !== 0) query += `&name=${title.trim()}`;

    if (year) query += `&year=${year}`;

    onFilter(query);
  };

  return (
    <Wrapper>
      <div className='card-container'>
        <div className='filter'>
          <div className='filter-item'>
            <label htmlFor='type' className='what'>
              Type
            </label>
            <Select
              style={{ flexGrow: 1 }}
              id='type'
              value={type}
              onChange={setType}
              options={[
                { value: 'all', label: 'All' },
                { value: 'tv', label: 'TV' },
                { value: 'movie', label: 'Movie' },
                { value: 'ova', label: 'OVA' },
                { value: 'ona', label: 'ONA' },
              ]}
              disabled={disabled}
            />
          </div>
          <div className='filter-item'>
            <label htmlFor='status' className='what'>
              Status
            </label>
            <Select
              style={{ flexGrow: 1 }}
              value={status}
              onChange={setStatus}
              id='status'
              options={[
                { value: 'all', label: 'All' },
                { value: 'completed', label: 'Finished Airing' },
                { value: 'airing', label: 'Currently Airing' },
                { value: 'waiting', label: 'Not yet aired' },
              ]}
              disabled={disabled}
            />
          </div>
          <div className='filter-item'>
            <label htmlFor='season' className='what'>
              Season
            </label>
            <Select
              style={{ flexGrow: 1 }}
              value={season}
              onChange={setSeason}
              id='season'
              options={[
                { value: 'all', label: 'All' },
                { value: 'spring', label: 'Spring' },
                { value: 'summer', label: 'Summer' },
                { value: 'fall', label: 'Fall' },
                { value: 'winter', label: 'Winter' },
              ]}
              disabled={disabled}
            />
          </div>
          <div className='filter-item'>
            <label htmlFor='year' className='what'>
              Year
            </label>
            <DatePicker
              picker='year'
              id='year'
              style={{ flexGrow: 1 }}
              value={year ? dayjs(year) : undefined}
              onChange={(_, dateString) => setYear(dateString as string)}
              disabled={disabled}
            />
          </div>
          <div className='filter-item'>
            <label htmlFor='sort' className='what'>
              Sort
            </label>
            <Select
              style={{ flexGrow: 1 }}
              value={sort}
              onChange={setSort}
              id='sort'
              options={[
                { value: 'name-asc', label: 'Name A-Z' },
                { value: 'name-desc', label: 'Name Z-A' },
                { value: 'added', label: 'Recently added' },
                { value: 'updated', label: 'Recently updated' },
                { value: 'release', label: 'Release date' },
              ]}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='title'>
          <label htmlFor='title' className='what'>
            Title
          </label>
          <Input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={disabled}
          />
        </div>
        <div className='btn-container'>
          <PrimaryButton
            startIcon={FaFilter}
            disabled={disabled}
            onClick={onFilterClicked}
          >
            Filter
          </PrimaryButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchForm;
