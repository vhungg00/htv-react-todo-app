import React from "react";

import "./tapcontent.scss";
import { TabElements } from "./Tabs";

type TabProps = {
  role?: string;
  index?: string;
  isSelected?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Tab: React.FC<TabProps> = ({
  role,
  index,
  isSelected = false,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      id={`tab-${index}`}
      className={["tab", className].join("")}
      role="tab"
      tabIndex={isSelected ? 0 : -1}
      type="button"
      aria-selected={isSelected ? "true" : "false"}
      aria-controls={`simple-tanpanel-${index}`}
      {...rest}
    >
      {children}
    </button>
  );
};

Tab.defaultProps = {
  role: TabElements.tab,
};
