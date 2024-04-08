import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import smoothScrollIntoView from "smooth-scroll-into-view-if-needed";

import { Container } from "@/components/Container";

import { Tabs, TabList, Tab, TabPanel } from "@/components/TapsContent";

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
        <Tabs defaultIndex={2} variant="fullWidth">
          <TabList>
            <Tab>おトクにマネ活</Tab>
            <Tab>データ使い放題</Tab>
            <Tab>使う分だけ</Tab>
          </TabList>

          <TabPanel>
            <p style={{ marginTop: "10px" }}></p>

            <h1>section1</h1>
          </TabPanel>
          <TabPanel>
            <p style={{ marginTop: "10px" }}></p>

            <h1>section2</h1>
          </TabPanel>
          <TabPanel>
            <p style={{ marginTop: "10px" }}></p>

            <h1>section3</h1>
          </TabPanel>
        </Tabs>

        <p id={accessory}>Home</p>
      </Container>
    </>
  );
};
