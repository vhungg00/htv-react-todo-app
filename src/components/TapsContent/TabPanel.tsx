import React from "react";

import { TabElements } from "./Tabs";

const TabPanel: React.FC<{
  role?: string;
  index?: number;
  isTabpanelSelected?: boolean;
  children: React.ReactNode;
}> = ({ role, index, isTabpanelSelected, children, ...rest }) => {
  return (
    <div
      id={`simple-tanpanel-${index}`}
      className={["tab-panel"].join(" ")}
      role="tabPanel"
      aria-labelledby={`tab-panel-${index}`}
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
