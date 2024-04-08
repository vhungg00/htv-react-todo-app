import React, { useState } from "react";

export type TabsProps = {
  selectedClassName?: string;
  children: React.ReactNode;
};
export const Tabs: React.FC<TabsProps> = ({ children, selectedClassName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const _children = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const role = child.props.role;
      const key = child.key ?? index;
      if (role === "tablist") {
        const tabs = child.props.children;
        const props = {
          children: React.Children.map(tabs, (tab, index) => {
            const isSelected = index === currentIndex;
            const selected = isSelected ? "selected-tab" : undefined;
            if (tab.props.role === "tab") {
              return React.cloneElement(tab, {
                index: `tab--${index}`,
                className: [selected, tab.props.className].join(" "),
                onClick: () => {
                  setCurrentIndex(index);
                },
              });
            }
          }),
        };
        return React.cloneElement(child, { ...props });
      }
      if (currentIndex + 1 === index && role === "tabPanel") {
        const props = {
          index: `tab-panel--${key}`,
        };
        return React.cloneElement(child, { ...props });
      }
      return null;
    }
  });

  return (
    <div className={["react-tabs", selectedClassName].join(" ")}>
      {_children}
    </div>
  );
};
