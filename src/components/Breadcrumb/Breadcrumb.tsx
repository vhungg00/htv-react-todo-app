import { Link } from "react-router-dom";
import React from "react";
import { Container } from "../Container";
import { ScreenUrlPath } from "@/typing/ScreenUrlPath";

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
    <Container>
      <nav aria-label={["breadcrumb", `${className && className}`].join(" ")}>
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
            <li className="breadcrumb__list-item">
              <span>{title}</span>
            </li>
          )}
        </ol>
      </nav>
    </Container>
  );
};

export default Breadcrumb;
