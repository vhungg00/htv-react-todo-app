import React, { useRef, useId } from "react";

export type UnControllerTabsProps = {
  className?: string;
  selectedIndex?: number;
  children: React.ReactNode;
};

export const UnControlerTabs: React.FC<UnControllerTabsProps> = ({
  className = "react-tabs",
  selectedIndex,
  children,
}) => {

  let tabNodes = useRef([]);
  let tabIds = useRef<string[]>([]);
  const ref = useRef();

  function getTabsCount() {
    return React.Children.count(children)
  }

  function getChildren() {
    let index = 0;

    tabIds.current = tabIds.current || [];
    let diff = tabIds.current.length - getTabsCount();

    const id = useId();
    while (diff++ < 0) {
      tabIds.current.push(`${id}${tabIds.current.length}`);
    }


  }

  return (
    <div
      className={className}
      ref={(node) => console.log(node)}
      data-rttabs
    ></div>
  );
};
