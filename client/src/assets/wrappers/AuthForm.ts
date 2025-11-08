import styled from 'styled-components';

const Wrapper = styled.form`
  background-color: rgba(30, 30, 30, 0.9);
  width: 500px;
  border-radius: 10px;
  margin: auto 0;
  p {
    margin: 0;
  }
  position: relative;
  .close {
    position: absolute;
    right: -11px;
    top: -11px;
    border: none;
    background-color: var(--white);
    border-radius: 50%;
    color: var(--black);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 100ms;
    font-size: 16px;
    padding: 6px;
    &:hover {
      background-color: var(--primary-500);
      color: var(--white);
    }
  }
  .container {
    padding: 30px 20px;
    .header {
      margin: 16px 0 20px;
      font-size: 26px;
      color: var(--white);
      text-align: center;
    }
    .form-row {
      margin: 18px 0;
      label {
        text-transform: uppercase;
        display: block;
        font-size: 0.75rem;
        margin: 10px 4px;
      }
      input {
        color: var(--grey-900);
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        outline: none;
        border: none;
        font-size: 0.865rem;
      }
    }
    .option {
      display: none;
      justify-content: space-between;
      .checkbox {
        font-size: 1rem;
        color: #eeeeee;
        font-family: var(--body-font);
        display: flex;
        align-items: center;
      }
      #forgot-password {
        cursor: pointer;
        color: var(--primary-500);
      }
    }
    button {
      width: 100%;
      margin: 20px 0 40px 0;
      height: 40px;
      font-size: 16px;
    }
    .nav {
      text-align: center;
      span {
        cursor: pointer;
        color: var(--primary-500);
      }
    }
  }
`;

export default Wrapper;
