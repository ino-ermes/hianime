import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  display: block;
  z-index: 2000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  .side-bar {
    background-color: #1a1e2199;
    box-shadow: 3px 0 10px 0 rgba(0, 0, 0, 0.3);
    width: 300px;
    height: 100%;
    .hor-sep {
      width: 100%;
      height: 0;
      border-top-color: var(--white);
      opacity: 0.3;
      border-top-width: 1px;
      border-top-style: solid;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      background-color: #1a1e21;
      position: relative;
      .menu {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #eeeeee;
        height: 100%;
        padding: 0 16px;
        cursor: pointer;
        position: absolute;
        right: 10px;
        opacity: 0.5;
      }
      .menu:hover {
        opacity: 1;
      }
      .logo {
        height: 40px;
        cursor: pointer;
      }
    }
    .content {
      padding: 8px;
      .nav-item {
        display: block;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: var(--white);
        font-size: 1.25rem;
        border-radius: 6px;
        height: 50px;
        margin: 4px 0;
        .icon {
          width: 100px;
        }
        span {
          flex-grow: 1;
        }
        &.activated {
          background-color: #273037;
          color: var(--primary-500);
        }
        &:hover {
          color: var(--primary-500);
        }
      }
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }
  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes hideOut {
    to {
      display: none;
    }
  }
  &.hide {
    animation: hideOut 0s forwards 0.3s;
    .side-bar {
      animation: slideOut 0.3s forwards;
    }
  }
  &.show {
    display: block;
    .side-bar {
      animation: slideIn 0.3s forwards;
    }
  }
`;

export default Wrapper;
