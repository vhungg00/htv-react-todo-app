import { Link } from "react-router-dom";
import React from "react";
import { ScreenUrlPath } from "@/typing/ScreenUrlPath";

import "./breadcrumb.scss";

export type BreadcrumbProps = {
  hasDisplayHome?: boolean;
  hasDisplayAllPrd?: boolean;
  className?: string;
  title?: string;
};

const ALLPRODUCTNAMES = "Tất cả sản phẩm";

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  className,
  title,
  hasDisplayHome = false,
  hasDisplayAllPrd = false,
}) => {
  return (
    <nav
      className={["breadcrumb", `${className ? "breadcrumbActive" : ""}`].join(
        " "
      )}
    >
      <ol className="breadcrumb__list">
        {hasDisplayHome && (
          <li className="breadcrumb__list-item">
            <Link to={ScreenUrlPath.Root}>Trang chủ</Link>
          </li>
        )}
        {hasDisplayAllPrd && (
          <li className="breadcrumb__list-item">
            <Link to={ScreenUrlPath.AllProduct}>{ALLPRODUCTNAMES}</Link>
          </li>
        )}
        {title && (
          <li className="breadcrumb__list-item active">
            <Link to={"#"}>{title}</Link>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
