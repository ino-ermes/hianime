import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  z-index: 999;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: #1a1e21;
  padding: 0px 16px;
  position: sticky;
  top: 0;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.3);
  .logo {
    height: 40px;
    margin: 0 10px 0 38px;
    cursor: pointer;
  };
  .search {
    margin: 0 100px;
    flex-grow: 1;
    max-width: 600px;
  };
  .menu {
    font-size: 24px;
    cursor: pointer;
  };
  .center {
    display: flex;
    flex-grow: 1;
    height: 100%;
    align-items: center;
    justify-content: center;
    align-items: center;
  }
`;

export default Wrapper;
