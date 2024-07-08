import React from "react";

import "./filterHeading.scss";

type FilterHeading = {
  title: string;
  open: boolean;
  onClick: () => void;
};

export const FilterHeading: React.FC<FilterHeading> = ({ title, open, onClick }) => {
  return (
    <div className="symbolButton" onClick={onClick}>
      <span>
        <div className="symbolButton__inner">
          <h2 className="filter-label">
            <span>{title}</span>
            <svg
              focusable="false"
              className={["a-icon", "chevron-down__svg", `${open ? "active" : ""}`].join(" ")}
              viewBox="0 0 18 11"
              width="14px"
              height="12px"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.78075 10.7291L17.6761 2.86114C18.1071 2.4034 18.1071 1.70239 17.6761 1.27138C17.2451 0.840368 16.5173 0.840368 16.0863 1.27138L8.99955 8.35816L1.91277 1.27138C1.45503 0.840368 0.754023 0.840368 0.323013 1.27138C-0.107997 1.70239 -0.107997 2.40342 0.323013 2.86114L8.19099 10.7291C8.64873 11.1601 9.34974 11.1601 9.78075 10.7291Z"
                fill="#333"
              ></path>
            </svg>
          </h2>
        </div>
      </span>
    </div>
  );
};
