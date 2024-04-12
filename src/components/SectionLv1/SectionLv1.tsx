import React from "react";

import "./sectionLv1.scss";

export const SectionLv1: React.FC<{
  children: React.ReactNode;
  hasSeparator?: boolean;
}> = ({ children, hasSeparator }) => (
  <div
    className={[
      "section-lv1",
      `${hasSeparator ? "section-lv1--separator" : ""}`,
    ].join(" ")}
  >
    {children}
  </div>
);
