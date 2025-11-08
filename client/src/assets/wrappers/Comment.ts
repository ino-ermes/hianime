import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  & > .left {
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
    margin: 10px;
  }
  & > .right {
    flex-grow: 1;
    & > .header {
      margin: 6px 0;
      .name {
        font-size: 1rem;
        color: var(--white);
      }
      .time {
        color: var(--grey-900);
        margin-left: 10px;
        font-size: 0.865rem;
      }
    }
    & > .content {
      margin: 0;
    }
    & > .btn-container {
      display: flex;
      button {
        background-color: transparent;
        height: 30px;
        font-size: 13px;
        padding: 0;
        margin-right: 10px;
        &:hover {
          color: var(--primary-500);
        }
        &:disabled {
          background-color: transparent !important;
          color: var(--grey-900);
        }
      }
    }
  }
  @keyframes spin-180 {
    100% {
      transform: rotate(180deg);
    }
  }
  .view-reply-btn {
    height: 30px;
    background-color: transparent;
    padding: 0;
    color: var(--primary-500);
    font-weight: bold;
    font-size: 0.865rem;
    .btn__start-icon {
      transition: transform 0.3s ease;
    }
    &:disabled {
      background-color: transparent !important;
    }
  }
  .rotated {
    .btn__start-icon {
      transform: rotate(180deg);
    }
  }
`;

export default Wrapper;
