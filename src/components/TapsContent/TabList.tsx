import React, { HTMLAttributes } from "react";

import "./tapcontent.scss";

export const TabList: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  role,
  children,
  className,
  ...rest
}) => {
  return (
    <div className={["tab-list", className].join(" ")} {...rest}>
      {children}
    </div>
  );
};

TabList.defaultProps = {
  role: "tablist",
};
