import {
  CSSProperties,
  FC,
  MouseEvent,
  ReactNode,
  ReactPortal,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Box } from "@/consult/components/elements/styled";
import { addClass, removeClass } from "@/common/utils/function";
import { Backdrop } from "./Backdrop";
import styled, { CSSProp } from "styled-components";

type Props = {
  __css?: CSSProp;
  isOpen?: boolean;
  styleBackdrop?: CSSProp;
  onClickOverlay?: () => void;
  children?: ReactNode;
};

const animatedActive = (isOpen?: boolean) => ({
  opacity: Number(isOpen),
  transition: "all .3s ease-in-out",
});

const toggleOverflowHidden = (add: boolean) => {
  if (typeof document !== "undefined") {
    const html = document.querySelector("html");
    if (add) addClass(html!, "overflow-hidden");
    else removeClass(html!, "overflow-hidden");
  }
};

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement("div");

  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);

  return wrapperElement;
};

const TIME_OUT = 350;
const DIALOG_WRAPPER_ID = "rootDialog";

export const Dialog: FC<Props> = ({
  __css,
  isOpen,
  onClickOverlay,
  styleBackdrop,
  children,
}): ReactPortal | null => {
  const refBody = useRef<HTMLDivElement>(null);
  const refTimeout = useRef<NodeJS.Timeout>();
  const [isShow, setIsShow] = useState(isOpen);
  const [animated, setAnimated] = useState<CSSProperties>(
    animatedActive(false)
  );
  const isOverlayClickable = Boolean(onClickOverlay);

  useEffect(() => {
    if (isOpen) {
      setIsShow(isOpen);
      setTimeout(() => setAnimated(animatedActive(true)), 10);
    } else {
      setAnimated(animatedActive(false));
      refTimeout.current = setTimeout(() => setIsShow(isOpen), TIME_OUT);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      const html = document.querySelector("html");
      removeClass(html!, "overflow-hidden");
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsShow(false);
    onClickOverlay?.();
  }, [onClickOverlay]);

  const handleClickOverlay = useCallback(
    (event?: MouseEvent<HTMLDivElement>) => {
      if (
        !isOverlayClickable ||
        refBody.current?.contains(event.target as Node)
      )
        return;
      if (refTimeout.current) clearTimeout(refTimeout.current);
      setAnimated(animatedActive(false));
      refTimeout.current = setTimeout(handleClose, TIME_OUT);
    },
    [handleClose, isOverlayClickable]
  );

  useEffect(() => {
    if (isShow) toggleOverflowHidden(true);
    return () => {
      toggleOverflowHidden(false);
    };
  }, [isShow]);

  useEffect(() => {
    return () => {
      if (refTimeout.current) clearTimeout(refTimeout.current);
    };
  }, [isShow, isOpen]);

  const el = useMemo(
    () =>
      typeof window === "object"
        ? document.getElementById(DIALOG_WRAPPER_ID) ||
          createWrapperAndAppendToBody(DIALOG_WRAPPER_ID)
        : null,
    []
  );

  return el && isShow
    ? (createPortal(
        <Box
          className="dialog-tamaru"
          $cx={{
            display: "flex",
            height: 0,
            width: 0,
            left: 0,
            top: 0,
            position: "absolute",
          }}
        >
          <Backdrop
            __css={styleBackdrop}
            onClick={isOverlayClickable ? handleClickOverlay : undefined}
          />
          <DialogContent
            role="dialog"
            aria-modal="true"
            $css={__css}
            ref={refBody}
            style={{ ...animated }}
            className={"NotoSansJP"}
          >
            {children}
          </DialogContent>
        </Box>,
        el
      ) as ReactPortal)
    : null;
};

const DialogContent = styled.div<{ $css?: CSSProp }>`
  position: fixed;
  max-width: 500px;
  min-width: 310px;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: white;
  ${(props) => props.$css}
`;
