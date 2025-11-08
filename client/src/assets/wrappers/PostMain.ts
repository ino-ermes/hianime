import styled from 'styled-components';

const Wrapper = styled.div`
  .main {
    & > .nav {
      display: flex;
      align-items: center;
      .sep-dot {
        font-size: 10px;
        margin: 0 6px;
      }
      margin: 18px 38px;
    }
    .watch {
      border: 1px solid var(--primary-500);
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      margin: 0 38px;
      position: relative;
      padding-left: 300px;
      .episode-list {
        width: 300px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
      }
      .what-do-we-do {
        background-color: #1a1e21;
        flex-grow: 1;
        position: relative;
        .frame,
        .player {
          aspect-ratio: 16/9;
          border-radius: 0;
          background-color: #000;
        }
      }
    }
  }
  .ads {
    z-index: 100;
    position: absolute;
    top: 0;
    bottom: 56px;
    left: 0;
    right: 0;
    .delayed-btn {
      z-index: 120;
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 140px;
      padding: 10px 0;
      border: none;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.5);
      color: #eeeeee;
      cursor: pointer;
      font-size: 0.865rem;
      &:disabled {
        background-color: rgba(0, 0, 0, 0.5);
        color: #eeeeee;
        cursor: default;
      }
    }
  }
`;

export default Wrapper;
