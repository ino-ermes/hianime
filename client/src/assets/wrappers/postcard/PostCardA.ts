import styled from 'styled-components';

const Wrapper = styled.article<{ $imgUrl: string }>`
  background-color: var(--backgroundColor);
  background-image: url(${(props) => props.$imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
  height: 550px;
  .shadow {
    display: flex;
    flex-direction: column-reverse;
    box-shadow: inset 300px -40px 100px 120px #20282d;
    width: 100%;
    height: 100%;
    padding: 50px;
    font-weight: var(--bodyFont);
    font-size: 1rem;
  }
  .content {
    width: 54%;
  }
  .title {
    font-size: 2.25rem;
    margin: 0;
  }
  .info {
    margin: 20px 0;
    .info-item {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      .icon {
        margin-right: 8px;
      }
      .text {
        font-size: 0.865rem;
      }
    }
    .info-item:not(:first-child) {
      margin-left: 24px;
    }
  }
  .nav-container {
      margin: 30px 0;
      display: flex;
      align-items: center;
      .nav {
        border-radius: 21px;
        margin-right: 20px;
        font-size: 1.1rem;
        height: 42px;
        padding: 0 18px;
        .nav__start-icon {
          font-size: 0.865rem;
        }
      }
      .nav-white {
        background-color: var(--white);
        color: var(--black);
        &:hover {
          background-color: var(--grey-500);;
        }
      }
    }
  .description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export default Wrapper;
