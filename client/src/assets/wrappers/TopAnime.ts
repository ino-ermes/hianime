import styled from 'styled-components';

const Wrapper = styled.aside`
  width: 320px;
  min-width: 320px;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    p {
      font-size: 1.5rem;
      margin: 0;
      text-transform: capitalize;
    }
    span {
      background-color: black;
      padding: 2px;
      border-radius: 5px;
      display: flex;
      button {
        font-size: 0.75rem;
        &:nth-child(2) {
          margin: 0 3px;
        }
        color: var(--grey-800);
        padding: 10px 0;
        background-color: transparent;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background-color 100ms;
        width: 45px;
        &:hover {
          background-color: var(--grey-900);
          color: var(--grey-50);
        }
      }
      button.activate {
        background-color: var(--primary-500);
        color: var(--white);
      }
    }
  }
  .container {
    .item {
      display: flex;
      align-items: center;
      /* border-right-color: red; */
      /* border-right-width: 4px; */
      /* border-right-style: solid; */
      border-radius: 8px;
      background-color: #31363f;
      transition: background-color 100ms;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      margin: 10px 0;
      cursor: pointer;
      .rank {
        font-family: var(--outlineFont);
        width: 60px;
        text-align: center;
        font-size: 60px;
        font-weight: bold;
      }
      .post {
        width: 280px;
        height: 105px;
      }
      &:hover {
        background-color: #31363f99;
      }
    }
  }
`;

export default Wrapper;
