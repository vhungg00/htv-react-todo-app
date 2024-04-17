import React from "react";
import "./steps.scss";

export type StepsProps = {
  currentIndex: number;
  children: React.ReactNode;
};

export const Steps: React.FC<StepsProps> = ({ currentIndex, children }) => {
  const length = React.Children.count(children);
  const curr = Math.max(0, Math.min(length - 1, currentIndex));
  return (
    <ol className="steps" data-index={curr}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const last = length - 1 === index;
          const stepNumber: number = index + 1;
          const isStepItemActive = index === currentIndex;
          const props = { index, last, currentIndex: curr, stepNumber, isStepItemActive };
          return React.cloneElement(child, { ...props });
        }
        return child;
      })}
    </ol>
  );
};
