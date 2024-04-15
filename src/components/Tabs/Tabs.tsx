import React, { ReactElement, useState, useCallback } from "react";
import { Variant, Align, getTabsStyle } from "./getTabsStyle";
import "./tabs.scss";

type TabsProps = {
  defaultIndex?: number;
  variant?: Variant;
  align?: Align;
  children: ReactElement[];
};

export const Tabs: React.FC<TabsProps> = ({ defaultIndex = 0, variant="standard", align, children }) => {
  const [selectedTab, setSelectedTab] = useState<number>(defaultIndex);
  const tabsStyle = getTabsStyle(variant, align).join(" ");
  const handleSelectedTab = useCallback((index: number) => {
    setSelectedTab(index)}, [setSelectedTab]);

  return (
    <div className="tabs">
      <div className={["tab-list", tabsStyle].join(" ")}>
        {children.map((item, index) => {
          const classStyle = `${tabsStyle} ${selectedTab === index ? "selected--tab" : ""}`;
          const disabled = item.props?.disabled;
          return (
            <button
              key={index}
              role="tab"
              id={`simple-tabpanel-${index}`}
              className={["tab", classStyle].join(" ")}
              type="button"
              onClick={() => handleSelectedTab(index)}
              tabIndex={selectedTab === index ? 0 : -1}
              aria-disabled={disabled}
              disabled={disabled}
            >
              {item.props.title}
            </button>
          );
        })}
      </div>
      <div id={`simple-tabpanel-${selectedTab}`} role="tabpanel" className="tab-panel">
        { children[selectedTab] }
      </div>
    </div>
  );
};