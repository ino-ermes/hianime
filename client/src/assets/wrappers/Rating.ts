import styled from 'styled-components';

const Wrapper = styled.div`
  width: 300px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  overflow: hidden;
  .score-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 0;
    .score {
      display: flex;
      align-items: center;
      .star {
        color: #ffc55a;
      }
      span {
        margin-left: 10px;
        font-weight: bold;
        color: var(--white);
      }
    }
    p {
      margin: 0;
    }
  }
  .quote {
    text-align: center;
    margin: 16px 0;
  }
  .btn-container {
    display: flex;
    justify-content: space-between;
    .btn {
      background: none;
      border: none;
      font: inherit;
      outline: inherit;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      padding: 10px 0;
      color: var(--black);
      .icon {
        font-size: 24px;
      }
      span {
        line-height: 1rem;
        margin-top: 10px;
      }
      &:nth-child(1) {
        background-color: #c8c8c8;
      }
      &:nth-child(2) {
        background-color: #dbdbdb;
      }
      &:nth-child(3) {
        background-color: #ededed;
      }
      &:hover {
        background-color: var(--white);
      }
      &.activated {
        background-color: var(--primary-500-light);
      }
      &:disabled {
        background-color: var(--grey-800);
      }
    }
  }
  `;

export default Wrapper;
