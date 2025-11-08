import styled from 'styled-components';

const Wrapper = styled.div`
  nav {
    margin-left: 30px;
  }
  .card-container {
    border-radius: 8px;
    background-color: #393e46;
    padding: 40px;
    margin: 0 30px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: box-shadow 0.3s;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
  }
`;

export default Wrapper;
