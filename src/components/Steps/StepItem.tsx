import { getClasses } from "@/utils/getClasses";
import React from "react";
import "./steps.scss";

type Variant = "past" | "current" | "complete" | "goal" | "future";

export type StepsItemProps = {
  index?: number;
  last?: boolean;
  currentIndex?: number;
  stepNumber?: number;
  isStepItemActive?:boolean;
  children: React.ReactNode;
};

const getVariant = (
  index: number,
  last: boolean,
  currentIndex: number
): Variant => {
  if (index < currentIndex) {
    return "past";
  }
  if (index === currentIndex) {
    if (last) {
      return "complete";
    }
    return "current";
  }
  if (last) {
    return "goal";
  }
  return "future";
};

const getClassStepItem: { [key in Variant]: string } = {
  past: "step-item--past",
  current: "step-item--current",
  complete: "step-item--complete",
  goal: "step-item--goal",
  future: "",
} as const;

export const StepItem: React.FC<StepsItemProps> = ({
  index = 0,
  last = false,
  currentIndex = 0,
  stepNumber,
  isStepItemActive,
  children,
  ...rest
}) => {
  const variant = getVariant(index, last, currentIndex);
  const classes = isStepItemActive ? "step-item--active" : "";

  return (
    <li
      className={getClasses(["step-item", classes, getClassStepItem[variant]])}
      data-index={`step-item-${index}`}
      {...rest}
    >
      {index !== 0 && (
        <div className="step-item-tail">
          <span></span>
        </div>
      )}
      <span className="step-item-content">
        {stepNumber && (
          <p className="step-item-content--number">
            <span>{stepNumber}</span>
          </p>
        )}
        <span>{children}</span>
      </span>
    </li>
  );
};
