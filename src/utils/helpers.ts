export const formatCount = (count: number) => {
  if (count >= 1e6) {
    return `${count / 1e6} M`;
  } else if (count >= 1e3) {
    return `${count / 1e3} K`;
  }
  return count;
};
