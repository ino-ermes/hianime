import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 30px 30px;
  .posts-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: auto;
    grid-gap: 1rem;
    margin-bottom: 30px;
  }
`;

export default Wrapper;
