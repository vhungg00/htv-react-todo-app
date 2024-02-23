export const getClasses = (classes: string[]) =>
classes.filter((item) => item !== '')
    .join(' ')
    .trim();
