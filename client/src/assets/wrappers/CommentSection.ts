import styled from 'styled-components';

const Wrapper = styled.div`
  border-top-color: var(--primary-500);
  border-top-width: 2px;
  border-top-style: solid;
  padding: 20px;
  header {
    padding: 10px;
    p {
      font-size: 1.5rem;
      margin: 0;
      text-transform: capitalize;
    }
  }
  button {
    box-shadow: none;
  }
  .show-more {
    height: 30px;
    background-color: transparent;
    padding: 0;
    color: var(--primary-500);
    font-weight: bold;
    font-size: 0.865rem;
    &:disabled {
      background-color: transparent !important;
    }
  }
  .voted {
    color: var(--primary-500);
    &:disabled {
      background-color: transparent !important;
      color: var(--grey-900);
    }
  }
`;

export default Wrapper;
