import React, { useState } from "react";
import { Variant } from "./getTabsStyle";

import { getTabsStyle } from "./getTabsStyle";

export type TabsProps = {
  defaultIndex?: number;
  variant?: Variant;
  children: React.ReactNode;
};

export enum TabElements {
  tabList = "tab-list",
  tab = "tab-simple",
  tabPanel = "tab-panel",
}

const INIT_CURRENT_INDEX = 0;

export const Tabs: React.FC<TabsProps> = ({
  defaultIndex,
  variant = "standard",
  children,
}) => {
  const tabsStyle = getTabsStyle(variant);
  const indexValue = defaultIndex || INIT_CURRENT_INDEX;

  const [currentIndex, setCurrentIndex] = useState<number>(indexValue);

  const _children = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      // Get role on child element
      const role = child.props.role;

      if (role === TabElements.tabList) {
        // get tabList on child element
        const tabList = child.props.children;

        const props = {
          children: React.Children.map(tabList, (tab, index) => {
            const isSelected = index === currentIndex;
            console.log(tab.props.className);
            const selected = isSelected ? "selected--tab" : undefined;
            if (tab.props.role === TabElements.tab) {
              return React.cloneElement(tab, {
                index: index,
                className: [tab.props.className, tabsStyle, selected].join(" "),
                isSelected: isSelected,
                onClick: () => {
                  setCurrentIndex(index);
                },
              });
            }
          }),
          className: `tab-list__${tabsStyle}`,
        };
        return React.cloneElement(child, { ...props });
      }
      if (currentIndex + 1 === index && role === TabElements.tabPanel) {
        const props = {
          index: `tab-panel--${index}`,
        };
        return React.cloneElement(child, { ...props });
      }
      return null;
    }
  });

  return <div role="tabs" className={["tabs"].join(" ")}>{_children}</div>;
};
