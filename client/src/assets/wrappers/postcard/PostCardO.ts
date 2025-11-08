import styled from 'styled-components';

const Wrapper = styled.div`
  border-radius: 4px;
  overflow: hidden;
  box-shadow: var(--shadow-4);
  box-sizing: border-box;
  .poster {
    width: 100%;
    padding-top: calc(4 / 3 * 100%);
    position: relative;
    cursor: pointer;
    img {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      transition: filter 200ms;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    .play-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 2.25rem;
      display: none;
    }
    .count {
      position: absolute;
      bottom: 0.5rem;
      left: 0.5rem;
      font-size: 0.875rem;
      .item {
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: var(--borderRadius);
        padding: 4px 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 100%;
        .icon {
          margin-right: 1.5px;
        }
        .text {
          margin-left: 1.5px;
          font-size: 0.73rem;
        }
      }
    }
  }
  .poster:hover {
    img {
      filter: brightness(0.6);
    }
    .play-icon {
      display: block;
    }
  }
  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    font-weight: bold;
    padding: 0 10px;
    cursor: pointer;
    transition: color 100ms;
    &:hover {
      color: var(--primary-500);
    }
  }
  .meta-info {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0 10px 0 10px;
    color: rgba(255, 255, 255, 0.3);
    .sep {
      margin: 0 5px;
      font-size: 0.875rem;
    }
  }
  .duration {
    padding: 6px 12px;
    .ep-info {
      display: flex;
      justify-content: space-between;
      font-size: 0.865rem;
    }
    .bgr {
      background-color: var(--grey-800);
    }
    .remuse-position {
      border-top: 4px solid var(--primary-500);
    }
    padding-bottom: 10px;
  }
`;

export default Wrapper;
