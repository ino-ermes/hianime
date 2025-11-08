import styled from 'styled-components';

const Wrapper = styled.article`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-bottom: solid 4px var(--primary-500);
  background-color: #1a1e21;
  padding: 40px;
  border-radius: 3px;
  .static {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    font-size: 40px;
    color: var(--primary-500);
  }
  .icon {
    height: 60px;
    width: 60px;
    background-color: var(--primary-500-light);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
  }
  .des {
    font-size: 25px;
    color: #eeeeee;
  }
`;

export default Wrapper;
