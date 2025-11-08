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
`;

export default Wrapper;
