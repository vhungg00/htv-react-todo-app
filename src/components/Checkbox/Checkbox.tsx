import { UseFormRegisterReturn } from "react-hook-form";

import "./checkbox.scss";

export type Props = {
  name: string;
  value: string;
  onClick?: () => void;
  register: UseFormRegisterReturn;
};

export const Checkbox = ({
  name,
  value,
  onClick,
  register,
  ...props
}: Props) => {
  return (
    <input
      type="checkbox"
      className="checkbox"
      value={value}
      onClick={onClick}
      {...register}
      {...props}
    />
  );
};
