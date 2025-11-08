import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  background-color: #1a1e21;
  z-index: 1234;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.3);
  .missing-logo {
    /* width: 150px; */
  }
  .dashboard-title {
    flex-grow: 1;
    text-align: center;
    margin: 0;
    text-transform: uppercase;
    font-size: 1.25rem;
  }
  .user-circle {
    margin-right: 16px;
  }
`;

export default Wrapper;
