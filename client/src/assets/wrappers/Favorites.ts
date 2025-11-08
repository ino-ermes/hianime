import styled from 'styled-components';

const Wrapper = styled.section`
  flex-grow: 1;
  max-width: 1024px;
  margin: 0 auto;
  header {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    .fav-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    p {
      padding: 0 20px;
      font-size: 1.75rem;
      margin: 0;
      text-transform: capitalize;
    }
  }
  .container {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    .post-with-btn {
      position: relative;
      width: 25%;
      padding: 0.5rem;
      .delete-btn {
        position: absolute;
        right: 0;
        top: 0;
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
        &:disabled {
          background-color: var(--grey-800) !important;
          color: var(--grey-900);
          cursor: default;
        }
      }
    }
  }
`;

export default Wrapper;
