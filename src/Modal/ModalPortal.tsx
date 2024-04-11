import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import './fade.scss';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from "@/utils/bodyScrollLock";


export type ContainerProps = {
  isDisplay: boolean;
  children: React.ReactNode;
};

type DivProps = React.HTMLProps<HTMLDivElement>;

const Component = React.forwardRef<HTMLDivElement, DivProps>(({children}, ref) => (
  <div ref={ref}>{children}</div>
))

export const Container: React.FC<ContainerProps> = ({
  isDisplay,
  children,
}) => {
  const createRootModalAndAppendToBody = useCallback(
    (rootModal: string): HTMLDivElement => {
      const rootModalElement = document.createElement("div");
      rootModalElement.setAttribute("id", rootModal);
      document.body.appendChild(rootModalElement);
      return rootModalElement;
    },
    []
  );
  let el = document.getElementById("rootModal");
  if (!el) {
    el = createRootModalAndAppendToBody("rootModal");
  }
  const nodeRef = useRef(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!ref.current) return;
    if (isDisplay) {
      disableBodyScroll(ref.current, {
        allowTouchMove: () => true
      });
    } else {
      enableBodyScroll(ref.current);
      clearAllBodyScrollLocks();
    }
  }, [isDisplay])

  return createPortal(
    <CSSTransition in={isDisplay} classNames="fade" ref={nodeRef} timeout={200} unmountOnExit>
      <Component ref={ref}>{children}</Component>
    </CSSTransition>,
    el
  );
};

type ModalPortalProps = ContainerProps;

const Connect: React.FC<ModalPortalProps> = ({ isDisplay, children }) => (
  <Container isDisplay={isDisplay}>{children}</Container>
);

export const ModalPortal = React.memo(Connect);
