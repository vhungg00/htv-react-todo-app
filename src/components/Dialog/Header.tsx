import { CSSProperties, FC, ReactNode } from "react";
import styled, { css, CSSProp } from "styled-components";
import { Box, Flex } from "@/consult/components/elements/styled";

type Props = {
  __css?: CSSProp;
  styleIcon?: CSSProperties;
  children?: ReactNode;
  onClose?: () => void;
};

export const Header: FC<Props> = ({ children, onClose, __css, styleIcon }) => (
  <Flex
    $cx={css`
      position: relative;
      height: 23px;
      justify-content: center;
      align-items: center;
      ${__css}
    `}
  >
    {children}
    <Box
      style={{ ...styleIcon }}
      $cx={{
        position: "absolute",
        right: "12px",
        zIndex: "9",
      }}
      onClick={onClose}
    >
      <IconClose />
    </Box>
  </Flex>
);

export const IconClose = styled.i<{ $color?: string }>`
  position: relative;
  top: 0;
  right: 0;
  display: block;
  width: 24px;
  height: 24px;
  cursor: pointer;
  outline: unset;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 1px;
    height: 18px;
    border-left: solid 2px ${(props) => props.$color || `rgba(92, 92, 92, 1)`};
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 1px;
    height: 18px;
    border-left: solid 2px ${(props) => props.$color || `rgba(92, 92, 92, 1)`};
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
