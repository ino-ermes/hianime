import styled from 'styled-components';

const Wrapper = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    object-fit: cover;
  }
  &>img {
    cursor: pointer;
  }
  .imagine {
    position: absolute;
    display: none;
    background-color: #1a1e21;
    top: 70px;
    right: 0;
    width: 250px;
    border-radius: 10px;
    padding-bottom: 10px;
  }
  .imagine-show {
    display: block;
  }
  .user-name {
    display: flex;
    align-items: center;
    padding: 20px 20px 14px;
    img {
      height: 44px;
      width: 44px;
    }
    span {
      margin-left: 20px;
    }
  }
  .sep {
    border-bottom-color: #eeeeee99;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    margin: 6px 0;
  }
  .menu-item {
    display: flex;
    align-items: center;
    font-size: 1.15rem;
    padding: 2px 5px 2px;
    cursor: pointer;
    .icon {
      width: 40px;
      display: block;
    }
    .text {
      flex-grow: 1;
      margin-left: 10px;
    }
    &:hover {
        background-color: #273037;
    }
  }
`;

export default Wrapper;
