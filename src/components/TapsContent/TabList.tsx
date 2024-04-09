import React, { HTMLAttributes } from "react";

import { TabElements } from "./Tabs";

import "./tapcontent.scss";

export const TabList: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  role,
  children,
  className,
  ...rest
}) => {
  return (
    <div role="tablist" className={["tab-list", className].join(" ")} {...rest}>
      {children}
    </div>
  );
};

TabList.defaultProps = {
  role: TabElements.tabList,
};
