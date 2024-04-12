import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

import Breadcrumb from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { SectionFilter } from "./SectionFilter";
import { Tabs, Tab } from "@/components/Tabs";

export const AllProduct: React.FC = () => {
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  return (
    <>
      <Helmet>
        <title> Tất cả sản phẩm</title>
      </Helmet>
      <Container>
        <Tabs variant="fullWidth">
          <Tab disabled title="使う分だけ クに 使う分だけ ク1">lemon1
            <h1>Tabpanel</h1>
            <div style={{height: '100px'}}></div>
          </Tab>
          <Tab title="使う分だけ クに 使う分だけ ク2">lemon2</Tab>
          <Tab title="使う分だけ クに 使う分だけ ク3">lemon3</Tab>
        </Tabs>
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
