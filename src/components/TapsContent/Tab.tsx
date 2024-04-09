import React from "react";

import "./tapcontent.scss";
import { TabElements } from "./Tabs";

type TabProps = {
  role?: string;
  index?: number;
  isSelected?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Tab: React.FC<TabProps> = ({
  role,
  index,
  isSelected = false,
  disabled = false,
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
      aria-disabled={disabled}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Tab.defaultProps = {
  role: TabElements.tab,
};
