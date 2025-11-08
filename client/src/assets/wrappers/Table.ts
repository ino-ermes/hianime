import styled from 'styled-components';

const Wrapper = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 6px;
  thead {
    text-transform: capitalize;
    background-color: #1d2323;
  }
  tbody {
    tr {
      background-color: #63686e;
      &:hover {
        background-color: #929aab;
      }
      td {
        padding: 6px 0px 6px 30px;
        color: var(--white);
      }
    }
  }
  th {
    padding: 6px 0px 6px 30px;
    text-align: left;
  }
  th:first-child {
    border-radius: 5px 0 0 5px;
  }

  th:last-child {
    border-radius: 0 5px 5px 0;
  }
  tr:first-child td:first-child {
    border-top-left-radius: 5px;
  }
  tr:first-child td:last-child {
    border-top-right-radius: 5px;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius: 5px;
  }
  tr:last-child td:last-child {
    border-bottom-right-radius: 5px;
  }

  .action {
    width: 70px;
    padding-right: 20px;
    color: transparent;
    user-select: none;
  }

  .action-container {
    position: relative;
  }

  .action-btn {
    border: none;
    background-color: transparent;
    outline: none;
    color: #eeeeee;
    cursor: pointer;
    padding: 2px;

    &:disabled {
      cursor: default;
    }
  }

  .btn-menu {
    position: absolute;
    background-color: #1d2323;
    border-radius: 5px;
    left: 0;
    width: 100px;
    z-index: 10;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    .btn-item {
      padding: 4px 10px;
      display: flex;
      align-items: center;
      svg {
        margin-right: 10px;
      }
      &:hover {
        background-color: #273037;
      }
    }
  }

  .sep {
    border-top: 1px solid #eeeeee;
    margin: 4px 0;
  }
`;

export default Wrapper;
