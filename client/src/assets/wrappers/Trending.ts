import styled from 'styled-components';

const Wrapper = styled.div`
  .swiper {
    position: relative;
    .btn-container {
      position: absolute;
      bottom: 55px;
      right: 20px;
      z-index: 99;
      display: flex;
      flex-direction: column;
      .btn {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: var(--borderRadius);
        border: none;
        color: var(--grey-500);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        padding: 12px;
        transition: background-color 100ms;
        &:hover {
          background-color: var(--primary-500);
          color: var(--white);
        }
        &:first-child {
          margin-bottom: 10px;
        }
      }
    }
  }
  .err {
    height: 550px;
    min-height: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .err-msg {

  }
`;

export default Wrapper;
