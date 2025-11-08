import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  height: 300px;
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
      width: 120px;
      border-radius: 4px;
    }
  }
  .info {
    padding: 40px 6px;
    width: 600px;
    .title {
      font-size: 1.75rem;
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
  }
  .rating-container {
    display: flex;
    align-items: center;
    height: 100%;
    .rating {
    }
  }
`;

export default Wrapper;
