import styled from 'styled-components';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  margin: 16px 0;
  .link {
    text-decoration: none;
    text-transform: uppercase;
    color: #eeeeee;
  }
  .text {
    text-transform: uppercase;
    color: var(--grey-500);
  }
  svg {
    margin: 0 20px;
    &:first-child {
      margin-left: 0;
      margin-right: 10px;
    }
  }
`;

export default Wrapper;
