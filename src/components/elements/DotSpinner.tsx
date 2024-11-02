import React from "react";
import styled, { keyframes } from "styled-components";

// Tạo animation cho độ mờ của các chấm
const dotOpacityAnimation = keyframes`
  0%, 100% {
    opacity: 0.2; /* Độ mờ lúc bắt đầu và kết thúc */
  }
  50% {
    opacity: 1; /* Độ mờ tối đa giữa chu kỳ */
  }
`;

// Tạo styled component cho container
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px; /* Chiều cao của spinner */
  position: relative;
`;

// Tạo styled component cho từng chấm
const Dot = styled.div<{ angle: number; delay: number }>`
  width: 10px; /* Đường kính chấm */
  height: 10px; /* Đường kính chấm */
  background-color: #6200ea; /* Màu chấm */
  border-radius: 50%; /* Hình tròn */
  position: absolute;
  animation: ${dotOpacityAnimation} 1.4s infinite ease-in-out; /* Animation độ mờ */
  animation-delay: ${({ delay }) =>
    delay}s; /* Độ trễ tùy chỉnh cho từng chấm */

  /* Giữ vị trí của các chấm trên vòng tròn */
  transform: translate(-50%, -50%);
  ${({ angle }) => `
    top: ${50 + 20 * Math.sin(angle)}%;
    left: ${50 + 20 * Math.cos(angle)}%;
  `}
`;

const RotatingDotSpinner: React.FC = () => {
  const dots = 8; // Số lượng dấu chấm
  return (
    <SpinnerContainer>
      {Array.from({ length: dots }, (_, index) => {
        const angle = (index * (2 * Math.PI)) / dots; // Tính góc cho từng chấm
        const delay = index * 0.15; // Độ trễ cho từng chấm
        return <Dot key={index} angle={angle} delay={delay} />;
      })}
    </SpinnerContainer>
  );
};

export default RotatingDotSpinner;
