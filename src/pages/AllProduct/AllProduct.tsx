import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

import Breadcrumb from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { SectionFilter } from "./SectionFilter";

export const AllProduct: React.FC = () => {
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  return (
    <>
      <Helmet>
        <title> Tất cả sản phẩm</title>
      </Helmet>
      <Container>
        <Breadcrumb hasDisplayHome title="Tất cả sản phẩm" />
        <SectionFilter
          open={isOpenFilter}
          onToggle={() => setIsOpenFilter(!isOpenFilter)}
         />
        <div>All product</div>
      </Container>
    </>
  );
};
