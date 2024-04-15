import { getClasses } from "@/utils/getClasses";
import React from "react";
import "./steps.scss";

type Variant = "past" | "current" | "complete" | "goal" | "future";

export type StepsItemProps = {
  index?: number;
  last?: boolean;
  currentIndex?: number;
  stepNumber?: number;
  children: React.ReactNode;
};

// const getClassStepItem: { [key in Variant]: string } = {
//   past: "step-item--past",
//   current: "step-item--current",
//   complete: "step-item--complete",
//   goal: "step-item--goal",
//   future: "",
// } as const;

export const StepItem: React.FC<StepsItemProps> = ({
  index = 0,
  last = false,
  currentIndex = 0,
  stepNumber,
  children,
}) => {

  return (
    <li
      className={getClasses(["step-item", "as"])}
      data-index={`step-item-${index}`}
    >
      {stepNumber && <p>{stepNumber}</p>}
      <span>{children}</span>
    </li>
  );
};
