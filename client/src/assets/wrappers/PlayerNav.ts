import styled from 'styled-components';

const Wrapper = styled.aside`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  margin-top: -10px;
  user-select: none;
  section {
    display: flex;
  }
  .setting {
    .btn {
      background-color: transparent;
      border: none;
      font-size: 0.865rem;
      width: 110px;
      cursor: pointer;
      color: #eeeeee;
      .on {
        color: var(--primary-500);
      }
      .off {
        color: #d10000;
      }
      line-height: 36px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
  .nav {
    .btn {
      background-color: transparent;
      border: none;
      color: #eeeeee;
      &:hover {
        color: var(--primary-500);
      }
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 4px;
      .icon {
        margin-left: 6px;
      }
      &:first-child {
        margin-right: 10px;
        .icon {
          margin-right: 6px;
          margin-left: 0;
        }
      }
    }
  }
  .btn:disabled,
  .btn:disabled:hover {
    color: var(--grey-800);
    cursor: default;
  }
`;

export default Wrapper;
