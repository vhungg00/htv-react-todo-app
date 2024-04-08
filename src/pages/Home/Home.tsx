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
        <Tabs selectedClassName="style">
          <TabList>
            <Tab className="tab-style">Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 5</Tab>
            <Tab>Tab 4</Tab>
          </TabList>
          <TabPanel>1</TabPanel>
          <TabPanel>2</TabPanel>
          <TabPanel>3</TabPanel>
          <TabPanel>4</TabPanel>
        </Tabs>
        
        <p id={accessory}>Home</p>
      </Container>
    </>
  );
};
