import styled from 'styled-components';

const Wrapper = styled.button`
  background-color: var(--primary-500);
  border-radius: var(--borderRadius);
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--small-text);
  padding: 0px 12px;
  transition: background-color 100ms;
  font-family: var(--bodyFont);
  color: #ffffff;
  height: 36px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  &:hover {
    background-color: var(--primary-500-light);
  }

  .btn__text {
    margin: 0 6px;
  }

  .btn__start-icon {
    margin-left: 6px;
  }
  .btn__end-icon {
    margin-right: 6px;
  }

  &:disabled {
    background-color: var(--grey-800) !important;
    color: var(--grey-900);
    cursor: default;
  }

`;

export default Wrapper;
