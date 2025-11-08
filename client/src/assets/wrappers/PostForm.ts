import styled from 'styled-components';

const Wrapper = styled.div`
  .wrapper {
    .form-row {
      margin: 18px 0;
      width: 100%;
      display: flex;
      & > .col {
        width: 50%;
        display: flex;
        &:nth-child(2) {
          margin-left: 25px;
        }
      }
      & > .col-ver {
        .ver-poster .ant-upload {
          width: 150px;
          height: 200px;
        }
        .hor-poster .ant-upload {
          width: 356px;
          height: 200px;
        }
        label {
          width: 100%;
          margin-bottom: 14px;
        }
        width: 50%;
        text-align: center;
      }
      label {
        display: block;
        width: 100px;
        min-width: 100px;
      }
      .input {
        min-height: 30px;
        flex-grow: 1;
        width: auto;
      }
    }
    .btns {
      margin-top: 60px;
      width: 100%;
      display: flex;
      justify-content: center;
      button {
        margin: 0 20px;
      }
      .btn-red {
        background-color: #dc143c;
        &:hover {
          background-color: #dc143c55;
        }
      }
    }
  }
`;

export default Wrapper;
