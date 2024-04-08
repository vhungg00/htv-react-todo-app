import React from "react";

import { TabElements } from "./Tabs";

const TabPanel: React.FC<{
  role?: string;
  children: React.ReactNode;
  className?: string;
  index?: string;
}> = ({ role, children, className, index, ...rest }) => {
  return (
    <div
      className={["tab-panel", className].join(" ")}
      role="tab-panel"
      aria-labelledby={index}
      {...rest}
    >
      {children}
    </div>
  );
};

TabPanel.defaultProps = {
  role: TabElements.tabPanel,
};

export { TabPanel };
