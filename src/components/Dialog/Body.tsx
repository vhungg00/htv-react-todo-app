import { FC, ReactNode } from "react";
import { css, CSSProp } from "styled-components";
import { Flex } from "@/consult/components/elements/styled";

type Props = {
  __css?: CSSProp;
  children: ReactNode;
};

export const Body: FC<Props> = ({ __css, children }) => {
  return (
    <Flex
      $cx={css`
        flex-direction: column;
        padding: 15px;
        ${__css};
      `}
    >
      {children}
    </Flex>
  );
};
