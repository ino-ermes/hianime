import React, { useEffect, useState } from 'react';
import Wrapper from '../../assets/wrappers/admin/Users';
import HeadNav from '../../components/HeadNav';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import ConfirmForm from '../../components/ConfirmForm';
import { getAuthClient } from '../../api/client';
import { AxiosError } from 'axios';
import { message } from 'antd';
import Pagination from '../../components/Pagination';
import { BiReset } from 'react-icons/bi';

const userFields = [
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  {
    title: 'Registered',
    key: 'createdAt',
    map: (dateString: string) => new Date(dateString || '2024/06/07').toLocaleDateString(),
  },
  { title: 'Role', key: 'role' },
];

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  createdAt: string;
}

const Users: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [curUser, setCurUser] = useState<string>();

  const resetUserPassword = async () => {
    setFormLoading(true);
    if (!curUser) return;
    try {
      await getAuthClient().post(`/users/${curUser}/reset-password`);
      message.success('reset user password successfully');
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response?.data as any).msg);
    }
    setCurUser(undefined);
    setFormLoading(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await getAuthClient().get(
          `/users?page=${page}&limit=10`
        );
        setUsers(response.data.users);
        setPage(response.data.page);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        const error = err as AxiosError;
        message.error((error.response?.data as any).msg);
      }
      setLoading(false);
    };

    getUsers();
  }, [page]);

  return (
    <Wrapper>
      <HeadNav navs={[{ name: 'Users' }]} />
      {curUser && (
        <Modal onClickOutside={() => {}}>
          <ConfirmForm
            description="You're going to reset password of a user, are you sure?"
            message='Reset user password'
            onCancel={() => setCurUser(undefined)}
            onConfirm={resetUserPassword}
            disabled={formLoading}
          />
        </Modal>
      )}
      <div className='card-container'>
        {loading ? (
          <Loading />
        ) : (
          <Table
            fields={userFields}
            data={users}
            actions={[
              {
                icon: BiReset,
                name: 'Reset',
                onClick: (user: IUser) => setCurUser(user._id),
              },
            ]}
          />
        )}
        <div style={{ margin: '30px 0 0 0' }} />
        <Pagination
          curPage={page}
          disabled={loading}
          setCurPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </Wrapper>
  );
};

export default Users;
