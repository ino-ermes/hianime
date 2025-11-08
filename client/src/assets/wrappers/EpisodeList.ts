import styled from 'styled-components';

const Wrapper = styled.aside`
  header {
    height: 40px;
    display: flex;
    align-items: center;
    color: var(--white);
    background-color: #1a1e21;
    span {
      margin: 0;
      display: inline-block;
      padding: 0 16px;
    }
  }
  li {
    background-color: #1a1e21;
    list-style-type: none;
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100% - 40px);

    &::-webkit-scrollbar {
      width: 10px;
      background-color: #000;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #333;
    }

    ul {
      cursor: pointer;
      padding: 8px 14px 8px 0;
      display: flex;
      align-items: center;
      .episode {
        width: 30px;
        text-align: center;
      }
      .title {
        flex-grow: 1;
        padding: 0 10px;
      }
      .play-icon {
        color: var(--primary-500);
        font-size: 20px;
      }
      border-left: 4px solid transparent;
      &:nth-child(odd) {
        background-color: #20282d;
      }
      &:hover {
        background-color: #273037;
        color: var(--primary-500-light);
      }
    }
    ul.activate {
      border-left: 4px solid var(--primary-500);
      background-color: #273037;
      color: var(--primary-500-light);
    }
    .watched {
      color: var(--grey-900);
    }
  }
`;

export default Wrapper;
