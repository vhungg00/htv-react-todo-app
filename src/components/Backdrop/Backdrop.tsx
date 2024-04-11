import React from "react";
import "./backdrop.scss";

type BackdropProps = {
  id: string;
  isClear?: boolean;
  onClick?: () => void | Promise<void>;
};

export const Backdrop: React.FC<BackdropProps> = ({
  id,
  isClear = false,
  onClick,
}) => (
  <div
    id={id}
    className="backdrop"
    aria-hidden="true"
    data-clear={isClear}
    data-onClick={Boolean(onClick)}
    onClick={onClick}
  ></div>
);
