import styled from 'styled-components';

const Wrapper = styled.section`
  flex-grow: 1;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    p {
      font-size: 1.5rem;
      margin: 0;
      text-transform: capitalize;
    }
    .btn {
      color: var(--grey-800);
      display: flex;
      align-items: center;
      font-size: 1rem;
      cursor: pointer;
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 6px;
      }
      &:hover {
        color: #eeeeee;
      }
    }
  }
  .container {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
  }
`;

export default Wrapper;
