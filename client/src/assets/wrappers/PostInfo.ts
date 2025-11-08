import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  min-height: calc(100vh - 60px);
  .capitalize {
    text-transform: capitalize;
  }
  .cgrey {
    color: var(--grey-800);
  }
  p {
    margin: 0;
  }
  .sep-dot {
    font-size: 10px;
    margin: 0 6px;
  }
  .poster {
    padding: 40px;
    img {
      width: 200px;
      border-radius: 4px;
    }
  }
  .summary {
    padding: 40px 40px 40px 6px;
    flex-grow: 1;
    .nav {
      display: flex;
      align-items: center;
      span {
        cursor: pointer;
        &:last-child {
          cursor: default;
          color: var(--grey-800);
        }
      }
    }
    .title {
      font-size: 2.75rem;
      line-height: 2.85rem;
      margin: 20px 0;
    }
    .meta-info {
      display: flex;
      align-items: center;
      span {
      }
      .item {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: var(--borderRadius);
        padding: 4px 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 100%;
        .icon {
          margin-right: 3px;
          font-size: 0.865rem;
        }
        .text {
          margin-left: 3px;
          font-size: 0.73rem;
        }
      }
    }
    .btn-container {
      margin: 30px 0;
      display: flex;
      align-items: center;
      .btn {
        border-radius: 21px;
        margin-right: 20px;
        font-size: 1.1rem;
        height: 42px;
        padding: 0 18px;
        .btn__start-icon {
          font-size: 0.865rem;
        }
      }
      .btn-white {
        background-color: var(--white);
        color: var(--black);
        &:hover {
          background-color: var(--grey-500);
        }
      }
      .btn-red {
        background-color: #dc143c;
        &:hover {
          background-color: #dc143c55;
        }
      }
    }
    .description {
      text-align: justify;
    }
  }
  .info-container {
    padding: 80px 30px 0;
    background-color: rgba(255, 255, 255, 0.05);
    width: 280px;
    min-width: 280px;
    p {
      font-size: 0.865rem;
      margin: 6px 0;
      span {
      }
      .label {
        color: var(--white);
        margin-right: 10px;
      }
      .genre {
        border-radius: 12px;
        border-color: var(--font-body);
        border-style: solid;
        border-width: 1px;
        display: inline-flex;
        align-items: center;
        height: 24px;
        padding: 0 8px;
        margin-right: 4px;
        margin: 4px 0 4px 4px;
        cursor: pointer;
        &:hover {
          color: var(--primary-500);
        }
      }
    }
    .sep {
      border-top-color: rgba(255, 255, 255, 0.1);
      border-top-width: 1px;
      border-top-style: solid;
      margin: 10px 0;
    }
  }

  .add-list-btn {
    position: relative;
    background-color: #eeeeee;
    color: var(--black);
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 100ms;
    font-family: var(--bodyFont);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 21px;
    margin-right: 20px;
    font-size: 1.1rem;
    height: 42px;
    padding: 0 18px;
    &:hover {
      background-color: var(--grey-500);
    }
    .btn-menu {
      display: none;
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      width: 100%;
      background-color: #eeeeee;
      border-radius: 10px;
      padding: 12px 0;
      cursor: default;
      .btn-item {
        cursor: pointer;
        border: none;
        font-size: 1rem;
        background-color: transparent;
        display: block;
        width: 100%;
        text-align: left;
        padding: 6px 12px;
        &:hover {
          background-color: var(--primary-500-light);
          color: #eeeeee;
        }
      }
      .btn-item.activated {
        color: #eeeeee;
        background-color: #dc143c;
        &:hover {
          background-color: #dc143c55;
        }
      }
    }
    .btn-menu.show {
      display: block;
    }
  }
`;

export default Wrapper;
