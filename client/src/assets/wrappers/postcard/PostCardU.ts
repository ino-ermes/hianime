import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: left;
  img {
    height: 100%;
    width: 60px;
    object-fit: cover;
    border-radius: 3px;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 1rem;
    padding: 6px;
    .title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .meta-info {
      display: flex;
      align-items: center;
      .count-item {
        background-color: #1a1e2199;
        border-radius: var(--borderRadius);
        padding: 4px 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 100%;
        margin: 0 3px 0 0;
        .icon {
          margin-right: 1.5px;
        }
        .text {
          margin-left: 1.5px;
          font-size: 0.73rem;
        }
      }
      .sep {
        margin: 0 5px;
        font-size: 0.875rem;
      }
      .type {
        margin: 0 3px;
        font-size: 0.865rem;
      }
    }
  }
`;

export default Wrapper;
