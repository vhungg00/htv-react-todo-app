import { ExtendContend } from "@/components/ExtendContend";
import { Section } from "@/components/Section";
import React from "react";
import { FilterHeading } from "../FillterHeading";
import { Accordion } from "@/components/Accordion";
import { NOP } from "@/utils/function";
import { SectionLv1 } from "@/components/SectionLv1";

type FilterProps = {
  open?: boolean;
  isDisabled?: boolean;
  onToggle?: () => void;
};

export const SectionFilter: React.FC<FilterProps> = ({
  open = false,
  onToggle = NOP,
}) => {
  return (
    <ExtendContend>
      <Section>
        <FilterHeading title="Mục lọc sản phẩm" open={open} onClick={onToggle}  />
        <Accordion isOpen={open}>
            <SectionLv1 hasSeparator>
              <h1 style={{height: '120vh'}}>category</h1>
            </SectionLv1>
        </Accordion>
      </Section>
    </ExtendContend>
  );
};
