import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 10px 10px 0;
  .left {
    img {
      height: 38px;
      width: 38px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
  }
  .right {
    flex-grow: 1;
    .comment {
      font-size: 0.865rem;
    }
    .btn-container {
      display: flex;
      flex-direction: row-reverse;
      padding: 10px;
      button {
        height: 32px;
        border: none;
        border-radius: 5px;
        background-color: var(--primary-500);
        background-color: 0.865rem;
        color: #eeeeee;
        padding: 0 10px;
        cursor: pointer;
        &:disabled {
          background-color: var(--grey-800) !important;
          color: var(--grey-900);
          cursor: default;
        }
        &:hover {
          background-color: var(--primary-500-light);
        }
      }
      .cancel {
        background-color: transparent;
        margin-left: 6px;
        &:hover {
          background-color: transparent;
        }
        &:disabled {
          background-color: transparent !important;
          color: var(--grey-900);
          cursor: default;
        }
      }
    }
  }
`;

export default Wrapper;
