import React from "react";
import styled, { keyframes } from "styled-components";

type Props = {
  isLoading: boolean;
  size?: number;
};

export const LoadingApp: React.FC<Props> = ({ isLoading, size = 80 }) => {
  const dots = 8;
  if (!isLoading) return null;

  return (
    <LoadingBackdrop>
      <Loading $size={size}>
        {Array.from({ length: dots }, (_, index) => {
          const angle = (index * (2 * Math.PI)) / dots;
          const delay = index * 0.15;
          return <Dot key={index} angle={angle} delay={delay} />;
        })}
      </Loading>
    </LoadingBackdrop>
  );
};

const dotOpacityAnimation = keyframes`
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
`;

const Loading = styled.div<{ $size?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => `${props.$size}px`};
  width: ${(props) => `${props.$size}px`};
  position: relative;
`;

const LoadingBackdrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  cursor: default;
  background-color: rgba(255 255 255 / 85%);
  z-index: 1000;
`;

const Dot = styled.div<{ angle: number; delay: number }>`
  width: 8px;
  height: 8px;
  background-color: #a09d9d;
  border-radius: 50%; /* Hình tròn */
  position: absolute;
  animation: ${dotOpacityAnimation} 1.4s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay}s;

  transform: translate(-50%, -50%);
  ${({ angle }) => `
    top: ${50 + 20 * Math.sin(angle)}%;
    left: ${50 + 20 * Math.cos(angle)}%;
  `}
`;
