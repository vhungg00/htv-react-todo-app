export type Variant = "fullWidth" | "scrollable" | "standard";

export const getTabsStyle = (variant: Variant | undefined): string[] => {
  const styleList: string[] = [];

  switch (variant) {
    case "fullWidth": {
      styleList.push("tab-fullWidth");
      break;
    }
    case "scrollable": {
      styleList.push("tab-scrollable");
      break;
    }
    case "standard": {
      styleList.push("tab-standard");
      break;
    }
    default:
      break;
  }

  return styleList;
};
