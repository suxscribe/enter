import { variables } from './variables';

const getWidth = () => {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
};

export const isDesktop = () => {
  const width = getWidth();

  if (width >= variables.breakpointWidthM) return true;
};
