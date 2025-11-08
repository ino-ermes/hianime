import React, { useEffect, useRef, useState } from 'react';
import Wrapper from '../assets/wrappers/AuthForm';
import PrimaryButton from './PrimaryButton';
import { Checkbox, notification } from 'antd';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, resetStatus } from '../store/slices/authSlice';
import { AppDispatch, RootState } from '../store/store';

interface AuthFormProps {
  onCloseBtnClicked: () => void;
}

interface AuthState {
  name: string;
  email: string;
  password: string;
  rePassword: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onCloseBtnClicked }) => {
  const [formState, setFormState] = useState<'login' | 'register'>('login');
  const [state, setState] = useState<AuthState>({
    name: '',
    email: '',
    password: '',
    rePassword: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (authError && authStatus === 'failed') {
      api.error({ message: 'Error', description: authError, duration: 0 });
      dispatch(resetStatus());
    }
  }, [authError, api, authStatus, dispatch]);

  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleCloseBtnClicked = (e: React.MouseEvent) => {
    e.preventDefault();
    onCloseBtnClicked();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === 'login') {
      const { email, password } = state;
      if (!email || !password) {
        return;
      }
      dispatch(login({ email, password }));
    } else if (formState === 'register') {
      const { email, password, rePassword, name } = state;
      if (!email || !password || !rePassword || !name) {
        return;
      }
      if (password !== rePassword) {
        return;
      }
      dispatch(register({ email, password, name }));
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      {contextHolder}
      <button className='close' onClick={handleCloseBtnClicked}>
        <FaTimes />
      </button>
      <div className='container'>
        <h1 className='header'>
          {formState === 'register' ? 'Create an Account' : 'Welcome back!'}
        </h1>
        {formState === 'register' && (
          <div className='form-row'>
            <label htmlFor='name'>your name</label>
            <input
              type='text'
              id='name'
              onChange={handleOnChange}
              value={state.name}
              onKeyDown={handleKeyPress}
            />
          </div>
        )}
        <div className='form-row'>
          <label htmlFor='email'>email address</label>
          <input
            type='text'
            id='email'
            value={state.email}
            onChange={handleOnChange}
            onKeyDown={handleKeyPress}
            ref={emailRef}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            value={state.password}
            onChange={handleOnChange}
            onKeyDown={handleKeyPress}
          />
        </div>
        {formState === 'login' ? (
          <>
            <div className='option'>
              <Checkbox className='checkbox'>Remember me</Checkbox>
              <p id='forgot-password'>Forgot password</p>
            </div>
            <PrimaryButton disabled={authStatus === 'loading'} type='submit'>
              Login
            </PrimaryButton>
            <p className='nav'>
              Don't have an account?{' '}
              <span onClick={() => setFormState('register')}>Register</span>
            </p>
          </>
        ) : (
          <>
            <div className='form-row'>
              <label htmlFor='rePassword'>confirm password</label>
              <input
                type='password'
                id='rePassword'
                value={state.rePassword}
                onChange={handleOnChange}
                onKeyDown={handleKeyPress}
              />
            </div>
            <PrimaryButton disabled={authStatus === 'loading'} type='submit'>
              Register
            </PrimaryButton>
            <p className='nav'>
              Have an account?{' '}
              <span onClick={() => setFormState('login')}>Login</span>
            </p>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default AuthForm;
