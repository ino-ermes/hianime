import styled from 'styled-components';

const Wrapper = styled.div`
  background: #273037;
  display: flex;
  align-items: center;
  border-radius: var(--borderRadius);
  height: 36px;
  position: relative;
  input {
    border: transparent;
    background: transparent;
    height: 100%;
    color: #eeeeee;
    flex-grow: 1;
    font-size: var(--small-text);
  }
  input:focus {
    outline: transparent;
  }
  button {
    color: var(--grey-800);
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: color 100ms;
    font-size: 1rem;
    padding: 0px 10px;
    height: 100%;
    &:hover {
      color: #eeeeee;
    }
    &:disabled {
      color: var(--grey-900);
      cursor: default;
    }
  }
  .search-result {
    display: none;
    position: absolute;
    right: 0;
    left: 0;
    top: calc(100% + 22px);
    background-color: #1a1e21;
    border-radius: 8px;
    padding: 10px;
  }
  .search-result.show {
    display: block;
  }
  .more-search {
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: var(--primary-500);
  }
  .result-container {
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
    min-height: 100px;
    max-height: 80vh;
    &::-webkit-scrollbar {
      width: 10px;
      background-color: #000;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #333;
    }
  }
  .post {
    cursor: pointer;
    border-radius: 3px;
    &:hover {
      background-color: #273037;
    }
  }
`;

export default Wrapper;
