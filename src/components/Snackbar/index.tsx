import React, {
  CSSProperties,
  forwardRef,
  ReactPortal,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Box, Flex } from "@/consult/components/elements/styled";
import { css, CSSProp } from "styled-components";
import { IconClose } from "@/consult/components/modules/Dialog/Header";

export type AlertColor = "success" | "info" | "warning" | "error";

export type SnackbarRefs = {
  showSnackbar: (options: { message?: string; severity?: AlertColor }) => void;
};

interface SnackbarProps {
  __css?: CSSProp;
  duration?: number;
}

type Decorate = {
  color: string;
  bg: string;
};

const TIME_OUT = 350;

const animatedActive = (isOpen?: boolean) => ({
  opacity: Number(isOpen),
  transition: "all .3s ease-in-out",
  transform: `translateX(${isOpen ? 0 : 100}%)`,
});

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement("div");

  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);

  return wrapperElement;
};

export const Snackbar = forwardRef<SnackbarRefs, SnackbarProps>(
  ({ duration = 3000, __css }: SnackbarProps, ref): ReactPortal | null => {
    const refTimeout = useRef<NodeJS.Timeout>();
    const [open, setOpen] = useState(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [severity, setSeverity] = useState<AlertColor>("error");
    const [message, setMessage] = useState<string>(
      "エラーが発生しました。後でもう一度お試しください。"
    );
    const [animated, setAnimated] = useState<CSSProperties>({
      transform: "translateX(100%)",
      opacity: 0,
      transition: "all .3s ease-in-out",
    });

    const handleOpen = useCallback(
      (options: { message?: string; severity?: AlertColor }) => {
        if (open) return;
        if (options.message) setMessage(options.message);
        if (options.severity) {
          setSeverity(options.severity);
        } else {
          setSeverity("error");
        }
        setOpen(true);
      },
      [open]
    );

    const handleClearDom = useCallback(() => {
      setIsVisible(false);
    }, []);

    const handleClose = useCallback(() => {
      setAnimated(animatedActive(false));
      refTimeout.current = setTimeout(() => {
        setOpen(false);
        handleClearDom();
      }, TIME_OUT);
    }, [handleClearDom]);

    const handleClickClose = useCallback(() => {
      setAnimated(animatedActive(false));
      clearTimeout(refTimeout.current);
      refTimeout.current = setTimeout(() => handleClose(), TIME_OUT);
    }, [handleClose]);

    useEffect(() => {
      if (open) setIsVisible(true);
      const timer = setTimeout(() => {
        if (!isVisible) return;
        setTimeout(() => handleClose(), TIME_OUT);
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }, [duration, handleClose, isVisible, open]);

    useEffect(() => {
      if (!isVisible) return;
      const animate = () => {
        setAnimated(animatedActive(true));
      };
      const frameId = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(frameId);
      };
    }, [isVisible]);

    useEffect(() => {
      if (refTimeout.current) clearTimeout(refTimeout.current);
      if (!isVisible) handleClickClose();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    useImperativeHandle(ref, () => {
      return {
        showSnackbar: handleOpen,
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const variant = useMemo((): Decorate => {
      switch (severity) {
        case "success":
          return {
            color: "--success-clr",
            bg: "--success-bg",
          };
        case "warning":
          return {
            color: "--warning-clr",
            bg: "--warning-bg",
          };

        default:
          return {
            color: "--error-clr",
            bg: "--error-bg",
          };
      }
    }, [severity]);

    if (typeof window === "object") {
      let el = document.getElementById("rootSnackbar");

      if (!el) {
        el = createWrapperAndAppendToBody("rootSnackbar");
      }

      return isVisible
        ? (createPortal(
            <Flex
              $cx={css`
                --success-clr: ${({ theme }) =>
                  theme.consultTheme.alertStatus.success.color};
                --success-bg: ${({ theme }) =>
                  theme.consultTheme.alertStatus.success.bg};
                --error-clr: ${({ theme }) =>
                  theme.consultTheme.alertStatus.error.color};
                --error-bg: ${({ theme }) =>
                  theme.consultTheme.alertStatus.error.bg};
                --warning-clr: ${({ theme }) =>
                  theme.consultTheme.alertStatus.warning.color};
                --warning-bg: ${({ theme }) =>
                  theme.consultTheme.alertStatus.warning.bg};
                position: fixed;
                top: 10px;
                right: 10px;
                background-color: var(${variant.bg});
                color: var(${variant.color});
                padding: 16px;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                ${__css}
              `}
              className={"NotoSansJP"}
              style={{ ...animated }}
            >
              {message}
              <Box onClick={handleClickClose}>
                <IconClose $color={`var(${variant.color})`} />
              </Box>
            </Flex>,
            el
          ) as ReactPortal)
        : null;
    }
  }
);

Snackbar.displayName = "Snackbar";
