export const RemoveDuplicateArray = data => {
  let concatArray = data.map(eachValue => {
    return Object.values(eachValue).join('');
  });
  let filterValuesData = data.filter((value, index) => {
    return concatArray.indexOf(concatArray[index]) === index;
  });
  return filterValuesData;
};
export const LikeAndCommentCountMethod = num => {
  const digits = 1;
  const lookup = [
    {value: 1, symbol: ''},
    {value: 1e3, symbol: 'k'},
    {value: 1e6, symbol: 'M'},
    {value: 1e9, symbol: 'G'},
    {value: 1e12, symbol: 'T'},
    {value: 1e15, symbol: 'P'},
    {value: 1e18, symbol: 'E'},
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let item = lookup
    .slice()
    .reverse()
    .find(item => {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};
