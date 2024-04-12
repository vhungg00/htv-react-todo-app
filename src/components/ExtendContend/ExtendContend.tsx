import React from "react";

import "./extendContend.scss";

type ExtendContendProps = {
  // Tách riêng biệt
  hasSeparator?: boolean;

  children: React.ReactNode;
};

export const ExtendContend: React.FC<ExtendContendProps> = ({
  hasSeparator,
  children,
}) => (
  <div
    className={[
      "extendContend",
      `${hasSeparator ? "extendContend__hasSeparator" : ""}`,
    ].join(" ")}
  >
    {children}
  </div>
);
