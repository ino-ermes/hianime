import styled from 'styled-components';

const Wrapper = styled.footer`
  margin-top: 100px;
  padding: 10px;
  .sep-ver {
    border-right-color: rgba(255, 255, 255, 0.3);
    border-right-width: 1px;
    border-right-style: solid;
    height: 80%;
    margin: 0 10px;
  }
  .sep-hor {
    border-bottom-color: rgba(255, 255, 255, 0.3);
    border-bottom-width: 1px;
    border-bottom-style: solid;
    width: 80%;
    margin: 10px auto;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    .logo {
      height: 60px;
    }
    .link-container {
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 25px;
        color: var(--grey-800);
        padding: 6px;
        &:hover {
          color: var(--grey-50);
        }
      }
    }
  }
  .bot {
    .slogan {
      width: 100%;
      text-align: center;
      color: var(--grey-800);
    }
  }
`;

export default Wrapper;
