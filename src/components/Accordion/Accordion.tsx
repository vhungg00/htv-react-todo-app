import React, { useEffect } from "react";
import { useCollapse } from "react-collapsed";

type AccordionProps = {
  isOpen: boolean;
  duration?: number;
  children: React.ReactNode;
};

export const Accordion: React.FC<AccordionProps> = ({
  isOpen,
  duration = 500,
  children,
}) => {
  const { getCollapseProps, setExpanded } = useCollapse({ isExpanded: isOpen,duration: duration, });

  useEffect(
    () => () => {
      setExpanded(isOpen);
    },
    [isOpen, setExpanded]
  );

  return <section {...getCollapseProps()}>{children}</section>;
};
