export interface TodoType {
  id: string;
  title: string;
  status: string;
  time?: string;
}

export type HandleStepChangeType = (
  a: number | null,
  b?: null | number,
  c?: number,
) => void;
