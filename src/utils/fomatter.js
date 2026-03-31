export const capitallizeFirstLetter = (val) => {
  if (!val) return "";
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};
export const mapOrder = (originalArray, oderArray, key) => {
  if (!originalArray || !oderArray || !key) return [];
  return [...originalArray].sort((a, b) => oderArray.indexOf(a[key]) - oderArray.indexOf(b[key]),);
};
