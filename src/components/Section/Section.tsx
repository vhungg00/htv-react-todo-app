import React from "react";

import './section.scss';

export const Section: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <section className="section">{children}</section>
);