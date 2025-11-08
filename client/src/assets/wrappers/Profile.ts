import styled from 'styled-components';

const Wrapper = styled.main`
  .hor-sep {
    border-top: 1px var(--grey-900) solid;
    margin: 0 40px;
  }
  .ver-sep {
    border-left: 1px var(--grey-900) solid;
    margin: 40px 0;
  }
  .top {
    display: flex;
    .form-row {
      label {
        width: 80px;
        min-width: 80px;
      }
    }
    height: 300px;
  }
  .form-row {
    display: flex;
    margin: 7px 0;
    label {
      width: 150px;
      min-width: 150px;
    }
    .input {
    }
  }
  .user-avatar {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .avatar-uploader {
      margin: 20px 0;
      img {
        border-radius: 50%;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
  .user-info {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 130px;
  }
  .user-password {
    padding: 40px 130px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .password-change {
    align-self: center;
    margin-top: 14px;
  }
`;

export default Wrapper;
