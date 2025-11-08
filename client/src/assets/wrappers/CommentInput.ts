import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  .left {
    img {
      height: 46px;
      width: 46px;
      border-radius: 50%;
      object-fit: cover;
    }
    margin: 10px;
  }
  .right {
    flex-grow: 1;
    .header {
      margin: 6px 0;
      font-size: 1rem;
    }
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
      transition: all 0.2s;
      &.show {
        opacity: 1;
        visibility: visible;
      }
      &.hide {
        height: 0;
        opacity: 0;
        visibility: hidden;
      }
    }
  }
`;

export default Wrapper;
