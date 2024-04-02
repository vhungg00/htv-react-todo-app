import { useState, useCallback } from "react";
import { HandleStepChangeType } from "@/types";

export const useCurrentStep = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const isCurrentStep = (index: number): boolean => {
    return index === currentStep;
  };

  const handleStepChange = useCallback<HandleStepChangeType>(
    (stepChange, goToStep = null) => {
      typeof goToStep === "number"
        ? setCurrentStep(goToStep)
        : typeof stepChange === "number" &&
          setCurrentStep((currentStep) => currentStep + stepChange);
    },
    []
  );

  return { currentStep, isCurrentStep, handleStepChange };
};
