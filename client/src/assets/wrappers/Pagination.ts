import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    color: var(--grey-500);
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 100%;
    margin: 0 3px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: var(--white);
      background-color: var(--primary-500-light);
    }
  }
  button.activate {
    background-color: var(--primary-500);
    color: var(--white);
  }
  button:disabled {
    background-color: var(--grey-800) !important;
    color: var(--grey-900);
    cursor: default;
  }
`;

export default Wrapper;
