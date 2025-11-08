import React, { useEffect, useState } from 'react';
import Wrapper from '../../assets/wrappers/admin/Studios';
import HeadNav from '../../components/HeadNav';
import Table from '../../components/Table';
import PrimaryButton from '../../components/PrimaryButton';
import { FaEdit, FaPlus } from 'react-icons/fa';
import Modal from '../../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  addStudio,
  deleteStudio,
  getAllStudios,
  removeError,
  resetFormStatus,
  selectError,
  selectFormError,
  selectFormStatus,
  selectStudios,
  selectStatus,
  updateStudio,
} from '../../store/slices/studiosSlice';
import Loading from '../../components/Loading';
import { AppDispatch } from '../../store/store';
import StudioFrom from '../../components/admin/StudioForm';
import ConfirmForm from '../../components/ConfirmForm';
import { notification } from 'antd';
import { FaTrash } from 'react-icons/fa6';

const studioFields = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
];

export interface Studio {
  _id?: string;
  name: string;
  description: string;
}

const Studios: React.FC = () => {
  const [state, setState] = useState<{
    action: 'add' | 'update' | 'delete' | 'none';
    studio: Studio;
  }>({
    action: 'none',
    studio: {
      description: '',
      name: '',
    },
  });

  const studios = useSelector(selectStudios);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch<AppDispatch>();
  const formStatus = useSelector(selectFormStatus);
  const formError = useSelector(selectFormError);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllStudios());
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
    setState({ action: 'add', studio: { name: '', description: '' } });
  };

  const onTableDelete = (studio: Studio) => {
    setState({ action: 'delete', studio: studio });
  };

  const onTableUpdate = (studio: Studio) => {
    setState({ action: 'update', studio: studio });
  };

  const resetState = () => {
    setState({
      action: 'none',
      studio: {
        _id: undefined,
        description: '',
        name: '',
      },
    });
  };

  const onSubmit = (studio: Studio) => {
    if (state.action === 'update') {
      dispatch(
        updateStudio({
          _id: studio._id!,
          description: studio.description,
          name: studio.name,
        })
      );
    } else if (state.action === 'add') {
      dispatch(
        addStudio({ name: studio.name, description: studio.description })
      );
    } else if (state.action === 'delete') {
      dispatch(deleteStudio(studio._id!));
    }
  };

  return (
    <Wrapper>
      {contextHolder}
      <HeadNav navs={[{ name: 'Studios' }]} />
      {state.action !== 'none' && (
        <Modal onClickOutside={() => {}}>
          {state.action === 'delete' && (
            <ConfirmForm
              description="You're going to delete a studio. Are you sure?"
              message='Deleting studio'
              onCancel={resetState}
              onConfirm={() => onSubmit(state.studio)}
              disabled={formLoading}
            />
          )}
          {(state.action === 'update' || state.action === 'add') && (
            <StudioFrom
              studio={state.studio}
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
            New studio
          </PrimaryButton>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <Table
            fields={studioFields}
            data={studios}
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

export default Studios;
