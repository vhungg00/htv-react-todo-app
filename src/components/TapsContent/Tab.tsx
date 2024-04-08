import React from "react";

import './tapcontent.scss';

const Tab: React.FC<{
  role?: string;
  className?: string;
  children: React.ReactNode;
  index?: string;
}> = ({ role, className, children, index, ...props }) => {
  return (
    <li className={["tab", className].join(" ")} id={index} {...props}>
      {children}
    </li>
  );
};

Tab.defaultProps = {
  role: "tab",
};

export { Tab };
