import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import smoothScrollIntoView from "smooth-scroll-into-view-if-needed";

import { Container } from "@/components/Container";

import { Tabs, TabList, Tab, TabPanel } from "@/components/TapsContent";
import { StepItem, Steps } from "@/components/Steps";
import { Checkbox } from "@/components/Checkbox";
import { useForm } from "react-hook-form";

const accessory = "accessory";

export const Home: React.FC = () => {
  const [addGoodsCompleted, setAddGoodsCompleted] = useState<boolean>(false);
  const [changeStep, setChangeStep] = useState<number>(0);

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

  const steps: string[] = [
    "contractType",
    "Select phone number",
    "Select Acessory",
    "Estimate",
    "Payment",
    "Complete"
  ];
  type Input = {
    checkbox: string
  }
  const { register } = useForm<Input>();

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Container>
        <Checkbox name="name" value="hoa" register={register("checkbox")} />
        <Steps currentIndex={changeStep}>
          {steps.map((step, index) => 
            <StepItem key={index}>{step}</StepItem>
          )}
        </Steps>

        <>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
            }}
          >
            <li>
              <button
                onClick={() => {
                  setChangeStep((prev) => prev - 1);
                }}
              >
                prve
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setChangeStep((prev) => prev + 1);
                }}
              >
                next
              </button>
            </li>
          </ul>
        </>

        <Tabs defaultIndex={2} variant="fullWidth" align="end">
          <TabList>
            <Tab disabled>おトクにマネ活</Tab>
            <Tab>データ使い放題</Tab>
            <Tab>使う分だけ クに 使う分だけ ク</Tab>
          </TabList>

          <TabPanel>
            <div style={{ padding: "10px" }}>
              <Tabs defaultIndex={0} align="end">
                <TabList>
                  <Tab>おトクにマネ活</Tab>
                  <Tab>データ使い放題</Tab>
                  <Tab>使う分だけ</Tab>
                </TabList>

                <TabPanel>
                  <h1>section1</h1>
                </TabPanel>
                <TabPanel>
                  <h1>section2</h1>
                </TabPanel>
                <TabPanel>
                  <h1>section3</h1>
                </TabPanel>
              </Tabs>
            </div>
            <h1>section1</h1>
          </TabPanel>
          <TabPanel>
            <h1>section2</h1>
          </TabPanel>
          <TabPanel>
            <h1>section3</h1>
            <div style={{ padding: "10px" }}>
              <Tabs defaultIndex={0} align="end">
                <TabList>
                  <Tab>おトクにマネ活</Tab>
                  <Tab>
                    データ使い放題 データ使い放題 データ使い放題 データ使い放題
                    データ使い放題
                  </Tab>
                  <Tab>使う分だけ</Tab>
                </TabList>

                <TabPanel>
                  <h1>section1</h1>
                </TabPanel>
                <TabPanel>
                  <h1>section2</h1>
                </TabPanel>
                <TabPanel>
                  <div style={{ padding: "10px" }}>
                    <Tabs defaultIndex={0} align="end">
                      <TabList>
                        <Tab>おトクにマネ活</Tab>
                        <Tab>データ使い放題</Tab>
                        <Tab>使う分だけ</Tab>
                        <Tab>使う分だけ 使う分だけ使う分だけ</Tab>
                      </TabList>

                      <TabPanel>
                        <h1>section1</h1>
                      </TabPanel>
                      <TabPanel>
                        <h1>section2</h1>
                      </TabPanel>
                      <TabPanel>
                        <h1>section3</h1>
                      </TabPanel>
                    </Tabs>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </TabPanel>
        </Tabs>

        <p id={accessory}>Home</p>
      </Container>
    </>
  );
};
