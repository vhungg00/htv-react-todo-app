import React, { useState } from "react";
import "./list.scss";

export type ListProps = {
  children: React.ReactElement[];
};

export const List: React.FC<ListProps> = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div>
      <ol className="List">
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {
            isHightlighted: index === selectedIndex,
          });
        })}
      </ol>
      <br />
      <button
        className="LitsButton"
        onClick={() => {
          setSelectedIndex(
            (prev) => (prev + 1) % React.Children.count(children)
          );
        }}
      >
        Next
      </button>
    </div>
  );
};
