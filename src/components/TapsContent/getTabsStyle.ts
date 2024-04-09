export type Variant = "fullWidth" | "scrollable" | "standard";

export type Align = "center" | "start" | "end";

export const getTabsStyle = (variant: Variant | undefined, align: Align | undefined): string[] => {
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
  switch(align) {
    case "start": {
      styleList.push("tab-align-start");
      break;
    }
    case "center": {
      styleList.push("tab-align-center");
      break;
    }
    case "end": {
      styleList.push("tab-align-end");
      break;
    }

    default:
      break;
  }

  return styleList;
};
