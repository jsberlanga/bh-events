import styled from 'styled-components';

const StyledLoader = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    border: 2px solid#222831;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #222831 transparent transparent transparent;

    &::nth-of-type(1) {
      animation-delay: -0.45s;
    }
    &::nth-of-type(2) {
      animation-delay: -0.3s;
    }
    &::nth-of-type(3) {
      animation-delay: -0.15s;
    }
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => (
  <StyledLoader className="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </StyledLoader>
);

export default Loading;
