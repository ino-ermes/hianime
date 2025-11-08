import React, { useEffect, useState } from 'react';
import Wrapper from '../../assets/wrappers/admin/Genres';
import HeadNav from '../../components/HeadNav';
import Table from '../../components/Table';
import PrimaryButton from '../../components/PrimaryButton';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Modal from '../../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  addGenre,
  deleteGenre,
  getAllGenres,
  removeError,
  resetFormStatus,
  selectError,
  selectFormError,
  selectFormStatus,
  selectGenres,
  selectStatus,
  updateGenre,
} from '../../store/slices/genresSlice';
import Loading from '../../components/Loading';
import { AppDispatch } from '../../store/store';
import GenreFrom from '../../components/admin/GenreForm';
import ConfirmForm from '../../components/ConfirmForm';
import { notification } from 'antd';

const genreFields = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
];

export interface Genre {
  _id?: string;
  name: string;
  description: string;
}

const Genres: React.FC = () => {
  const [state, setState] = useState<{
    action: 'add' | 'update' | 'delete' | 'none';
    genre: Genre;
  }>({
    action: 'none',
    genre: {
      description: '',
      name: '',
    },
  });

  const genres = useSelector(selectGenres);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch<AppDispatch>();
  const formStatus = useSelector(selectFormStatus);
  const formError = useSelector(selectFormError);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllGenres());
    }
    if (error && status === 'failed') {
      api.error({ message: 'Error', description: error });
      dispatch(removeError());
    }
  }, [error, api, dispatch, status]);

  useEffect(() => {
    if (formError && formStatus === 'failed') {
      api.error({ message: 'Error', description: formError });
      dispatch(resetFormStatus());
    }
    if (formStatus === 'succeeded') {
      api.success({
        message: 'Success',
        description: 'you left me, but i never left you',
      });
      dispatch(resetFormStatus());
      resetState();
    }
  }, [api, dispatch, formError, formStatus]);

  const loading = status === 'loading' || status === 'idle';
  const formLoading = formStatus === 'loading';

  const onButtonAdd = () => {
    setState({ action: 'add', genre: { name: '', description: '' } });
  };

  const onTableDelete = (genre: Genre) => {
    setState({ action: 'delete', genre: genre });
  };

  const onTableUpdate = (genre: Genre) => {
    setState({ action: 'update', genre: genre });
  };

  const resetState = () => {
    setState({
      action: 'none',
      genre: {
        _id: undefined,
        description: '',
        name: '',
      },
    });
  };

  const onSubmit = (genre: Genre) => {
    if (state.action === 'update') {
      dispatch(
        updateGenre({
          _id: genre._id!,
          description: genre.description,
          name: genre.name,
        })
      );
    } else if (state.action === 'add') {
      dispatch(addGenre({ name: genre.name, description: genre.description }));
    } else if (state.action === 'delete') {
      dispatch(deleteGenre(genre._id!));
    }
  };

  return (
    <Wrapper>
      {contextHolder}
      <HeadNav navs={[{ name: 'Genres' }]} />
      {state.action !== 'none' && (
        <Modal onClickOutside={() => {}}>
          {state.action === 'delete' && (
            <ConfirmForm
              description="You're going to delete a genre. Are you sure?"
              message='Deleting genre'
              onCancel={resetState}
              onConfirm={() => onSubmit(state.genre)}
              disabled={formLoading}
            />
          )}
          {(state.action === 'update' || state.action === 'add') && (
            <GenreFrom
              genre={state.genre}
              onSubmit={onSubmit}
              onCancel={resetState}
              disabled={formLoading}
            />
          )}
        </Modal>
      )}
      <div className='card-container'>
        <div className='btn-container'>
          <PrimaryButton
            startIcon={FaPlus}
            disabled={loading || status === 'failed'}
            onClick={onButtonAdd}
          >
            New genre
          </PrimaryButton>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <Table
            fields={genreFields}
            data={genres}
            actions={[
              {
                icon: FaEdit,
                name: 'Edit',
                onClick: onTableUpdate,
              },
              'sep',
              {
                icon: FaTrash,
                name: 'Delete',
                onClick: onTableDelete,
              },
            ]}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default Genres;
