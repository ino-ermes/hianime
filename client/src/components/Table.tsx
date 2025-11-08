import React, { useEffect, useRef, useState } from 'react';
import Wrapper from '../assets/wrappers/Table';
import { BsThreeDots } from 'react-icons/bs';
import { Spin } from 'antd';
import { IconType } from 'react-icons';

interface TableProps {
  fields: { title: string; key: string; map?: (v: any) => any }[];
  data: { [key: string]: any }[];
  actions: (
    | {
        name: string;
        onClick: (value: any) => void;
        icon: IconType;
      }
    | 'sep'
  )[];
  changeAction?: (value: any) => boolean;
}

const Table: React.FC<TableProps> = ({
  data,
  fields,
  changeAction,
  actions,
}) => {
  return (
    <Wrapper cellSpacing={0} cellPadding={0}>
      <thead>
        <tr>
          {fields.map((value, index) => {
            return <th key={index}>{value.title}</th>;
          })}
          <th key={-1} className='action'></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {fields.map((col, colIndex) => {
                return (
                  <td key={colIndex}>
                    {col.map ? col.map(row[col.key]) : row[col.key]}
                  </td>
                );
              })}
              <td key={-1}>
                {changeAction && changeAction(row) ? (
                  <Spin size='small' />
                ) : (
                  <ActionBtn actions={actions} row={row} />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Wrapper>
  );
};

interface ActionBtnProps {
  disabled?: boolean;
  actions: (
    | {
        name: string;
        onClick: (value: any) => void;
        icon: IconType;
      }
    | 'sep'
  )[];
  row: any;
}

const ActionBtn: React.FC<ActionBtnProps> = ({ disabled, actions, row }) => {
  const [show, setShow] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('mouseup', handleClickOutside);
    } else {
      document.removeEventListener('mouseup', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [show]);

  return (
    <div className='action-container'>
      <button
        className='action-btn'
        onClick={() => setShow(true)}
        disabled={disabled}
      >
        <BsThreeDots className='btn-icon' />
      </button>
      {show && (
        <div className='btn-menu' ref={ref}>
          {actions.map((value, index) => {
            if (typeof value === 'string') {
              return <div className='sep' key={index} />;
            } else {
              return (
                <div
                  className='btn-item'
                  onClick={() => {
                    setShow(false);
                    value.onClick(row);
                  }}
                  key={index}
                >
                  <value.icon />
                  <span>{value.name}</span>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Table;
