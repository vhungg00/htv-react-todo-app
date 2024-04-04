import Breadcrumb from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import React from "react";
import { Helmet } from "react-helmet-async";

export const AllProduct: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Tất cả sản phẩm</title>
      </Helmet>
      <Container>
        <Breadcrumb hasDisplayHome title="Tất cả sản phẩm"/>
      </Container>
    </>
  );
};
