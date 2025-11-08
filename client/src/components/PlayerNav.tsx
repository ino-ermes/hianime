import React from 'react';
import Wrapper from '../assets/wrappers/PlayerNav';
import { TbPlayerTrackNextFilled } from 'react-icons/tb';
import { TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSetting,
  selectUser,
  setSetting,
} from '../store/slices/authSlice';
import { AppDispatch } from '../store/store';
import { getAuthClient } from '../api/client';
import { message } from 'antd';
import { AxiosError } from 'axios';

interface PlayerNavProps {
  onNextClicked: () => void;
  onPrevClicked: () => void;
  disabledPrev: boolean;
  disabledNext: boolean;
}

const PlayerNav: React.FC<PlayerNavProps> = ({
  disabledNext,
  disabledPrev,
  onNextClicked,
  onPrevClicked,
}) => {
  const { autoNext, autoPlay } = useSelector(selectSetting);
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  const toggleAutoPlay = () => {
    const newAutoPlay = !autoPlay;
    if (user) {
      updateSetting(autoNext, newAutoPlay);
    } else {
      localStorage.setItem('autoPlay', newAutoPlay ? 'true' : 'false');
    }
    dispatch(setSetting({ autoNext, autoPlay: newAutoPlay }));
  };

  const toggleAutoNext = () => {
    const newAutoNext = !autoNext;
    if (user) {
      updateSetting(newAutoNext, autoPlay);
    } else {
      localStorage.setItem('autoNext', newAutoNext ? 'true' : 'false');
    }
    dispatch(setSetting({ autoNext: newAutoNext, autoPlay }));
  };

  const updateSetting = async (autoNext: boolean, autoPlay: boolean) => {
    if (!user) return;
    try {
      await getAuthClient().post('/auth/setting', { autoNext, autoPlay });
    } catch (err) {
      message.error(
        ((err as AxiosError).response?.data as any)?.msg || 'unknow error'
      );
    }
  };

  return (
    <Wrapper>
      <section className='setting'>
        <button className='btn' onClick={toggleAutoPlay}>
          <span>Auto Play </span>
          <span className={autoPlay ? 'on' : 'off'}>
            {autoPlay ? 'On' : 'Off'}
          </span>
        </button>
        <button className='btn' onClick={toggleAutoNext}>
          <span>Auto Next </span>
          <span className={autoNext ? 'on' : 'off'}>
            {autoNext ? 'On' : 'Off'}
          </span>
        </button>
      </section>
      <section className='nav'>
        <button className='btn' onClick={onPrevClicked} disabled={disabledPrev}>
          <TbPlayerTrackPrevFilled className='icon' />
          <span>Prev</span>
        </button>
        <button className='btn' onClick={onNextClicked} disabled={disabledNext}>
          <span>Next</span>
          <TbPlayerTrackNextFilled className='icon' />
        </button>
      </section>
    </Wrapper>
  );
};

export default PlayerNav;
