import React, { FC, HTMLAttributes } from "react";

const TabPanel: FC<{
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
  role: "tabPanel",
};

export { TabPanel };
