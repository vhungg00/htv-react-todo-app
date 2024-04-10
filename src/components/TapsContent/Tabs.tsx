import React, { useCallback, useState, MouseEvent } from "react";
import { Align, Variant } from "./getTabsStyle";

import { getTabsStyle } from "./getTabsStyle";

export type TabsProps = {
  defaultIndex?: number;
  variant?: Variant;
  align?: Align;
  children: React.ReactNode;
};

export enum TabElements {
  tabList = "tabList",
  tab = "tab",
  tabPanel = "tabPanel",
}

const INIT_CURRENT_INDEX = 0;

export const Tabs: React.FC<TabsProps> = ({
  defaultIndex,
  variant = "standard",
  align = "start",
  children,
  ...rest
}) => {
  const tabsStyle = getTabsStyle(variant, align).join(" ");
  const initCurrentIndex = defaultIndex || INIT_CURRENT_INDEX;
  const [currentIndex, setCurrentIndex] = useState<number>(initCurrentIndex);

  const cloneTab = useCallback(
    (
      tab: React.ReactElement,
      index: number,
      classes: string,
      isSelected: boolean,
      handleClick: () => void
    ): React.ReactNode => {
      return React.cloneElement(tab, {
        index,
        className: classes,
        isSelected,
        onClick: (e: MouseEvent<HTMLButtonElement>) => {
          if (tab.props.onClick) {
            tab.props.onClick(e);
          }
          handleClick();
        },
      });
    },
    [currentIndex]
  );

  const processTabList = useCallback(
    (
      tabList: React.ReactElement,
      children: React.ReactElement
    ): React.ReactNode => {
      const props = {
        children: React.Children.map(tabList, (tab, index) => {
          const isSelected = index === currentIndex;
          const selected = isSelected ? "selected--tab" : undefined;

          if (tab.props.role === TabElements.tab) {
            const classes = [tab.props.className, tabsStyle, selected].join(
              " "
            );
            return cloneTab(tab, index, classes, isSelected, () =>
              setCurrentIndex(index)
            );
          }
          return tab;
        }),
        className: tabsStyle,
      };
      return React.cloneElement(children, { ...props });
    },
    [currentIndex, setCurrentIndex]
  );

  const _children = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const role = child.props.role;
      if (role === TabElements.tabList) {
        const tabList = child.props.children;
        return processTabList(tabList, child);
      }
      const isTabpanelSelected = currentIndex + 1 === index;
      if (isTabpanelSelected && role === TabElements.tabPanel) {
        const props = {
          index: index - 1,
          isTabpanelSelected,
        };
        return React.cloneElement(child, { ...props });
      }
      return null;
    }
  });

  return (
    <div className="tabs" {...rest}>
      {_children}
    </div>
  );
};
