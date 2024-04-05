import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import smoothScrollIntoView from "smooth-scroll-into-view-if-needed";

import { Container } from "@/components/Container";

const accessory = "accessory";

export const Home: React.FC = () => {
  const [addGoodsCompleted, setAddGoodsCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (addGoodsCompleted) {
      const element = document.getElementById(accessory);
      if (element) {
        if ("scrollBehavior" in document.documentElement.style) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          smoothScrollIntoView(element, { behavior: "smooth", block: "start" });
        }
      }
      setAddGoodsCompleted(false);
    }
  }, [addGoodsCompleted]);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Container>
        <p id={accessory}>Home</p>
      </Container>
    </>
  );
};
