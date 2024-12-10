import { forwardRef, ReactNode } from "react";
import styled, { CSSProp } from "styled-components";

export type Props = {
  isClear?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  __css?: CSSProp;
};

type Ref = HTMLDivElement;

export const Backdrop = forwardRef<Ref, Props>(
  ({ isClear, onClick, children, __css }: Props, ref) => (
    <BackdropWrapper
      ref={ref}
      aria-hidden={true}
      data-clear={isClear}
      data-event={Boolean(onClick)}
      onClick={onClick}
      $cx={__css}
    >
      {children}
    </BackdropWrapper>
  )
);

const BackdropWrapper = styled.div<{ $cx?: CSSProp }>`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  cursor: default;
  background-color: transparent;
  z-index: 999;
  &[data-clear="true"] {
    background-color: rgba(255, 255, 255, 0);
  }
  &[data-event="true"] {
    cursor: pointer;
  }
  ${(props) => props.$cx}
`;

Backdrop.displayName = "Backdrop";
