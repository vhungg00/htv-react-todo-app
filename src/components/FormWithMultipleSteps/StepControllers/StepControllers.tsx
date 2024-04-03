import React from "react";

import "./stepControllers.scss";

export const StepControllers: React.FC<{currentStep: number}> = ({ currentStep }) => {
  return (
    <div className="actions">
      <div className="actions-box">
        <button type="button" id="prevBtn">
          Previous {currentStep}
        </button>
        <button type="submit" id="nextBtn">
          Next
        </button>
      </div>
    </div>
  );
};
