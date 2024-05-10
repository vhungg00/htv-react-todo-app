import React from "react";

import "./row.scss";

export type RowProps = {
  title: string;
  isHightlighted?: boolean;
};

export const Row: React.FC<RowProps> = ({ title, isHightlighted, ...rest }) => {
  return (
    <li
      className={["Row", isHightlighted ? "RowHightlighted" : ""]
        .join(" ")
        .trim()}
      {...rest}
    >{title}</li>
  );
};
