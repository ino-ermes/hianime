import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #31363f;
  border-radius: 20px;
  margin-top: 120px;
  padding: 40px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  .form-container {
    width: 40vw;
    .message {
      margin: 0;
      text-align: center;
      font-size: 1.5rem;
      padding-bottom: 20px;
    }
    .description {
        font-size: 1rem;
        text-align: left;
    }
    .btn-container {
      display: flex;
      justify-content: space-around;
      .btn-cancel {
        background-color: #dc143c;
        &:hover {
          background-color: #dc143c55;
        }
      }
      width: 240px;
      margin: 50px auto 0;
    }
  }
`;

export default Wrapper;
